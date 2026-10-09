# 知识点总纲

> 本页把散在各部分正文页里的知识点收拢成一页：核心概念、官方文档、应用场景、常见坑。每条注明来源并链接回正文页；正文页查无实据的条目标「来源未考」。正文页没有引用任何外部书籍，权威书籍一节照实记空。

## 核心概念

### 前端基础

- Node.js 是基于 Chrome V8 的 JavaScript 运行时，事件驱动、非阻塞 I/O；nvm 用 `.nvmrc` 锁定项目版本，`nvm use` 自动切换。见[安装与配置 Node.js](basics/nodejs-setup.md)、[使用 nvm 管理 Node.js 版本](basics/nvm-setup.md)。
- npm 是 Node.js 默认包管理器；package.json 的 scripts、dependencies、devDependencies、engines 字段记录项目元数据，package-lock.json 锁定精确版本。Yarn 安装更快、离线支持更好，pnpm 用硬链接省磁盘。见[npm 与包管理工具的使用](basics/npm-usage.md)、[创建与管理项目](basics/project-management.md)。
- HTML 语义化标签（header、nav、main、section、article、aside、footer）带来可读性、SEO、可访问性三方面好处。见[HTML 文档结构](basics/html-structure.md)。
- CSS 优先级顺序为内联样式 > ID 选择器 > 类/属性/伪类选择器 > 类型选择器；继承可用 inherit、initial、unset 关键字控制。见[CSS 的继承与优先级](basics/css-syntax-selectors.md)。
- CSS 盒模型四部分：内容区、内边距、边框、外边距。默认 content-box 下 width/height 只含内容区，border-box 含内边距与边框。Flexbox 是一维布局，Grid 是二维布局；定位分 static、relative、absolute、fixed、sticky 五种。见[CSS 盒模型与布局](basics/css-box-model-layout.md)、[Flexbox 与 Grid](basics/flexbox-grid.md)。
- 响应式设计三原则：流式布局、弹性媒体、媒体查询；站点示例断点 ≤600px 手机、601–900px 平板、≥901px 桌面。见[响应式设计](basics/responsive-design.md)。
- JavaScript 由 Brendan Eich 于 1995 年在 Netscape 开发，最初叫 Mocha，后改名 LiveScript，最终定名 JavaScript。原始类型 7 种：undefined、null、boolean、number、bigint、string、symbol。见[JavaScript 简史与发展](basics/js-history-development.md)、[变量、数据类型与运算符](basics/js-variables-types-operators.md)。
- ES6（2015）一次引入 let/const、箭头函数、class、模板字符串、解构赋值、Promise、Map/Set 等 14 项特性；ES8（2017）引入 async/await，ES11（2020）引入 `??`、`?.`。见[ES6+ 的主要特性](basics/es6-features.md)、[JavaScript 简史与发展](basics/js-history-development.md)。
- Promise 三状态 Pending/Fulfilled/Rejected，then/catch/finally 返回新 Promise 支持链式调用；Promise.all 全部成功才成功，Promise.race 返回第一个完成的。async/await 是基于 Promise 的语法糖，await 只能在 async 函数内使用。见[Promise 与异步编程](basics/js-promise-async.md)。
- ES6 模块化：每个模块只能有一个默认导出，命名导出可多个；好处为代码组织、重用性、依赖管理。见[模块化](basics/js-modules.md)。
- ESLint 9 起官方推荐扁平配置（eslint.config.js），ESLint 8 及更早用 .eslintrc.json；Prettier 3 用 bracketSameLine 替代旧的 jsxBracketSameLine。见[ESLint 与 Prettier 配置](basics/eslint-prettier.md)。

### TypeScript 基础

- TypeScript 是 JavaScript 的超集，所有有效的 JavaScript 代码都是有效的 TypeScript 代码，可渐进式迁移；静态类型检查把错误提前到编译阶段。见[为什么用 TypeScript](typescript-react/why-typescript.md)。
- 基本类型共 10 类：number、string、boolean、array、tuple、enum、any、void、null/undefined、never。any 会绕过类型检查应尽量避免，never 表示从不会发生的值。见[类型与接口](typescript-react/types-interfaces.md)。
- 接口支持可选属性、只读属性、函数类型、可索引类型、继承（extends）与实现（implements）；访问修饰符三种 public（默认）、private、protected；抽象类不能实例化只能继承。见[类型与接口](typescript-react/types-interfaces.md)、[类与泛型](typescript-react/classes-generics.md)。
- 泛型约束 `<T extends Lengthwise>` 确保泛型参数具有特定属性；泛型默认值仅在无法推断时生效。见[类与泛型](typescript-react/classes-generics.md)。
- 模块推荐用于现代项目，命名空间用于旧代码；一个模块只能有一个默认导出。见[模块与命名空间](typescript-react/modules-namespaces.md)。
- tsconfig.json 关键选项：target、module、strict、esModuleInterop、skipLibCheck；Vite 对 TypeScript 原生支持，Webpack 需 ts-loader。见[TypeScript 环境搭建](typescript-react/setup.md)。
- React 18 起官方类型定义中 React.FC 不再隐式包含 children 属性（React 17 及之前隐式包含），如需 children 应在 Props 中显式声明。见[React 与 TypeScript](typescript-react/react-typescript.md)。

### React 核心与组件开发

