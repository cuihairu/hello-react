# React 术语表

本表收录本站 React 文档的核心术语，按主题分组。每条给出中英对照、一句话定义、权威出处与相关页。

**维护口径**：新增条目必须给出可点的权威出处；查不到就写「未找到权威出处（待核）」，不得凭印象编造链接。

## 核心概念

### React（React）
用于构建用户界面的 JavaScript 库，采用组件化与声明式编程模型。
**出处**：[React 官方文档（外部链接）](https://react.dev/learn)
**相关页**：[typescript-react/react-basics](/zh/typescript-react/react-basics))、[typescript-react/react-history-principles](/zh/typescript-react/react-history-principles))

### 组件（Component）
React 应用的基本单元，接收输入（props）并返回描述界面的 React 元素。
**出处**：[React 官方文档 · 描述 UI](https://react.dev/learn/describing-the-ui)
**相关页**：[api/component-api](/zh/api/component-api))、[typescript-react/component-development](/zh/typescript-react/component-development))

### Props（Props）
组件的输入参数，由父组件传入，在组件内部只读。
**出处**：[React 官方文档 · 传递 Props](https://react.dev/learn/passing-props-to-a-component)
**相关页**：[api/state-props](/zh/api/state-props))、[typescript-react/state-props](/zh/typescript-react/state-props))

### State（状态）（State）
组件内部管理的数据，变化会触发重新渲染。
**出处**：[React 官方文档 · 状态](https://react.dev/learn/state-a-components-memory)
**相关页**：[api/state-props](/zh/api/state-props))、[ecosystem/state-management](/zh/ecosystem/state-management))

### JSX（JSX）
JavaScript 的语法扩展，用于在 JavaScript 中描述 UI 结构，编译为 createElement 调用。
**出处**：[React 官方文档 · 描述 UI](https://react.dev/learn/describing-the-ui)
**相关页**：[typescript-react/jsx-syntax](/zh/typescript-react/jsx-syntax))、[api/jsx-api](/zh/api/jsx-api))

### 虚拟 DOM（Virtual DOM）
对真实 DOM 的轻量级 JavaScript 表示，React 通过对比虚拟 DOM 差异来最小化真实 DOM 操作。
**出处**：[React 仓库](https://github.com/react/react)
**相关页**：[architecture/virtual-dom](/zh/architecture/virtual-dom))、[source-code/virtual-dom](/zh/source-code/virtual-dom))

### 协调（Reconciliation）（Reconciliation）
React 对比新旧虚拟 DOM 树并计算出更新真实 DOM 所需最小操作的过程。
**出处**：[React 仓库](https://github.com/react/react)
**相关页**：[architecture/reconciliation](/zh/architecture/reconciliation))、[source-code/reconciliation](/zh/source-code/reconciliation))

### Fiber（Fiber）
React 16 引入的新协调架构的基本工作单元，支持可中断的渲染与优先级调度。
**出处**：[React 仓库](https://github.com/react/react)
**相关页**：[architecture/react-fiber](/zh/architecture/react-fiber))、[source-code/react-fiber](/zh/source-code/react-fiber))

### 单向数据流（One-way Data Flow）
数据在组件树中自上而下流动，状态变化通过 props 与回调逐层传递。
**出处**：[React 官方文档 · 管理状态](https://react.dev/learn/managing-state)
**相关页**：[ecosystem/state-management](/zh/ecosystem/state-management))、[ecosystem/context-reducer](/zh/ecosystem/context-reducer))

### 声明式（Declarative）
描述界面「是什么」而非「怎么做」，React 负责高效更新 DOM 以匹配声明。
**出处**：[React 官方文档 · 描述 UI](https://react.dev/learn/describing-the-ui)
**相关页**：[typescript-react/react-basics](/zh/typescript-react/react-basics))

## 组件与 Props

### 函数组件（Function Component）
以函数形式定义的组件，接收 props 并返回 React 元素。
**出处**：[React 官方文档 · 描述 UI](https://react.dev/learn/describing-the-ui)
**相关页**：[typescript-react/component-development](/zh/typescript-react/component-development))

### 类组件（Class Component）
以 ES6 class 形式定义的组件，通过 render 方法返回界面。
**出处**：[React 官方文档 · Component](https://react.dev/reference/react/Component)
**相关页**：[api/component-api](/zh/api/component-api))、[typescript-react/render-method](/zh/typescript-react/render-method))

### 受控组件（Controlled Component）
表单元素的值由 React 状态驱动，每次变化都经 onChange 更新状态。
**出处**：[React 官方文档 · Form 组件](https://react.dev/reference/react-dom/components/form)
**相关页**：[api/reactdom-api](/zh/api/reactdom-api))

