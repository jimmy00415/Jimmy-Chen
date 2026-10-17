# Release verification — 17 October 2026

This records the initial portfolio release. The owner subsequently requested a personal homepage redesign; see [current redesign and verification](personal-homepage-redesign.md). Lighthouse/axe measurements below belong to the initial release, not the redesigned homepage.

Local production build, served at `http://127.0.0.1:4321/Jimmy-Chen/`. Tests used installed Google Chrome headless on Windows, not a real mobile handset.

## Actual checks

- `npm run verify`: strict Astro/TypeScript check, ESLint, Prettier, production build, five static-output tests. Passed with zero Astro errors/warnings/hints.
- `npm run test:browser`: 20 combinations of five substantive routes and 320/375/768/1440px widths. All passed; no horizontal overflow, browser console errors, missing assets, or route failures.
- Ten axe WCAG 2A/AA and 2.1AA audits across desktop/mobile content routes: zero violations.
- Eleven browser interaction checks: mobile keyboard menu and Escape focus, visible focus (including the cobalt Contact panel), contact/selected-work navigation, declared mailto action, skip link, protocol disclosures, reduced motion, and no-JavaScript mobile menu/contact. All passed.
- Every generated internal link, anchor, image and stylesheet checked against built files under the real GitHub Pages base path.
- `npm audit`: zero known vulnerabilities in the final locked dependency tree.
- Mobile Lighthouse 13.5.0, local production preview with default simulated mobile throttling: Performance 100, Accessibility 100, Best Practices 100, SEO 100. FCP 1.1s; LCP 1.1s; CLS 0.002. This is a local lab measurement, not real-user performance or a guarantee.

## Visual and factual review

Opened and reviewed desktop/mobile full homepage captures and the OpenClaw case, plus desktop/mobile viewport captures. The capture helper scrolls the page, checks and decodes all images, and returns to the top before capture, so the lazy portrait is included. Artifacts and raw JSON/Lighthouse reports stay in `.local/` and are not published.

Independent code review found a Contact focus outline matching its background. A targeted browser test reproduced identical outline/background RGB values; the fix uses a white outline and passed both the targeted regression and the full browser suite. Corrected a synthetic protocol illustration to preserve the PR’s actual two call/result associations. Adjusted the research narrative to match the diagram’s scope.

Public evidence was checked separately from implementation: OpenClaw live merge metadata/PR, Simplify company/leadership/product pages and direct product destinations, movie README, and CareMate README/public prototype. Research counts remain a dated owner-reported milestone; broader internship work remains CV-declared. No research-code URL, movie live deployment, traction, completed HKUST degree, attendance dates, or quantitative performance was invented.

The source CV was inspected and left unchanged. It is excluded from Git/build/public downloads because it contains phone/GPA details and planned HKUST dates that conflict with the brief’s public release rules. No fabricated replacement download was added. The complete original brief and internal source map also remain local.

## Hosted deployment

Published to <https://jimmy00415.github.io/Jimmy-Chen/>. Source is on `main`; the compiled release is `gh-pages` commit `ee150c3a9f9cb3495b6aab1a6b6c3b2288403d48`. GitHub’s [Pages build and deployment](https://github.com/jimmy00415/Jimmy-Chen/actions/runs/38934130557) succeeded and the Pages API reports `built`.

Direct hosted HTTP checks passed for the homepage, all four detail routes, both sitemap files, robots, favicon and PNG social image (HTTP 200). An unknown project path returned HTTP 404 with the custom “Page not found” content. No domain, repository visibility, paid infrastructure, or access permissions changed.

After GitHub reported the deployment built, the complete browser suite was rerun with `SITE_URL=https://jimmy00415.github.io/Jimmy-Chen/`: all 20 route/viewport combinations, ten accessibility audits, and eleven interaction checks passed with zero failures. Final screenshots were captured from this hosted release and opened for review. No unresolved implementation or deployment blockers remain; the deliberate CV omission above is the only withheld downloadable asset.
