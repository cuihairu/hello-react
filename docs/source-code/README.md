# 第五部分：React.js 源码解析

本部分深入剖析 React 内部机制，带你从源码层面理解 React 的核心原理。

## 章节概览

### 第13章：深入理解 React 内部机制
- [React 的架构概览](react-architecture.md) —— React 整体架构分层与数据流向
- [虚拟 DOM 的实现原理](virtual-dom.md) —— Fiber 节点结构、元素创建与 diff 入口
- [Reconciliation 算法解析](reconciliation.md) —— 协调算法核心逻辑、副作用收集与提交
- [React Fiber 架构与更新机制](react-fiber.md) —— Fiber 树构建、工作循环、优先级调度

### 第14章：React 生命周期的内部实现
- [组件挂载与更新的流程](component-mounting.md) —— mount/update 阶段的完整调用栈
- [React 事件系统与合成事件](events.md) —— 事件委托、合成事件池、冒泡与捕获
- [Context API 的内部实现](context-api.md) —— Provider/Consumer 机制、订阅与传播

### 第15章：React Hooks 源码分析
- [useState、useEffect 的内部工作原理](use-state-effect.md) —— Hook 链表、更新队列、副作用执行时机
- [如何实现一个自定义 Hook](custom-hooks.md) —— 组合 Hook 的模式与最佳实践
- [useReducer 与复杂状态管理的实现](use-reducer.md) —— Dispatcher、reducer 执行、惰性初始化

## 学习目标

完成本部分后，你将能够：
- 从源码角度解释 React 的渲染、协调与提交流程
- 理解 Fiber 架构如何实现可中断、可优先级调度的更新
- 掌握 Hooks 的内部数据结构与执行机制
- 在遇到疑难问题时具备读源码定位问题的能力

## 前置要求

建议先阅读「第三部分：React 的架构演变」建立整体认知框架，再深入源码细节。