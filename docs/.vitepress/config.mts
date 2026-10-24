import { defineConfig } from 'vitepress'
import sidebarEn from './sidebar.en.json' with { type: 'json' }
import sidebarZh from './sidebar.zh.json' with { type: 'json' }

// https://vitepress.dev/reference/site-config
//
// i18n layout (VitePress official locales, no custom switcher):
//   docs/            -> root locale (English)
//   docs/zh/         -> zh locale, served under /zh/
// The locale switcher in the navbar is rendered by VitePress from `locales` below.
export default defineConfig({
  lang: 'en-US',
  title: 'Hello React',
  description: 'React notes, takeaways and hands-on experience from a game developer — TypeScript, architecture, Hooks, build tools, source code and ecosystem',
  base: '/hello-react/',
  cleanUrls: true,
  lastUpdated: true,

  locales: {
    root: { label: 'English', lang: 'en-US' },
    zh: { label: '简体中文', lang: 'zh-CN', link: '/zh/' },
  },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/hello-react/favicon.svg' }],
  ],

  // mdbook 遗留的目录文件保留在仓库作映射底稿，不作为页面构建
  srcExclude: ['**/SUMMARY.md'],

  // 不忽略死链：构建期即检查源级死链（指向 srcExclude 文件的链接除外，由 CI 的 audit:links 兜底）

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Hello React',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/cuihairu/hello-react' }
    ],

    footer: {
      message: 'Hello React',
      copyright: '© 2025 cuihairu'
    },

    // 由 mdbook SUMMARY.md 结构映射而来（scripts: parse_summary.py），
    // 9 个顶层章节、未入目录的散页归入「附录 · 未入目录」
    locales: {
      root: {
        label: 'English',
        lang: 'en-US',

        nav: [
          { text: 'Home', link: '/' },
          { text: 'Web Basics', link: '/basics/README' },
          { text: 'TypeScript & React', link: '/typescript-react/README' },
          { text: 'Architecture', link: '/architecture/README' },
          { text: 'Build Tools', link: '/build-tools/README' },
          { text: 'Source Code', link: '/source-code/README' },
          { text: 'Ecosystem', link: '/ecosystem/README' },
          { text: 'API Reference', link: '/api/README' },
          { text: 'Projects', link: '/projects/README' },
        ],

        sidebar: sidebarEn as never,

        search: {
          provider: 'local',
          options: {
            translations: {
              button: { buttonText: 'Search the docs', buttonAriaLabel: 'Search' },
              modal: {
                noResultsText: 'No results found',
                resetButtonTitle: 'Clear the query',
                footer: { selectText: 'Select', navigateText: 'Navigate', closeText: 'Close' }
              }
            }
          }
        },

        outline: {
          label: 'On this page',
          level: [2, 3]
        },

        docFooter: { prev: 'Previous', next: 'Next' },
        lastUpdated: { text: 'Last updated' },
        returnToTopLabel: 'Return to top',
        sidebarMenuLabel: 'Menu',
        darkModeSwitchLabel: 'Appearance',
        lightModeSwitchTitle: 'Switch to light mode',
        darkModeSwitchTitle: 'Switch to dark mode'
      },

      zh: {
        label: '简体中文',
        lang: 'zh-CN',

        nav: [
          { text: '首页', link: '/zh/' },
          { text: '前端基础', link: '/zh/basics/README' },
          { text: 'TypeScript 与 React', link: '/zh/typescript-react/README' },
          { text: '架构演变', link: '/zh/architecture/README' },
          { text: '构建工具', link: '/zh/build-tools/README' },
          { text: '源码解析', link: '/zh/source-code/README' },
          { text: '生态系统', link: '/zh/ecosystem/README' },
          { text: 'API 参考', link: '/zh/api/README' },
          { text: '项目记录', link: '/zh/projects/README' },
        ],

        sidebar: sidebarZh as never,

        search: {
          provider: 'local',
          options: {
            translations: {
              button: { buttonText: '搜索文档', buttonAriaLabel: '搜索' },
              modal: {
                noResultsText: '没有找到结果',
                resetButtonTitle: '清除查询条件',
                footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
              }
            }
          }
        },

        outline: {
          label: '页面导航',
          level: [2, 3]
        },

        docFooter: { prev: '上一篇', next: '下一篇' },
        lastUpdated: { text: '最后更新' },
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '外观',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式'
      }
    }
  },

  markdown: {
    lineNumbers: false
  }
})
