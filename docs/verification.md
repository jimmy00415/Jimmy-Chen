# Release verification — 17 October 2026

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

Deployment verification is recorded in the delivery message after the real Pages build and URL checks; this document does not infer deployment from a successful local build.
