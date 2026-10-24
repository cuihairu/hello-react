### Hooks API: useState, useEffect, useContext, useReducer, etc.

React Hooks, introduced in React 16.8, let function components use state and other React features. Below are some commonly used Hooks APIs with detailed notes:

#### 1. **`useState`**

**Description**:
- `useState` adds a state variable to a function component.

**Usage**:

```jsx
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```

**Notes**:
- `useState` returns an array containing the current state value and the function to update it.
- The initial state value is passed as the argument to `useState`.

#### 2. **`useEffect`**

**Description**:
- `useEffect` handles side effects, such as data fetching, subscriptions, or manual DOM manipulation.

**Usage**:

```jsx
import React, { useEffect, useState } from 'react';

const DataFetcher = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => setData(data));
  }, []); // Empty array means run once, when the component mounts

  return <div>{data ? data.message : 'Loading...'}</div>;
};
```

**Notes**:
- `useEffect` takes a function that runs after the component renders.
- You can pass a dependency array specifying which variables the effect depends on. If the dependency array is empty, the effect runs only when the component mounts and unmounts.

#### 3. **`useContext`**

**Description**:
- `useContext` accesses the value of a React context, letting a component pull data from it.

**Usage**:

```jsx
import React, { createContext, useContext } from 'react';

const ThemeContext = createContext('light');

const ThemedComponent = () => {
  const theme = useContext(ThemeContext);

  return <div style={{ background: theme === 'light' ? '#fff' : '#333' }}>
    The current theme is {theme}
  </div>;
};
```

**Notes**:
- `useContext` takes a context object (created by `createContext`) and returns that context's current value.
- The component must be wrapped in a `Context.Provider` to correctly access the context value.

#### 4. **`useReducer`**

**Description**:
- `useReducer` is an alternative to `useState` for handling more complex state logic.

**Usage**:

```jsx
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
    </div>
  );
};
```

**Notes**:
- `useReducer` takes a reducer function and an initial state, and returns the current state and a dispatch function.
- The reducer function updates state based on the action type.

#### 5. **`useCallback`**

**Description**:
- `useCallback` returns a memoized callback function, avoiding the creation of a new function instance each time the component re-renders.

**Usage**:

```jsx
import React, { useCallback, useState } from 'react';

const MyComponent = ({ onClick }) => {
  return <button onClick={onClick}>Click me</button>;
};

const ParentComponent = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]); // Depends on count, so handleClick is recreated when count changes

  return (
    <div>
      <p>Count: {count}</p>
      <MyComponent onClick={handleClick} />
    </div>
  );
};
```

**Notes**:
- `useCallback` takes a callback function and a dependency array, and returns the memoized callback.
- When a value in the dependency array changes, the callback is recreated.

#### 6. **`useMemo`**

**Description**:
- `useMemo` memoizes a computed result to avoid recomputing it unnecessarily.

**Usage**:

```jsx
import React, { useMemo, useState } from 'react';

const ExpensiveComponent = ({ value }) => {
  const computedValue = useMemo(() => {
    // Pretend there's an expensive computation here
    return value * 2;
  }, [value]); // Depends on value, so it recomputes when value changes

  return <div>Computed value: {computedValue}</div>;
};
```

**Notes**:
- `useMemo` takes a computation function and a dependency array, and returns the memoized result.
- The computation function only re-runs when a value in the dependency array changes.

#### 7. **`useImperativeHandle`**

**Description**:
- `useImperativeHandle` customizes the value exposed on a ref, so a parent component can access the child component's instance methods.

**Usage**:

```jsx
import React, { useImperativeHandle, forwardRef, useRef } from 'react';

const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));

  return <input ref={inputRef} />;
});

const ParentComponent = () => {
  const ref = useRef();

  const handleClick = () => {
    ref.current.focus();
  };

  return (
    <div>
      <FancyInput ref={ref} />
      <button onClick={handleClick}>Focus the input</button>
    </div>
  );
};
```

**Notes**:
- `useImperativeHandle` defines the instance value the component exposes to its parent.
- It must be used with `forwardRef`, which lets the parent reach the child's methods through the `ref`.

#### 8. **`useLayoutEffect`**

**Description**:
- `useLayoutEffect` works like `useEffect`, but runs synchronously right after the DOM update completes.

**Usage**:

```jsx
import React, { useLayoutEffect, useRef } from 'react';

const LayoutEffectExample = () => {
  const divRef = useRef();

  useLayoutEffect(() => {
    console.log('Layout effect:', divRef.current.getBoundingClientRect());
  }, []);

  return <div ref={divRef}>Hello, world!</div>;
};
```

**Notes**:
- `useLayoutEffect` runs synchronously before the browser paints.
- Use it when you need to measure DOM elements synchronously.

### React 18 → 19 Version Comparison

The body of this page is based on React 18. The table below maps this page's Hooks to React 19 for upgrade reference:

| API | React 18 Status | React 19 Change | Notes |
| --- | --- | --- | --- |
| `useState` | Stable since 16.8 | No change | — |
| `useEffect` | Stable since 16.8 | No change | — |
| `useContext` | Stable since 16.8 | No change | As of React 19, `<Context>` can serve directly as the Provider; see [Context API](context-api.md) |
| `useReducer` | Stable since 16.8 | No change | Tighter TypeScript types: no longer accepts the full reducer as a type argument |
| `useCallback` | Stable since 16.8 | No change | Under StrictMode, double-rendered components reuse the result from the first render |
| `useMemo` | Stable since 16.8 | No change | Same as `useCallback`: under StrictMode, the first result is reused |
| `useImperativeHandle` | Stable since 16.8 | No change | Can be combined with React 19's ref cleanup functions |
| `useLayoutEffect` | Stable since 16.8 | No change | — |

React 19's new `use`, `useActionState`, `useOptimistic`, and react-dom's `useFormStatus` are not covered on this page. See [New Features in the Future Section](../future/react-new-features.md).

Source: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

### Summary

- **`useState`** adds state to a function component.
- **`useEffect`** handles side effects.
- **`useContext`** accesses React context.
- **`useReducer`** handles complex state logic.
- **`useCallback`** memoizes a callback function.
- **`useMemo`** memoizes a computed result.
- **`useImperativeHandle`** customizes the instance value exposed to the parent via ref.
- **`useLayoutEffect`** runs a side effect immediately after the DOM updates.

These Hooks are powerful: they let function components handle all kinds of state and side-effect logic while keeping the code concise and maintainable.

## References

- [React Official Docs · Hooks Reference](https://react.dev/reference/react/apis)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [glossary](glossary.md))
- [knowledge](knowledge.md))