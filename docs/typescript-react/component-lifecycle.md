### The Component Lifecycle

The component lifecycle refers to the entire process of a component from creation to destruction. The React component lifecycle is divided into different phases, each with specific lifecycle methods or hooks. These methods or hooks handle component initialization, updates, and unmounting. Lifecycle methods and hooks help developers perform actions at different lifecycle stages, such as data fetching, event binding, and cleanup.

---

## 1. Class Component Lifecycle Methods

### 1.1 Mounting Phase

The mounting phase is the process of a component being created and inserted into the DOM. Here are the commonly used lifecycle methods for the mounting phase:

- **constructor()**  
  Called when the component is instantiated. Used to initialize state and bind event handler methods.

  ```jsx
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  ```

- **static getDerivedStateFromProps(nextProps, prevState)**  
  Called before every render, used to update `state` based on `props`. Useful when the component's state needs updating as `props` change.

  ```jsx
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState.value) {
      return { value: nextProps.value };
    }
    return null;
  }
  ```

- **componentDidMount()**  
  Called after the component mounts. Commonly used for data fetching, subscriptions, or DOM operations.

  ```jsx
  componentDidMount() {
    console.log('Component mounted');
  }
  ```

### 1.2 Updating Phase

The updating phase is the process of a component re-rendering when it receives new `props` or `state`. Here are the commonly used lifecycle methods for the updating phase:

- **static getDerivedStateFromProps(nextProps, prevState)**  
  Same as in the mounting phase, used to update `state` before every render.

- **shouldComponentUpdate(nextProps, nextState)**  
  Called before the component updates, used to decide whether the component needs to re-render. Can be used for performance optimization.

  ```jsx
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.value !== this.props.value;
  }
  ```

- **render()**  
  Renders the component's UI. You should not perform side effects inside the `render` method.

  ```jsx
  render() {
    return <div>{this.props.value}</div>;
  }
  ```

- **getSnapshotBeforeUpdate(prevProps, prevState)**  
  Called before the update, used to read DOM state and use it in `componentDidUpdate`. Used to capture a snapshot before the update.

  ```jsx
  getSnapshotBeforeUpdate(prevProps, prevState) {
    return this.divRef.scrollHeight;
  }
  ```

- **componentDidUpdate(prevProps, prevState, snapshot)**  
  Called after the component updates. Used to handle post-update DOM operations, network requests, and similar tasks.

  ```jsx
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('Component updated');
  }
  ```

### 1.3 Unmounting Phase

The unmounting phase is the process of a component being removed from the DOM. Here is the commonly used lifecycle method for the unmounting phase:

- **componentWillUnmount()**  
  Called before the component unmounts. Used to clean up subscriptions, cancel network requests, clear timers, and so on.

  ```jsx
  componentWillUnmount() {
    console.log('Component will unmount');
  }
  ```

## 2. Function Component Lifecycle Hooks

Function components do not have lifecycle methods, but they can use React Hooks to simulate lifecycle behavior.

### 2.1 useEffect

The `useEffect` hook lets you perform side effects in function components. `useEffect` can be used to simulate the behavior of `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`.

```jsx
import { useEffect, useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Runs when the component mounts
    console.log('Component mounted or updated');

    // Runs when the component unmounts
    return () => {
      console.log('Component will unmount');
    };
  }, [count]); // Dependency array, controls when the side effect runs

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

- **Empty dependency array `[]`**  
  Runs only once when the component mounts, equivalent to `componentDidMount`.

- **Values in the dependency array `[value]`**  
  Runs when a dependency changes, equivalent to `componentDidUpdate`.

- **No dependency array**  
  Runs on every render, equivalent to using a side effect inside `render`.

### 2.2 useLayoutEffect

`useLayoutEffect` behaves like `useEffect`, but it runs synchronously after the DOM update and before the browser paints. Useful when you need to read and synchronize layout information.

```jsx
import { useLayoutEffect } from 'react';

function Example() {
  useLayoutEffect(() => {
    // Runs after the DOM update, before the browser paints
  });

  return <div>Example</div>;
}
```

## React 18 → 19 Comparison

The body of this page follows React 18. The table below maps this page's lifecycle content to React 19:

| API / behavior | React 18 status | React 19 change | Notes |
| --- | --- | --- | --- |
| Class lifecycles like `componentDidMount` | Available | No change | — |
| `useEffect` / `useLayoutEffect` | Stable since 16.8 | No change | — |
| Legacy Context (`contextTypes` / `getChildContext`) | Available | **Removed** | Use `createContext` + `contextType` instead |
| Errors thrown in render | Re-thrown after being caught | **No longer re-thrown** | Uncaught ones go to `window.reportError`; ones caught by a boundary go to `console.error` |
| `createRoot` error callbacks | — | **Added** | `onUncaughtError` / `onCaughtError` for custom error reporting |
| StrictMode double render | Already present | **Behavior refined** | `useMemo` / `useCallback` reuse the first result; ref callbacks double-call |
| While Suspense is suspended | fallback committed only after sibling tree finishes | **fallback committed immediately** | The sibling tree then gets a pre-warm render |

Reference: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

## 3. Summary

Understanding the component lifecycle is essential for developing and maintaining React applications. Class component lifecycle methods and function component Hooks provide a rich toolkit for performing the necessary actions at each stage of a component's life. Using these tools well improves an application's performance, reliability, and user experience.

## References

- [React official docs · Render and Commit](https://react.dev/learn/render-and-commit)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [glossary](/glossary.md))
- [knowledge](/knowledge.md))
- [README](README.md)
