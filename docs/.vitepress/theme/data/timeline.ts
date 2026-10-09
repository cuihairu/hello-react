// React 发展史时间线（2010 → 2026）
// 每条记录回答：这件事为什么发生在那个时点，它回应了上一阶段的什么痛点。
// field 用于筛选：core 核心版本 / concurrent 并发与渲染 / ecosystem 生态与工具 / future 走向未来
// link 一律指向站内真实章节，冲突时以各章正文核实口径为准。

export interface TimelineEvent {
  year: number
  title: string
  who: string
  field: 'core' | 'concurrent' | 'ecosystem' | 'future'
  why: string
  link?: string
}

export const FIELD_LABELS: Record<TimelineEvent['field'], string> = {
  core: '核心版本',
  concurrent: '并发与渲染',
  ecosystem: '生态与工具',
  future: '走向未来',
}

export const ERAS = [
  {
    name: '萌芽与开源',
    from: 2010,
    to: 2015,
    intro: '组件模型在 Facebook 内部成形，开源后两年里拆包、跨端、长出状态管理生态。React 从一个内部工具长成前端的默认选项。',
  },
  {
    name: '重写内核',
    from: 2016,
    to: 2019,
    intro: '为换回帧预算，团队把协调器推倒重写为 Fiber；内核就位后，Hooks 用一次范式转移收束了类组件时代。',
  },
  {
    name: '并发与服务器',
    from: 2020,
    to: 2024,
    intro: '并发渲染开放，Server Components 从演示走到生产。渲染变成可协商的资源，组件的运行位置也第一次成为可选。',
  },
  {
    name: '编译器时代',
    from: 2025,
    to: 2026,
    intro: '优化交给编译器，保活与调度交给官方原语。React 把前十五年攒下的架构红利，换成开发者不必再学的心智。',
  },
]

