### `useContext` and State Sharing

`useContext` is a Hook React provides for sharing state through a component tree without passing it down through props layer by layer. It combines the functionality of the `Context API`, making it easier to access and update state across multiple components.

---

## 1. Overview of the Context API

The Context API is a mechanism in React for sharing global state. It lets you pass state to any depth in a component tree without threading props through each level. The Context API consists mainly of the following parts:

- **`React.createContext`**: Creates a Context object.
- **`Context.Provider`**: Provides the value of the Context.
- **`Context.Consumer`**: Subscribes to changes in the Context.

`useContext` is a simplified Hook for accessing the value of a Context without using the traditional `Context.Consumer` component.

---

## 2. Steps for Using `useContext`

### 2.1 Creating a Context

First, create a Context object with `React.createContext`. This object contains the Provider and Consumer.

```jsx
import React, { createContext, useState } from 'react';

// Create a Context object
const ThemeContext = createContext();
```

### 2.2 Providing the Context Value with `Context.Provider`

In the root component of the component tree, or in any other component that needs to share state, wrap the components that need to access this state with `Context.Provider`. Pass the Context value through the `value` prop.

```jsx
function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}
```

### 2.3 Accessing the Context with `useContext`

In a child component, use the `useContext` Hook to access the Context value. `useContext` takes a Context object as its argument and returns the current Context value.

```jsx
import React, { useContext } from 'react';

// Access the Context with useContext
function Toolbar() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
}
```

---

## 3. Advanced Usage

### 3.1 Default Values

You can pass a default value when creating a Context. This default value is used when no Provider is found in the component tree.

```jsx
const ThemeContext = createContext('light'); // Default value is 'light'
```

### 3.2 Combining Multiple Contexts

You can use multiple Contexts within the same component, for example to manage both theme and user authentication state at the same time.

```jsx
const ThemeContext = createContext();
const UserContext = createContext();

function App() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <UserContext.Provider value={{ user, setUser }}>
        <Toolbar />
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const { theme, setTheme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);

  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Current user: {user ? user.name : 'Guest'}</p>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
}
```

### 3.3 Performance Optimization

For large applications, you can consider using `React.memo` and `useMemo` to optimize component performance and avoid unnecessary re-renders.

```jsx
import React, { useContext, useMemo } from 'react';

const Toolbar = React.memo(() => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleClick = useMemo(() => () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={handleClick}>Toggle Theme</button>
    </div>
  );
});
```

---

## 4. Summary

`useContext` provides a concise way to share state through a component tree. Combined with the Context API, `useContext` effectively solves the problem of prop drilling, making state management across levels more intuitive and easier to maintain. In complex applications, using Context and `useContext` appropriately can greatly improve the readability and maintainability of your code.

---

## React 18 → 19 Comparison

The body of this page targets React 18. The table below maps this page's Context content to React 19:

| Behavior / API | React 18 status | React 19 change | Notes |
| --- | --- | --- | --- |
| `useContext` | Stable since 16.8 | No change | — |
| Legacy Context (`contextTypes` / `getChildContext`) | Available | **Removed** | Use `createContext` + `contextType` instead |
| `<Context.Provider>` | Required | **Can be shortened** | `<Context value={...}>` is equivalent |
| Reading Context inside an async component | Requires `useContext` | **New `use`** | `use(SomeContext)` can read directly in a component |
| `createContext` | Stable | No change | Like `useRef`, it requires an initial value (at the type level) |

Source: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

## References

- [React official docs · useContext](https://react.dev/reference/react/useContext)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [hooks-deep-dive](hooks-deep-dive.md)
- [glossary](/glossary.md))
