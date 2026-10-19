# 项目记录与生态系统

这里用 TodoMVC 记录 React、TypeScript、Redux、测试和 CI/CD 的项目实践，也整理 Next.js、React Native 与自动化部署相关经验。

## 页面索引

### 多功能 Todo 应用记录
- [需求分析与设计](todo-requirements.md) —— 用户故事、数据模型、状态流向、组件拆分、技术选型
- [使用 React 与 TypeScript 开发应用](todo-development.md) —— 项目脚手架、组件实现、表单处理、本地存储、类型安全
- [集成 Redux 进行状态管理](todo-redux.md) —— Store 设计、Slice、Thunk 异步、Selector、DevTools、持久化
- [部署与性能优化](todo-deployment.md) —— 构建优化、代码分割、CDN、Service Worker、Lighthouse 指标

### React 生态系统实战拓展
- [Next.js 与服务端渲染（SSR）](nextjs-overview.md) —— Pages Router 文件路由、SSR/SSG/ISR 数据获取、API 路由、SEO 优化
- [React Native 简介与移动开发](react-native.md) —— 原生组件、布局系统、导航、原生模块、发布流程
- [测试工具与方法](testing-tools.md) —— Jest / RTL / Enzyme 工具对比、单元·集成·快照·模拟·E2E 测试方法、CI 与代码质量
- [持续集成与自动化部署](ci-cd.md) —— GitHub Actions / CircleCI / GitLab CI 配置、自动部署、CD 流程集成

## 内容角度

本页汇总本主题下的个人笔记入口；各页面按概念、实践或实现角度展开，可按需要交叉阅读。

## 参考资料

- [React 官方文档（外部链接）](https://react.dev/learn)

## 相关页面

- [ci-cd](ci-cd.md)
- 工具选择与测试策略另见[生态测试专题](../ecosystem/README.md)；框架能力与使用细节见[Next.js 笔记](../ecosystem/nextjs.md)。
