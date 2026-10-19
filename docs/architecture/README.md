# React 的架构演变

本部分梳理 React 从 Stack Reconciler 到 Fiber、再到并发模式的架构演进脉络，建立宏观认知框架。

## 章节概览

### 旧版架构
- [Virtual DOM 的概念与实现](virtual-dom.md) —— 元素描述、树构建、diff 入口、局限性
- [DOM Diff 算法解析](dom-diff.md) —— 同层比较、key 的作用、列表调度、时间复杂度 O(n)
- [旧版架构的优劣与历史背景](old-architecture-comparison.md) —— 同步阻塞渲染、无法优先级调度、大列表卡顿

### 新版架构
- [React Fiber 架构详解](react-fiber.md) —— Fiber 节点结构、双缓冲树、工作循环、链表遍历
- [Reconciliation 机制的演变](reconciliation.md) —— 从栈递归到增量协调、副作用链表、完成阶段
- [Concurrent Mode 与调度器（Scheduler）](concurrent-mode.md) —— 优先级车道、时间切片、Suspense 集成、useTransition
- [旧版与新版架构的对比分析](architecture-comparison.md) —— 吞吐 vs 响应、内存占用、迁移成本

### Hooks 的深度解析
- [useState 的内部实现与使用](use-state.md) —— Hook 链表、更新队列、惰性初始化、批处理边界
- [useEffect 与副作用管理](use-effect.md) —— 挂载/更新/卸载时机、清理函数、flushSync、Layout vs Passive
- [useContext 与状态共享](use-context.md) —— Context 订阅机制、Provider 值变更传播、性能优化
- [useReducer 与复杂状态管理](use-reducer.md) —— Dispatcher、reducer 纯度、惰性初始化、dispatch 稳定性
- [自定义 Hooks 的创建与使用](custom-hooks.md) —— 组合模式、状态隔离、命名约定、测试策略

## 内容角度

本页汇总本主题下的个人笔记入口；各页面按概念、实践或实现角度展开，可按需要交叉阅读。

## 参考资料

- [React 官方文档 · 学习路径](https://react.dev/learn)

## 相关页面

- [architecture-comparison](architecture-comparison.md)
- 相关视角：[Hooks API 参考](../api/hooks-api.md)记录公开接口，[Hooks 源码笔记](../source-code/hooks-source.md)追踪内部实现。
