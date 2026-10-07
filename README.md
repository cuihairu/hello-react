<div align="center">

<p align="center"><img src="docs/public/logo.svg" width="64" height="64" alt="logo" /> <img src="docs/public/badges/langs.svg" alt="languages" /></p>

# Hello React
<p align="center"><img src="docs/public/badges/topic.svg" alt="topic" /> <img src="docs/public/badges/docs.svg" alt="docs" />
 <img src="docs/public/badges/license.svg" alt="CC BY 4.0" /></p>

React 知识体系 · [在线阅读](https://cuihairu.github.io/hello-react/)

</div>

---

从前端基础到工程实战的 React 知识站点，覆盖 TypeScript、架构演变、Hooks 深度解析、构建工具、源码内幕、生态系统与项目实战。

## 本地开发

```bash
npm install        # 安装依赖
npm run docs:dev   # 本地开发
npm run docs:build # 构建到 docs/.vitepress/dist
npm run docs:preview # 本地预览构建产物
```

## 目录结构

```
hello-react/
├── book.toml                 # mdbook 配置（保留不动）
├── src/                      # mdbook 源文件（保留不动）
│   ├── SUMMARY.md            # 目录映射底稿
│   ├── basics/               # 第一部分：前端基础
│   ├── typescript-react/     # 第二部分：TypeScript 与 React
│   ├── architecture/         # 第三部分：架构演变
│   ├── build-tools/          # 第四部分：构建工具
│   ├── source-code/          # 第五部分：源码解析
│   ├── ecosystem/            # 第六部分：生态系统
│   ├── api/                  # 第七部分：API 参考
│   ├── projects/             # 第八部分：项目实战
│   └── future/               # 未入目录（附录）
├── docs/                     # VitePress 源文件（src/ 的副本 + 配置）
│   ├── public/               # 静态资产
│   │   ├── logo.svg          # 品牌 Logo
│   │   └── favicon.svg       # Favicon
│   ├── .vitepress/
│   │   ├── config.mts        # 站点配置
│   │   ├── sidebar.json      # 侧边栏（由 parse_summary.py 生成）
│   │   └── theme/            # 主题扩展
│   │       ├── index.mjs
│   │       └── style.css     # 品牌色、中文排印、代码样式
│   └── index.md              # 首页（layout: home）
├── package.json              # 依赖与脚本
├── .github/workflows/
│   └── deploy-docs.yml       # Pages 部署工作流
└── README.md                 # 仓库说明
```

## 迁移说明

本站已从 mdbook 迁移至 VitePress：
- 内容完整保留，151 页文档无丢失
- 侧边栏由 `src/SUMMARY.md` 自动映射生成
- 中文正文首行缩进 2em、行高 1.75、留白充足
- 品牌色源自 Logo 主色 #087EA4 / 强调色 #61DAFB，亮暗两套 Token
- 标题与表格移除装饰性 emoji，保留语义性标记
## License

本作品采用 [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/) 许可协议发布。