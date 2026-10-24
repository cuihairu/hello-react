### Other Common Helper APIs

Beyond the core APIs and common patterns, React also provides some helper APIs to support more advanced features and optimizations. Below are some commonly used ones:

#### 1. **React.Fragment**

`React.Fragment` lets you group several elements together without adding an extra DOM element. It effectively reduces unnecessary DOM nodes.

**Example**:

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

Or use the shorthand form `<>` and `</>`:

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

**Purpose**:
- Group multiple child elements without adding extra DOM nesting.

#### 2. **React.StrictMode**

`React.StrictMode` is a tool that helps identify potential problems in your app. In development mode it enables extra checks and warnings, helping you spot deprecated APIs and latent bugs.

**Example**:

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

**Purpose**:
- Provides extra development warnings and checks
- Identifies potential problems and deprecated API usage

#### 3. **React.createRef**

`React.createRef` creates a ref object you can attach to a React element, letting you access the underlying DOM node or component instance directly.

**Example**:

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

**Purpose**:
- Directly access and manipulate DOM nodes
- Get a reference to a component instance

#### 4. **React.forwardRef**

`React.forwardRef` forwards a ref to a child component. It lets you pass refs through a higher-order component and reference the child component.

**Example**:

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

**Purpose**:
- Forward a ref to a child component
- Let higher-order components receive and use a ref

#### 5. **React.Profiler**

`React.Profiler` is used for performance analysis in a React app. It helps you measure how long components take to render and identify performance bottlenecks.

**Example**:

```jsx
import React, { Profiler } from 'react';

const onRenderCallback = (
  id, // The id of the React tree that triggered the Profiler
  phase, // Indicates whether this is a mount or an update phase
  actualDuration, // The time actually spent on this update
  baseDuration, // The baseline time for this update
  startTime, // When the update was triggered
  commitTime // When the update was committed
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

**Purpose**:
- Perform performance analysis and optimization
- Measure component render time

#### 6. **ReactDOM.unstable_batchedUpdates**

`ReactDOM.unstable_batchedUpdates` can batch multiple component updates inside an event handler, reducing the number of renders and improving performance.

**Example**:

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

**Purpose**:
- Batch component state updates in an event handler
- Improve render performance

::: tip
This is an API from the React 16/17 era. **As of React 18, apps created with `createRoot` are batched automatically in every scenario** — event handlers, lifecycle methods, `setTimeout`, Promises, and so on — so you usually no longer need to call `unstable_batchedUpdates` manually (that API only exists to stay compatible with old code).
:::

#### 7. **React.lazy and Suspense**

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

### React 18 → 19 Version Comparison

The body of this page is based on React 18. The table below maps this page's helper APIs to React 19:

| API | React 18 Status | React 19 Change | Notes |
| --- | --- | --- | --- |
| `React.Fragment` | Stable | No change | — |
| `React.StrictMode` | Stable since 16.3 | No change | As of 19, ref callbacks are double-invoked on mount |
| `React.createRef` | Stable since 16.3 | No change | — |
| `React.forwardRef` | Stable since 16.3 | Still usable, no longer needed in most cases | `ref` becomes a regular prop on function components |
| `React.Profiler` | Stable since 16.5 | No change | — |
| `ReactDOM.unstable_batchedUpdates` | Available | Still retained, no manual call needed | Automatic batching has been in place since React 18 |
| `React.lazy` / `Suspense` | Stable since 16.6 | No change | Improved commit behavior for Suspense siblings |

Source: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

### Summary

These helper APIs provide various features to support different development needs and performance optimizations:
- **`React.Fragment`**: reduce extra DOM nodes.
- **`React.StrictMode`**: provide development warnings and checks.
- **`React.createRef`**: directly access and manipulate DOM nodes.
- **`React.forwardRef`**: forward a ref to a child component.
- **`React.Profiler`**: perform performance analysis and optimization.
- **`ReactDOM.unstable_batchedUpdates`**: batch component state updates.
- **`React.lazy` and `Suspense`**: load components dynamically to improve performance.

## References

- [React Official Docs · React Reference](https://react.dev/reference/react)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [knowledge](knowledge.md))