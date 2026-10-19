# React.js 源码解析

我把读 React 源码时关注的内部机制和关键实现记在这里，方便对照源码查阅。

## 页面索引

### 理解 React 内部机制
- [React 的架构概览](react-architecture.md) —— React 整体架构分层与数据流向
- [虚拟 DOM 的实现原理](virtual-dom.md) —— Fiber 节点结构、元素创建与 diff 入口
- [Reconciliation 算法解析](reconciliation.md) —— 协调算法核心逻辑、副作用收集与提交
- [React Fiber 架构与更新机制](react-fiber.md) —— Fiber 树构建、工作循环、优先级调度

### React 生命周期的内部实现
- [组件挂载与更新的流程](component-mounting.md) —— mount/update 阶段的完整调用栈
- [React 事件系统与合成事件](events.md) —— 事件委托、合成事件池、冒泡与捕获
- [Context API 的内部实现](context-api.md) —— Provider/Consumer 机制、订阅与传播

### React Hooks 源码分析
- [useState、useEffect 的内部工作原理](use-state-effect.md) —— Hook 链表、更新队列、副作用执行时机
- [如何实现一个自定义 Hook](custom-hooks.md) —— 组合 Hook 的模式与最佳实践
- [useReducer 与复杂状态管理的实现](use-reducer.md) —— Dispatcher、reducer 执行、惰性初始化

## 内容角度

本页汇总本主题下的个人笔记入口；各页面按概念、实践或实现角度展开，可按需要交叉阅读。

## 前置要求

源码笔记与架构专题从不同角度展开，可对照阅读[React 架构](../architecture/README.md)。

## 参考资料

- [React 仓库](https://github.com/react/react)

## 相关页面

- [component-mounting](component-mounting.md)
- 相关视角：[React 架构笔记](../architecture/README.md)讨论设计与运行机制，[Hooks API 参考](../api/hooks-api.md)便于查阅公开接口。
