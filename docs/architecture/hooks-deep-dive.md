### A Deep Dive into Hooks

React Hooks are a feature introduced in React 16.8. They let you use state and other React features inside function components without writing class components. Hooks greatly simplified component logic and reuse, providing a more flexible and intuitive way to manage a component's state and side effects. Here I record how React Hooks are implemented internally and where they are used inside components.

---

## 10.1 The Internal Implementation and Use of `useState`

### Concept

- `useState` is a Hook React provides that lets a function component manage state internally. It returns an array: the first element is the current state value and the second is a function for updating the state.

### Implementation

- **Internal implementation**: React uses the Fiber architecture to manage Hook state. On every render, `useState` reads the state value based on the component's Fiber node and maintains state within the Fiber tree.

- **State updates**: When `setState` is called, React places the update request into an update queue and applies those updates on the next render. React schedules state updates according to priority to improve responsiveness.

### Usage

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

## 10.2 `useEffect` and Side-Effect Management

### Concept

- `useEffect` is used to handle side effects such as data fetching, subscriptions, and manual DOM manipulation. It runs after a component renders and can return a cleanup function to tear down the side effect.

### Implementation

- **Internal implementation**: `useEffect` runs after every render and decides whether to re-run the side-effect function based on changes in the dependency array. React maintains a queue of side effects within the Fiber node and runs them on each render.

- **Cleanup function**: If a side-effect function returns a cleanup function, React calls it when the component unmounts or before the side effect re-runs, to prevent memory leaks and unnecessary side effects.

### Usage

```jsx
import React, { useEffect, useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
    return () => {
      document.title = 'React App';
    };
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

## 10.3 `useContext` and State Sharing

### Concept

- `useContext` is used to access values from a React Context. It lets deeply nested components in a component tree access the context value directly, without passing props through each level.

### Implementation

- **Internal implementation**: `useContext` uses a Context object to retrieve the context value. React maintains the current Context value within the Fiber node and provides it to `useContext` when the component renders.

### Usage

```jsx
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext('light');

function ThemedComponent() {
  const theme = useContext(ThemeContext);

  return <div>Current theme: {theme}</div>;
}

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={theme}>
      <ThemedComponent />
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Toggle Theme</button>
    </ThemeContext.Provider>
  );
}
```

## 10.4 `useReducer` and Complex State Management

### Concept

- `useReducer` is a more complex state management Hook, suitable for managing state with intricate logic. It takes a reducer function and an initial state, and returns the current state and a dispatch function.

### Implementation

- **Internal implementation**: `useReducer` uses the reducer function to handle state updates. Each time `dispatch` is called, the reducer function computes the new state from the action and updates the state value in the Fiber node.

### Usage

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

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
    </div>
  );
}
```

## 10.5 Creating and Using Custom Hooks

### Concept

- Custom Hooks let you extract component logic into reusable functions. They can use other Hooks and React APIs to implement complex logic and encapsulate it in a single function.

### Implementation

- **Creating custom Hooks**: A custom Hook is a function that starts with `use`, and it can use other Hooks and React APIs inside. It can accept parameters and return any value or function you need.

### Usage

```jsx
import React, { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

function App() {
  const [name, setName] = useLocalStorage('name', 'Bob');

  return (
    <div>
      <p>Stored name: {name}</p>
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
}
```

## 10.6 Summary

React Hooks provide a brand-new way to manage a component's state and side effects, making function components far more powerful and flexible. Here I've laid out `useState`, `useEffect`, `useContext`, `useReducer`, and custom Hooks. How they are implemented affects how you organize component logic, along with the performance and maintenance cost.

---

## React 18 → 19 Comparison

The body of this chapter targets React 18. The table below summarizes the React 19 status of the Hooks covered here; see each page's comparison table for details:

| Hook | React 19 status | Details |
| --- | --- | --- |
| `useState` | No change | [useState](use-state.md) |
| `useEffect` | No change | [useEffect](use-effect.md) |
| `useContext` | No change; `<Context>` can be used directly as a Provider | [useContext](use-context.md) |
| `useReducer` | No runtime change; TypeScript types tightened | [useReducer](use-reducer.md) |
| `useCallback` / `useMemo` | No change; reuses the first result under StrictMode | See the note in the table below |
| `useRef` | Must pass an argument under TypeScript; all fully mutable | [Refs](../typescript-react/refs.md) |
| Custom Hooks | Mechanism unchanged | [Custom Hooks](custom-hooks.md) |
| New | `use`, `useActionState`, `useOptimistic`, `useFormStatus` | [React 19 new features](../future/react-new-features.md) |

Source: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

## References

- [React official docs · Hooks API Reference](https://react.dev/reference/react/apis)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [glossary](/glossary.md))