### 非受控组件（Uncontrolled Component）
表单元素的值由 DOM 自身管理，通过 ref 在需要时读取。
**出处**：[React 官方文档 · input 组件](https://react.dev/reference/react-dom/components/input)
**相关页**：[api/reactdom-api](/zh/api/reactdom-api))、[typescript-react/refs](/zh/typescript-react/refs))

### 组合（Composition）
通过 props.children 或专用 props 将组件嵌套组合，而非继承。
**出处**：[React 官方文档 · 描述 UI](https://react.dev/learn/describing-the-ui)
**相关页**：[typescript-react/deep-dive-components](/zh/typescript-react/deep-dive-components))

### 高阶组件（Higher-Order Component (HOC)）
接收组件并返回新组件的函数，用于复用组件逻辑。
**出处**：[React 官方文档 · 管理状态](https://react.dev/learn/managing-state)
**相关页**：[typescript-react/hoc](/zh/typescript-react/hoc))、[api/react-hoc-patterns](/zh/api/react-hoc-patterns))

### Render Props（Render Props）
通过函数 prop 在组件间共享代码的模式，函数的返回值作为渲染内容。
**出处**：[React 官方文档 · 管理状态](https://react.dev/learn/managing-state)
**相关页**：[typescript-react/render-props](/zh/typescript-react/render-props))

### 组件生命周期（Component Lifecycle）
组件从挂载、更新到卸载的过程，类组件以生命周期方法、函数组件以 useEffect 对应。
**出处**：[React 官方文档 · 提交与挂载](https://react.dev/learn/render-and-commit)
**相关页**：[api/lifecycle-methods](/zh/api/lifecycle-methods))、[typescript-react/component-lifecycle](/zh/typescript-react/component-lifecycle))

### 错误边界（Error Boundary）
捕获子组件树中 JavaScript 错误并显示降级界面的类组件。
**出处**：[React 官方文档 · 描述 UI](https://react.dev/learn/describing-the-ui)
**相关页**：[api/error-boundaries-api](/zh/api/error-boundaries-api))、[typescript-react/error-boundaries](/zh/typescript-react/error-boundaries))

### 代码分割（Code Splitting）
将代码拆分为按需加载的包，减小首屏加载体积。
**出处**：[React 官方文档 · lazy](https://react.dev/reference/react/lazy)
**相关页**：[api/react-core](/zh/api/react-core))、[build-tools/build-tools](/zh/build-tools/build-tools))

### 懒加载（Lazy Loading）
使用 lazy 与 Suspense 在组件首次渲染时才加载对应代码。
**出处**：[React 官方文档 · lazy](https://react.dev/reference/react/lazy)
**相关页**：[api/react-core](/zh/api/react-core))

### Suspense（Suspense）
在子组件等待异步内容（如懒加载代码）时显示降级界面的机制。
**出处**：[React 官方文档 · Suspense](https://react.dev/reference/react/Suspense)
**相关页**：[api/react-core](/zh/api/react-core))

### Portal（Portal）
将子节点渲染到 DOM 树中另一位置的机制，常用于模态框与浮层。
**出处**：[React 官方文档 · DOM 组件](https://react.dev/reference/react-dom/components/common)
**相关页**：[api/portals-profiler-api](/zh/api/portals-profiler-api))、[typescript-react/portals](/zh/typescript-react/portals))

### Fragment（Fragment）
在不增加额外 DOM 节点的前提下分组多个子元素的语法。
**出处**：[React 官方文档 · Fragment](https://react.dev/reference/react/Fragment)
**相关页**：[api/react-core](/zh/api/react-core))

### Profiler（Profiler）
测量组件树渲染性能（渲染次数与耗时）的组件与 API。
**出处**：[React 官方文档 · Profiler](https://react.dev/reference/react/Profiler)
**相关页**：[api/portals-profiler-api](/zh/api/portals-profiler-api))、[typescript-react/profiler](/zh/typescript-react/profiler))

### StrictMode（StrictMode）
开发模式下启用额外检查（如重复调用 effect）以暴露潜在问题的组件。
**出处**：[React 官方文档 · StrictMode](https://react.dev/reference/react/StrictMode)
**相关页**：[api/react-core](/zh/api/react-core))

### memo（memo）
高阶组件，props 未变化时跳过重新渲染。
**出处**：[React 官方文档 · memo](https://react.dev/reference/react/memo)
**相关页**：[api/react-core](/zh/api/react-core))

