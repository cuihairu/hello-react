import { defineConfig } from 'vitepress'
import sidebar from './sidebar.json' with { type: 'json' }

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'Hello React',
  description: 'React 知识体系——从前端基础到 TypeScript、架构演变、Hooks、构建工具、源码解析、生态系统与项目实战',
  base: '/hello-react/',
  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/hello-react/favicon.svg' }],
  ],

  // mdbook 遗留的目录文件保留在仓库作映射底稿，不作为页面构建
  srcExclude: ['**/SUMMARY.md'],

  ignoreDeadLinks: true,

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Hello React',

    nav: [
      { text: '首页', link: '/' },
      { text: '前端基础', link: '/basics/README' },
      { text: 'TypeScript 与 React', link: '/typescript-react/README' },
      { text: '架构演变', link: '/architecture/README' },
      { text: '构建工具', link: '/build-tools/README' },
      { text: '源码解析', link: '/source-code/README' },
      { text: '生态系统', link: '/ecosystem/README' },
      { text: 'API 参考', link: '/api/README' },
      { text: '项目实战', link: '/projects/README' },
    ],

    // 由 mdbook SUMMARY.md 结构映射而来（scripts: parse_summary.py），
    // 9 个顶层章节、未入目录的散页归入「附录 · 未入目录」
    sidebar: sidebar as never,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/cuihairu/hello-react' }
    ],

    footer: {
      message: 'Hello React',
      copyright: '© 2025 cuihairu'
    },

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

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    lastUpdated: {
      text: '最后更新'
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  },

  markdown: {
    lineNumbers: false
  }
})