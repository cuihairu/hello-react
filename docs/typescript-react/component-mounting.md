### Component Mounting and Unmounting

Mounting and unmounting are key phases of the React component lifecycle. Understanding these two phases helps you manage component creation, updates, and destruction better, ensuring components execute operations correctly throughout these processes, such as data loading, event binding, and cleanup.

---

## 1. Component Mounting

Component mounting is the process of a component being instantiated and inserted into the DOM. During this phase, you can perform operations such as data fetching, event binding, and setting up subscriptions.

### 1.1 The Mounting Process

1. **Component creation**  
   React creates the component instance and initializes its `props` and `state`.

2. **Calling the `constructor` method**  
   Initialize state and bind methods.

   ```jsx
   constructor(props) {
     super(props);
     this.state = { count: 0 };
   }
   ```

3. **Calling `static getDerivedStateFromProps` (optional)**  
   Called before each render, used to update `state` based on `props`. Useful when the component's state needs updating from new `props`.

   ```jsx
   static getDerivedStateFromProps(nextProps, prevState) {
     if (nextProps.value !== prevState.value) {
       return { value: nextProps.value };
     }
     return null;
   }
   ```

4. **Calling the `render` method**  
   Renders the component's UI.

   ```jsx
   render() {
     return <div>{this.props.message}</div>;
   }
   ```

5. **Calling the `componentDidMount` method**  
   Called after the component mounts. Useful for data fetching, event binding, and other side-effect operations.

   ```jsx
   componentDidMount() {
     console.log('Component mounted');
     // Fetch data or bind events
   }
   ```

### 1.2 Mounting with Hooks

In function components, you can use the `useEffect` hook to simulate `componentDidMount` behavior.

```jsx
import React, { useEffect, useState } from 'react';

function Example() {
  useEffect(() => {
    console.log('Component mounted');
    // Fetch data or bind events

    // Cleanup function (optional)
    return () => {
      console.log('Cleanup on unmount');
    };
  }, []); // Empty dependency array, runs when the component mounts

  return <div>Example Component</div>;
}
```

## 2. Component Unmounting

Component unmounting is the process of a component being removed from the DOM. During this phase, you can perform cleanup operations, such as unsubscribing, clearing timers, and so on.

### 2.1 The Unmounting Process

1. **Calling the `componentWillUnmount` method**  
   Called before the component unmounts. Useful for cleanup operations, such as canceling network requests, removing event listeners, and clearing timers.

   ```jsx
   componentWillUnmount() {
     console.log('Component will unmount');
     // Cleanup operations
   }
   ```

### 2.2 Unmounting with Hooks

In function components, you can use the return function of the `useEffect` hook to simulate `componentWillUnmount` behavior.

```jsx
import React, { useEffect } from 'react';

function Example() {
  useEffect(() => {
    console.log('Component mounted');

    return () => {
      console.log('Component will unmount');
      // Cleanup operations
    };
  }, []); // Empty dependency array, runs when the component unmounts

  return <div>Example Component</div>;
}
```

## 3. Common Operations

### 3.1 Data Fetching

- **Class component**: fetch data in `componentDidMount`.

  ```jsx
  componentDidMount() {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }
  ```

- **Function component**: fetch data in `useEffect`.

  ```jsx
  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => setData(data));
  }, []); // Empty dependency array, runs only on mount
  ```

### 3.2 Event Binding

- **Class component**: bind events in `componentDidMount`.

  ```jsx
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  ```

- **Function component**: bind and remove events in `useEffect`.

  ```jsx
  useEffect(() => {
    const handleResize = () => {
      console.log('Window resized');
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array, runs only on mount
  ```

### 3.3 Timers

- **Class component**: set up the timer in `componentDidMount` and clean it up in `componentWillUnmount`.

  ```jsx
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    // Update component state
  }
  ```

- **Function component**: set up and clean up the timer in `useEffect`.

  ```jsx
  useEffect(() => {
    const timerID = setInterval(() => {
      // Update state
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []); // Empty dependency array, runs only on mount
  ```

## React 18 → 19 Comparison

The body of this page follows React 18. The table below maps this page's mounting and unmounting APIs to React 19:

| API | React 18 status | React 19 change | Notes |
| --- | --- | --- | --- |
| `ReactDOM.render` / `ReactDOM.hydrate` | Deprecated | **Removed** | Use `createRoot` / `hydrateRoot` |
| `unmountComponentAtNode` | Deprecated | **Removed** | Use `root.unmount()` |
| String refs | Available | **Removed** | Use a ref callback or `useRef` |
| Ref callbacks | Assignment only | **Can return a cleanup function** | Cleanup runs on unmount; under TypeScript it must not implicitly return other values |
| `useEffect` cleanup function | Stable | No change | Still runs on unmount |
| UMD builds | Provided | **Removed** | When loading via a script tag, use an ESM CDN (such as esm.sh) |

Reference: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

## 4. Summary

Understanding the component mounting and unmounting process is very important for managing side effects in the component lifecycle. By using lifecycle methods and Hooks effectively, you can manage data fetching, event binding, timers, and cleanup operations well, ensuring the component performs the required operations correctly at each stage of its life.

## References

- [React official docs · Render and Commit](https://react.dev/learn/render-and-commit)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