### forwardRef（forwardRef）
让函数组件将 ref 转发给内部 DOM 节点或子组件。
**出处**：[React 官方文档 · forwardRef](https://react.dev/reference/react/forwardRef)
**相关页**：[api/refs-api](/zh/api/refs-api))

## 状态与事件

### useState（useState）
在函数组件中声明状态变量的 Hook。
**出处**：[React 官方文档 · useState](https://react.dev/reference/react/useState)
**相关页**：[api/hooks-api](/zh/api/hooks-api))、[architecture/use-state](/zh/architecture/use-state))

### useReducer（useReducer）
以 reducer 模式管理复杂状态逻辑的 Hook，适合多子状态或依赖前值的场景。
**出处**：[React 官方文档 · useReducer](https://react.dev/reference/react/useReducer)
**相关页**：[api/hooks-api](/zh/api/hooks-api))、[architecture/use-reducer](/zh/architecture/use-reducer))、[source-code/use-reducer](/zh/source-code/use-reducer))

### Context（Context）
在组件树中共享数据而无需逐层传递 props 的机制。
**出处**：[React 官方文档 · Context](https://react.dev/learn/scaling-up-with-reducer-and-context)
**相关页**：[api/context-api](/zh/api/context-api))、[architecture/use-context](/zh/architecture/use-context))、[source-code/context-api](/zh/source-code/context-api))

### 状态提升（Lifting State Up）
将共享状态移动到最近的共同父组件，再通过 props 分发给子组件。
**出处**：[React 官方文档 · 管理状态](https://react.dev/learn/managing-state)
**相关页**：[ecosystem/state-management](/zh/ecosystem/state-management))

### 合成事件（SyntheticEvent）
React 跨浏览器封装的事件对象，提供统一的事件接口。
**出处**：[React 官方文档 · 响应事件](https://react.dev/learn/responding-to-events)
**相关页**：[typescript-react/synthetic-events](/zh/typescript-react/synthetic-events))

### 事件处理（Event Handling）
通过 onChange、onClick 等 props 响应浏览器事件并更新状态。
**出处**：[React 官方文档 · 响应事件](https://react.dev/learn/responding-to-events)
**相关页**：[typescript-react/synthetic-events](/zh/typescript-react/synthetic-events))

### 派生状态（Derived State）
由 props 或已有状态计算得出的值，通常无需额外存储。
**出处**：[React 官方文档 · 管理状态](https://react.dev/learn/managing-state)
**相关页**：[ecosystem/state-management](/zh/ecosystem/state-management))

## Hooks

### Hook（Hook）
以 use 开头的函数，让函数组件使用状态与生命周期等 React 特性。
**出处**：[React 官方文档 · Hooks 参考](https://react.dev/reference/react/apis)
**相关页**：[api/hooks-api](/zh/api/hooks-api))、[architecture/hooks-deep-dive](/zh/architecture/hooks-deep-dive))

### useEffect（useEffect）
在渲染后执行副作用（订阅、请求、DOM 操作）的 Hook。
**出处**：[React 官方文档 · useEffect](https://react.dev/reference/react/useEffect)
**相关页**：[api/hooks-api](/zh/api/hooks-api))、[architecture/use-effect](/zh/architecture/use-effect))

### useRef（useRef）
返回可变 ref 对象，用于访问 DOM 节点或保存跨渲染不变的值。
**出处**：[React 官方文档 · useRef](https://react.dev/reference/react/useRef)
**相关页**：[api/hooks-api](/zh/api/hooks-api))、[typescript-react/refs](/zh/typescript-react/refs))

### useMemo（useMemo）
缓存计算结果，依赖不变时避免重复计算。
**出处**：[React 官方文档 · useMemo](https://react.dev/reference/react/useMemo)
**相关页**：[api/hooks-api](/zh/api/hooks-api))

### useCallback（useCallback）
缓存函数引用，依赖不变时避免子组件不必要的重新渲染。
**出处**：[React 官方文档 · useCallback](https://react.dev/reference/react/useCallback)
**相关页**：[api/hooks-api](/zh/api/hooks-api))

### useLayoutEffect（useLayoutEffect）
在浏览器绘制前同步执行副作用，适合读取布局并同步更新。
**出处**：[React 官方文档 · useLayoutEffect](https://react.dev/reference/react/useLayoutEffect)
**相关页**：[api/hooks-api](/zh/api/hooks-api))

### 自定义 Hook（Custom Hook）
以 use 开头、可调用其他 Hook 的函数，用于复用有状态逻辑。
**出处**：[React 官方文档 · Hooks 参考](https://react.dev/reference/react/apis)
**相关页**：[architecture/custom-hooks](/zh/architecture/custom-hooks))、[source-code/custom-hooks](/zh/source-code/custom-hooks))

