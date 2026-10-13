# Repository review and site improvement plan

**Reviewed:** October 13, 2026
**Status:** Core content, access-navigation, and site-discovery improvements have been implemented on the feature branch; the separate research-summary refresh remains deferred. Changes are not committed, pushed, or deployed.
**Scope:** Repository content, Astro source and configuration, local generated output, selected live routes and mobile layout, and targeted official-source research. This is an editorial/product review, not a clinical, legal, accessibility-conformance, or full external-link audit.

## Executive summary

The repository has a solid and unusually careful foundation: Markdown remains the content source of truth; parents can navigate by concern; the site has a canonical urgent-help guide, care-preparation and print resources, professional-role caveats, and extensive safeguards around dignity, safe foods, swallowing, medication, privacy, and uncertainty. The static Astro implementation is small and builds cleanly.

The implementation prioritized **content integrity, practical care navigation, and site discovery**, rather than broad article expansion:

1. **Fix source and safety-link integrity** in existing ARFID/feeding and cross-cutting pages before adding material.
2. **Make the concern-first route more prominent** from the homepage and clarify the “waiting for care” handoff without creating a duplicate guide.
3. **Make school-meal navigation more actionable** by updating existing school pages and separating day-to-day participation, education/disability evaluation, school health and swallowing safety, and school-meal-program questions.
4. **Add one high-value U.S. family-navigation resource** and a usable access checklist to existing pages.
5. **Improve generated-site discovery and navigation reliability**: add a real not-found route, sitemap/robots support, and per-page canonical/description metadata; verify exact behavior at deployment.
6. **Make source freshness visible and maintainable** with a small editorial convention; the broader research-summary refresh remains a follow-up.

The sections below record findings, implemented changes, and the deferred research-summary refresh. Do not treat this plan as health, school-law, or individualized-care advice.

## Review method and verified state

- Read the repository instructions, `DISCLAIMER.md`, `CONTRIBUTING.md`, README, package scripts, source files, representative parent-facing Markdown, and resource pages.
- Checked branch and status before review. The plan file was already untracked and was retained in place. Implementation is on `feature/site-improvement-plan`; nothing was staged, committed, pushed, or deployed.
- After the implementation changes, `npm run check` passed with 0 errors, warnings, or hints; `npm run build` generated 38 HTML documents and the sitemap/robots routes.
- The baseline generated HTML scan found 38 pages, each with a title and exactly one H1, and no unresolved local `href`/`src` targets; the baseline lacked sitemap, robots, and canonical tags.
- Live-site navigation and baseline browser observations were selective: the checked routes rendered, inspected images loaded, and tested narrow viewport had no horizontal overflow, but mobile navigation used several rows. Baseline browser navigation showed the homepage at the tested unknown and crawler paths. These are review-time observations, not current post-deployment verification.
- The review did not cover all external links, browser console/network errors, keyboard-only flows, screen readers, all breakpoints, custom-domain redirects, or Cloudflare configuration. Direct command-line requests to the live host were blocked during review, so HTTP redirect behavior was not independently verified.

## What is already working

### Content and editorial practice

- `docs/next-step.md` begins from the caregiver’s concern, not a presumed diagnosis, and points to urgent help, nutrition/growth, pain, swallowing, medication, school, services, and waiting-for-care pathways.
- `docs/safety/red-flags-and-urgent-help.md` separates emergency services, prompt clinician contact, and routine evaluation. It warns not to delay urgent care for logs and directs readers to preserve established safe foods and fluids.
- `docs/05-prepare-for-care.md` and `docs/tools/printable-parent-worksheets.md` offer observation and coordination tools without calorie scoring or diagnostic checklists.
- `docs/04-who-can-help.md` and `resources/provider-navigation.md` describe several professional roles and tell readers to verify pediatric experience, relevant feeding/swallowing skills, referral, cost, waitlists, age range, and location.
- Coverage is already broad: ADHD and ARFID introductions, medication/appetite/sleep, anxiety and overlap, gastrointestinal and dental pain, nutrition/hydration/growth, school, caregiver strain, trials, international resource paths, and educational videos. New work should connect and clarify these assets before creating parallel pages.
- The project rules are strong about source scope, local jurisdiction, practical-action prerequisites and stopping rules, privacy, and not turning general education into individualized treatment. Preserve them as acceptance criteria.

