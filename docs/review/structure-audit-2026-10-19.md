# hello-react Documentation Structure Audit (2026-10-19)

Scope: read-only verification of the repository's documentation, VitePress navigation, and the available link-audit results. This round only adds this report; no existing documentation or configuration was adjusted. The counting basis is Markdown under `docs/` (including `SUMMARY.md`, though the directory table lists only first-level topic directories); line counts are measured as the physical lines of the current files. The repository also has a `src/` documentation tree, recorded here as a duplicate-maintenance risk.

## Quantitative Facts

### First-level Topic Directories Under `docs/`

| Directory | Markdown files | Total lines |
|---|---:|---:|
| api | 16 | 3,133 |
| architecture | 16 | 2,152 |
| basics | 28 | 4,670 |
| build-tools | 14 | 2,326 |
| ecosystem | 18 | 2,799 |
| future | 6 | 1,296 |
| projects | 11 | 1,842 |
| source-code | 14 | 1,252 |
| typescript-react | 27 | 5,214 |
| **Topic directory total** | **150** | **24,684** |

There are also 5 root-level Markdown files under `docs/`: `index.md` (37 lines), `glossary.md` (400), `knowledge.md` (278), `timeline.md` (36), `SUMMARY.md` (156). So `docs/` as a whole contains 155 Markdown files and 25,591 lines; excluding the page content in `SUMMARY.md` that is 154 Markdown files and 25,435 lines. Basis: the file lists and line counts per directory; `docs/SUMMARY.md` is explicitly excluded from the build by `docs/.vitepress/config.mts:13-14`.

### Current Organizational Axes

Counted by "how a reader finds content", this comes to **5 parallel organizational axes**; the first four are the primary navigation modes, and the fifth is an appendix-style collection mode.

| Organizational axis | Entries | Naming / organization pattern | Numbered? | Numbering continuity |
|---|---:|---|---|---|
| Topic directories | 9 first-level directories, 150 Markdown files | `basics`, `typescript-react`, `architecture` and so on are split by knowledge domain, with filenames mostly English lowercase kebab-case | No numeric prefixes in file paths | Not applicable |
| Chapter / course sequence | 8 parts, 23 chapters; 153 total sidebar links (including root-level navigation and appendices) | `docs/.vitepress/sidebar.json` organizes by "Part N / Chapter N", with links landing in topic directory files | Yes — numbering lives in sidebar labels and chapter titles, not in filenames | Chapters 1–23 are continuous with no duplicates or gaps; some chapter names/linked files reappear in the README and at the top of body text |
| API reference | 16 pages in `api/` | React API concepts are split into standalone reference pages, with `README.md` as the aggregation page | No numbering within the directory | Not applicable |
| Source code / implementation topics | 14 pages in `source-code/` | Split by internal mechanism, with `README.md` as the aggregation page | No numbering within the directory | Not applicable |
| Guides, timeline, and unchaptered topics | 4 root-level pages (excluding SUMMARY); 6 pages in `future/` | `index`, `knowledge`, `glossary`, `timeline` provide entry points / cross-cutting material; `future` is collected under the sidebar's "Appendix · Not in the TOC" | No chapter numbering | Not applicable; the 5 appendix content pages are concentrated in a single directory |

**Counting note:** 153 is the total number of `link` entries in `sidebar.json`, with no duplicates; it includes root-level sidebar links, chapter pages, regular content pages, and the future topics. The labels for the 23 chapters live at `docs/.vitepress/sidebar.json:16-658`, with sequential numbering.

## Problem List with Evidence

### 1. Organizational Complexity and Cross-cutting Content Attribution (Severity: Medium)

- Evidence: the nine topic directories hold the physical files, but the 23-chapter sequence also spans directories — see `docs/.vitepress/sidebar.json:16-658`; for example Chapters 13–15 live in `source-code/`, and Chapters 20–21 in `api/`.
- Judgment: it is a dual index of "content stored by topic, reading advancing by course", which does not mean the file structure itself is disorderly; the directory axis and the chapter axis can mostly explain each other. A new reader looking only at the directories will not see the course order, and a maintainer reorganizing by chapter alone may break stable URLs. The issue is medium severity; the core problem is that the navigation model needs to be stated explicitly.

### 2. A Single Topic Spanning Multiple Topic Directories (Severity: Medium)

