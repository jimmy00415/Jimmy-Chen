/* global document, window, getComputedStyle */
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const suppliedUrl = process.env.SITE_URL || 'http://127.0.0.1:4321/Jimmy-Chen/';
const baseUrl = new URL(
  suppliedUrl.endsWith('/') ? suppliedUrl : `${suppliedUrl}/`,
);
const routes = [
  '',
  'work/openclaw/',
  'work/simplify/',
  'work/movie-intelligence/',
  'research/personal-ai-memory/',
];
const viewports = [
  { width: 1440, height: 1000 },
  { width: 768, height: 1024 },
  { width: 375, height: 812 },
  { width: 320, height: 740 },
];
const screenshotDir = path.resolve('.local/screenshots');
const reportPath = path.resolve('.local/browser-results.json');
const results = {
  baseUrl: baseUrl.href,
  startedAt: new Date().toISOString(),
  browser: '',
  pages: [],
  interactions: [],
  screenshots: [],
  failures: [],
};
await mkdir(screenshotDir, { recursive: true });

let browser;
try {
  browser = await chromium.launch({ channel: 'chrome', headless: true });
  results.browser = 'Installed Google Chrome (headless)';
} catch {
  browser = await chromium.launch({ headless: true });
  results.browser = 'Playwright Chromium (headless)';
}

async function check(name, action) {
  try {
    await action();
    results.interactions.push({ name, passed: true });
  } catch (error) {
    results.interactions.push({ name, passed: false, message: error.message });
    results.failures.push(`${name}: ${error.message}`);
  }
}

async function screenshot(page, filename) {
  const viewport = page.viewportSize();
  const height = await page.evaluate(
    () => document.documentElement.scrollHeight,
  );
  for (
    let offset = 0;
    offset < height;
    offset += Math.max(1, viewport.height * 0.8)
  ) {
    await page.evaluate(async (top) => {
      window.scrollTo({ top, behavior: 'instant' });
      await new Promise((resolve) =>
        window.requestAnimationFrame(() =>
          window.requestAnimationFrame(resolve),
        ),
      );
    }, offset);
  }
  await page.waitForFunction(() =>
    [...document.images].every(
      (image) => image.complete && image.naturalWidth > 0,
    ),
  );
  const imageChecks = await page.evaluate(async () => {
    await Promise.all([...document.images].map((image) => image.decode()));
    return [...document.images].map((image) => ({
      source: image.currentSrc || image.src,
      complete: image.complete,
      naturalWidth: image.naturalWidth,
    }));
  });
  assert.ok(
    imageChecks.every((image) => image.complete && image.naturalWidth > 0),
    'Every screenshot image must be loaded and decoded',
  );
  results.imageChecks ??= [];
  results.imageChecks.push({ screenshot: filename, images: imageChecks });
  await page.evaluate(async () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    await new Promise((resolve) =>
      window.requestAnimationFrame(() => window.requestAnimationFrame(resolve)),
    );
  });
  await page.screenshot({
    path: path.join(screenshotDir, filename),
    fullPage: true,
  });
  results.screenshots.push(path.join(screenshotDir, filename));
  const heroFilename = {
    'desktop-homepage.png': 'desktop-hero.png',
    'mobile-homepage.png': 'mobile-hero.png',
  }[filename];
  if (heroFilename) {
    await page.screenshot({
      path: path.join(screenshotDir, heroFilename),
      fullPage: false,
    });
    results.screenshots.push(path.join(screenshotDir, heroFilename));
  }
}