- 三条设计原则：组件化（每个组件负责自己的状态和渲染逻辑，可嵌套组合）、声明式（描述界面应该是什么样而非如何更新）、单向数据流（数据经 props 从父到子，子不能直接改父数据）。见[React 历史与原则](typescript-react/react-history-principles.md)。
- 虚拟 DOM 工作流程：渲染生成虚拟 DOM 树 → 新旧树对比算差异 → 最小化真实 DOM 操作。见[React 历史与原则](typescript-react/react-history-principles.md)。
- JSX 是 JavaScript 语法扩展，编译时转换为 React.createElement 调用；属性名用驼峰命名，布尔属性可简写，列表渲染每项需唯一 key。见[JSX 语法](typescript-react/jsx-syntax.md)。
- 类组件生命周期三阶段：挂载 constructor → getDerivedStateFromProps → render → componentDidMount；更新 getDerivedStateFromProps → shouldComponentUpdate → render → getSnapshotBeforeUpdate → componentDidUpdate；卸载 componentWillUnmount 清理订阅与定时器。见[组件生命周期](typescript-react/component-lifecycle.md)。
- useEffect 三种依赖模式：空数组只在挂载时执行一次、`[value]` 依赖变化时执行、不传数组每次渲染都执行。见[组件生命周期](typescript-react/component-lifecycle.md)。
- setState 是异步的：更新请求放入队列合并批量处理。对象式更新两次 `setState({ count: this.state.count + 1 })` 都基于同一份旧状态，最终只 +1；函数式更新 `setState(prevState => ...)` 连续两次 +1 最终 +2。第二参数回调在重渲染完成后调用。见[setState](typescript-react/setstate.md)。
- render 是纯函数，不应修改 state/props、不应执行副作用；性能优化三件套为 shouldComponentUpdate、React.memo、PureComponent。见[render 方法](typescript-react/render-method.md)。
- 逻辑复用三种模式：HOC 用组件组合增强功能（不修改原组件、透传所有 props、静态方法需 hoist-non-react-statics 提升）；Render Props 用函数 prop 共享代码；Hooks 用函数复用状态逻辑，更简洁灵活。见[HOC](typescript-react/hoc.md)、[Render Props](typescript-react/render-props.md)。
- Context API 由 createContext、Provider、Consumer 组成，典型场景为主题、用户认证、多语言；Context 变化时所有消费组件重渲染，可用 React.memo/useMemo 缓解。见[Context API](typescript-react/context-api.md)。
- Refs 两种创建方式：React.createRef() 与回调 refs，函数组件用 useRef；用于管理焦点、触发动画、第三方库集成，受控组件不需要 refs。见[Refs](typescript-react/refs.md)。
- Portals 通过 `ReactDOM.createPortal(child, container)` 把组件渲染到组件树外部，典型场景为模态对话框、工具提示、下拉菜单。见[Portals](typescript-react/portals.md)。
- 错误边界需同时实现 static getDerivedStateFromError（渲染备用 UI）与 componentDidCatch（上报错误日志）；不能捕获事件处理函数、异步代码（setTimeout、fetch）与 SSR 中的错误，也不捕获自身错误。见[错误边界](typescript-react/error-boundaries.md)。
- Profiler 组件需 id 与 onRender 两个 props，onRender 回调 7 个参数：id、phase（mount/update）、actualDuration、baseDuration、startTime、commitTime、interactions；仅在开发模式有效。见[Profiler](typescript-react/profiler.md)。
- 合成事件封装原生浏览器事件提供跨浏览器一致接口，通过事件委托附加到根元素；React 16 及之前用事件池复用事件对象，React 17 起移除事件池，异步访问无需再调 event.persist()。见[合成事件](typescript-react/synthetic-events.md)。

### 架构与源码

- Virtual DOM 是描述真实 DOM 结构的轻量级 JavaScript 对象，只存在于内存中；更新流程为状态变化 → 创建新虚拟 DOM 树 → diff → 生成补丁 → 应用到真实 DOM。代价是内存开销与初次渲染仍需建整棵树。见[Virtual DOM](architecture/virtual-dom.md)。
- Fiber 是 React 16 引入的重写架构，把渲染任务分解为可中断、可恢复的工作单元，由调度器按优先级分配执行；Fiber 节点字段含 return、child、sibling、pendingProps、memoizedProps、effectTag（React 17 起更名为 flags）。见[React Fiber 架构详解](architecture/react-fiber.md)。
- Diff 算法只做同层比较（假设 DOM 节点很少跨层级移动），复杂度从 O(n³) 降到 O(n)；根节点类型不同则销毁旧子树整棵重建，key 属性用于列表节点的排序与移动。见[DOM Diff 算法](architecture/dom-diff.md)。
- Fiber 更新机制三步骤：调度 → 协调 → 提交；提交阶段固定为 Before Mutation、Mutation、Layout 三阶段。见[React Fiber 源码解析](source-code/react-fiber.md)。
- 事件委托位置变迁：React 16 将监听器统一挂在 document，React 17 起改挂在渲染容器的根元素（createRoot 传入的 DOM 节点）。见[事件处理](source-code/events.md)。
- 并发渲染：React 18 起官方不再使用 "Concurrent Mode" 说法，改称 Concurrent Rendering，用 createRoot 即默认启用，不需要额外配置；三大核心概念为增量渲染、优先级调度、时间切片。见[并发模式与调度器](architecture/concurrent-mode.md)。
- Hooks 以链表形式存储在 Fiber 节点的 memoizedState 属性，每次渲染按序遍历，因此 Hooks 必须在每次渲染时以相同顺序调用。见[useState 深入](architecture/use-state.md)。
- Hooks 源码分发：useState/useEffect/useContext/useReducer 均经 ReactCurrentDispatcher.current 分发，由 ReactHooks 与 ReactFiberHooks 模块处理。见[Hooks 源码分析](source-code/hooks-source.md)。
- 新旧架构取舍：旧版更新不可中断、长任务阻塞 UI、componentWillMount/componentWillReceiveProps 易引入 bug；新版换来响应性与优先级调度，代价是增量渲染与并发特性的学习曲线。见[新旧架构对比](architecture/old-architecture-comparison.md)。

