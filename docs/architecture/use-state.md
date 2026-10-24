### The Internal Implementation and Use of `useState`

`useState` is one of the most fundamental Hooks in React; it lets a function component manage state internally. Below is a detailed look at the internal implementation of `useState` and how to use it in real development.

---

## 1. The Concept of `useState`

`useState` is a function that takes an initial state value as its argument and returns an array with two elements:

- **Current state value**: represents the current state.
- **State update function**: a function used to update the state value and trigger a component re-render.

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

In the example above, `useState` is used to manage the `count` state within the `Counter` component. The `setCount` function updates the value of `count` and triggers a re-render of the component.

---

## 2. The Internal Implementation of `useState`

The internal implementation of `useState` is built on React's Fiber architecture and mainly involves the following aspects:

### 2.1 State Management in the Fiber Architecture

- **Fiber node**: Every component in React has a corresponding Fiber node. A Fiber node stores information such as the component's state, props, and context.
- **Hooks linked list**: In a function component, Hooks are stored in a linked list within the Fiber node. Each time the component renders, React walks this linked list to access and update the Hooks' state.

### 2.2 Initial Render and Updates

- **Initial render**: When a component renders for the first time, React calls `useState` and stores the initial state value in the Fiber node. React creates a Hook linked list for each component and adds the state to it.
- **State updates**: When `setState` is called to update state, React places the update request into an update queue. React then applies these updates on the next render and recomputes the state in the Fiber node.

### 2.3 State Scheduling and Re-rendering

- **Scheduling**: React schedules state updates according to priority. State updates may be handled synchronously or asynchronously to optimize the user experience.
- **Re-rendering**: After a state update, React triggers a component re-render and computes a new Fiber tree. The updated state is reflected in the component.

### 2.4 Hooks Order

- **Hooks order**: React requires that Hooks be called in the same order on every render. This ensures React can correctly identify and update the state of each Hook.

---

## 3. Usage Examples of `useState`

### 3.1 A Simple Counter

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}
```

In this example, `useState` is used to manage the counter's state. Each time the button is clicked, the `setCount` function updates the state and triggers a component re-render.

### 3.2 State Initialization

```jsx
import React, { useState } from 'react';

function Example() {
  const [value, setValue] = useState(() => {
    // The state initialization function
    const initialValue = computeInitialValue();
    return initialValue;
  });

  return (
    <div>
      <p>Value: {value}</p>
      <button onClick={() => setValue(value + 1)}>Increase</button>
    </div>
  );
}

function computeInitialValue() {
  // The logic for computing the initial value
  return 42;
}
```

In this example, the initial value for `useState` is a function, which runs when the component renders for the first time. This usage is suitable for computing complex initial state.

---

## 4. Summary

`useState` is a simple yet powerful Hook that lets function components manage internal state. Its internal implementation relies on React's Fiber architecture, using Fiber nodes and the Hooks linked list to store and update state. In practice, `useState` provides an intuitive and flexible way to handle component state, making function components far more capable. Understanding the internal implementation of `useState` helps you use and optimize React applications better.

---

## React 18 → 19 Comparison

The body of this page targets React 18. The table below maps this page's `useState` content to React 19:

| Behavior / API | React 18 status | React 19 change | Notes |
| --- | --- | --- | --- |
| `useState` with lazy initialization | Stable since 16.8 | No change | — |
| State updates during the render phase | Allowed | No change | But circular updates are **detected and throw outright** |
| StrictMode double rendering | Already present | **Behavior refined** | More development-time checks; production behavior unchanged |
| New state-related Hooks | — | **Added** | `useOptimistic`, `useActionState`; see [React 19 new features](../future/react-new-features.md) |

Source: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

## References

- [React official docs · useState](https://react.dev/reference/react/useState)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [hooks-deep-dive](hooks-deep-dive.md)
- [glossary](/glossary.md))
- [knowledge](/knowledge.md))