try {
  const context = await browser.newContext();
  const page = await context.newPage();
  let currentErrors = [];
  page.on('pageerror', (error) =>
    currentErrors.push(`Page error: ${error.message}`),
  );
  page.on('console', (message) => {
    if (message.type() === 'error')
      currentErrors.push(`Console: ${message.text()}`);
  });
  page.on('requestfailed', (request) => {
    currentErrors.push(
      `Request failed: ${request.url()} (${request.failure()?.errorText})`,
    );
  });
  page.on('response', (response) => {
    if (response.status() >= 400) {
      currentErrors.push(`HTTP ${response.status()}: ${response.url()}`);
    }
  });

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    for (const route of routes) {
      const label = `${route || 'home'} at ${viewport.width}px`;
      const result = { route: route || '/', viewport, checks: {}, errors: [] };
      results.pages.push(result);
      currentErrors = [];
      try {
        const response = await page.goto(new URL(route, baseUrl).href, {
          waitUntil: 'networkidle',
        });
        assert.equal(response?.status(), 200, 'Route must return HTTP 200');
        await page.evaluate(() => document.fonts.ready);
        result.checks.h1Count = await page.locator('h1').count();
        assert.equal(result.checks.h1Count, 1, 'Exactly one h1');
        result.checks.dimensions = await page.evaluate(() => ({
          viewport: window.innerWidth,
          document: document.documentElement.scrollWidth,
          body: document.body.scrollWidth,
        }));
        assert.ok(
          result.checks.dimensions.document <= viewport.width + 1 &&
            result.checks.dimensions.body <= viewport.width + 1,
          `Horizontal overflow: ${JSON.stringify(result.checks.dimensions)}`,
        );
        result.checks.githubLinks = await page
          .locator('a[href="https://github.com/jimmy00415"]')
          .count();
        assert.ok(
          result.checks.githubLinks >= 1,
          'Public GitHub action is present',
        );
        result.checks.canonical = await page
          .locator('link[rel="canonical"]')
          .getAttribute('href');
        const canonical = new URL(result.checks.canonical);
        assert.equal(
          canonical.pathname,
          new URL(route, baseUrl).pathname,
          'Canonical preserves project base and route',
        );
        if (viewport.width === 1440 || viewport.width === 375) {
          const audit = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
            .analyze();
          result.checks.axe = {
            passes: audit.passes.length,
            incomplete: audit.incomplete.map(({ id, nodes }) => ({
              id,
              nodes: nodes.length,
            })),
            violations: audit.violations.map(
              ({ id, impact, description, nodes }) => ({
                id,
                impact,
                description,
                nodes: nodes.map(({ target, failureSummary }) => ({
                  target,
                  failureSummary,
                })),
              }),
            ),
          };
          assert.equal(
            audit.violations.length,
            0,
            `Axe violations: ${audit.violations.map(({ id }) => id).join(', ')}`,
          );
        }
        if (!route && viewport.width === 1440)
          await screenshot(page, 'desktop-homepage.png');
        if (!route && viewport.width === 375)
          await screenshot(page, 'mobile-homepage.png');
        if (route === 'work/openclaw/' && viewport.width === 1440)
          await screenshot(page, 'openclaw-case.png');
        assert.deepEqual(
          currentErrors,
          [],
          'No browser errors or failing assets',
        );
      } catch (error) {
        result.errors.push(error.message);
        results.failures.push(`${label}: ${error.message}`);
      }
      result.errors.push(...currentErrors);
    }
  }

  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(baseUrl.href, { waitUntil: 'networkidle' });
  const summary = page.locator('.mobile-nav > summary');
  const menu = page.locator('.mobile-nav');
  await check('Mobile menu opens with Enter', async () => {
    assert.ok(await summary.isVisible());
    await summary.focus();
    await page.keyboard.press('Enter');
    assert.equal(await menu.evaluate((element) => element.open), true);
  });
  await check('Escape closes mobile menu and returns focus', async () => {
    await page.keyboard.press('Escape');
    assert.equal(await menu.evaluate((element) => element.open), false);
    assert.equal(
      await summary.evaluate((element) => element === document.activeElement),
      true,
    );
  });
  await check('Keyboard focus is visible', async () => {
    await summary.focus();
    const focus = await summary.evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        visible: element.matches(':focus-visible'),
        outline: style.outlineStyle,
        shadow: style.boxShadow,
      };
    });
    assert.ok(
      focus.visible && (focus.outline !== 'none' || focus.shadow !== 'none'),
      JSON.stringify(focus),
    );
  });
  await check(
    'Mobile Contact navigation reaches section and closes menu',
    async () => {
      await summary.focus();
      await page.keyboard.press('Enter');
      await page.locator('.mobile-nav a', { hasText: 'Contact' }).click();
      assert.equal(new URL(page.url()).hash, '#contact');
      assert.equal(await menu.evaluate((element) => element.open), false);
      assert.ok(await page.locator('#contact').isVisible());
    },
  );
  await check('Contact email action uses declared address', async () => {
    assert.equal(
      await page.locator('.email-link').getAttribute('href'),
      'mailto:22256024@life.hkbu.edu.hk',
    );
  });
  await check(
    'Contact links retain contrasting keyboard focus on the cobalt panel',
    async () => {
      await page.keyboard.press('Tab');
      for (const link of await page.locator('.contact-actions a').all()) {
        await link.focus();
        const colors = await link.evaluate((element) => ({
          outline: getComputedStyle(element).outlineColor,
          background: getComputedStyle(
            document.querySelector('.contact-section'),
          ).backgroundColor,
          visible: element.matches(':focus-visible'),
        }));
        assert.equal(colors.visible, true);
        assert.notEqual(
          colors.outline,
          colors.background,
          'Focus outline must contrast with the contact panel',
        );
      }
    },
  );
  await check('Work action navigates to selected work', async () => {
    await page.goto(baseUrl.href, { waitUntil: 'networkidle' });
    await page.getByRole('link', { name: 'View selected work' }).click();
    assert.equal(new URL(page.url()).hash, '#work');
    assert.ok(await page.locator('#work').isVisible());
  });
  await check('Skip link is keyboard reachable', async () => {
    await page.goto(baseUrl.href, { waitUntil: 'networkidle' });
    await page.keyboard.press('Tab');
    assert.equal(
      await page
        .locator('.skip-link')
        .evaluate((element) => element === document.activeElement),
      true,
    );
    await page.keyboard.press('Enter');
    assert.equal(new URL(page.url()).hash, '#main');
  });
  await check(
    'Protocol illustration supports keyboard disclosure',
    async () => {
      await page.goto(new URL('work/openclaw/', baseUrl).href, {
        waitUntil: 'networkidle',
      });
      const details = page.locator('.protocol-comparison details');
      assert.equal(await details.count(), 2);
      for (let index = 0; index < 2; index++) {
        const item = details.nth(index);
        const wasOpen = await item.evaluate((element) => element.open);
        await item.locator('summary').focus();
        await page.keyboard.press('Enter');
        assert.equal(await item.evaluate((element) => element.open), !wasOpen);
        await page.keyboard.press('Enter');
        assert.equal(await item.evaluate((element) => element.open), wasOpen);
        assert.match(await item.textContent(), /callmw2u3tq3/);
      }
    },
  );
  await check(
    'Reduced motion preference disables persistent motion',
    async () => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(baseUrl.href, { waitUntil: 'networkidle' });
      const motion = await page.evaluate(() => ({
        reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        scroll: getComputedStyle(document.documentElement).scrollBehavior,
        activeAnimations: document
          .getAnimations()
          .filter((animation) => animation.playState === 'running').length,
      }));
      assert.equal(motion.reduced, true);
      assert.notEqual(motion.scroll, 'smooth');
      assert.equal(motion.activeAnimations, 0);
    },
  );

  const noJsContext = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 812 },
  });
  const noJsPage = await noJsContext.newPage();
  await check(
    'Without JavaScript, mobile disclosure and contact remain usable',
    async () => {
      await noJsPage.goto(baseUrl.href, { waitUntil: 'networkidle' });
      const noJsSummary = noJsPage.locator('.mobile-nav > summary');
      await noJsSummary.focus();
      await noJsPage.keyboard.press('Enter');
      assert.equal(
        await noJsPage.locator('.mobile-nav').getAttribute('open'),
        '',
      );
      const contact = noJsPage.locator('.mobile-nav a', { hasText: 'Contact' });
      assert.ok(await contact.isVisible());
      await contact.click();
      assert.equal(new URL(noJsPage.url()).hash, '#contact');
      assert.equal(
        await noJsPage.locator('.email-link').getAttribute('href'),
        'mailto:22256024@life.hkbu.edu.hk',
      );
    },
  );
  await noJsContext.close();
  await context.close();
} finally {
  await browser.close();
  results.finishedAt = new Date().toISOString();
  await writeFile(reportPath, `${JSON.stringify(results, null, 2)}\n`);
}

console.log(`Browser: ${results.browser}`);
console.log(
  `Checked ${results.pages.length} route/viewport combinations, 10 WCAG audits, and ${results.interactions.length} interaction checks.`,
);
console.log(`Screenshots: ${screenshotDir}`);
console.log(`Report: ${reportPath}`);
if (results.failures.length) console.error(results.failures.join('\n'));
assert.equal(
  results.failures.length,
  0,
  `${results.failures.length} browser checks failed`,
);
console.log('All browser checks passed.');
