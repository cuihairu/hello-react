### How `useState` and `useEffect` Work Internally

`useState` and `useEffect` are two core APIs of React Hooks, enabling function components to have state management and side effect handling capabilities. Comparing these two Hooks against the implementation details helps explain how state updates and side effect scheduling behave.

#### 1. How `useState` Works Internally

**1.1 `useState` Overview**

`useState` is a Hook used to manage the state of function components. It accepts an initial state value and returns an array containing the current state and a function to update the state.

**1.2 How It Works Internally**

- **State initialization**: On the first render, `useState` initializes the state by calling React's internal API. If the state is being set for the first time, React stores the initial state in an internal state queue.
- **State queue**: React maintains an internal state queue (the `memoizedState` of the `fiber` node) used to store the component's state. On each render, `useState` retrieves the current state from the state queue.
- **State updates**: When the `setState` function is called, React adds the new state value to the state queue and marks the component as needing a re-render. `setState` does not update the state immediately; instead, it adds the state update request to the queue and processes it in the next render cycle.
- **Re-rendering**: During re-rendering, React traverses the state queue and updates the state. Then, it re-renders the component based on the latest state.

**1.3 Core Code Example**

```javascript
function useState(initialState) {
  const dispatcher = ReactCurrentDispatcher.current;
  return dispatcher.useState(initialState);
}
```

- `ReactCurrentDispatcher.current` is a reference to the current Dispatcher object; `dispatcher.useState` actually handles state initialization and updates.

**1.4 Analysis of the Implementation**

- **State initialization**: On the first render, React uses the provided `initialState` to initialize the state and stores it in the `memoizedState` property of the fiber node.
- **State updates**: When the `setState` function is called, React adds the new state value to the update queue, triggering a re-render.

#### 2. How `useEffect` Works Internally

**2.1 `useEffect` Overview**

`useEffect` is a Hook for handling side effects. It accepts a side effect function and executes that function after the component renders. Side effect functions are used for data fetching, DOM manipulation, and so on.

**2.2 How It Works Internally**

- **Side effect function execution**: After the component finishes rendering, React calls the side effect function provided to `useEffect`. The side effect function can be synchronous, or it can return a cleanup function (used to clean up side effects).
- **Dependency array**: `useEffect` can accept a dependency array (`deps`). If any value in the dependency array changes, React re-calls the side effect function. Otherwise, it skips executing the side effect function.
- **Side effect cleanup**: If the side effect function returns a cleanup function, React calls this cleanup function before the component unmounts or before the side effect function is re-executed. Cleanup functions are used to clean up previously executed side effects (such as unsubscribing or clearing timers).

**2.3 Core Code Example**

```javascript
function useEffect(create, deps) {
  const dispatcher = ReactCurrentDispatcher.current;
  return dispatcher.useEffect(create, deps);
}
```

- `dispatcher.useEffect` handles the registration and scheduling of side effects.

**2.4 Analysis of the Implementation**

- **Side effect registration**: When a component renders, React registers the side effect function and its dependency array on the current fiber node. These side effects are called after the component renders.
- **Side effect execution**: After the component finishes rendering, React traverses all registered side effect functions and executes them at the appropriate time. React decides whether the side effect function needs to be re-executed based on the dependency array.
- **Side effect cleanup**: If the side effect function returns a cleanup function, React calls the cleanup function before each time the side effect function is re-executed or when the component unmounts.

### Summary

- **`useState`**: Used to manage component state. Its internal implementation involves maintaining a state queue and scheduling state updates. State initialization and updates are handled by React's internal API.
- **`useEffect`**: Used to handle side effects. Its internal implementation involves registering, executing, and cleaning up side effect functions. The timing and dependencies of side effects are controlled by React's scheduling mechanism.

Understanding how these two Hooks work internally can help developers use them more efficiently and better manage state and side effects when building complex applications.

## References

- [The React Repository](https://github.com/react/react)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [glossary](/glossary.md))
- [knowledge](/knowledge.md))
- [README](README.md)