export const TIMELINE: TimelineEvent[] = [
  {
    year: 2010,
    title: 'XHP 开源：JSX 的远祖',
    who: 'Facebook',
    field: 'core',
    why: 'Facebook 的 PHP 页面靠拼接字符串，转义与组件边界全靠人肉检查。XHP 把 XML 组件写进 PHP 语言层，非法嵌套直接报错。它是 JSX「组件即语言特性」思路的直接源头，Jordan Walke 后来把这套表达搬进了浏览器里的 JavaScript。',
    link: '/typescript-react/jsx-syntax',
  },
  {
    year: 2011,
    title: 'FaxJS 原型：React 的前身',
    who: 'Jordan Walke',
    field: 'core',
    why: '信息流 UI 状态多、更新密，手工同步 DOM 让状态管理成为 bug 温床。FaxJS 试验「状态变化即整树重渲染、DOM 只做差量落盘」，News Feed 的搜索模块用它上了线。声明式加 Virtual DOM 的组合就是 React 的内核。',
    link: '/architecture/virtual-dom',
  },
  {
    year: 2013,
    title: 'React 0.3.0 开源',
    who: 'Jordan Walke、Christopher Chedeau（JSConf US，5 月）',
    field: 'core',
    why: '时间线与 Instagram 的内部验证完成后，Facebook 决定把方案交给社区检验。当时主流是细粒度数据绑定，「每次全量重渲染」被普遍质疑性能；事实证明 diff 足够快、心智模型足够简单，前端就此换范式。',
    link: '/typescript-react/react-history-principles',
  },
  {
    year: 2014,
    title: 'v0.11 与 v0.12：JSX 语义收紧',
    who: 'React 团队',
    field: 'core',
    why: '开源第一年 API 高速演进：0.11 规范属性与子节点行为，0.12 统一 JSX 转译工具（JSTransform、react-tools）并调整渲染入口。这套「编译期转译 JSX」的路径，后来由 Babel 接棒并沿用至今。',
    link: '/typescript-react/react-basics',
  },
  {
    year: 2015,
    title: 'v0.13：ES6 class 组件',
    who: 'React 团队（2 月）',
    field: 'core',
    why: 'ES6 定稿在即，社区要求摆脱 createClass 与自动绑定。0.13 允许 class extends React.Component，this 绑定交还给开发者，React 从此生长在 JS 标准语法上，而不是自造的类系统里。',
    link: '/typescript-react/component-development',
  },
  {
    year: 2015,
    title: 'React Native 开源',
    who: 'Facebook（3 月）',
    field: 'ecosystem',
    why: 'Web 上验证过的组件模型完全可以搬到原生：「learn once, write anywhere」。JS 与原生的桥让前端工程师第一次能直接产出 iOS/Android 应用，React 的组件生态就此跨端。',
    link: '/projects/react-native',
  },
  {
    year: 2015,
    title: 'Redux 亮相',
    who: 'Dan Abramov、Andrew Clark（5 至 6 月）',
    field: 'ecosystem',
    why: 'Flux 生态当时群雄混战，各家 store 实现互不兼容。Dan Abramov 借鉴 Elm 架构，把状态收进单一 store、变更收进纯函数 reducer，用「可预测」终结混战；此后数年它是 React 状态管理的默认答案。',
    link: '/ecosystem/redux',
  },
  {
    year: 2015,
    title: 'v0.14：拆出 react-dom',
    who: 'React 团队（9 月）',
    field: 'core',
    why: 'React Native 成熟后，「组件模型」与「浏览器渲染」必须解耦：React 包只管组件与协调，ReactDOM 只管 DOM 渲染。这次拆分为后来的多渲染器（native、测试、自定义）定了型。',
    link: '/api/reactdom-api',
  },
  {
    year: 2016,
    title: 'Create React App 发布',
    who: 'Dan Abramov 等（7 月）',
    field: 'ecosystem',
    why: 'webpack 与 babel 的配置是当时新手最大的劝退点。CRA 用一条命令给出开箱即用的脚手架，把「配环境」从学习路径里拿掉，React 教学自此有了统一起点，多年后才由 Vite 接棒。',
    link: '/build-tools/build-tools-overview',
  },
  {
    year: 2016,
    title: 'Fiber 架构公开',
    who: 'React 团队、Andrew Clark（下半年）',
    field: 'concurrent',
    why: '递归 diff 一旦开始就停不下来，长列表更新能把帧时间顶爆。团队公开 Fiber 重写计划：把协调拆成可中断、可恢复的工作单元，按优先级调度。架构文档与 ReactNext 演讲让社区第一次看清方向。',
    link: '/architecture/react-fiber',
  },
  {
    year: 2017,
    title: 'React 16：Fiber 落地',
    who: 'React 团队（9 月）',
    field: 'concurrent',
    why: '两年重写正式上线，渲染从此可分片。同版本带回 Error Boundaries 与 Portals，返回值放宽到字符串与数组。16 系列是后续一切并发特性的地基。',
    link: '/architecture/new-architecture',
  },
  {
    year: 2018,
    title: 'React 16.3：Context 正式化',
    who: 'React 团队（3 月）',
    field: 'core',
    why: '旧 context 因更新不可追踪而被官方劝退多年；Fiber 让订阅与更新路径可管理，新 Context API 终于转正，跨层级传值不再层层透传。createRef 与 forwardRef 同期落地，HOC 转发 ref 的痛点一并解决。',
    link: '/typescript-react/context-api',
  },
  {
    year: 2018,
    title: 'Suspense 与 lazy 进入稳定通道',
    who: 'React 团队（16.6，10 月）',
    field: 'concurrent',
    why: '代码分包此前只能靠第三方库打标。React.lazy 让动态导入成为一等公民，Suspense 提供统一的「加载中」声明位：这是 Fiber 调度能力第一个面向用户的应用，也为后来的 Suspense for Data Fetching 留了口子。',
    link: '/architecture/concurrent-mode',
  },
  {
    year: 2018,
    title: 'Hooks 预览',
    who: 'Sophie Alpert、Dan Abramov、Ryan Florence（React Conf，10 月）',
    field: 'core',
    why: '类组件的三大痛点到了必须解决的时候：逻辑复用靠 HOC 与 render props 层层嵌套、相关逻辑被生命周期撕成碎片、this 语义常年误人。Hooks 用函数复用状态逻辑，是 React 心智模型十年来最大的一次升级。',
    link: '/architecture/custom-hooks',
  },
  {
    year: 2019,
    title: 'React 16.8：Hooks 稳定',
    who: 'React 团队（2 月）',
    field: 'core',
    why: '半年预览期收集了足量反馈后全量发布，函数组件正式获得状态与副作用能力。官方文档与社区生态自此全面转向函数组件，类组件退居「兼容存量」。',
    link: '/api/hooks-api',
  },
  {
    year: 2019,
    title: 'Profiler API 与 DevTools v4',
    who: 'React 团队（8 月）',
    field: 'concurrent',
    why: 'Fiber 把渲染拆成可调度的单元之后，「一次提交花了多久」第一次能被精确测量。Profiler API 与新版 DevTools 让性能分析从 console.log 变成火焰图，为后来的并发调优铺好工具链。',
    link: '/typescript-react/profiler',
  },
  {
    year: 2020,
    title: 'React 17：渐进升级底座',
    who: 'React 团队（10 月）',
    field: 'concurrent',
    why: '十年来第一个「零新特性」大版本，重点全在基础设施：事件委托从 document 移到根容器，为同一页面运行多个 React 版本铺路；渐进升级策略取代「一步到位」迁移。',
    link: '/typescript-react/synthetic-events',
  },
  {
    year: 2020,
    title: 'Server Components 首秀',
    who: 'Dan Abramov、Lauren Tan（React Conf，12 月）',
    field: 'future',
    why: '客户端 bundle 与请求瀑布到了临界点。演示把组件放到服务器运行：零客户端 JS、直连数据层、与客户端组件自由组合。RSC 由此从邮件组讨论变成公开路线。',
    link: '/future/react-server-components',
  },
  {
    year: 2021,
    title: 'RSC RFC 与 React Working Group',
    who: 'Sebastian Markbåge 等',
    field: 'future',
    why: '从演示到规范需要公开的协议：RFC 定义了服务器与客户端组件的边界和序列化规则，React 18 工作组在讨论区收集生产反馈，让 RSC 的语义在落地之前先被社区审了一遍。',
    link: '/future/react-server-components',
  },
  {
    year: 2022,
    title: 'React 18：并发特性开放',
    who: 'Andrew Clark 等（3 月）',
    field: 'concurrent',
    why: '2016 年 Fiber 重写的目标在此兑现：startTransition 与 useDeferredValue 让更新分优先级，automatic batching 默认开启，useSyncExternalStore 补齐外部 store 的一致性。渲染从「同步阻塞」变成「可协商」。',
    link: '/architecture/concurrent-mode',
  },
  {
    year: 2022,
    title: 'RSC 生产落地：Next.js App Router',
    who: 'Vercel（10 月 Next.js Conf）',
    field: 'ecosystem',
    why: 'RSC 需要打包器与路由的深度配合，单靠 React 包自己落不了地。App Router 把 Server Components、流式渲染与嵌套数据获取做成默认形态，RSC 第一次进入大规模生产。',
    link: '/ecosystem/nextjs',
  },
  {
    year: 2023,
    title: 'React Labs：编译器亮相',
    who: 'React 团队（3 月官方博客）',
    field: 'future',
    why: '并发时代手写 useMemo/useCallback 的心智负担日益沉重。React Labs 报告公开了编译时自动优化原型（时名 React Forget）与 RSC 一等支持的路线，官方方向从「教用户优化」转向「替用户优化」。',
    link: '/future/react-future',
  },
  {
    year: 2024,
    title: 'React 19 RC 与 Compiler alpha',
    who: 'React 团队（React Conf，5 月）',
    field: 'future',
    why: 'Actions、useOptimistic、useFormStatus 把表单从手写请求状态里解放出来，RSC 协议定型，编译器开放公测。19 的主题很明确：把前十年积累的并发底座变成开箱即用的上层能力。',
    link: '/future/react-new-features',
  },
  {
    year: 2024,
    title: 'React 19 正式发布',
    who: 'React 团队（12 月）',
    field: 'core',
    why: 'RC 半年收官：use、Actions、ref 作为 prop、文档化的 RSC 支持一起进入稳定通道。配套的并发底座与编译器路线，让这次升级成为「架构红利变现」的起点。',
    link: '/future/react-new-features',
  },
  {
    year: 2025,
    title: 'React Compiler v1.0',
    who: 'Lauren Tan 等（React Conf，10 月 7 日）',
    field: 'future',
    why: '从 2023 年的原型到正式 GA 用了两年半：自动 memoization 不改代码、opt-in 启用、支持 React 17+。手写 useMemo/useCallback 的时代开始谢幕，官方建议所有应用采用。',
    link: '/future/react-future',
  },
  {
    year: 2025,
    title: 'Activity 组件落地',
    who: 'React 团队（React 19.2，10 月 1 日）',
    field: 'concurrent',
    why: '早年构想的 Offscreen 提案更名 Activity，随 19.2 正式出货：以 visible/hidden 两种模式保活或预渲染子树，隐藏不卸载、状态不丢失。标签页切换与抽屉保活这些老问题有了官方原语。',
    link: '/future/react-concurrent-mode',
  },
  {
    year: 2026,
    title: 'React 19.3：View Transitions 进入核心',
    who: 'React 团队（React 19.3，9 月 9 日）',
    field: 'concurrent',
    why: '视图切换动画此前要在浏览器 View Transitions API 上手写接线，19.3 把 <ViewTransition /> 与 addTransitionType 收进核心：动画随 transition 的 pending 状态自动编排，无需手动管理 DOM 快照。同版还加入 Fragment refs 与 react-dom 的 browser() 浏览器专属子树标记。',
    link: '/future/react-new-features',
  },
]