### Site and build

- Markdown under `docs/` and `resources/` is loaded at build time, with repository-relative Markdown links rewritten to public routes. The local build generated the existing content and preserved the tested internal paths.
- The live site has a skip link, named navigation landmarks, semantic headings, responsive card and video layouts, a visible educational disclaimer, and locally served decorative imagery with descriptive alt text on the pages checked.
- The project’s validated scripts are only `npm run check` and `npm run build`; no test, lint, or full link-check command is declared in `package.json`.

## Findings confirmed during the baseline review

### High priority: ARFID source mismatch and duplicate citation identifier

- The live site served the homepage for an unknown route and for `/sitemap.xml` and `/robots.txt`. A visitor can mistake a typo or stale link for a valid page, and crawlers have no verified sitemap/robots documents at those URLs.
- The local generated tree initially lacked dedicated `404.html`, `sitemap.xml`, `robots.txt`, and canonical link tags. These are now generated in static output and verified in local preview; Cloudflare Pages behavior still needs confirmation after an authorized deployment.
- `README.md` included a personal origin story and a child's age. That detail was not needed to explain the project and has been generalized during implementation, consistent with the repository’s public-content privacy rules.
- The homepage baseline emphasized “Start here” and urgent signs while the concern-led chooser was only in the header. The implementation now promotes “Find your next step” as the primary route, with urgent help visibly separate.
- The baseline mobile navigation wrapped across several rows at 390 px without horizontal overflow. This remains a usability consideration; any simplification should preserve keyboard, screen-reader, and no-JavaScript access.
- Several content pages are navigation aids and do not need a conventional Sources section, but every substantive claim still needs appropriate attribution. The review’s simple citation-ID scan found the duplicate in the food-exploration page; it was not a substitute for checking whether each cited source supports its exact claim.

**Resolved in this feature branch:** The ARFID overview's source mismatch and the food-exploration citation ambiguity were addressed; the pages in the baseline safety-link inventory received canonical escalation links; the homepage now prioritizes the concern-led route; and static not-found/crawler routes and per-page metadata were added. Build-output checks pass locally. Hosting behavior remains unverified until deployment is separately authorized.

### High priority: not-found and search-engine discovery

- The live site served the homepage for an unknown route and for `/sitemap.xml` and `/robots.txt`. A visitor can mistake a typo or stale link for a valid page, and crawlers have no verified sitemap/robots documents at those URLs.
- The local generated tree initially lacked dedicated `404.html`, `sitemap.xml`, `robots.txt`, and canonical link tags. These are now generated in static output and verified in local preview; Cloudflare Pages behavior still needs confirmation after an authorized deployment.
- Markdown page descriptions are derived from each page's first paragraph, stripped of markup/entities, and bounded to 155 characters. Review individual snippets for editorial quality when pages change.

### Medium priority: public information hygiene

- `README.md` included a personal origin story and a child's age. That detail was not needed to explain the project and has been generalized during implementation, consistent with the repository’s public-content privacy rules.
- Several content pages are navigation aids and do not need a conventional Sources section, but every substantive claim still needs appropriate attribution. The review’s simple citation-ID scan found the duplicate in the food-exploration page; it was not a substitute for checking whether each cited source supports its exact claim.

### Lower-priority usability opportunity: homepage route prominence

- The homepage baseline emphasized “Start here” and urgent signs while the concern-led chooser was only in the header. The implementation now promotes “Find your next step” as the primary route, with urgent help visibly separate.
- The baseline mobile navigation wrapped across several rows at 390 px without horizontal overflow. This remains a usability consideration; any simplification should preserve keyboard, screen-reader, and no-JavaScript access.

## Prioritized improvement plan

### Implementation status

