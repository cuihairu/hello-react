### 第21章：React 扩展 API

在 React 生态系统中，除了核心 API 外，还有一些扩展 API 和模式可以帮助你更好地构建和管理组件。这些扩展 API 可以提升代码的复用性和组件的可维护性。以下是一些重要的 React 扩展 API 和模式：

#### 1. **高阶组件（Higher-Order Components, HOC）**

高阶组件是一种用于复用组件逻辑的模式。它是一个函数，接收一个组件并返回一个新的组件。HOC 可以用来封装公共逻辑、处理权限控制等。

```jsx
import React from 'react';

function withLogging(WrappedComponent) {
  return class extends React.Component {
    componentDidMount() {
      console.log('Component mounted!');
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default withLogging;
```

使用 HOC：

```jsx
import React from 'react';
import withLogging from './withLogging';

class MyComponent extends React.Component {
  render() {
    return <div>My Component</div>;
  }
}

export default withLogging(MyComponent);
```

#### 2. **Render Props**

Render Props 是一种共享组件逻辑的模式，通过将一个函数作为 prop 传递给组件来动态决定组件的渲染内容。

```jsx
import React from 'react';

class MouseTracker extends React.Component {
  state = { x: 0, y: 0 };

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    });
  };

  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

export default MouseTracker;
```

使用 Render Props：

```jsx
import React from 'react';
import MouseTracker from './MouseTracker';

const App = () => (
  <MouseTracker
    render={({ x, y }) => (
      <p>The mouse position is ({x}, {y})</p>
    )}
  />
);

export default App;
```

#### 3. **Context API 扩展**

Context API 允许你在组件树中传递数据，而不需要手动地通过每一个层级的 props。它主要包括 `React.createContext`、`Provider` 和 `Consumer` 组件。

**创建 Context：**

```jsx
import React from 'react';

const MyContext = React.createContext('defaultValue');
export default MyContext;
```

**使用 Provider 提供数据：**

```jsx
import React from 'react';
import MyContext from './MyContext';

const App = () => (
  <MyContext.Provider value="contextValue">
    <Child />
  </MyContext.Provider>
);

const Child = () => (
  <MyContext.Consumer>
    {value => <p>Context value is: {value}</p>}
  </MyContext.Consumer>
);

export default App;
```

**使用 `useContext` Hook：**

```jsx
import React, { useContext } from 'react';
import MyContext from './MyContext';

const Child = () => {
  const value = useContext(MyContext);
  return <p>Context value is: {value}</p>;
};

const App = () => (
  <MyContext.Provider value="contextValue">
    <Child />
  </MyContext.Provider>
);

export default App;
```

#### 4. **React.lazy 和 Suspense**

`React.lazy` 和 `Suspense` 允许你动态加载组件，以优化应用性能。`React.lazy` 用于延迟加载组件，而 `Suspense` 用于处理加载状态。

**使用 `React.lazy` 和 `Suspense`：**

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

#### 5. **Error Boundaries 扩展**

在 React 16 之后引入的 Error Boundaries 机制，可以捕获 JavaScript 错误并显示备用 UI。它们只能捕获渲染期间的错误，不能捕获事件处理函数中的错误。

**使用错误边界组件：**

```jsx
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 记录错误信息
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

#### 6. **React.memo**

`React.memo` 是一个高阶组件，用于优化函数组件的性能。它通过对比 props 的变化来决定是否重新渲染组件。

**使用 `React.memo`：**

```jsx
import React from 'react';

const MyComponent = React.memo(({ value }) => {
  console.log('Rendering MyComponent');
  return <div>{value}</div>;
});

export default MyComponent;
```

### 总结

在 React 开发中，除了核心 API，还有许多扩展 API 和模式可供使用：
- **高阶组件（HOC）**：用于复用组件逻辑。
- **Render Props**：用于动态渲染内容。
- **Context API**：用于跨组件树传递数据。
- **React.lazy 和 Suspense**：用于动态加载组件。
- **错误边界**：用于捕获渲染中的错误。
- **React.memo**：用于优化函数组件性能。

这些扩展 API 和模式可以帮助你更高效地管理组件、提升应用性能和代码可维护性。