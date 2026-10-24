# Table of Contents Maintenance Notes

The navigation authority for this site is [`docs/.vitepress/sidebar.en.json`](.vitepress/sidebar.en.json); VitePress generates the sidebar directly from that file. When you need to change the site navigation, edit only `sidebar.en.json`, then follow this page to check that every sidebar link points to an existing page.

This file is a leftover mdBook path: no hand-written table-of-contents copy is maintained here, and it is excluded from the VitePress page build (see the `srcExclude` setting in `docs/.vitepress/config.mts`). Do not generate or overwrite the sidebar from this file; to read the content, use the site sidebar or the [`Knowledge Map`](knowledge.md).
