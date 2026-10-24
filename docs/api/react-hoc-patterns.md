### React Higher-Order Functions & Patterns

Higher-order functions and patterns in React help developers build and manage components more efficiently, improving code reuse and component maintainability. Below are some common ones:

#### 1. **Higher-Order Components (HOC)**

A higher-order component is a pattern for reusing component logic. It is a function that takes a component and returns a new component. HOCs can be used to encapsulate common logic, handle access control, and so on.

**Example**:

```jsx
import React from 'react';

// Higher-order component
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

// The wrapped component
class MyComponent extends React.Component {
  render() {
    return <div>My Component</div>;
  }
}

// Using the higher-order component
export default withLogging(MyComponent);
```

**Purpose**:
- Handle common component logic (such as logging, access checks, and the like)
- Code reuse and organization

#### 2. **Render Props**

Render Props is a pattern for sharing component logic, where a function is passed as a prop to let the component dynamically decide its rendered content.

**Example**:

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

**Using Render Props**:

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

**Purpose**:
- Dynamically control a component's rendered content
- Share component logic

#### 3. **Context API Extension**

The Context API lets you pass data through the component tree without manually threading it through every level of props. It mainly includes `React.createContext` and the `Provider` and `Consumer` components.

**Example**:

**Creating a Context**:

```jsx
import React from 'react';

const MyContext = React.createContext('defaultValue');
export default MyContext;
```

**Providing data with the Provider**:

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

**Using the `useContext` Hook**:

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

**Purpose**:
- Pass data across multiple levels of the component tree
- Share state or configuration

#### 4. **React.lazy and Suspense**

`React.lazy` and `Suspense` let you load components dynamically to optimize app performance. `React.lazy` defers loading a component, while `Suspense` handles the loading state.

**Example**:

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

**Purpose**:
- Load components dynamically
- Optimize the initial load time

#### 5. **Error Boundaries Extension**

The Error Boundaries mechanism, introduced after React 16, can catch JavaScript errors and show a fallback UI. It can only catch errors during rendering, not errors in event handlers.

**Example**:

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
    // Log the error information
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

**Purpose**:
- Catch errors during component rendering
- Provide a fallback UI

#### 6. **React.memo**

`React.memo` is a higher-order component used to optimize the performance of function components. It decides whether to re-render the component by comparing changes to its props.

**Example**:

```jsx
import React from 'react';

const MyComponent = React.memo(({ value }) => {
  console.log('Rendering MyComponent');
  return <div>{value}</div>;
});

export default MyComponent;
```

**Purpose**:
- Avoid unnecessary re-renders
- Improve function component performance

### React 18 → 19 Version Comparison

The body of this page is based on React 18. The table below maps this page's patterns to React 19:

| Pattern / API | React 18 Status | React 19 Change | Notes |
| --- | --- | --- | --- |
| Higher-Order Components (HOC) | Stable | No change | HOCs that forward refs no longer need `forwardRef` in most cases; `ref` can be passed through directly |
| Render Props | Stable | No change | — |
| Context Extension | Stable since 16.3 | Updated | As of React 19, `<Context>` can serve directly as the Provider |
| `React.lazy` / `Suspense` | Stable since 16.6 | No change | Improved Suspense behavior: the fallback at the nearest boundary commits immediately, and siblings warm up afterward |
| Error Boundaries | Stable since 16 | No change | Render-phase errors are no longer rethrown; use the root options `onUncaughtError` / `onCaughtError` to customize reporting |
| `React.memo` | Stable since 16.6 | No change | — |

Source: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

### Summary

In React development, beyond the core APIs there are many higher-order functions and patterns that help you build components more efficiently:
- **Higher-Order Components (HOC)**: for reusing component logic.
- **Render Props**: for rendering content dynamically.
- **Context API**: for passing data across the component tree.
- **React.lazy and Suspense**: for loading components dynamically.
- **Error Boundaries**: for catching errors during rendering.
- **React.memo**: for optimizing function component performance.

These patterns and APIs help improve the reusability, performance, and maintainability of your code.

## References

- [React Official Docs · Managing State](https://react.dev/learn/managing-state)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [glossary](glossary.md))