### API 参考

- React 18 起推荐用 `createRoot` 挂载（从 react-dom/client 导入），ReactDOM.render 被标记为不推荐；createRoot 创建的应用默认在事件处理、生命周期、setTimeout、Promise 等所有场景自动批处理。见[ReactDOM API](api/reactdom-api.md)、[其他 API](api/other-apis.md)。
- Hooks 是 React 16.8 引入的能力，让函数组件使用 state 与其他 React 特性；useLayoutEffect 与 useEffect 的差别在前者在 DOM 更新后、浏览器绘制前同步执行。见[Hooks API](api/hooks-api.md)。
- PureComponent 自动实现 shouldComponentUpdate 浅比较，对嵌套结构的对象/数组可能无法正确判断变化。见[组件 API](api/component-api.md)。
- Context 值变化频繁时有性能问题：拆分更小的 context、用 React.memo/useMemo，或改用 Redux。见[Context API](api/context-api.md)。
- `ReactDOM.unstable_batchedUpdates` 属于 React 16/17 时代，React 18 起仅用于兼容旧代码。见[其他 API](api/other-apis.md)。
- Error Boundaries 在 React 16 引入，只能捕获渲染期间的错误。见[错误边界 API](api/error-boundaries-api.md)。
- Portal 的两个心智模型：事件沿 React 组件树冒泡，CSS 继承与层叠遵循真实 DOM 位置。见[Portals 与 Profiler](api/portals-profiler-api.md)。

### 生态

- React Router 四大基础组件 BrowserRouter、Route、Routes、Link；动态路由参数 `:id` 定义、useParams 读取；路由级代码分割用 React.lazy + Suspense。见[React Router 安装与配置](ecosystem/react-router-setup.md)、[路由参数与动态加载](ecosystem/react-router-params.md)。
- Redux 三大原则：单一数据源、状态只读、纯函数 reducer；异步中间件有 redux-thunk 与 redux-saga；优势是可预测性与 DevTools 时间旅行，代价是学习曲线与样板代码。MobX 三概念 observable、computed、action，配 mobx-react 的 observer 绑定。选型口径：简单全局状态用 Context API，复杂应用大型用 Redux、中小型用 MobX。见[Redux](ecosystem/redux.md)、[MobX](ecosystem/mobx.md)、[状态管理与数据流](ecosystem/state-management.md)。
- SSR 由服务器生成完整 HTML 直出，提高首屏速度与 SEO；React 原生 SSR API 有 renderToString 与 renderToNodeStream（流式）。见[什么是 SSR](ecosystem/what-is-ssr.md)、[SSR 实现](ecosystem/ssr.md)。
- Next.js 数据获取四 API：getStaticProps（SSG）、getStaticPaths（动态路由静态化）、getServerSideProps（每请求 SSR）、getInitialProps（旧式，不推荐新项目）；pages/ 目录文件即路由，pages/api 内置 API 路由。见[Next.js](ecosystem/nextjs.md)。
- SSR 的 SEO 实践：next/head 动态生成 title/meta/OG、next/image 图片优化、next-sitemap 生成 Sitemap 与 robots.txt。见[SSR 与 SEO](ecosystem/ssr-seo.md)。
- 测试三工具：Jest（Facebook 出品，零配置、快照、并行）、Enzyme（Airbnb 出品，浅渲染/完全渲染/静态渲染）、React Testing Library（以用户为中心，测行为而非实现）。六类前端测试：单元、集成、端到端、功能、性能、可访问性；覆盖率建议核心模块 80% 以上。见[React 测试工具](ecosystem/testing-tools.md)、[测试类型与覆盖率](ecosystem/testing.md)。
- 代码质量管理四手段：静态代码分析、格式化、代码审查、测试覆盖率；工具为 ESLint、Prettier、SonarQube、Codecov，CI 里跑 `npx eslint .` 与 `npx prettier --check .`。见[持续集成与代码质量管理](ecosystem/ci-code-quality.md)。

### 未来

