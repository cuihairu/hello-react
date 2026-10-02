# 第六部分：React 生态系统

本部分覆盖 React 周边主流库与工程化体系，解决路由、状态、SSR、测试、CI/CD 等实战问题。

## 章节概览

### 第16章：React 路由
- [React Router 的安装与基本配置](react-router-setup.md) —— v6 API、Routes/Route/Link/Outlet、懒加载
- [路由参数与动态加载](react-router-params.md) —— useParams、useSearchParams、动态 import、预加载
- [嵌套路由与页面跳转](react-router-nested.md) —— 相对路径、index 路由、layout 路由、导航守卫

### 第17章：状态管理与数据流
- [Redux 的基本原理与使用](redux.md) —— Store、Reducer、Action、Middleware、RTK 推荐用法
- [Context API 与 useReducer 的组合使用](context-reducer.md) —— 轻量级全局状态、避免过度渲染、Selector 模式
- [MobX 与状态管理](mobx.md) —— 可观测对象、响应式原理、withObserver、与 Redux 对比

### 第18章：服务器端渲染（SSR）
- [什么是服务器端渲染](what-is-ssr.md) —— CSR vs SSR vs SSG、水合、流式渲染、SEO 收益
- [Next.js 的基本用法](nextjs.md) —— App Router、Server Components、数据获取、路由缓存
- [SSR 与 SEO 优化](ssr-seo.md) —— Meta 标签、结构化数据、爬虫友好、性能指标

### 第19章：测试与质量保证
- [React 测试工具：Jest、Enzyme、React Testing Library](testing-tools.md) —— 工具选型、渲染器、查询 API、事件模拟
- [单元测试与集成测试](unit-integration-tests.md) —— 组件隔离测试、Hook 测试、Mock 策略、覆盖率阈值
- [模拟与快照测试](mocks-snapshots.md) —— MSW、Jest Mock、快照更新策略、视觉回归
- [持续集成与代码质量管理](ci-code-quality.md) —— GitHub Actions、ESLint/Prettier、TypeCheck、Bundle 分析

## 学习目标

完成本部分后，你将能够：
- 根据项目规模选择路由方案与状态管理库
- 配置 Next.js 实现 SSR/SSG/ISR 混合渲染
- 建立分层测试策略（单元→集成→E2E）
- 搭建包含类型检查、Lint、测试、构建的 CI 流水线