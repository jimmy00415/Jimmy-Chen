# Jimmy Chen

Personal portfolio for **Jimmy Chen / CHEN Yiwei** — AI Engineer, Startup Founder, and Agent Systems Researcher.

Static Astro + TypeScript personal homepage. A name-led introduction, biography, authentic institution logos and official links, experience timeline, education, research and four substantive case studies. System fonts and an optimized owner-supplied portrait. No tracking or backend.

## Run and verify

Requires Node.js 22.22 or newer (Node 24 LTS recommended) and npm. Dependencies are locked.

```sh
npm ci
npm run dev
```

The app uses its real project-site base path: `http://localhost:4321/Jimmy-Chen/`.

```sh
npm run verify
npm run preview -- --port 4321
```

`verify` runs strict Astro/TypeScript checking, ESLint on verification scripts, project-wide Prettier checks, a production build, and static-output tests. In another terminal:

```sh
npm run test:browser
```

The browser runner uses installed Chrome or Playwright Chromium (`npx playwright install chromium` if neither is present). It tests all five content routes at 320, 375, 768, and 1440px; ten WCAG axe audits; keyboard, contact, protocol disclosures, reduced motion, and no-JS mobile navigation. It scrolls to load all images before saving reviewed screenshots and JSON results under `.local/`. `SITE_URL` can point it at the published site.

## Content

- `src/data/profile.ts`: identity, supporting projects, background, recognition.
- `src/data/institutions.ts`: featured employer/school roles, official destinations and logo paths.
- `src/data/cases.ts`: typed case studies, roles, status, evidence, and limits.
- `src/layouts/CaseStudy.astro`: shared narrative layout and source references.
- `src/components/WorkVisual.astro`: original explanatory illustrations, not product screenshots.
- `src/components/ProtocolDemo.astro`: accessible synthetic illustration based on the OpenClaw PR’s two-read example.
- `src/styles/global.css`: complete desktop/mobile visual system and focus/reduced-motion behavior.
- `src/styles/personal.css`: personal homepage layout, biography, timeline, institution rows and responsive styles.
- `public/logos/SOURCES.md`: provenance for authentic official institution assets.

The original brief, CV, source-review notes, and test artifacts stay local and are ignored by Git. The original PDF is intentionally not downloadable: it includes phone/GPA details and planned education dates outside the brief’s public release rules. A future CV must be reviewed before being placed in `public/`. No replacement CV was generated.

The local-only content-source map is `.local/content-sources.md`; public sources are linked from the case studies. Claims must retain their owner role, evidence type, applicable date, and limits when edited. Research test counts are historical project records, not website tests. Employer work must remain distinct from the public RAG slice. Product status was checked on 17 October 2026.

## GitHub Pages deployment

Target repository: <https://github.com/jimmy00415/Jimmy-Chen>. The configured URL is <https://jimmy00415.github.io/Jimmy-Chen/>. `astro.config.mjs` sets the origin and base path; `localUrl()` applies that base to internal links and assets. Routes are static directories with trailing slashes, including deep links. `404.html`, robots, sitemap and PNG social metadata are included.

Source is on `main`; compiled output is on `gh-pages`. GitHub Pages uses the `gh-pages` root as its source. Publication was explicitly authorized for this release. Future deployment requires the repository owner’s authorization and authenticated Git access:

```sh
npm run deploy
```

This verifies and builds locally, then commits only `dist/` to `gh-pages` using the existing `origin`. It needs no workflow-edit token scope, paid infrastructure, custom domain, repository visibility change or secrets. Do not publish the workspace directly. Confirm the Pages build completes and check the actual URL after publishing. There is deliberately no automatic production deployment on source pushes.

To regenerate the social image after editing its SVG source:

```sh
node scripts/social-card.mjs
```
