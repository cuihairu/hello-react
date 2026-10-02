### 错误边界相关 API

React 的错误边界（Error Boundaries）是处理 JavaScript 错误的机制，尤其是在组件树的渲染过程、生命周期方法和构造函数中。错误边界可以捕获子组件树中的 JavaScript 错误，记录错误，展示回退 UI，而不会导致整个组件树崩溃。

#### 创建错误边界

要创建一个错误边界组件，你需要实现 `componentDidCatch` 生命周期方法和 `static getDerivedStateFromError` 方法。`componentDidCatch` 用于捕获错误，`getDerivedStateFromError` 用于更新组件的状态以显示备用 UI。

```jsx
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新状态以渲染备用 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 记录错误信息到错误报告服务
    console.error("Error occurred:", error);
    console.error("Error info:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 渲染备用 UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

在上面的代码中：
- **构造函数**：初始化状态 `hasError` 为 `false`。
- **`getDerivedStateFromError`**：静态方法，接收错误作为参数，返回一个对象来更新组件的状态。
- **`componentDidCatch`**：捕获错误并记录错误信息（可以集成到错误报告服务中）。
- **`render`**：根据状态决定是渲染错误 UI 还是正常的子组件。

#### 使用错误边界

你可以将错误边界组件用作高阶组件来包裹需要捕获错误的组件树。

```jsx
import React from 'react';
import ErrorBoundary from './ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
};

export default App;
```

在这个例子中，`MyComponent` 和它的子组件将受到 `ErrorBoundary` 的保护。如果 `MyComponent` 或它的子组件抛出错误，`ErrorBoundary` 会捕获错误并显示备用 UI，而不会导致整个应用崩溃。

#### 错误边界的限制

- **不能捕获事件处理中的错误**：错误边界无法捕获在事件处理函数中抛出的错误。可以使用 `try-catch` 语句在事件处理函数中捕获这些错误。
  
  ```jsx
  const handleClick = () => {
    try {
      // 可能会抛出错误的代码
    } catch (error) {
      console.error("Caught an error:", error);
    }
  };
  ```

- **不能捕获异步代码中的错误**：错误边界不能捕获异步代码中的错误（如 `setTimeout`、`fetch` 等）。对于这些情况，应该在异步函数中使用 `try-catch` 来捕获错误。

  ```jsx
  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
      // 处理响应
    } catch (error) {
      console.error("Caught an error during fetch:", error);
    }
  };
  ```

- **不能捕获服务器渲染中的错误**：错误边界不适用于服务器端渲染中的错误，这需要服务器端的错误处理机制。

#### 总结

- **错误边界**：用来捕获子组件树中的 JavaScript 错误，防止整个应用崩溃。
- **`componentDidCatch`**：捕获错误并进行处理（如记录错误信息）。
- **`getDerivedStateFromError`**：静态方法，用来更新状态以显示备用 UI。
- **限制**：不能捕获事件处理、异步代码中的错误，以及服务器渲染中的错误。

通过使用错误边界，可以提升 React 应用的健壮性和用户体验，确保即使在组件发生错误时，应用依然可以继续运行。