- **Implemented:** Phase 0 source and safety-link corrections; Phase 1 waiting-for-care checklist and printable plus homepage route prominence; Phase 2 school and meal-program pathways; Phase 3 family-navigation resource and provider access checklist; Phase 4 resource link-check convention; and Phase 5 not-found, sitemap, robots, canonical metadata, and page descriptions.
- **Deferred:** Phase 6 research-summary refresh. The ARFID/feeding and school pages received updated, scoped sources, but the broader research summary and clinical-trial resource pages were not comprehensively re-audited in this implementation pass.
- **Not authorized/performed:** commit, push, deploy, or publish.

### Phase 0 — Implemented: source, citation, and safety links

**Scope:** Fix the ARFID source mismatch; repair the duplicate identifier in `docs/arfid/trying-new-foods.md`; review and add missing canonical red-flags links where applicable; check all cited source mappings on materially edited pages.

**Why first:** New content and new navigation built on an incorrect source map or missing safety route would amplify rather than solve existing content quality problems.

**Editorial constraints:** Fetch the primary/authoritative pages before drafting. Use ARFID-appropriate sources for ARFID claims and pediatric feeding/swallowing guidance for those domains; do not use ADHD sources or toddler picky-eating guidance as a substitute. Keep citation identifiers unique within each document. Distinguish professional guidance, consensus framework, research, and practical suggestion.

**Acceptance checks:** Each material claim maps to the source that supports it; identifiers are unique; source links resolve; the pages make no diagnostic inference; relevant eating, swallowing, hydration, growth, medication, and acute-distress routes point to the canonical red-flags page; citation-ledger verification and `git diff --check` pass.

### Phase 1 — Implemented: “next step” and waiting-for-care handoff

**Prefer updating:** `docs/next-step.md`, `docs/05-prepare-for-care.md`, `docs/safety/red-flags-and-urgent-help.md`, and the existing printable in `docs/tools/printable-parent-worksheets.md`.

Updated `docs/next-step.md` with a brief waiting-for-care handoff and printable link; added a care-coordination sheet with an optional child/young-person prompt and privacy/safety limits. The homepage now promotes “Find your next step” while retaining a distinct urgent-help route.

**Safety limits:** These are information and care-navigation aids, not treatment. The purpose is to reduce the burden of organizing a care conversation; scope is caregivers preparing for a child’s appointment or school discussion; prerequisites are none beyond being useful and manageable; stop using a log or worksheet if it delays urgent care, increases conflict/distress, or becomes burdensome; contact the child’s care team promptly if health, intake, hydration, growth, swallowing, or distress worsens. Do not ask families to change medication, supplements, nutrition products, tube feeds, diet, or treatment.

**Acceptance checks:** A caregiver can reach urgent help and a relevant first contact without identifying a diagnosis; the worksheet has print-friendly layout and privacy language; no individualized care plan is implied; emergency, prompt-contact, and routine paths remain distinct.

### Phase 2 — Implemented: U.S. school-meal and school-access pathways

**Prefer updating:** `docs/06-school-and-daily-life.md`, `resources/schools-and-access.md`, and relevant sections of `docs/tools/printable-parent-worksheets.md`; link from `docs/next-step.md`.

Revised `docs/06-school-and-daily-life.md` to distinguish participation supports, education evaluation, school health coordination, meal programs, and clinician-directed procedures, with U.S. and local-process limits and caregiver questions. Added current FNS SP 07-2025 guidance to `resources/schools-and-access.md` and identified SP 59-2016 as a dated memo.

**Evidence and limits:** The Department of Education’s IDEA evaluation regulation describes using a variety of tools and strategies and not using a single measure as the sole criterion; its scope is IDEA Part B evaluation, not a promise of school services for every child.[4] The Department’s Section 504 FAQ describes disability access obligations and case-by-case determinations; it is U.S. education information, not individualized legal advice.[5] ASHA’s professional portal covers pediatric feeding/swallowing through age 21 and discusses team roles and school-setting considerations; it is professional practice guidance, not a parent-specific legal determination.[1]

**Acceptance checks:** No guaranteed eligibility or accommodation claim; school supports are optional discussion examples and locally dependent; separate meal-program modifications from IDEA/504 evaluation and from medical feeding/swallowing plans; respect privacy/consent; include questions and a canonical red-flags link; all legal/program wording is checked against current primary sources at implementation time.

### Phase 3 — Implemented: access navigation without provider ratings

