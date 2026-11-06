# HuLaX Studio / The Making Of — Creative Makeover Checklist

**Identity:** an open design journal / editorial contact sheet, not another product dashboard or a copy of the profile constellation.

**Question:** Can a visitor understand not only *what* Rahul built, but also **how the web experience was put together and where its engineering boundaries lie**?

Checked items record source-level changes and verified file presence. **No box here should be interpreted as evidence that the latest production build passed.**

## Concept and visual identity

- [x] Audit actual portfolio package, homepage, layout, project case studies, Three.js background, season themes, content service and chat endpoints.
- [x] Confirm framework versions from package.json: Next.js 16 and React 19 (not the old README's Next.js 15).
- [x] Build original animated [Studio Contact Sheet](../public/studio/studio-contact-sheet.svg): typography, motion, content and model-response studies.
- [x] Build original editorial [Exploded System Map](../public/studio/exploded-system.svg) reflecting actual source-level integrations.
- [x] Create [The Making Of](../src/app/studio/page.jsx) page as a responsive editorial field journal, not a résumé duplicate.
- [x] Give that page custom [studio styles](../src/app/studio/studio.module.css) and reduced-motion handling.
- [x] Add a direct entry point from the homepage [Projects section](../src/components/Work.jsx), beside the existing constellation link.
- [x] Replace the GitHub README's generic badges and unrelated stock GIF with a bespoke studio story.
- [x] Correct the README's old MSc pursuit wording and LinkedIn link.

## Four project worlds, four original visuals

- [x] Copy the original Sentinance hero into [the portfolio project assets](../public/projects/sentinance-signal-atlas.svg).
- [x] Copy the original GraphGuard hero into [the portfolio project assets](../public/projects/graphguard-evidence-graph.svg).
- [x] Copy the original FleetFlow hero into [the portfolio project assets](../public/projects/fleetflow-dispatch-atlas.svg).
- [x] Keep [the original Shiftify illustration](../public/projects/shiftify-music-passport.svg).
- [x] Enable the four individual case-study pages to show original artwork with labels saying conceptual, not screenshots.
- [x] Replace unsubstantiated case-study performance figures and overstated automatic integrations with grounded module/architecture claims.

## Source honesty and polish

- [x] Update canonical metadata and Open Graph URL to https://portfolio.hulax.uk/ and remove obsolete Next.js 15 wording.
- [x] Fix the secondary AI-action prompt's incorrect person name.
- [x] Remove unrelated "Vogue runway" sample questions and false "VECTOR STORE ONLINE" terminal logs.
- [x] Explain that the API chat uses configured providers and a curated knowledge base; no vector RAG system is established by that endpoint.
- [x] Keep Sanity and GitHub metadata marked as optional/external rather than guaranteed live.
- [ ] Audit all older résumé, work-history and dissertation performance statements against documentary evidence before using them as verified statistics.
- [ ] Review bundled audio track and image licensing before treating all public assets as reusable.

## Technical validation still open

- [ ] Run a clean npm ci, lint and Next.js production build; GitHub integration cannot execute these.
- [ ] Verify the /studio route and all four /case/* routes in the deployed environment.
- [ ] Check responsive mobile and desktop rendering, high contrast, keyboard focus and reduced-motion behaviour.
- [ ] Run a real browser check for link navigation, overlays and the global 3D background.
- [ ] Benchmark 3D rendering and animation on less powerful devices.
- [ ] Test AI chat with and without provider keys, including errors and response privacy boundaries.
- [ ] Check Analytics and Speed Insights data on the actual deployed site, without inventing scores.
- [ ] Review current CI/workflow status and preserve reproducible build evidence.

## File and link verification

- [x] Confirm all **13 distinct local README targets**, the Studio route/style and all four case-study artwork files exist on master.
- [x] Validate both original studio SVGs for basic element nesting, duplicate IDs and accessible title/description metadata.
- [x] Check **36 Studio page CSS module classes**, confirm all referenced classes exist, and verify all 9 checklist-relative links resolve on master.
- [ ] Verify external demo domains and URLs independently; source links existing does not prove a hosted demo works.

**Status:** Presentation and content refresh committed. Deployment, build, runtime accessibility and performance validation remain open.

[Back to HuLaX master makeover tracker](https://github.com/HuLaxx/HuLaxx/blob/main/REPO_MAKEOVER_TRACKER.md).
