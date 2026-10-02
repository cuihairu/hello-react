# 第八部分：项目实战与生态系统

本部分通过完整的 TodoMVC 进阶项目，串联 React + TypeScript + Redux + 测试 + CI/CD 全流程，并拓展 Next.js、React Native、自动化部署等生态实战。

## 章节概览

### 第22章：项目实战 - 多功能 Todo 应用
- [需求分析与设计](todo-requirements.md) —— 用户故事、数据模型、状态流向、组件拆分、技术选型
- [使用 React 与 TypeScript 开发应用](todo-development.md) —— 项目脚手架、组件实现、表单处理、本地存储、类型安全
- [集成 Redux 进行状态管理](todo-redux.md) —— Store 设计、Slice、Thunk 异步、Selector、DevTools、持久化
- [部署与性能优化](todo-deployment.md) —— 构建优化、代码分割、CDN、Service Worker、Lighthouse 指标

### 第23章：React 生态系统实战拓展
- [Next.js 与服务端渲染（SSR）](nextjs-overview.md) —— App Router 迁移、Server Components、数据获取、ISR、Edge Runtime
- [React Native 简介与移动开发](react-native.md) —— 原生组件、布局系统、导航、原生模块、发布流程
- [测试工具与方法](testing-tools.md) —— RTL + Jest 实战、MSW API Mock、E2E (Playwright)、视觉回归
- [持续集成与自动化部署](ci-cd.md) —— 矩阵测试、依赖缓存、自动发布、回滚策略、环境隔离

## 学习目标

完成本部分后，你将能够：
- 独立完成从需求到上线的 React 全栈项目
- 掌握 Redux Toolkit 现代化状态管理最佳实践
- 使用 Next.js 实现 SEO 友好的服务端渲染应用
- 理解 React Native 与 Web 开发的异同
- 建立生产级的测试与部署自动化体系