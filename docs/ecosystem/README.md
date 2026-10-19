# React 生态系统

本部分覆盖 React 周边主流库与工程化体系，解决路由、状态、SSR、测试、CI/CD 等实战问题。

## 章节概览

### React 路由
- [React Router 的安装与基本配置](react-router-setup.md) —— v6 API、Routes/Route/Link/Outlet、懒加载
- [路由参数与动态加载](react-router-params.md) —— useParams、useSearchParams、动态 import、预加载
- [嵌套路由与页面跳转](react-router-nested.md) —— 相对路径、index 路由、layout 路由、导航守卫

### 状态管理与数据流
- [Redux 的基本原理与使用](redux.md) —— Store、Reducer、Action、Middleware、RTK 推荐用法
- [Context API 与 useReducer 的组合使用](context-reducer.md) —— 轻量级全局状态、避免过度渲染、Selector 模式
- [MobX 与状态管理](mobx.md) —— 可观测对象、响应式原理、withObserver、与 Redux 对比

### 服务器端渲染（SSR）
- [什么是服务器端渲染](what-is-ssr.md) —— CSR vs SSR vs SSG、水合、流式渲染、SEO 收益
- [Next.js 的基本用法](nextjs.md) —— App Router、Server Components、数据获取、路由缓存
- [SSR 与 SEO 优化](ssr-seo.md) —— Meta 标签、结构化数据、爬虫友好、性能指标

### 测试与质量保证
- [React 测试工具：Jest、Enzyme、React Testing Library](testing-tools.md) —— 工具选型、渲染器、查询 API、事件模拟
- [单元测试与集成测试](unit-integration-tests.md) —— 组件隔离测试、Hook 测试、Mock 策略、覆盖率阈值
- [模拟与快照测试](mocks-snapshots.md) —— MSW、Jest Mock、快照更新策略、视觉回归
- [持续集成与代码质量管理](ci-code-quality.md) —— GitHub Actions、ESLint/Prettier、TypeCheck、Bundle 分析

## 内容角度

本页汇总本主题下的个人笔记入口；各页面按概念、实践或实现角度展开，可按需要交叉阅读。

## 参考资料

- [React 官方文档 · 参考](https://react.dev/reference/react)

## 相关页面

- [ci-code-quality](ci-code-quality.md)
- 测试工具的项目配置示例见[项目测试工具笔记](../projects/testing-tools.md)；Next.js 的项目生态概览见[Next.js 与 SSR](../projects/nextjs-overview.md)。
