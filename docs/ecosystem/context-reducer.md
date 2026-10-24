### Combining the Context API with useReducer

In React applications, the `Context API` and `useReducer` are two powerful tools commonly used for global state management. The `Context API` is mainly used to share state across the component tree, while `useReducer` is a better fit than `useState` for managing complex state. Combining these two tools creates a lightweight state management solution, ideal for small or medium projects that don't need a full external library like Redux.

#### 1. Overview of Context API and useReducer

- **Context API**: React's built-in mechanism for sharing global data across the component tree, avoiding the hassle of passing data down through props at every level.
- **useReducer**: A React Hook for managing complex state logic. It takes a `reducer` function and initial state, and returns the current state and a `dispatch` function used to trigger state changes.

#### 2. Use Cases

When your app needs to share state across multiple components with relatively complex state logic, combining `Context API` with `useReducer` is a great choice. It works well for managing user authentication state, theme settings, shopping carts, and similar scenarios.

#### 3. Implementation Steps

##### 1. Create the Context and Reducer

First, define a `reducer` function and initial state. Then, create a Context.

```javascript
import React, { createContext, useReducer } from 'react';

// Define the initial state
const initialState = {
  count: 0,
  user: null,
};

// Define the reducer function
function appReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'SET_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

// Create the Context
export const AppContext = createContext();
```

##### 2. Create the Context Provider Component

Next, create a `Provider` component. This component passes the state and `dispatch` function provided by `useReducer` to child components through `Context`.

```jsx
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
```

Wrap `AppProvider` around the app's root component or the subset of components that need global state.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AppProvider } from './context/AppContext';

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById('root')
);
```

##### 3. Use Context and useReducer in Components

In components that need to read or update global state, use the `useContext` hook to get `state` and `dispatch`.

```jsx
import React, { useContext } from 'react';
import { AppContext } from './context/AppContext';

function Counter() {
  const { state, dispatch } = useContext(AppContext);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>
        Increment
      </button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>
        Decrement
      </button>
    </div>
  );
}

export default Counter;
```

##### 4. State Sharing Example

Suppose you have a user authentication state that needs to be shared across the app. Use a similar approach to dispatch the `SET_USER` action to the reducer to update user information.

```jsx
function Login() {
  const { dispatch } = useContext(AppContext);

  const loginUser = (user) => {
    // Simulate a successful login
    dispatch({ type: 'SET_USER', payload: user });
  };

  return <button onClick={() => loginUser({ name: 'John Doe' })}>Login</button>;
}

function UserProfile() {
  const { state } = useContext(AppContext);

  return state.user ? <p>User: {state.user.name}</p> : <p>No user logged in</p>;
}
```

#### 4. Advantages and Cautions

- **Advantages**:
  - **Lightweight**: No additional state management library required, reducing app complexity.
  - **Modular**: The combination of `useReducer` and `Context API` cleanly modularizes state management logic, making code easier to organize.
  - **Easy to maintain**: State logic is centralized in the `reducer`, making it easier to manage and maintain.

- **Cautions**:
  - **Performance issues**: In large-scale apps, frequent state updates may impact performance. Use `useContext` carefully in components to avoid unnecessary re-renders.
  - **Scope of state sharing**: Be mindful of `Context`'s scope. Don't overuse global state; design it based on actual requirements.

**Summary**: By combining `Context API` and `useReducer`, you can implement a simple yet powerful global state management system in React apps. It's ideal for small projects with complex state logic that don't need a full-featured state management library. In practice, choose the right state management approach based on project scale and complexity.

## References

- [React Official Docs · Context + useReducer](https://react.dev/learn/scaling-up-with-reducer-and-context)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [glossary](/glossary.md))
- [knowledge](/knowledge.md))
