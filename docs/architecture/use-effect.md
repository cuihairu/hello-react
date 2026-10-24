### `useEffect` and Side-Effect Management

`useEffect` is a Hook in React used to handle side effects. Side effects can be data fetching, subscriptions, manual DOM manipulation, and more — things that frequently need handling in function components. `useEffect` provides a declarative way to manage these side effects and ensures they are handled at the right moments in a component's lifecycle.

---

## 1. The Concept of `useEffect`

`useEffect` is a function Hook that takes two arguments:

1. **Side-effect function**: This function contains the side-effect logic and runs after the component renders.
2. **Dependency array (optional)**: This array holds the variables the side-effect function depends on; the function only re-runs when these variables change. If you omit the array, the side-effect function runs after every render; if you pass an empty array, it runs only once when the component mounts.

### Usage

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Runs after mount and whenever count changes
    document.title = `You clicked ${count} times`;

    // An optional cleanup function, run when the component unmounts
    return () => {
      document.title = 'React App';
    };
  }, [count]); // Dependency array

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

In the example above, `useEffect` is used to update the page title to reflect the counter's state. The side-effect function runs whenever `count` changes, and the page title is cleaned up when the component unmounts.

---

## 2. The Internal Implementation of `useEffect`

### 2.1 `useEffect` in the Fiber Architecture

In React's Fiber architecture, the side-effect handling process for `useEffect` involves the following steps:

- **Side-effect queue**: On every render, React stores side-effect functions in a queue. This queue is used to execute the side-effect functions after the component updates.
- **Scheduling and execution**: React schedules these side-effect functions based on their dependency arrays. The variables in the dependency array determine when a side-effect function runs.
- **Cleanup function**: If a side-effect function returns a cleanup function, React calls it when the component unmounts or before the side effect runs again.

### 2.2 Rendering and Side Effects

- **Mounting**: When a component renders for the first time, the side-effect function runs after the DOM updates.
- **Updating**: Whenever a variable in the dependency array changes, the side-effect function is re-run.
- **Unmounting**: When a component unmounts, React calls the cleanup function (if there is one) to clean up the side effect.

---

## 3. Types of Side Effects

### 3.1 Data Fetching

```jsx
import React, { useState, useEffect } from 'react';

function DataFetchingComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });

    // An optional cleanup function (such as cancelling the request)
    return () => {
      // Cleanup logic
    };
  }, []); // Empty dependency array — runs once on mount

  if (loading) return <div>Loading...</div>;
  return <div>Data: {JSON.stringify(data)}</div>;
}
```

### 3.2 Subscriptions

```jsx
import React, { useState, useEffect } from 'react';

function SubscriptionComponent() {
  const [status, setStatus] = useState('offline');

  useEffect(() => {
    const handleStatusChange = (newStatus) => {
      setStatus(newStatus);
    };

    // Subscribe
    window.addEventListener('statusChange', handleStatusChange);

    // Cleanup function: unsubscribe when the component unmounts
    return () => {
      window.removeEventListener('statusChange', handleStatusChange);
    };
  }, []); // Empty dependency array — runs once on mount

  return <div>Status: {status}</div>;
}
```

### 3.3 Manual DOM Manipulation

```jsx
import React, { useEffect, useRef } from 'react';

function FocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    // Manually set focus
    inputRef.current.focus();
  }, []); // Empty dependency array — runs once on mount

  return <input ref={inputRef} type="text" />;
}
```

---

## 4. Summary

`useEffect` is a powerful Hook React provides for handling a component's side effects. With `useEffect`, you can easily manage side effects such as data fetching, subscriptions, and manual DOM manipulation, ensuring they run and are cleaned up at the right times. Understanding the internal implementation and use cases of `useEffect` helps you manage side effects in React applications more effectively.

---

## React 18 → 19 Comparison

The body of this page targets React 18. The table below maps this page's `useEffect` content to React 19:

| Behavior / API | React 18 status | React 19 change | Notes |
| --- | --- | --- | --- |
| `useEffect` signature and dependency array | Stable since 16.8 | No change | — |
| When the cleanup function runs | On unmount / dependency change | No change | — |
| Double invocation under StrictMode | Already present | No change | Still development-only behavior |
| ref callbacks | Assignment only | **Can return a cleanup function** | A second cleanup mechanism alongside effect cleanup |
| Data fetching inside `useEffect` | Common pattern | **New alternatives** | Use `use` for async components and Actions for submit-style side effects; see [React 19 new features](../future/react-new-features.md) |
| `act` import location | `react-dom/test-utils` | **Imported from `react`** | In tests, `act` is now imported from the `react` package |

Source: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

## References

- [React official docs · useEffect](https://react.dev/reference/react/useEffect)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [hooks-deep-dive](hooks-deep-dive.md)
- [glossary](/glossary.md))
- [knowledge](/knowledge.md))
