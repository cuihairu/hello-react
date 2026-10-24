### `useReducer` and Complex State Management

`useReducer` is a Hook in React used for handling complex state logic. It offers a more structured way to manage state updates, especially when state logic is intricate. `useReducer` is typically used together with a `dispatch` function, allowing you to define the rules for state updates and to update state based on different actions.

---

## 1. The Concept of `useReducer`

`useReducer` is an alternative to `useState`, and it fits scenarios that require multiple sub-values or complex state logic. The core idea of `useReducer` is to manage state updates through a reducer function: this reducer receives the current state and an action object, and returns the new state.

### Basic Usage

1. **Defining the Reducer Function**

The reducer function defines how state is updated based on different actions. It takes the current state and an action object as arguments and returns the new state.

```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}
```

2. **Using the `useReducer` Hook**

Use the `useReducer` Hook to initialize the state and the reducer function. `useReducer` returns the current state and a `dispatch` function used to trigger state updates.

```jsx
import React, { useReducer } from 'react';

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
    </div>
  );
}
```

---

## 2. The Internal Implementation of `useReducer`

### 2.1 `useReducer` in the Fiber Architecture

In React's Fiber architecture, the internal handling of `useReducer` works as follows:

- **Initialization**: When `useReducer` initializes, it calls the reducer function and sets the initial state to its return value.
- **Updates**: When `dispatch` is called, React calls the reducer function, passing it the current state and the action object, and then uses the reducer's return value as the new state.
- **Rendering**: After a state update, React re-renders the component and passes the new state to it.

### 2.2 Rendering and State

- **Mounting**: When a component mounts for the first time, `useReducer` initializes the state.
- **Updating**: Each time `dispatch` is called, `useReducer` updates the state and triggers a re-render.
- **Unmounting**: When a component unmounts, `useReducer` discards the current state.

---

## 3. Complex State Management Scenarios

### 3.1 Handling Complex State Logic

`useReducer` is well suited to complex state logic with multiple sub-states. For example, handling form state or several functional states within an application:

```jsx
import React, { useReducer } from 'react';

// Define the initial state and the reducer function
const initialState = { name: '', age: '', email: '' };

function reducer(state, action) {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_AGE':
      return { ...state, age: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    default:
      throw new Error();
  }
}

function Form() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <input
        type="text"
        value={state.name}
        onChange={(e) => dispatch({ type: 'SET_NAME', payload: e.target.value })}
        placeholder="Name"
      />
      <input
        type="number"
        value={state.age}
        onChange={(e) => dispatch({ type: 'SET_AGE', payload: e.target.value })}
        placeholder="Age"
      />
      <input
        type="email"
        value={state.email}
        onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
        placeholder="Email"
      />
      <p>Name: {state.name}</p>
      <p>Age: {state.age}</p>
      <p>Email: {state.email}</p>
    </div>
  );
}
```

### 3.2 Integrating Async Operations

`useReducer` can be combined with `useEffect` to handle asynchronous operations. For example, managing state while loading data:

```jsx
import React, { useReducer, useEffect } from 'react';

const initialState = {
  data: null,
  loading: true,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { ...state, data: action.payload, loading: false };
    case 'FETCH_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      throw new Error();
  }
}

function DataFetching() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => dispatch({ type: 'FETCH_SUCCESS', payload: data }))
      .catch(error => dispatch({ type: 'FETCH_ERROR', payload: error }));
  }, []);

  if (state.loading) return <p>Loading...</p>;
  if (state.error) return <p>Error: {state.error.message}</p>;

  return <div>Data: {JSON.stringify(state.data)}</div>;
}
```

---

## 4. Summary

`useReducer` provides a way to handle complex state logic, and it is a better fit than `useState` for scenarios with intricate state logic. By encapsulating state update logic inside a reducer function, `useReducer` helps you manage state and handle complex updates, particularly when state logic involves multiple sub-states or asynchronous operations. Once complex state is split into a reducer, the rules governing state changes become more centralized and easier to trace.

---

## React 18 → 19 Comparison

The body of this page targets React 18. The table below maps this page's `useReducer` content to React 19:

| Behavior / API | React 18 status | React 19 change | Notes |
| --- | --- | --- | --- |
| `useReducer` runtime behavior | Stable since 16.8 | No change | Lazy initialization and dispatch batching both unchanged |
| TypeScript types for `useReducer` | Can pass full reducer type parameters | **Types tightened** | The new style passes no type argument: `useReducer(reducer)`, or pass the action type as a tuple |
| `dispatch` batching | Automatic batching | No change | React 19 further merges the sync / default / continuous lane |
| Forms and optimistic state | Hand-rolled composition | **Added** | `useActionState`, `useOptimistic`; see [React 19 new features](../future/react-new-features.md) |

Source: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

## References

- [React official docs · useReducer](https://react.dev/reference/react/useReducer)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [hooks-deep-dive](hooks-deep-dive.md)
- [glossary](/glossary.md))
