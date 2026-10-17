import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { load } from 'cheerio';

const root = path.resolve('dist');
const base = '/Jimmy-Chen/';
const routes = [
  '',
  'work/openclaw/',
  'work/simplify/',
  'work/movie-intelligence/',
  'research/personal-ai-memory/',
];
const html = (route) => readFile(path.join(root, route, 'index.html'), 'utf8');

test('homepage presents Jimmy as a person and links companies and schools', async () => {
  const $ = load(await html(''));
  assert.equal($('h1').text().replace(/\s+/g, ' ').trim(), 'Jimmy Chen');
  assert.ok($('#about h2').text().includes('Biography'));
  assert.ok($('#journey h2').text().includes('Experience'));
  for (const name of [
    'Simplify',
    'Climind',
    'Hong Kong Baptist University',
    'Hong Kong University of Science and Technology',
  ]) {
    const entry = $('[data-institution]').filter(
      (_, element) => $(element).attr('data-institution') === name,
    );
    assert.ok(entry.length, name);
    assert.ok(
      entry.find('a[href^="https://"]').length,
      `Institution link missing: ${name}`,
    );
  }
  assert.equal(
    $('.hero-index, .evidence-strip, .work-list .work-visual').length,
    0,
  );
});

test('all substantive routes have semantic content and real canonical URLs', async () => {
  for (const route of routes) {
    const $ = load(await html(route));
    assert.equal($('h1').length, 1, route);
    assert.equal($('main').length, 1, route);
    assert.ok($('main').text().trim().length > 1000, route);
    assert.equal(
      $('link[rel=canonical]').attr('href'),
      `https://jimmy00415.github.io${base}${route}`,
    );
    assert.ok($('meta[name=description]').attr('content').length > 40);
    assert.ok(
      $('meta[property="og:image"]')
        .attr('content')
        .startsWith(`https://jimmy00415.github.io${base}`),
    );
    assert.equal($('img:not([width]):not([height])').length, 0);
  }
});

test('every internal link, anchor and public asset resolves under the GitHub Pages base', async () => {
  for (const route of routes) {
    const $ = load(await html(route));
    for (const element of $('[href], [src]').toArray()) {
      const target = $(element).attr('href') ?? $(element).attr('src');
      if (!target || /^(https?:|mailto:|data:)/.test(target)) continue;
      const url = new URL(
        target,
        `https://jimmy00415.github.io${base}${route}`,
      );
      assert.ok(url.pathname.startsWith(base), `${route}: ${target}`);
      const relative = decodeURIComponent(url.pathname.slice(base.length));
      const file = path.join(
        root,
        relative.endsWith('/') || !path.extname(relative)
          ? `${relative}/index.html`
          : relative,
      );
      const content = await readFile(file, 'utf8');
      if (url.hash)
        assert.ok(load(content)(`[id="${url.hash.slice(1)}"]`).length, target);
    }
  }
});

test('publication boundaries and contact survive the build', async () => {
  const homepage = await html('');
  const $ = load(homepage);
  assert.match($.text(), /withdrew to pursue entrepreneurship/);
  assert.match($.text(), /Degree not completed/);
  assert.match($.text(), /expected June 2027/);
  assert.equal($('a[href="mailto:22256024@life.hkbu.edu.hk"]').length, 1);
  assert.equal($('a[download], a[href$=".pdf"]').length, 0);
  assert.equal($('[data-work]').length, 4);
  for (const route of routes) {
    const text = load(await html(route)).text();
    assert.doesNotMatch(
      text,
      /2026\s*[–-]\s*2028|700,000|700000|HKD 10M|student ID|GPA|Sharpe|state.of.the.art/i,
    );
    assert.doesNotMatch(text, /TODO|TBD|coming soon|lorem ipsum/i);
  }
});

test('robots, sitemap, social image and 404 are deployable; private dossiers are absent', async () => {
  assert.match(
    await readFile(path.join(root, 'robots.txt'), 'utf8'),
    /Jimmy-Chen\/sitemap-index.xml/,
  );
  assert.match(
    await readFile(path.join(root, 'sitemap-0.xml'), 'utf8'),
    /Jimmy-Chen\/work\/openclaw\//,
  );
  assert.match(
    await readFile(path.join(root, '404.html'), 'utf8'),
    /Page not found/,
  );
  async function scan(dir) {
    for (const file of await readdir(dir, { withFileTypes: true })) {
      assert.doesNotMatch(
        file.name,
        /^CHEN_Yiwei_CV|Coding_Agent_Prompt|content-sources|\.pdf$/i,
      );
      if (file.isDirectory()) await scan(path.join(dir, file.name));
    }
  }
  await scan(root);
});

test('the protocol illustration preserves both documented call/result associations', async () => {
  const $ = load(await html('work/openclaw/'));
  const before = $('.protocol-comparison details').first().text();
  const after = $('.protocol-comparison details').last().text();
  for (const version of [before, after]) {
    for (const item of [
      'callmw2u3tq3',
      'calllu52e2fv',
      'notes.txt',
      'readme.md',
      'amber-17',
      'violet-29',
    ]) {
      assert.ok(
        version.includes(item),
        `Missing documented association: ${item}`,
      );
    }
  }
});