- 并发渲染三大支柱：lanes 位掩码优先级车道、workLoopAsync + shouldYield() 时间切片、current 与 workInProgress 双缓冲树（完成后原子切换，中断即丢弃）。车道常量 SyncLane=1、InputContinuousLane=4、DefaultLane=16、TransitionLane=64、IdleLane=1024；同步渲染下大列表首屏可阻塞主线程 200ms 以上。见[并发渲染](future/react-concurrent-mode.md)。
- 非阻塞更新 API：useTransition（isPending + startTransition 标记低优先级）、useDeferredValue（派生值可复用上一帧）；flushSync 仅用于必须同步的场景（测量、聚焦）。见[并发渲染](future/react-concurrent-mode.md)。
- 开发环境严格模式双重调用：useState 初始化函数执行 2 次、useEffect 挂载后卸载再重新挂载、组件函数体执行 2 次，用于暴露副作用清理缺失。见[并发渲染](future/react-concurrent-mode.md)。
- React 19 新 Hook：use（可读 Promise/Context，不受 Hook 规则限制）、useOptimistic（乐观更新，失败自动回滚）、useActionState/useFormStatus（表单 Action 与 pending 状态）；`<Title>/<Meta>/<Link>` 自动提升到 head 替代 react-helmet。见[React 19 新特性](future/react-new-features.md)。
- React Compiler（前身 React Forget）编译时自动注入 memo/useMemo/useCallback 等价逻辑，零运行时开销，`"use no memo"` 可退出；v1.0 已于 React Conf 2025 开源发布，支持 React 17+，按构建配置 opt-in 启用。不优化库代码、forwardRef 组件与动态 import() 组件。见[React Compiler 与新方向](future/react-future.md)。
- RSC 范式：组件在服务端运行、零客户端 JS、直连数据层；`"use client"` 划边界，Flight 协议流式序列化，Server Actions 直连服务端突变。性能基准（Next.js 14+ App Router）：TTFB 约 50ms（CSR）/200ms（SSR+Hydration）/100ms（RSC），TTI 约 1200/800/400ms，JS 体积 200-500KB/150-400KB/50-150KB。见[Server Components](future/react-server-components.md)。
- RFC 流程：Idea → RFC PR → 探索/实现（Canary）→ 稳定（Minor）→ 弃用（Major）。RFC 状态快照（2024-2025）：#229 use Hook 已合并进 19、#271 Server Actions 已合并进 19、#299 React Compiler 实现中、#309 Offscreen 讨论中（后更名 Activity，最终 API 为 `<Activity mode="hidden|visible">`）。见[社区与 RFC](future/react-community.md)。
- 主流库适配（2024-10 截面）：React Router v7 beta 支持 RSC；Recoil 处于维护模式且无 RSC 计划（建议迁 Jotai/Zustand）；Chakra UI v2 维护模式（建议迁 Panda CSS/shadcn）；TanStack Query v5 为取数首选，Vitest + RTL 为现代测试首选组合。见[社区与 RFC](future/react-community.md)。
- 团队跟进原则「跟进不等于追新」：每项新特性或升级走收益评估 → 试用验证 → 灰度发布三步。React 19 升级清单硬性项：react@19 与 @types/react@19、eslint-plugin-react-hooks@5、typescript 5.5+、CI Node 升至 20/22 LTS、灰度 5% 流量 48 小时验收。见[社区与 RFC](future/react-community.md)。

### 构建工具

- Webpack 核心五概念 Entry、Output、Module、Loader、Plugin；优化四板斧为代码分割（`splitChunks: { chunks: 'all' }`）、Tree Shaking（需 `mode: 'production'` 且使用 ES6 模块）、长效缓存（`filename: '[name].[contenthash].js'`）、TerserPlugin 压缩。见[Webpack](build-tools/webpack.md)。
- Webpack 5 用内置资源模块（`type: 'asset/resource'`）处理图片，file-loader/url-loader 不再需要；webpack-dev-server 4+ 用 `devServer.static` 指定静态目录。常用插件：HtmlWebpackPlugin、MiniCssExtractPlugin、TerserPlugin。见[Webpack](build-tools/webpack.md)。
- Vite 开发模式用原生 ES 模块提供无包开发服务器与快速 HMR，生产构建用 Rollup；未配置 server.port 时默认端口 5173。见[Vite](build-tools/vite.md)、[构建工具概览](build-tools/build-tools-overview.md)。
- Babel 三件套 @babel/core、@babel/preset-env、babel-loader；React 项目另加 @babel/preset-react 支持 JSX；babel-loader 的 rule 必须 `exclude: /node_modules/`。见[Babel](build-tools/babel.md)。
- Taro 是京东凹凸实验室的开源框架，一套代码编译到微信/支付宝/字节跳动小程序、H5、React Native、快应用；构建命令类型映射 weapp/alipay/swan/tt/h5；React Router 在小程序端不可用，路由由内置 @tarojs/router 接管。见[Taro 简介](build-tools/taro-intro.md)、[Taro 构建与发布](build-tools/taro-build.md)、[Taro 中的 React 开发](build-tools/taro-react.md)。
- Taro 兼容性靠条件编译：JS 里 `Taro.getEnv() === Taro.ENV_TYPE.WEAPP`，样式里 `/* #ifdef weapp */` 注释或平台后缀文件（index.weapp.scss）。见[Taro 兼容性处理](build-tools/taro-compatibility.md)。
- CI/CD：GitHub Actions 工作流放 .github/workflows/ci.yml，actions/checkout@v4 + actions/setup-node@v4（Node 20）+ npm ci；部署示例注入 secrets.VERCEL_TOKEN 执行 `npx vercel deploy --prod --yes`，用 `if: github.ref == 'refs/heads/main'` 限定 main 分支。见[自动化与 CI/CD](build-tools/automation-ci-cd.md)。

### 项目实战

- Todo 应用全链路：需求分析（增删改、标记完成、筛选）→ 组件划分 App/TodoList/TodoItem/TodoForm/Filters → useReducer + todoReducer 管理状态 → Redux 集成（Provider 包裹 + useSelector/useDispatch）→ `npm run build` 产出 build 目录托管。见[Todo 需求与设计](projects/todo-requirements.md)、[Todo 开发](projects/todo-development.md)、[Redux 集成](projects/todo-redux.md)、[Todo 部署](projects/todo-deployment.md)。
- 性能优化落地项：React.lazy + Suspense 代码分割、Tree Shaking、CDN、图片懒加载与压缩（ImageOptim/Squoosh/SVG 代替位图）、Webpack Bundle Analyzer 分析包体、Lighthouse/WebPageTest/Sentry 监控。见[Todo 部署](projects/todo-deployment.md)。
- Next.js 五大特性：SSR、SSG、自动化代码分割、文件系统路由、API 路由；ISR 示例 `revalidate: 10` 表示 10 秒后重新生成页面。见[Next.js 简介](projects/nextjs-overview.md)。
- React Native 一套代码开发 Android 与 iOS，JS 线程 + 原生线程 + 桥接通信；创建项目官方推荐 Expo（`npx create-expo-app`），需要原生能力时用 RN CLI；样式单位为 dp，导航用 React Navigation。见[React Native](projects/react-native.md)。
- React Native 0.76 起内置新调试器（基于 Chrome DevTools 协议、配合 Hermes 引擎），Flipper 已停止维护。见[React Native](projects/react-native.md)。
- CI 三工具配置差异：GitHub Actions（setup-node 带 `cache: 'npm'`）、CircleCI（version 2.1，镜像 cimg/node:20.18，支持并行）、GitLab CI（stages: build/test，可视化管道）。完整流程五步：提交 → CI 构建/测试/质量检查 → 构建成功触发 CD → 自动部署 → 监控反馈。见[持续集成与持续部署实战](projects/ci-cd.md)。