### Hook 规则（Rules of Hooks）
Hook 只能在函数组件或自定义 Hook 的顶层调用，不能在条件或循环中调用。
**出处**：[React 官方文档 · 规则参考](https://react.dev/reference/rules)
**相关页**：[api/hooks-api](/zh/api/hooks-api))

## 渲染与提交

### 渲染（Render）
React 调用组件函数并生成虚拟 DOM 的过程。
**出处**：[React 官方文档 · 渲染与提交](https://react.dev/learn/render-and-commit)
**相关页**：[typescript-react/render-method](/zh/typescript-react/render-method))

### 提交（Commit）
React 将虚拟 DOM 的变更应用到真实 DOM 的阶段。
**出处**：[React 官方文档 · 渲染与提交](https://react.dev/learn/render-and-commit)
**相关页**：[source-code/component-mounting](/zh/source-code/component-mounting))

### 批量更新（Batching）
React 将多次状态更新合并为一次重新渲染的机制。
**出处**：[React 官方文档 · 管理状态](https://react.dev/learn/managing-state)
**相关页**：[source-code/use-state-effect](/zh/source-code/use-state-effect))

## 并发特性

### useTransition（useTransition）
将状态更新标记为非紧急，允许 React 中断以优先处理更紧急的更新。
**出处**：[React 官方文档 · useTransition](https://react.dev/reference/react/useTransition)
**相关页**：[api/hooks-api](/zh/api/hooks-api))

### useDeferredValue（useDeferredValue）
延迟更新某个值，使界面在紧急更新期间保持响应。
**出处**：[React 官方文档 · useDeferredValue](https://react.dev/reference/react/useDeferredValue)
**相关页**：[api/hooks-api](/zh/api/hooks-api))

### startTransition（startTransition）
将状态更新包装为非紧急更新的函数。
**出处**：[React 官方文档 · startTransition](https://react.dev/reference/react/startTransition)
**相关页**：[api/hooks-api](/zh/api/hooks-api))

### 并发渲染（Concurrent Rendering）
React 可中断、可恢复的渲染机制，支撑过渡与延迟更新等特性。
**出处**：[React 官方文档 · React Compiler](https://react.dev/learn/react-compiler)
**相关页**：[architecture/concurrent-mode](/zh/architecture/concurrent-mode))、[future/react-concurrent-mode](/zh/future/react-concurrent-mode))

## 服务端渲染与 RSC

### SSR（Server-Side Rendering）
在服务器上渲染 HTML 后发送到客户端，改善首屏与 SEO。
**出处**：[React 官方文档 · 服务端渲染](https://react.dev/reference/react-dom/server)
**相关页**：[ecosystem/ssr](/zh/ecosystem/ssr))、[ecosystem/what-is-ssr](/zh/ecosystem/what-is-ssr))

### 服务端组件（Server Components）
在服务器上运行的组件，其代码不会发送到客户端，可直接访问后端资源。
**出处**：[React 官方文档 · Server Components](https://react.dev/reference/rsc/server-components)
**相关页**：[future/react-server-components](/zh/future/react-server-components))

### 客户端组件（Client Components）
在浏览器中渲染并处理交互的组件，需以 use client 指令标记。
**出处**：[React 官方文档 · use client](https://react.dev/reference/rsc/use-client)
**相关页**：[future/react-server-components](/zh/future/react-server-components))

### 流式渲染（Streaming）
在服务端组件渲染过程中逐步向客户端发送 HTML。
**出处**：[React 官方文档 · renderToPipeableStream](https://react.dev/reference/react-dom/server/renderToPipeableStream)
**相关页**：[ecosystem/ssr](/zh/ecosystem/ssr))

### 水合（Hydration）
客户端接管服务端渲染的 HTML 并附加事件处理的过程。
**出处**：[React 官方文档 · hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot)
**相关页**：[ecosystem/ssr](/zh/ecosystem/ssr))

### SEO（Search Engine Optimization）
通过服务端渲染与语义化 HTML 提升搜索引擎收录效果。
**出处**：[React 官方文档 · 服务端渲染](https://react.dev/reference/react-dom/server)
**相关页**：[ecosystem/ssr-seo](/zh/ecosystem/ssr-seo))

## 生态工具

### React Router（React Router）
React 生态的主流路由库，提供声明式路由与数据加载。
**出处**：[React Router 官方文档](https://reactrouter.com/home)
**相关页**：[ecosystem/react-router](/zh/ecosystem/react-router))、[ecosystem/react-router-setup](/zh/ecosystem/react-router-setup))