- Hooks / state: `docs/architecture/hooks-deep-dive.md`, `docs/architecture/use-state.md`, `docs/source-code/hooks-source.md`, `docs/source-code/use-state-effect.md`, `docs/api/hooks-api.md`, `docs/ecosystem/context-reducer.md`.
- React Router / ecosystem: `docs/ecosystem/react-router.md`, `docs/ecosystem/react-router-setup.md`, `docs/projects/react-ecosystem.md`.
- SSR / Next.js: `docs/ecosystem/ssr.md`, `docs/ecosystem/nextjs.md`, `docs/projects/nextjs-overview.md`.
- Testing: `docs/ecosystem/testing.md`, `docs/ecosystem/testing-tools.md`, `docs/projects/testing-tools.md`.
- Judgment: these paths have legitimate "concept / implementation / API / project" perspective differences, but the directory pages or cross-links need clear boundaries to avoid duplicating and expanding the same content. I have not yet compared content duplication page by page, so whether it is substantively duplicated is unverified.

### 3. Two Physical Documentation Trees Coexisting (Severity: High)

- Evidence: both `docs/` and the repository's `src/` have same-named domains such as `basics`, `api`, `architecture`, `build-tools`, `ecosystem`, `projects`, `typescript-react`; for example both `docs/api/hooks-api.md` and `src/api/hooks-api.md` exist, as do `docs/build-tools/vite.md` and `src/build-tools/vite.md`. The docs script in `package.json` explicitly uses `docs` as the VitePress source directory; `docs/.vitepress/config.mts:12-14` notes that `SUMMARY.md` is a leftover mdbook mapping draft.
- Judgment: the main site builds from `docs/`, while `src/` appears to retain the old book source, so either location can be mistaken for the editing entry point. Whether the content is fully in sync has not been checked file by file — unverified; but the ambiguity of the maintenance entry point and the drift risk are clear. The purpose of retaining `src/` should be confirmed first; nothing should be deleted or moved before that decision.

### 4. A Few Exceptions in Naming Style (Severity: Low)

- Evidence: directories and files are mostly lowercase hyphenated, e.g. `docs/build-tools/build-tools-overview.md`, `docs/typescript-react/react-history-principles.md`; the same directories also contain `docs/typescript-react/setstate.md` (no separator), `docs/api/reactdom-api.md` (ReactDOM written joined), `docs/api/README.md` (uppercase README), alongside `docs/SUMMARY.md` (uppercase) and `docs/index.md` (lowercase). Filenames are predominantly English, while page bodies and the sidebar are in Chinese, e.g. `docs/.vitepress/sidebar.json:16-22`.
- Judgment: this is an identifiable, low-risk historical naming inconsistency; the casing of README/SUMMARY follows tool conventions and should not be renamed casually for cosmetic uniformity. Lowercase slugs matter more for URL stability, and mechanical renaming offers limited payoff.

### 5. Sidebar Reconciliation (Severity: Low)

- Configured but the file does not exist: **0**. All 153 unique links in `docs/.vitepress/sidebar.json` were checked one by one and all map to Markdown files.
- The file exists but is not in the sidebar: **1** — `docs/index.md` (the VitePress homepage is provided by the nav `/` entry in `docs/.vitepress/config.mts:20-22`). This is a deliberate homepage entry and should not be counted as a missing config.
- `docs/SUMMARY.md` being excluded via `srcExclude` is explicit behavior (`docs/.vitepress/config.mts:13-14`) and is not counted as a missing sidebar page; the root-level `knowledge.md`, `timeline.md`, and `glossary.md` are all in the sidebar.

### 6. Numbering Gaps, Skips, and Duplicates (Severity: Low / No Current Defects)

- Extracting numeric prefixes from filenames: **0**, so there are no listable skips or duplicates at the filename level.
- Extracting the sidebar chapter labels "Chapter N": the order is **1–23**, missing numbers `none`, duplicates `none`, skips `none`; evidence at `docs/.vitepress/sidebar.json:16-658`, where the first chapter is at line 16 and Chapter 23 is at line 632.
- Judgment: putting numbering in navigation rather than in filenames is a reasonable choice that keeps file paths stable. Note that `build-tools.md`, `taro.md`, and others currently repeat the chapter name on the first line of the body (see `docs/build-tools/build-tools.md:1`, `docs/build-tools/taro.md:1`) — this is duplicate display, not a numbering conflict.

### 7. Dead Links and Build Verifiability (Severity: Medium)

- Ran `npm run audit:links`: the existing `docs/.vitepress/dist` artifacts report `dead links: 0`, checking 29,842 in-site references across 155 pages.
- Tried `npm run docs:build`: it did not start, erroring `sh: 1: vitepress: not found`. So the audit above only proves that the existing build artifacts on disk had no dead links detected by the script — it does not prove the current source builds successfully; the dead-link status for the source is marked **unverified**.
- Evidence: the `docs:build` and `audit:links` scripts in `package.json`; `scripts/audit-links.mjs`; run results as above. No external-link reachability check was done, so external link status is unverified.

