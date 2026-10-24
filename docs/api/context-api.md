### Context API & Related Usage

React's Context API is an effective way to share state and data between components. It lets you pass data through the component tree without threading props down through every level. Context is well suited for passing data or state across multiple components, such as user identity or theme settings.

#### 1. **Creating a Context**

Use `React.createContext` to create a Context object, which contains a Provider and a Consumer.

```jsx
import React, { createContext, useState } from 'react';

// Create the Context object (for named import on the consumer side)
export const ThemeContext = createContext();

// Create the Context Provider component
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

- `createContext` creates a Context object.
- The `ThemeContext.Provider` component provides the context value to child components in the tree.

#### 2. **Providing a Value with `Context.Provider`**

At the top of the component tree (usually the app's root component), use `ThemeProvider` to provide the context value.

```jsx
const App = () => (
  <ThemeProvider>
    <MainComponent />
  </ThemeProvider>
);
```

#### 3. **Consuming a Context Value**

In a child component, use the `useContext` hook to retrieve the context value.

```jsx
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';

const MainComponent = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
      <p>Current Theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};
```

- The `useContext` hook takes a context object and returns that context's current value.

#### 4. **Default Context Values**

When creating a Context object, you can supply a default value. If a component finds no matching Provider, this default value is used.

```jsx
const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} });
```

#### 5. **Nested Context Providers**

You can use Context Providers at multiple levels of the application. Child components access the value from the nearest Provider.

```jsx
const App = () => (
  <ThemeProvider>
    <AnotherProvider>
      <MainComponent />
    </AnotherProvider>
  </ThemeProvider>
);
```

#### 6. **Context and Performance**

- Updating a Context re-renders every component that consumes it. If the Context value changes frequently, this can hurt performance.
- You can optimize re-renders with `React.memo` or `useMemo` to cut out unnecessary renders.

```jsx
const MainComponent = React.memo(() => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
      <p>Current Theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
});
```

#### 7. **Best Practices for the Context API**

- **Avoid frequent Context updates**: updating a context value often can cause performance problems. Split the parts that change into smaller contexts, or use a state management library such as Redux.
- **Use multiple Contexts**: when different kinds of data need to be passed, use multiple contexts instead of one large one.
- **Provide default values**: give Contexts sensible defaults so the app works even when no Provider is present.

### React 18 → 19 Version Comparison

The body of this page is based on React 18. The table below maps this page's Context usage to React 19:

| API / Pattern | React 18 Status | React 19 Change | Notes |
| --- | --- | --- | --- |
| `React.createContext` | Stable since 16.3 | No change | — |
| `<Context.Provider>` | Stable since 16.3 | Still usable; officially planned for deprecation | As of React 19, `<Context value={...}>` can serve directly as the Provider; an official codemod is provided |
| `useContext` | Stable since 16.8 | No change | — |
| Legacy Context (`contextTypes` / `getChildContext`) | Deprecated | **Removed** | Switch to `createContext` |

`use` (new in React 19) can also read context, and it may be called inside conditionals and loops. See [New Features in the Future Section](../future/react-new-features.md).

Source: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

### Summary

- **Creating a Context**: use `React.createContext` to create one.
- **Providing a Context**: use `Context.Provider` to provide the value.
- **Consuming a Context**: use the `useContext` hook in a function component.
- **Optimizing performance**: use `React.memo` and `useMemo` to reduce unnecessary renders.
- **Best practices**: avoid frequent updates, and layer data across multiple contexts.

## References

- [React Official Docs · Context](https://react.dev/learn/scaling-up-with-reducer-and-context)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [hooks-api](hooks-api.md)
- [glossary](glossary.md))
- [knowledge](knowledge.md))