### Next.js（Next.js）
基于 React 的全栈框架，提供服务端渲染、路由与构建优化。
**出处**：[Next.js 官方文档](https://nextjs.org/docs)
**相关页**：[ecosystem/nextjs](/zh/ecosystem/nextjs))、[projects/nextjs-overview](/zh/projects/nextjs-overview))

### Redux（Redux）
可预测的状态容器，通过 action 与 reducer 管理全局状态。
**出处**：[Redux 官方文档](https://redux.js.org/introduction/getting-started)
**相关页**：[ecosystem/redux](/zh/ecosystem/redux))

### MobX（MobX）
基于响应式编程的状态管理库，通过可观察状态自动追踪依赖。
**出处**：[MobX 官方文档](https://mobx.js.org/README.html)
**相关页**：[ecosystem/mobx](/zh/ecosystem/mobx))

### Vite（Vite）
基于原生 ESM 的前端构建工具，提供极速开发服务器与生产构建。
**出处**：[Vite 官方文档](https://vite.dev/guide/)
**相关页**：[build-tools/vite](/zh/build-tools/vite))

### Webpack（Webpack）
模块打包工具，将各类资源打包为浏览器可加载的 bundle。
**出处**：[Webpack 官方文档](https://webpack.js.org/concepts/)
**相关页**：[build-tools/webpack](/zh/build-tools/webpack))

### Babel（Babel）
JavaScript 编译器，将新语法与 JSX 转译为兼容代码。
**出处**：[Babel 官方文档](https://babeljs.io/docs/)
**相关页**：[build-tools/babel](/zh/build-tools/babel))

### ESLint（ESLint）
JavaScript 静态代码检查工具，用于发现并修复代码问题。
**出处**：[ESLint 官方文档](https://eslint.org/docs/latest/)
**相关页**：[basics/eslint-prettier](/zh/basics/eslint-prettier))

### Prettier（Prettier）
代码格式化工具，统一代码风格。
**出处**：[Prettier 官方文档](https://prettier.io/docs/en/)
**相关页**：[basics/eslint-prettier](/zh/basics/eslint-prettier))

### Testing Library（Testing Library）
以用户行为为导向的 React 组件测试工具集。
**出处**：[Testing Library 官方文档](https://testing-library.com/docs/)
**相关页**：[ecosystem/testing](/zh/ecosystem/testing))

### Jest（Jest）
JavaScript 测试框架，常用于 React 单元测试与快照测试。
**出处**：[Jest 官方文档](https://jestjs.io/docs/getting-started)
**相关页**：[ecosystem/mocks-snapshots](/zh/ecosystem/mocks-snapshots))

### Vitest（Vitest）
基于 Vite 的测试框架，与 Vite 项目共享配置。
**出处**：[Vitest 官方文档](https://vitest.dev/guide/)
**相关页**：[ecosystem/testing-tools](/zh/ecosystem/testing-tools))

### Taro（Taro）
京东开源的多端统一开发框架，支持用 React 编写小程序与 H5。
**出处**：[Taro 官方文档](https://docs.taro.zone/docs/)
**相关页**：[build-tools/taro](/zh/build-tools/taro))、[build-tools/taro-intro](/zh/build-tools/taro-intro))

### React Native（React Native）
使用 React 构建原生移动应用的框架。
**出处**：[React 官方文档 · React 参考](https://react.dev/reference/react)
**相关页**：[projects/react-native](/zh/projects/react-native))

### TypeScript（TypeScript）
JavaScript 的超集，提供静态类型系统。
**出处**：[TypeScript 官方文档](https://www.typescriptlang.org/docs/)
**相关页**：[typescript-react/typescript-basics](/zh/typescript-react/typescript-basics))

### npm（npm）
Node.js 的包管理工具，用于安装与管理依赖。
**出处**：[npm 官方文档](https://docs.npmjs.com/)
**相关页**：[basics/npm-usage](/zh/basics/npm-usage))

### Node.js（Node.js）
基于事件驱动、非阻塞 I/O 的 JavaScript 运行时。
**出处**：[Node.js 官方文档](https://nodejs.org/en/docs)
**相关页**：[basics/nodejs-setup](/zh/basics/nodejs-setup))

### Git（Git）
分布式版本控制系统，用于代码协作与版本管理。
**出处**：[Git 官方文档](https://git-scm.com/doc)
**相关页**：[basics/project-management](/zh/basics/project-management))

---

**维护口径**：新增条目必须给出可点的权威出处；查不到就写「未找到权威出处（待核）」，不得凭印象编造链接。

<!-- BACKLINKS-AUTO -->
## 相关页面

- [knowledge](knowledge.md)
