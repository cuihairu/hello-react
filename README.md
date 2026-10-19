[English](README.md) | [中文](README.zh.md)

<div align="center">

<p align="center"><img src="docs/public/logo.svg" width="64" height="64" alt="logo" /> </p>

# Hello React

<p align="center">
  <img src="docs/public/badges/topic.svg" alt="topic" />
  <img src="docs/public/badges/docs.svg" alt="docs" />
  <img src="docs/public/badges/license.svg" alt="license" />
  <img src="docs/public/badges/langs.svg" alt="langs" />
</p>

React development notes · [Read online](https://cuihairu.github.io/hello-react/) · [Knowledge map](https://cuihairu.github.io/hello-react/knowledge)

</div>

---

A personal collection of React learning notes, takeaways, and development experience from a game developer, covering TypeScript, architecture, Hooks, build tools, source code, and the ecosystem.

## Local Development

```bash
npm install           # install dependencies
npm run docs:dev      # local dev server
npm run docs:build    # build to docs/.vitepress/dist, checks source-level dead links
npm run docs:preview  # preview the build output locally
npm run audit:links   # audit all built HTML for dead links and broken anchors
```

Dead-link checking runs at two levels: VitePress fails the build on source-level dead links, and `audit:links` scans the built HTML for links pointing to excluded files or broken page anchors (CI runs it after every build).

## Directory Structure

```
hello-react/
├── docs/                     # VitePress content and config (canonical edit source)
│   ├── .vitepress/sidebar.json # authoritative site sidebar
│   ├── api/ architecture/ basics/ build-tools/ ecosystem/
│   ├── future/ projects/ source-code/ typescript-react/
│   ├── public/ review/        # static assets and audit reports
│   ├── index.md              # home page
│   ├── knowledge.md / timeline.md / glossary.md
│   └── SUMMARY.md            # mdBook legacy note, not a navigation copy
├── src/                      # legacy mdBook source, not the site edit source
├── scripts/audit-links.mjs   # built-site internal link audit
├── package.json              # dependencies and scripts
└── README.md / README.zh.md  # project notes (English and Chinese)
```

VitePress builds from `docs/`; edit `docs/` for site content. `src/` and `book.toml` are retained mdBook artifacts. Maintain site navigation only in `docs/.vitepress/sidebar.json`; `docs/SUMMARY.md` documents that rule. There are 156 buildable Markdown pages under `docs/`, plus the excluded `SUMMARY.md`.

## About These Notes

This repository is a personal collection of learning notes, takeaways, and development experience shared from a game developer’s perspective. Topics are organized for browsing, not as a course or prescribed learning path.

## License

This work is licensed under a [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/) license.