**Prefer updating:** `resources/additional-resources.md`, `resources/us.md`, and `resources/provider-navigation.md`.

Added Family Voices' F2F directory to U.S. navigation pages with role limits and local verification notes, plus a provider-access checklist in `resources/provider-navigation.md`. HRSA health-center and Medicaid/CHIP contacts remain separate routes with local-variation caveats.

**Acceptance checks:** Direct primary-source link; review date; U.S. scope; no implied endorsement; role limits stated; verify the state/territory link and current services before publication; no user accounts, intake forms, provider reviews, ratings, or collection of child health information.

### Phase 4 — Implemented: resource link-check convention

**Prefer updating:** Resource-page conventions in `CONTRIBUTING.md` and existing `resources/*.md` pages; do not create a parallel content database unless a real editorial need emerges.

**Suggested fields for externally maintained resources:** last link-checked date (not clinical review or endorsement), source type, geography, stated age range, access/referral notes, what the resource does and does not establish, direct source-owner link, and any important access caveat. Apply only to pages where these fields help caregivers; keep the hub short.

**Process:** Start with a manual review schedule or a small resource-review checklist. Prioritize crisis, government, school, and clinical-service links. Record inaccessible or changed links for human review; do not silently replace them based on search snippets. Avoid automatic scraping, provider ranking, social feeds, or data collection.

**Acceptance checks:** Dates are accurate and mean only what they say; claims are re-checked against the source itself; no dead or redirected link is described as verified; no resource is presented as endorsed or available everywhere.

### Phase 5 — Implemented: metadata and direct-route handling; accessibility QA remains limited

**Likely implementation touchpoints:** `src/layouts/SiteLayout.astro`, `src/pages/[...slug].astro`, `src/pages/index.astro`, Astro route/configuration, and a generated-output check.

Added static `404.html`, sitemap and robots endpoints, per-page canonicals, and derived descriptions. Local preview browser checks confirmed `/sitemap.xml` presents XML and `/404.html` is labeled and noindexed; HTTP probes confirmed local preview returns 404 for an unknown route. A generated-output script checked all 38 HTML documents and 37 sitemap URLs. At a 390px viewport, the tested ARFID overview route showed no document/body overflow. Keyboard, screen-reader, and comprehensive breakpoint review remain outstanding; this was not a full accessibility audit.

**Acceptance checks:** `npm run check` and `npm run build` pass; generated route count and content coverage are expected; sitemap and robots are valid and served correctly; unknown routes are clearly not found; every canonical URL matches its page; all local links/assets resolve; no child data is collected; manual keyboard/mobile checks are documented. Verify homepage, contact, safety, resources, printable, favicon, direct images, redirects, and representative mobile views after route or layout changes.

### Phase 6 — Refresh the research summary with explicit evidence labels

**Prefer updating:** `docs/research/what-the-research-says.md`, `docs/research/clinical-trials.md`, and the matching resource page.

**Ideas:**

- Keep official information/clinical guidance, consensus frameworks, peer-reviewed research, pilot studies, and trial registry records visibly distinct.
- For every study description, state age/population, design, sample/setting where supported, outcome source, and limitations; a registered trial is not proof of efficacy or current recruitment.
- Re-check study status directly in the registry and report results only from the published paper or registry results record.
- Preserve the existing distinction between ADHD guidance and limited ARFID treatment research. Do not turn an early pilot, a professional opinion, or a caregiver experience into a universal intervention recommendation.
- Provide a concise “what we still do not know” subsection and specific questions caregivers can take to a clinician.

**Acceptance checks:** Every load-bearing claim has a directly retrieved source with matching population and scope; ADHD and ARFID claims are not cross-supported; all identifiers are unique; dated source list and review date are current; clinician-directed care and safety boundaries remain clear.

## Suggested implementation order and ownership gates

