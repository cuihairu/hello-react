### 其他常用的辅助 API

除了核心 API 和常见的模式，React 还提供了一些辅助 API，用于支持更高级的功能和优化。以下是一些常用的辅助 API：

#### 1. **React.Fragment**

`React.Fragment` 允许你将多个元素分组在一起，而不需要额外的 DOM 元素。它可以有效地减少不必要的 DOM 节点。

**示例：**

```jsx
import React from 'react';

const List = () => (
  <React.Fragment>
    <h1>My List</h1>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  </React.Fragment>
);

export default List;
```

或者使用简写形式 `<>` 和 `</>`：

```jsx
import React from 'react';

const List = () => (
  <>
    <h1>My List</h1>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  </>
);

export default List;
```

**用途：**
- 组合多个子元素而不增加额外的 DOM 层级。

#### 2. **React.StrictMode**

`React.StrictMode` 是一个工具，用于帮助识别应用中的潜在问题。在开发模式下，它会激活额外的检查和警告，帮助你识别不推荐使用的 API 和潜在的错误。

**示例：**

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

**用途：**
- 提供额外的开发警告和检查
- 识别潜在的问题和不推荐的 API 使用

#### 3. **React.createRef**

`React.createRef` 用于创建一个可以附加到 React 元素的引用对象，以便直接访问 DOM 节点或组件实例。

**示例：**

```jsx
import React, { Component, createRef } from 'react';

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.inputRef = createRef();
  }

  focusInput = () => {
    this.inputRef.current.focus();
  };

  render() {
    return (
      <div>
        <input ref={this.inputRef} type="text" />
        <button onClick={this.focusInput}>Focus the input</button>
      </div>
    );
  }
}

export default MyComponent;
```

**用途：**
- 直接访问和操作 DOM 节点
- 获取组件实例的引用

#### 4. **React.forwardRef**

`React.forwardRef` 用于将 ref 转发到子组件中。它允许你在高阶组件中传递 ref，并对子组件进行引用。

**示例：**

```jsx
import React, { forwardRef } from 'react';

const FancyButton = forwardRef((props, ref) => (
  <button ref={ref} className="fancy-button" {...props} />
));

const App = () => {
  const buttonRef = React.createRef();

  return (
    <div>
      <FancyButton ref={buttonRef}>Click me</FancyButton>
    </div>
  );
};

export default App;
```

**用途：**
- 转发 ref 给子组件
- 使高阶组件能够接收和使用 ref

#### 5. **React.Profiler**

`React.Profiler` 用于在 React 应用中进行性能分析。它可以帮助你测量组件渲染的时间，识别性能瓶颈。

**示例：**

```jsx
import React, { Profiler } from 'react';

const onRenderCallback = (
  id, // 触发 Profiler 的 React 树的 id
  phase, // 表示是 mount 还是 update 阶段
  actualDuration, // 本次更新实际花费的时间
  baseDuration, // 本次更新的基准时间
  startTime, // 触发更新的时间
  commitTime // 完成更新的时间
) => {
  console.log(`Rendering ${id}: ${phase} phase`);
};

const App = () => (
  <Profiler id="App" onRender={onRenderCallback}>
    <div>Hello, world!</div>
  </Profiler>
);

export default App;
```

**用途：**
- 进行性能分析和优化
- 测量组件渲染时间

#### 6. **ReactDOM.unstable_batchedUpdates**

`ReactDOM.unstable_batchedUpdates` 可以用于在事件处理程序中批量更新多个组件，减少渲染次数，提高性能。

**示例：**

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

class MyComponent extends React.Component {
  handleClick = () => {
    ReactDOM.unstable_batchedUpdates(() => {
      this.setState({ count: this.state.count + 1 });
      this.setState({ value: 'Updated' });
    });
  };

  render() {
    return <button onClick={this.handleClick}>Update</button>;
  }
}

export default MyComponent;
```

**用途：**
- 在事件处理程序中批量更新组件状态
- 提高渲染性能

::: tip
这是 React 16/17 时代的 API。**React 18 起，`createRoot` 创建的应用默认在事件处理、生命周期、`setTimeout`、Promise 等所有场景中自动批处理**，通常不再需要手动调用 `unstable_batchedUpdates`（该 API 仅用于兼容旧代码）。
:::

#### 7. **React.lazy 和 Suspense**

`React.lazy` 和 `Suspense` 允许你动态加载组件，以优化应用性能。`React.lazy` 用于延迟加载组件，而 `Suspense` 用于处理加载状态。

**示例：**

```jsx
import React, { Suspense, lazy } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <LazyComponent />
  </Suspense>
);

export default App;
```

**用途：**
- 动态加载组件
- 优化初始加载时间

### React 18 → 19 版本对照

本页正文以 React 18 为准。下表把本页辅助 API 对到 React 19：

| API | React 18 状态 | React 19 变化 | 说明 |
| --- | --- | --- | --- |
| `React.Fragment` | 稳定 | 无变化 | — |
| `React.StrictMode` | 16.3 起稳定 | 无变化 | 19 起 ref 回调在挂载时会被双调用 |
| `React.createRef` | 16.3 起稳定 | 无变化 | — |
| `React.forwardRef` | 16.3 起稳定 | 仍可用，多数场景不再需要 | `ref` 成为函数组件的普通 prop |
| `React.Profiler` | 16.5 起稳定 | 无变化 | — |
| `ReactDOM.unstable_batchedUpdates` | 可用 | 仍保留，无需手动调用 | React 18 起已自动批处理 |
| `React.lazy` / `Suspense` | 16.6 起稳定 | 无变化 | Suspense 兄弟节点提交行为改进 |

依据：[React 19 升级指南](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)。

### 总结

这些辅助 API 提供了各种功能，以支持不同的开发需求和性能优化：
- **`React.Fragment`**：减少额外的 DOM 节点。
- **`React.StrictMode`**：提供开发警告和检查。
- **`React.createRef`**：直接访问和操作 DOM 节点。
- **`React.forwardRef`**：转发 ref 到子组件。
- **`React.Profiler`**：进行性能分析和优化。
- **`ReactDOM.unstable_batchedUpdates`**：批量更新组件状态。
- **`React.lazy` 和 `Suspense`**：动态加载组件，提高性能。