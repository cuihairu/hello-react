# 第二部分：TypeScript 与 React.js 入门

本部分引导你从零构建 TypeScript + React 开发能力，覆盖类型系统、组件模式与核心 API。

## 章节概览

### 第5章：TypeScript 基础
- [为什么选择 TypeScript](why-typescript.md) —— 静态类型、工具链、大型项目支撑
- [TypeScript 安装与配置](setup.md) —— tsconfig.json 关键选项、编译目标、严格模式
- [基本类型与接口](types-interfaces.md) —— 原始类型、对象类型、接口 vs 类型别名
- [类与泛型](classes-generics.md) —— 类类型、泛型约束、工具类型入门
- [类型推断与类型守卫](type-inference-guards.md) —— 推断流向、is 类型谓词、in/typeof/narrowing
- [TypeScript 中的模块与命名空间](modules-namespaces.md) —— ESM/CommonJS 互操作、路径映射、声明合并
- [在 React 项目中使用 TypeScript](react-typescript.md) —— 组件类型、Props/State 泛型、事件处理器类型

### 第6章：React 基础
- [React 的发展历程与核心理念](react-history-principles.md) —— 从 createClass 到 Hooks 的演进
- [JSX 语法与基本用法](jsx-syntax.md) —— JSX 转译、表达式插值、Fragment、条件渲染
- [组件化开发](component-development.md) —— 函数组件、默认 Props、children、组合 vs 继承
- [State 与 Props 的使用](state-props.md) —— 单向数据流、不可变更新、受控/非受控组件
- [组件的生命周期](component-lifecycle.md) —— Class 生命周期、函数组件等价模式、弃用 API 标注
- [组件挂载与卸载](component-mounting.md) —— 挂载顺序、清理函数、严格模式双重调用

### 第7章：组件深度解析
- [render 方法与组件渲染](render-method.md) —— 渲染触发条件、纯组件、memo 优化
- [setState 的工作原理](setstate.md) —— 批处理、异步/同步边界、函数式更新
- [合成事件系统](synthetic-events.md) —— 事件委托、池化、原生事件访问
- [高阶组件（HOC）](hoc.md) —— 增强模式、ref 转发、静态属性提升
- [Render Props 模式](render-props.md) —— 共享逻辑、作用域插槽、与 Hooks 对比
- [Refs 的使用与管理](refs.md) —— createRef、useRef、useImperativeHandle、回调 Ref
- [Context API 的应用](context-api.md) —— Provider 消费、性能陷阱、默认值
- [Portals 的使用场景与实现](portals.md) —— 模态框、工具提示、事件冒泡穿透
- [Profiler 的使用与性能分析](profiler.md) —— 火焰图、渲染耗时、优化指标
- [错误边界的实现与最佳实践](error-boundaries.md) —— componentDidCatch、getDerivedStateFromError、回退 UI

## 学习目标

完成本部分后，你将能够：
- 熟练编写类型安全的 React 组件与 Hooks
- 理解 Class 组件与函数组件的生命周期对应关系
- 掌握 HOC、Render Props、Hooks 三种复用模式的取舍
- 使用 Context、Refs、Portals 解决跨层级通信与 DOM 访问问题