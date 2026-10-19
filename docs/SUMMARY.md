# 目录维护说明

本站点的导航权威源是 [`docs/.vitepress/sidebar.json`](.vitepress/sidebar.json)，VitePress 直接从该文件生成侧栏。请在需要调整站点导航时只修改 `sidebar.json`，再按本页检查侧栏链接均指向现存页面。

本文件是 mdBook 遗留路径，不再维护手写目录副本，也不参与 VitePress 页面构建（见 `docs/.vitepress/config.mts` 的 `srcExclude` 配置）。不要从本文件生成或覆盖侧栏；需要阅读内容时请使用站点侧栏或 [`知识点总纲`](knowledge.md)。
