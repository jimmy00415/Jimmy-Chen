# Jimmy Chen personal website implementation plan

**Goal:** Ship an evidence-led personal portfolio to the existing public Jimmy-Chen repository and GitHub Pages, as explicitly requested on 17 October 2026.

**Spec:** The complete owner-supplied Jimmy_Chen_Personal_Website_Coding_Agent_Prompt.md, read before editing. The original brief and CV stay local and are excluded from Git and public build output.

**Architecture:** A static Astro + TypeScript site with typed, publication-approved content, reusable semantic layouts, locally hosted fonts, native navigation, and small progressive enhancements. No server, analytics, model calls, or account system. Base path /Jimmy-Chen/ and canonical origin https://jimmy00415.github.io.

**Design:** Warm paper, ink, cobalt; Manrope headlines/body and system monospace metadata. A two-column editorial hero, linked evidence strip, four numbered feature rows with original code-native technical illustrations, quiet supporting projects, a research statement, portrait/background, and direct contact. Detail pages provide readable technical narratives and explicit evidence/limits. An illustrated protocol comparison uses native keyboard-accessible disclosure controls.

**Execution:** Implement in this otherwise empty workspace. Owner explicitly requests independent reversible decisions and implementation without stopping for further design approval. Source verification and CV review run independently; one final reviewer checks implementation.

## Tasks

- [ ] 1. Establish Astro, compatible locked dependencies, strict type checks, formatting/lint commands, and targeted static-output tests. Run tests before route implementation to establish failure.
- [ ] 2. Build shared header/footer/SEO, base-aware URL helpers, homepage, four detail routes, semantic illustrations, 404, sitemap, robots, and optimized supplied portrait. Every case identifies role, status, contribution, evidence, and limitations.
- [ ] 3. Reconcile independently checked sources into the public content and local-only source map. Include the original CV download only if suitable for public release; otherwise explain omission in handoff. Never publish private source material.
- [ ] 4. Run formatting, lint, type checks, static tests and production build. Serve production output under the real base path; browser-test 320/375/768/1440 widths, every route/link/anchor, keyboard, reduced motion, no-JS navigation, missing assets and accessibility. Capture and open desktop/mobile/case screenshots. Run local Lighthouse if available.
- [ ] 5. Get independent code/content review, fix material findings, repeat affected checks. Commit source to main; publish dist to gh-pages; enable GitHub Pages using that branch if necessary. Verify the real URL and deep routes before reporting deployment.

## Review focus

- GitHub project base path must apply to all assets, navigation, canonicals and sitemap entries, including 404.
- Navigation must work at narrow widths, with keyboard and without JavaScript.
- Research scale must describe events/prediction points, not impact or users; no completed HKUST degree.
- HTML/bundles must exclude original CV/brief/private notes; downloads only when real and publication-appropriate.
- Published source/data must separate founder responsibilities, team products, contribution collaboration and CV claims.

## Initial inspection

Repository is public and empty (GitHub API and git ls-remote); workspace contained only the supplied brief. No AGENTS.md in workspace or relevant parent directories, no routes, assets, manifests, lockfiles, checks or deployment configuration. GitHub CLI is authenticated as repository owner. No Pages site currently configured. Fresh project needs no additional worktree.
