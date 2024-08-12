### `useState` 和 `useEffect` 的内部工作原理

`useState` 和 `useEffect` 是 React Hooks 的两个核心 API，它们使函数组件能够拥有状态管理和副作用处理能力。理解这两个 Hook 的内部工作原理可以帮助开发者更好地利用它们，并优化 React 应用的性能。

#### 1. `useState` 的内部工作原理

**1.1 `useState` 简介**

`useState` 是一个用于管理函数组件状态的 Hook。它接受一个初始状态值，并返回一个包含当前状态和更新状态的函数的数组。

**1.2 内部工作原理**

- **初始化状态**：在第一次渲染时，`useState` 会通过调用 React 的内部 API 初始化状态。如果状态是第一次设置，React 会将初始状态存储在内部的状态队列中。
- **状态队列**：React 维护一个内部的状态队列（`fiber` 节点的 `memoizedState`），用于存储组件的状态。在每次渲染时，`useState` 会从状态队列中获取当前状态。
- **状态更新**：当调用 `setState` 函数时，React 会将新的状态值加入状态队列，并标记组件需要重新渲染。`setState` 不会立即更新状态，而是将状态更新请求添加到队列中，并在下一个渲染周期中处理。
- **重新渲染**：在重新渲染过程中，React 会遍历状态队列并更新状态。然后，它会根据最新状态重新渲染组件。

**1.3 核心代码示例**

```javascript
function useState(initialState) {
  const dispatcher = ReactCurrentDispatcher.current;
  return dispatcher.useState(initialState);
}
```

- `ReactCurrentDispatcher.current` 是一个指向当前 Dispatcher 对象的引用，`dispatcher.useState` 实际上处理状态的初始化和更新。

**1.4 代码实现解析**

- **状态初始化**：在初次渲染时，React 会使用提供的 `initialState` 初始化状态，并将其存储在 fiber 节点的 `memoizedState` 属性中。
- **状态更新**：调用 `setState` 函数时，React 会将新的状态值添加到更新队列中，触发重新渲染。

#### 2. `useEffect` 的内部工作原理

**2.1 `useEffect` 简介**

`useEffect` 是一个处理副作用的 Hook。它接受一个副作用函数，并在组件渲染后执行该函数。副作用函数用于处理数据获取、DOM 操作等。

**2.2 内部工作原理**

- **副作用函数执行**：在组件渲染完成后，React 会调用 `useEffect` 中提供的副作用函数。副作用函数可以是同步的，也可以返回一个清理函数（用于清理副作用）。
- **依赖数组**：`useEffect` 可以接受一个依赖数组（`deps`）。如果依赖数组中的某个值发生变化，React 会重新调用副作用函数。否则，它会跳过副作用函数的执行。
- **副作用清理**：如果副作用函数返回一个清理函数，React 会在组件卸载时或副作用函数重新执行前调用这个清理函数。清理函数用于清理之前执行的副作用（如取消订阅、清除定时器）。

**2.3 核心代码示例**

```javascript
function useEffect(create, deps) {
  const dispatcher = ReactCurrentDispatcher.current;
  return dispatcher.useEffect(create, deps);
}
```

- `dispatcher.useEffect` 处理副作用的注册和调度。

**2.4 代码实现解析**

- **副作用注册**：在组件渲染时，React 会将副作用函数及其依赖数组注册到当前 fiber 节点中。这些副作用会在组件渲染后被调用。
- **副作用执行**：在组件渲染完成后，React 会遍历所有注册的副作用函数，并在合适的时间执行它们。React 会根据依赖数组决定是否需要重新执行副作用函数。
- **副作用清理**：如果副作用函数返回一个清理函数，React 会在每次副作用函数重新执行之前或组件卸载时调用清理函数。

### 总结

- **`useState`**：用于管理组件状态。它的内部实现涉及状态队列的维护和状态更新的调度。状态的初始化和更新由 React 的内部 API 处理。
- **`useEffect`**：用于处理副作用。它的内部实现涉及副作用函数的注册、执行和清理。副作用的执行时机和依赖关系由 React 的调度机制控制。

了解这两个 Hook 的内部工作原理可以帮助开发者更高效地使用它们，并在构建复杂应用时更好地管理状态和副作用。