### 时间线

- 四个 Era 分期：萌芽与开源（2010-2015）、重写内核（2016-2019）、并发与服务器（2020-2024）、编译器时代（2025-2026）；全表 26 个节点、4 个主题标签。见[发展史时间线](timeline.md)。
- 关键节点：2013 年 5 月 React 0.3.0 开源（JSConf US）；2015 年 3 月 React Native 开源、9 月拆出 react-dom；2016 年 7 月 Create React App 发布；2017 年 9 月 React 16 落地 Fiber；2019 年 2 月 React 16.8 稳定 Hooks；2020 年 10 月 React 17（零新特性）；2022 年 3 月 React 18 开放并发特性；2024 年 12 月 React 19（use、Actions、ref 作为 prop、文档化 RSC）；2025 年 10 月 React Compiler v1.0 GA、Activity 随 19.2 出货。见[发展史时间线](timeline.md)。
- 数据口径：年份取「宣布或发布」时点而非被广泛接受时点。Hooks 2018 年 10 月 React Conf 预览、2019 年 2 月才随 16.8 稳定；Server Components 2020 年 12 月首演、规模化落地要等 2022 年 10 月的 Next.js App Router。见[关于这份数据的口径](timeline.md#关于这份数据的口径)。

## 权威书籍要点

九个部分全部正文页通读后没有发现任何书籍引用。正文里的书名号只出现本站自己的章节名（如《React.js 全面指南》《第5章：TypeScript 基础》），不是外部书目。本节照实记空：站内知识来自官方文档、RFC 与社区文章，没有书目支撑，来源未考。

## 官方文档要点（带链接）

站内正文实际引用的官方文档与权威站点按主题收拢如下。

React 官方：

- [React 18 发布博客](https://react.dev/blog/2022/03/29/react-v18)：并发特性的官方出处。见[并发渲染](future/react-concurrent-mode.md)。
- [React 19 RC 发布日志](https://react.dev/blog/2024/12/05/react-19)：React 19 新特性汇总的权威出处。见[React 19 新特性](future/react-new-features.md)。
- [React 官方文档·列表渲染](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-keys)：key 与列表顺序的官方说明。见[并发渲染](future/react-concurrent-mode.md)。
- [React 官方博客](https://react.dev/blog)：版本与特性信息源。见[社区与 RFC](future/react-community.md)。
- [React Conf](https://conf.react.dev/)：Compiler 与 Activity 的发布场合。见[React Compiler 与新方向](future/react-future.md)。
- [React DevTools](https://github.com/facebook/react-devtools)：Profiler 数据的图形界面。见[社区与 RFC](future/react-community.md)。
- [reactjs.org 文档](https://reactjs.org/docs/getting-started.html)：安装 React DevTools 的说明页。见[Profiler](typescript-react/profiler.md)。

RFC 仓库（React 特性从提案到落地的标准路径）：

- [RFC #229 use Hook](https://github.com/reactjs/rfcs/pull/229)：已合并进 React 19。见[React 19 新特性](future/react-new-features.md)。
- [RFC #271 Server Actions](https://github.com/reactjs/rfcs/pull/271)：已合并进 React 19。见[React 19 新特性](future/react-new-features.md)。
- [RFC #299 React Compiler](https://github.com/reactjs/rfcs/pull/299)：实现中。见[React Compiler 与新方向](future/react-future.md)。
- [RFC #227 Server Components](https://github.com/reactjs/rfcs/pull/227)：RSC 规范提案。见[React Compiler 与新方向](future/react-future.md)、[Server Components](future/react-server-components.md)。
- [RFC #309 Offscreen API](https://github.com/reactjs/rfcs/pull/309)：讨论中，后更名 Activity。见[React Compiler 与新方向](future/react-future.md)。
- [Server Components 文本规范](https://github.com/reactjs/rfcs/blob/main/text/0022-server-components.md)：React Flight 协议规范。见[Server Components](future/react-server-components.md)。
- [React RFC 仓库](https://github.com/reactjs/rfcs)：全部提案的总入口。见[社区与 RFC](future/react-community.md)。
- [Concurrent Mode 设计文档](https://github.com/acdlite/rfcs/blob/main/text/0008-concurrent-mode.md)：Fiber 与并发调度的早期设计。见[并发渲染](future/react-concurrent-mode.md)。

Next.js 官方：

- [Next.js App Router 文档](https://nextjs.org/docs/app)：RSC 生产落地的框架文档。见[Server Components](future/react-server-components.md)。
- [Server Actions 深度指南](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)：Server Actions 官方指南。见[Server Components](future/react-server-components.md)。
- [Next.js 博客](https://nextjs.org/blog)：App Router 与 RSC 落地信息源。见[社区与 RFC](future/react-community.md)。

路由与状态库：

- [React Router v7 迁移指南](https://reactrouter.com/start/declarative/routing)：v7 支持 RSC 的迁移说明。见[社区与 RFC](future/react-community.md)。
- [TanStack Router](https://tanstack.com/router)与[TanStack 博客](https://tanstack.com/blog)：React Router 的继任方案与信息源。见[社区与 RFC](future/react-community.md)。

React Native 生态：

- [React Native 官方文档](https://reactnative.dev/docs/getting-started)、[React Navigation](https://reactnavigation.org/docs/getting-started)、[Expo](https://docs.expo.dev/)：RN 学习、导航与脚手架的官方文档。见[React Native](projects/react-native.md)。
- [Watchman 安装文档](https://facebook.github.io/watchman/docs/install)：macOS 开发 iOS 需装的文件监控工具。见[React Native](projects/react-native.md)。

前端基础工具链：

- [Node.js 官网](https://nodejs.org/)：下载最新 LTS 安装程序。见[安装与配置 Node.js](basics/nodejs-setup.md)。
- [nvm 安装脚本](https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh)与[nvm-windows 发布页](https://github.com/coreybutler/nvm-windows/releases)：Unix 与 Windows 的 nvm 安装入口。见[安装与配置 Node.js](basics/nodejs-setup.md)、[使用 nvm 管理 Node.js 版本](basics/nvm-setup.md)。
- [Vite 官网](https://vitejs.dev/)：CRA 进入维护模式后官方建议的新项目脚手架。见[TypeScript 基础](typescript-react/typescript-basics.md)。
- [VSCode TypeScript Next 扩展](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)：尝鲜最新版语言服务。见[TypeScript 环境搭建](typescript-react/setup.md)。

部署与性能监控：

- [Netlify](https://www.netlify.com/)、[Vercel](https://vercel.com/)、[GitHub Pages](https://pages.github.com/)、[AWS S3](https://aws.amazon.com/s3/)、[Google Cloud Storage](https://cloud.google.com/storage)、[Nginx](https://www.nginx.com/)、[Apache](https://httpd.apache.org/)：静态托管与自托管平台。见[Todo 部署](projects/todo-deployment.md)。
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)、[WebPageTest](https://www.webpagetest.org/)、[Sentry](https://sentry.io/)：性能监控与错误上报。见[Todo 部署](projects/todo-deployment.md)。
- [ImageOptim](https://imageoptim.com/)、[Squoosh](https://squoosh.app/)：图片压缩工具。见[Todo 部署](projects/todo-deployment.md)。

小程序平台：

- [微信公众平台](https://mp.weixin.qq.com/)、[支付宝开发者工具](https://opensupport.alipay.com/)、[支付宝开放平台](https://open.alipay.com/)：小程序上传、提交审核与发布入口。见[Taro 构建与发布](build-tools/taro-build.md)。

社区信息源：

- [Reactiflux Discord](https://discord.gg/reactiflux)、[This Week In React 周刊](https://thisweekinreact.com/)：社区讨论与周报。见[社区与 RFC](future/react-community.md)。

## 应用场景

- 搭建前端开发环境：Node.js LTS + nvm 按项目切版本 + npm 管依赖 + ESLint/Prettier 保障质量。见[安装与配置 Node.js](basics/nodejs-setup.md)、[ESLint 与 Prettier 配置](basics/eslint-prettier.md)。
- 构建网页结构与样式：HTML 语义化文档 + CSS 选择器/盒模型 + Flexbox/Grid 布局 + 媒体查询适配多设备。见[HTML 文档结构](basics/html-structure.md)、[Flexbox 与 Grid](basics/flexbox-grid.md)、[响应式设计](basics/responsive-design.md)。
- 编写现代 JavaScript 应用：ES6+ 语法、模块化组织代码、async/await 处理网络请求。见[ES6+ 的主要特性](basics/es6-features.md)、[Promise 与异步编程](basics/js-promise-async.md)。
- 跨多端业务：Taro 一套代码编译到微信/支付宝/字节跳动小程序、H5、React Native、快应用。见[Taro 简介](build-tools/taro-intro.md)。
- SEO 与首屏性能优先的内容站：Next.js 按页面选 SSG/SSR/ISR，配 Head 管理元数据、next/image 优化图片。见[Next.js 简介](projects/nextjs-overview.md)、[SSR 与 SEO](ecosystem/ssr-seo.md)。
- 小团队快速上线并持续迭代：`npm run build` 后托管到 Netlify/Vercel/GitHub Pages，GitHub Actions 实现「提交即构建测试部署」。见[Todo 部署](projects/todo-deployment.md)、[自动化与 CI/CD](build-tools/automation-ci-cd.md)。
- 主题切换：createContext 创建 → Provider 提供 `{ theme, toggleTheme }` → useContext 消费切换 light/dark，React.memo 包裹消费组件减少不必要渲染。见[Context API](api/context-api.md)。
- 模态框、提示框、对话框等浮层：ReactDOM.createPortal 渲染到文档根节点，避免被父组件 CSS 影响、确保位于视口顶层。见[Portals 与 Profiler](api/portals-profiler-api.md)。
- 性能调优与监控：开发阶段用 Profiler 的 onRender 数据找出渲染耗时过长的组件，生产环境持续监控。见[Portals 与 Profiler](api/portals-profiler-api.md)。
- 中小型项目免引库的全局状态：Context + useReducer 管理用户认证、主题、购物车等多组件共享状态。见[Context 与 useReducer 组合](ecosystem/context-reducer.md)。
- React 19 表单与高频交互改造：useOptimistic 用于点赞、收藏、表单提交的无感刷新；`<form action={asyncFn}>` + Server Action 替代 onSubmit + fetch 手写模式。见[React 19 新特性](future/react-new-features.md)。
- 自定义 Hook 复用逻辑：useFetchUser 复用数据获取、useForm 复用表单逻辑、useLocalStorage 持久化；测试用 renderHook。见[自定义 Hooks](architecture/custom-hooks.md)。

## 常见坑误区

### 前端基础

1. var 的变量提升与函数作用域是 bug 温床，用 let/const 块级作用域替代。见[变量、数据类型与运算符](basics/js-variables-types-operators.md)。
2. `==` 会类型转换（`5 == '5'` 为 true），比较一律用严格相等 `===`。见[变量、数据类型与运算符](basics/js-variables-types-operators.md)。
3. const 声明后不可重新赋值，`PI = 3.14159` 直接抛错。见[ES6+ 的主要特性](basics/es6-features.md)。
4. 箭头函数不绑定 this，需要自身 this 的场景（如对象方法）不要用箭头函数。见[ES6+ 的主要特性](basics/es6-features.md)。
5. 传统回调嵌套出回调地狱，用 Promise 链或 async/await 改写；await 只能写在 async 函数内。见[Promise 与异步编程](basics/js-promise-async.md)。
6. 默认 content-box 下 width/height 只描述内容区，实际占位还要加 padding 和 border，需要直观尺寸时设 `box-sizing: border-box`。见[CSS 盒模型与布局](basics/css-box-model-layout.md)。
7. CSS 嵌套建议不超过 3 层，过深降低可读性。见[CSS 变量与嵌套](basics/css-variables-nesting.md)。
8. ESLint 8 的 .eslintrc.json 与 ESLint 9 的扁平配置不要混用，新项目直接用 eslint.config.js；Prettier 3 的 bracketSameLine 已替代 jsxBracketSameLine。见[ESLint 与 Prettier 配置](basics/eslint-prettier.md)。
9. Atom 已于 2022 年 12 月被 GitHub 归档停止维护，新项目选 VSCode 或社区延续分支 Pulsar。见[编辑器与工具链](basics/editor-tools.md)。

### React 核心与组件开发

1. 对象式 setState 合并陷阱：连续两次 `setState({ count: this.state.count + 1 })` 最终只 +1，函数式更新才 +2。见[setState](typescript-react/setstate.md)。
2. `this.state.count += 1` 直接改 state 会绕过更新机制，必须走 setState。见[setState](typescript-react/setstate.md)。
3. 函数组件 defaultProps 已弃用：React 18.3 起控制台告警、React 19 移除，改用函数默认参数。见[State 与 Props](typescript-react/state-props.md)。
4. render 里做网络请求或 DOM 操作是错的，副作用放 componentDidMount 或 useEffect。见[render 方法](typescript-react/render-method.md)。
5. React 16 的事件池会让异步访问事件对象拿到空属性（需提取属性或 event.persist()）；React 17 起已移除，老写法可删。见[合成事件](typescript-react/synthetic-events.md)。
6. HOC 包装后原组件静态方法丢失，用 hoist-non-react-statics 提升。见[HOC](typescript-react/hoc.md)。
7. Context 滥用导致组件紧耦合：局部数据用 props，Context 变化引起的全量重渲染用 React.memo/useMemo 缓解。见[Context API](typescript-react/context-api.md)。
8. 受控组件里不该用 refs 直接操作 DOM，状态和行为应由 state 管理；函数组件用 useRef 而非 createRef。见[Refs](typescript-react/refs.md)。
9. 错误边界三不管：事件处理函数、异步代码、自身错误各自要另想办法（try-catch、异步自身处理、外层再包一层）。见[错误边界](typescript-react/error-boundaries.md)。
10. any 绕过 TypeScript 检查，用 unknown 强制检查；React 18 起 React.FC 不再隐式含 children，需在 Props 显式声明。见[React 与 TypeScript](typescript-react/react-typescript.md)。
11. 渲染方法里的内联函数每次渲染新建实例，引发不必要重渲染，用 useCallback 优化。见[Profiler](typescript-react/profiler.md)、[Render Props](typescript-react/render-props.md)。

### 架构与源码

1. Hooks 顺序不能变：不要在条件/循环里调用 Hooks，否则 React 无法按链表顺序对应状态。见[useState 深入](architecture/use-state.md)。
2. useEffect 依赖数组写错的两种翻车：省略数组导致每次渲染都执行，写错依赖导致该执行不执行或反复执行。见[useEffect 深入](architecture/use-effect.md)。
3. 自定义 Hook 的副作用不清理会造成内存泄漏，数据获取与事件监听必须在 useEffect 里清理。见[自定义 Hooks](architecture/custom-hooks.md)。
4. "Concurrent Mode" 说法已过时，React 18 改称 Concurrent Rendering；用 createRoot 即默认启用，不存在要手动开的开关。见[并发模式与调度器](architecture/concurrent-mode.md)。
5. Diff 根节点类型不同会整棵子树销毁重建，不是细粒度更新；列表不用 key 会触发节点重建与排序。见[DOM Diff 算法](architecture/dom-diff.md)。
6. setState 不立即生效：只是把更新请求加入队列，下一个渲染周期才处理，不要假设同步读到新值。见[useState 与 useEffect 源码](source-code/use-state-effect.md)。
7. JSX 里匿名函数绑定事件每次渲染创建新函数实例，处理函数提取到组件外部或用 useCallback。见[事件处理](source-code/events.md)。
8. Context 的 Provider value 若每次渲染新建对象，会触发下层全部 Consumer 重渲染，用 useMemo/useCallback 缓存值。见[Context API 源码](source-code/context-api.md)。
9. 旧生命周期 componentWillMount/componentWillReceiveProps 易引入难以察觉的 bug，已在 16.3 重构中逐步弃用。见[新旧架构对比](architecture/old-architecture-comparison.md)、[生命周期](source-code/lifecycle.md)。

### API 与生态

1. ReactDOM.render 在 React 18 后不推荐，用 createRoot；findDOMNode 不推荐，改用 ref。见[ReactDOM API](api/reactdom-api.md)。
2. PureComponent 浅比较对嵌套对象/数组可能误判，需保证比较机制适用于数据结构。见[组件 API](api/component-api.md)。
3. unstable_batchedUpdates 是 React 16/17 时代 API，React 18 默认全场景自动批处理，仅兼容旧代码时保留。见[其他 API](api/other-apis.md)。
4. React.lazy 只能用于默认导出的组件，Suspense 必须包裹使用它的组件。见[路由参数与动态加载](ecosystem/react-router-params.md)。
5. Context + useReducer 在大规模应用频繁更新时影响性能，按实际需求设计 Context 作用范围，不过度全局化。见[Context 与 useReducer 组合](ecosystem/context-reducer.md)。
6. getInitialProps 是旧式数据获取，新项目用 getStaticProps/getServerSideProps。见[Next.js](ecosystem/nextjs.md)。
7. 并发模式四误区：它不让总工作量变少只是感知更快；不是所有 setState 都要 useTransition（点击/表单提交保持同步）；Suspense 不只用于代码分割（React 18+ 支持数据获取）；useLayoutEffect 语义不破坏只是调度时机微调。见[并发渲染](future/react-concurrent-mode.md)。
8. 内联箭头函数、内联 style 每次渲染产生新引用破坏 memo，用 useCallback/useMemo 保持稳定引用；flushSync 滥用会让应用退化为同步渲染。见[并发渲染](future/react-concurrent-mode.md)。
9. Server Component 里用 useState/Hooks 直接报错，交互部分拆为 `"use client"` 组件；客户端组件引服务端模块（如 db）同样报错，改走 Server Action 或服务端取数经 Props 下传。见[Server Components](future/react-server-components.md)。
10. RSC 跨边界 Props 只能传可序列化值：函数、Ref、类实例、Symbol、DOM 节点、循环引用均禁止。见[Server Components](future/react-server-components.md)。
11. Next.js fetch 缓存有版本差异：14 默认强缓存，15 起默认不缓存，需要缓存须显式 `cache: 'force-cache'`。见[Server Components](future/react-server-components.md)。
12. React Compiler 不优化库代码、forwardRef 组件、动态 import() 组件，且有误优化副作用组件的风险；应对是启用 eslint-plugin-react-compiler、分阶段灰度、保留人工 memo 兜底。见[React Compiler 与新方向](future/react-future.md)。

### 构建工具与项目实战

1. CRA 已被官方标记为不再推荐，不再接收新特性；新项目用 Vite（`npm create vite@latest`）或 Next.js，组件代码换脚手架通用。见[Todo 开发](projects/todo-development.md)、[TypeScript 基础](typescript-react/typescript-basics.md)。
2. Enzyme 基本停止维护且无 React 18 适配器，新项目用 RTL；react-test-renderer 自 18.3 deprecated、React 19 移除，快照改用 `render(...).asFragment()`。见[React 测试工具](projects/testing-tools.md)。
3. React Router 在 Taro 小程序端不可用，路由由内置 @tarojs/router 接管，用 Taro.navigateTo 跳转。见[Taro 中的 React 开发](build-tools/taro-react.md)。
4. 微信已废弃 getUserInfo，改用 getUserProfile（desc 必填）；2022 年后进一步收紧，推荐头像昵称填写能力。见[Taro API](build-tools/taro-api.md)。
5. react-redux v8 起内置 TypeScript 类型，无需再装 @types/react-redux（那是 v7 及更早的事）。见[Todo 开发](projects/todo-development.md)。
6. Tree Shaking 只在 `mode: 'production'` 且使用 ES6 模块时生效，否则删不掉未使用代码。见[Webpack](build-tools/webpack.md)。
7. babel-loader 必须 `exclude: /node_modules/`，否则转译依赖拖慢构建；webpack-dev-server 4+ 静态目录改用 `devServer.static`。见[Babel](build-tools/babel.md)、[Webpack](build-tools/webpack.md)。
8. Flipper 已停止维护，RN 0.76 起用内置新调试器。见[React Native](projects/react-native.md)。
9. 同文案多元素测试会踩 getByText 匹配多条报错，改用 `getAllByText('Delete')[0]`。见[Todo 应用](projects/todo-app.md)。
10. Vite 改 `root: './src'` 后必须把 index.html 一起移进 src，否则入口找不到。见[Vite](build-tools/vite.md)。
11. 时间线年份是「宣布或发布」时点，不是被广泛接受的时点：Hooks 预览到稳定隔了近半年，RSC 首演到规模化落地隔了近两年。见[关于这份数据的口径](timeline.md#关于这份数据的口径)。

## 资料体系

- 版本口径：各部分写作时点不同。API 部分正文以 React 18 为准，各页附「React 18 → 19 版本对照」表（移除、弃用、新增与替代方案）；未来部分基于 React 18.3+ 与 Canary 版本，部分 API 处于实验阶段；时间线覆盖 2010-2026 共 26 个节点。引用时以各部分标注的版本为准。
- 弃用 API 汇总：ReactDOM.render → createRoot；函数组件 defaultProps → 默认参数（18.3 告警、19 移除）；findDOMNode → ref；合成事件池 → React 17 移除；getInitialProps → getStaticProps/getServerSideProps；react-test-renderer → 18.3 起弃用、19 起告警，迁移至 RTL；Enzyme → RTL；Flipper → RN 内置调试器；CRA → Vite/Next.js。
- 来源未考：architecture、source-code 两个部分全部页面没有外部链接，这些页面的知识为站内整理，未考外部出处；api 部分的版本对照节引用 React 官方升级指南，其余条目仍为站内整理；basics、typescript-react、ecosystem 仅少量页面带链接，官方文档一节的 React 官方与 RFC 条目集中在 future 部分。
- 交叉链接：本页所有站内链接指向正文页与锚点；各部分之间的章节对应关系见各部分 README 与[首页目录](/)。