### 8. Root Directory and Non-page Files (Severity: Low)

- Root Markdown: `README.md` and `README.zh.md` are two language versions; not a duplicate README, but whether there is a language-switch entry is unverified. Also `book.toml`, `package.json`, `package-lock.json`, `LICENSE`, `.gitignore` — all project/build metadata rather than documentation clutter.
- The `docs/` root-level content files `index.md`, `glossary.md`, `knowledge.md`, `timeline.md` serve distinct roles as homepage, glossary, knowledge outline, and historical timeline respectively; `SUMMARY.md` is explicitly retained as a mapping draft (`docs/.vitepress/config.mts:13-14`). So no obvious temp files or duplicate READMEs were found; the root-level entries carry slightly many responsibilities but are backed by navigation entries.
- Other temp files in the root directory: none found (per the root filename list); the temporary nature of untracked/ignored files was not checked.

## Judgment and Recommendations

> **The original recommendation at audit time (revised per the user's framing during execution):** the "course reading axis" below was a suggestion in the report's first draft and is not adopted this round; the site positioning is personal learning notes, takeaways, and experience sharing.

Recommend converging the **5 parallel entry/index axes into 3**, with physical files still organized by topic:

1. **Topic content directories as the single storage axis**: keep the existing nine topic directories and URLs; do not move files by chapter.
2. **Topic browsing as the navigation axis**: keep the topic directories, stable URLs, and cross-angle interlinks; do not organize by course order or learning stage.
3. **Reference and auxiliary entries as a single class of entry**: API and source-code topics are each retained as topic categories; the timeline, outline, glossary, and future topics serve as "reference / appendix" entries and no longer form an additional parallel chapter system.

I recommend the above because it preserves the existing topic URLs and the sequential learning experience while making the responsibilities of "where things are stored" and "how they are read" clear. **I do not recommend forcing the 23 chapters into 23 numbered directories**: that would create a lot of move and link risk and still would not address the multi-perspective needs of concept / API / source code.

### Actually Not Messy — Leave It Alone

- The nine first-level directories have clear overall responsibilities; basics, TypeScript, architecture, build, ecosystem, projects, API, source code, and future topics are all distinguishable (counts in the table above).
- Sidebar Chapters 1–23 are continuous with no gaps or duplicates; all 153 configured links exist.
- `docs/index.md` not being in the sidebar has an homepage-route explanation; `SUMMARY.md` is explicitly excluded and retained as the old book's TOC draft, with configuration notes.
- Keeping `api/` and `source-code/` separate is a reasonable distinction between "public API reference" and "understanding internal mechanisms"; they should not be merged merely because topics overlap.
- `README.md` / `README.zh.md` are a language distinction, not duplicate files; the casing of README and SUMMARY also has established uses.
- The in-site link audit of the existing build artifacts passed; do not infer a large number of dead links just from "it looks too messy".

## Three-Phase Convergence Plan

| Phase | Action list | Impact scope | Risk (links / search / external) | User decision |
|---|---|---|---|---|
| Phase 1: mechanical tidying (target: within 1 hour) | In each directory's README / index, spell out "what this directory collects, its boundaries with adjacent topics, and the recommended reading order"; add a note on whether `docs/` or `src/` is the primary editing source (only after the facts are confirmed); standardize new filenames to lowercase kebab-case without renaming old ones; record this sidebar reconciliation as a baseline | Index pages and contribution notes; no existing pages moved, no slugs changed | Very low; page paths unchanged, so no existing links, search, or external links are disrupted | **Must be decided**: the purpose of retaining `src/` and the primary editing source; if directory boundaries / reading order touch content attribution, that needs confirmation |
| Phase 2: sidebar and redirects | In the VitePress sidebar, clearly group "read by course / browse by topic / reference appendix"; if renaming or moving is genuinely needed, add redirects for the old URLs and verify each one; finalize interlinking of the language-version READMEs | `docs/.vitepress/sidebar.json`, `config.mts`, redirect config, and the related indices | Medium; changing navigation without changing URLs is low risk, but changing paths affects search indexing, bookmarks, and external links, so redirects must be kept and a sitemap / search rebuild committed | **Must be decided**: whether course navigation and topic navigation run in parallel, and the appendix's placement; any slug change and the retention window for old URLs |
| Phase 3: deep chapter restructuring | After page-by-page content comparison, decide whether to split or merge overlapping topics such as Hooks, SSR, testing, and the React ecosystem; where needed, merge chapters, dedupe body text, and rewrite cross-references and directory mappings | Body text, topic directories, sidebar, `SUMMARY.md`, and historical URLs | High; may affect search ranking, bookmarks, external links, and directory structure, requiring redirects, link audits, and post-release monitoring | **Must be decided**: whether to delete or merge chapters, authoritative content attribution, the old-page retention / redirect strategy, and whether URL changes are acceptable |

## Conclusion: The Three Things to Do First

1. **First confirm the relationship between `src/` and `docs/` and the single editing source** — this is the highest-risk structural issue (`docs/api/hooks-api.md` and `src/api/hooks-api.md` are a verifiable same-named example).
2. **Write clear topic boundaries and reading order in the existing directory READMEs** to first reduce the cognitive cost of "the same topic scattered around", without touching paths.
3. **Restore a repeatable local build / link-verification environment** so `npm run docs:build` can run; right now only the old dist audit passed, and source dead links are unverified.

## Convergence Execution Record (2026-10-19)

This round handled navigation and content per the "personal learning notes, takeaways, and development experience sharing" framing. The sidebar still browses by topic, with no added course order, learning stages, or lecture skeleton; existing paths remain unchanged.

### A: The Authoritative Navigation Source

- The authoritative source is `docs/.vitepress/sidebar.json`: `docs/.vitepress/config.mts` imports it and uses it as `themeConfig.sidebar` (config lines 2, 25–27).
- `docs/SUMMARY.md` was originally a duplicate TOC copy (original lines 1–156); it has been changed into maintenance notes clarifying that the sidebar is the sole editing entry point and that SUMMARY does not participate in the build; see `docs/SUMMARY.md:1–5`.
- All 153 sidebar link entries are unique (self-check: 153 entries, 153 unique values, 0 duplicates within the sidebar). Category labels had "Part N / Chapter N" removed while keeping the original links; see `docs/.vitepress/sidebar.json:1–8` and each topic group.

### B: Cross-axis Duplicate Grouping and Evidence

| Category | Pages and changes | Two-text comparison evidence |
|---|---|---|
| True duplicates, converged to 1 group | The SSR definition, CSR/SSR comparison, and pros/cons use `docs/ecosystem/what-is-ssr.md` as authoritative; `docs/ecosystem/ssr.md` was turned into a summary linking to the authoritative page, retaining the React SSR API and implementation notes. | Before the change, `what-is-ssr.md:1–29` summarized SSR generating HTML, the CSR comparison, first-paint / SEO / social preview, and the server load / complexity / interaction drawbacks; `ssr.md:1–25` restated the same definitions, advantages, and drawbacks item by item. After the change, `ssr.md:3–5` keeps only a key-point summary and links to `what-is-ssr.md`, with API content retained from `ssr.md:7` onward. |
| Different angles, 3 groups retained | Hooks concepts/practice, testing tools/testing methods, and the Next.js framework overview / usage notes are all retained and cross-linked in their respective indices. | Hooks: `architecture/hooks-deep-dive.md` focuses on design and practice, `source-code/hooks-source.md` on the Dispatcher / source-code dispatching; `api/hooks-api.md` is public API lookup, with different conclusions and purposes. Testing: `ecosystem/testing-tools.md` emphasizes tool comparison, `projects/testing-tools.md` emphasizes project install / config examples, and `ecosystem/testing.md` discusses test types and strategy. Next.js: `ecosystem/nextjs.md` records creation, routing, and data-fetching details, while `projects/nextjs-overview.md` gives an overview in a project-ecosystem context; both are retained and discoverable through cross-references in both sides' indices, not forcibly merged. |

The retained groups above are not cases of copying the same fact and then picking one to trim; the different pages serve concept, API, source-code, tool-selection, or project-application angles. Both URLs and files are retained.

### C: Framing and Entry Point Alignment

- `README.md:20–42` and `README.zh.md:20–42` were updated to reflect the real directories: listing the current `docs/` directories, describing `docs/` as the VitePress editing source, marking `src/` and `book.toml` as mdBook leftover files, and correcting the buildable Markdown count to 154 (excluding the excluded SUMMARY).
- Category labels in `docs/.vitepress/sidebar.json` no longer use lecture numbering; no dead entries were found, and all 153 links map to existing Markdown.
- `docs/index.md` continues as the `/` homepage entry and does not need to be added to the sidebar; `docs/knowledge.md`, `timeline.md`, and `glossary.md` are already root-level sidebar entries.