1. Preserve Markdown as the editorial source of truth and maintain source-specific age, population, jurisdiction, and evidence boundaries.
2. Before further substantive content changes, run citation-ledger verification on all newly or materially changed sourced pages and review claim-to-source mapping directly.
3. Complete the deferred research-summary and clinical-trial-resource review with primary sources, clearly separating registries, clinical guidance, consensus, and trial results.
4. Complete keyboard-only, screen-reader, mobile-navigation, and breakpoint checks; do not characterize limited local checks as WCAG conformance.
5. After any authorized deployment, verify Cloudflare Pages behavior for an unknown route, crawler endpoints, canonical host/redirects, safety/resources/printable pages, favicon, and direct assets.
6. Run `npm run check`, `npm run build`, output/link/sitemap checks, local preview/browser checks, citation checks, `git diff --check`, privacy review, and full changed-file review after the final edit. These checks passed for the current implementation; rerun after any subsequent edit.
7. Keep changes uncommitted and unpublished until separately authorized; no deployment was requested or performed.

## Success measures

- A caregiver can choose an appropriate next route from the homepage without knowing a diagnosis.
- Urgent, prompt-contact, routine-follow-up, clinician access, school support, and research navigation are distinct and accurately described.
- A reader can distinguish school meal access, education evaluation, and clinician-directed feeding/swallowing safety planning.
- Family navigation resources have clear role limits and a current direct source.
- Every substantive ARFID/feeding claim uses relevant sources, every citation identifier is unique, and relevant topic pages link to canonical escalation guidance.
- A typo or obsolete URL does not silently masquerade as the homepage; sitemap and robots endpoints return their intended formats.
- Mobile and keyboard access are checked without adding unnecessary data collection or requiring JavaScript for core information.
- No private child details, records, user accounts, ratings, treatment plans, or unsupported claims are introduced.

## Review limits

This review is not a comprehensive clinical source audit, full-site external-link crawl, formal WCAG conformance assessment, legal review, or caregiver usability study. The local build and selected browser routes were verified; the current deployed Cloudflare settings and full HTTP redirect matrix were not. USDA’s current school-meal content and some government pages were inaccessible to the text extractor during the original review; later implementation checks retrieved current FNS guidance and identified the 2016 memo as dated. Re-open and verify current primary pages before using them in public-facing claims. Selected content and site behavior have been implemented; the broader research-summary refresh remains deferred.

## Sources checked for this plan

[1] [ASHA Pediatric Feeding and Swallowing Practice Portal](https://www.asha.org/practice-portal/clinical-topics/pediatric-feeding-and-swallowing) — professional practice guidance, scope infants through school-age children up to 21 years; not an intervention trial or individualized plan.

[2] [Goday et al., Pediatric Feeding Disorder: Consensus Definition and Conceptual Framework](https://pmc.ncbi.nlm.nih.gov/articles/PMC6314510/) — 2019 consensus framework; not evidence for a specific intervention.

[3] [HRSA MCHB: Family-to-Family Health Information Centers](https://mchb.hrsa.gov/programs-impact/programs/f2f-health-information-centers) — U.S. government program information; confirm local services.

[4] [U.S. Department of Education: IDEA §300.304](https://sites.ed.gov/idea/regs/b/d/300.304) — U.S. IDEA Part B regulation; not a guarantee of services.

[5] [U.S. Department of Education: Disability Discrimination FAQ](https://www.ed.gov/laws-and-policy/civil-rights-laws/disability-discrimination/frequently-asked-questions-disability-discrimination) — U.S. education guidance, not individualized legal advice.

[6] [USDA Food and Nutrition Service: SP 07-2025](https://www.fns.usda.gov/cn/requirement-accept-medical-statements-registered-dietitians) — current U.S. school-meal guidance page, updated February 24, 2026.

[7] [USDA Food and Nutrition Service: SP 59-2016](https://www.fns.usda.gov/cn/2016-modification-to-accomodate-disabilities-in-school-meals) — dated U.S. policy memo; read with later updates and regulations.

[8] [Family Voices: Find help in your community](https://familyvoices.org/affiliates/) — U.S. directory page; program coverage and services should be confirmed locally.

[9] [USDA Nutrition Evidence Systematic Review: Repeated exposure and food acceptance](https://nesr.usda.gov/2025-dietary-guidelines-advisory-committee-systematic-reviews/repeated-exposure_acceptance) — systematic review for birth to 6 years; evidence varies by age, food, and outcome and is not ARFID treatment research.
