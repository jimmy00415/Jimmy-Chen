# Personal homepage redesign — 17 October 2026

The owner explicitly rejected the initial editorial portfolio and selected <https://alfredyao.github.io/> as the reference for a personal webpage. This direction supersedes the initial visual plan; the original brief’s factual and attribution constraints still apply.

## Implementation

- Lead with Jimmy Chen’s name, public identity, current founder role, and direct links.
- Replace the oversized slogan, evidence strip, and large project illustrations on the homepage with Biography, Experience, Education, Research interests, Selected work, Recognition and Contact.
- Use the reference’s quiet light canvas, centered section titles, readable biography, soft white panels, and career timeline. Keep the owner’s real portrait and original content; no reference-site identity, writing, employment claims, publications or assets copied.
- Add authentic official logos and clickable official destinations for Simplify, Motion Expert, Climind, HKBU Mathematics, HKBU and HKUST. Sources are recorded in `public/logos/SOURCES.md`.
- Keep four substantive detail pages, accurate founder/contributor roles, unfinished-degree wording, and ongoing-research status.
- Keep the existing Astro/TypeScript/static GitHub Pages deployment.

## Source boundaries

Company and university URLs and logo assets were individually verified. Shanghai Guangluo has no unambiguous official source; its existing data remains preserved but it is not featured in the selected timeline. No guessed institution link or replacement logo was created. No CV or private notes added to public output.

## Verification

`npm run verify` passes six static-output tests, Astro checks, lint/format, and production build. The added regression checks that the homepage begins with the person’s name, displays Biography/Experience, links the featured institutions, and removes the previous portfolio hero components.

Browser inspection uses the Codex in-app browser for this revision. Previous release Lighthouse/axe results in `verification.md` are historical and are not presented as measurements of this new design. Current visual and interaction checks are recorded after final review and deployment.

Twenty in-app browser route/viewport checks passed across all five content pages at 1440, 768, 375 and 320px: correct headings, no horizontal overflow or broken loaded images. Desktop and mobile homepage, experience and education states were visually reviewed. Keyboard menu open/Escape/focus return, Journey navigation/menu closure, mailto destination, inline link cues and case-study anchor clearance were checked. The case TOC now remains at 95px beneath the 76px header; the tested target heading lands below the header. Six static tests pass, including every built internal link/anchor and public asset.

Independent review identified the sticky-header anchor clearance and missing inline-link underlines. Both were reproduced, fixed and checked in the in-app browser. Logo paths use local authentic assets, not hotlinks. The compact HKBU mark is the official 96px favicon; the original full university wordmark is retained with its provenance.
