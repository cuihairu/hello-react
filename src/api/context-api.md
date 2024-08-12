### Context API 与相关用法

React 的 Context API 是一种解决组件之间共享状态和数据的有效方式，它允许你在组件树中传递数据，而不需要通过 props 层层传递。Context API 适用于跨多个组件传递数据或状态，例如用户身份、主题设置等。

#### 1. **创建 Context**

使用 `React.createContext` 创建一个 Context 对象，该对象包含一个 Provider 和一个 Consumer。

```jsx
import React, { createContext, useState } from 'react';

// 创建 Context 对象
const ThemeContext = createContext();

// 创建 Context Provider 组件
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

- `createContext` 创建一个 Context 对象。
- `ThemeContext.Provider` 组件用来提供 context 的值给组件树中的子组件。

#### 2. **使用 Context.Provider 提供值**

在组件树的顶层（通常是应用的根组件），使用 `ThemeProvider` 提供 context 值。

```jsx
const App = () => (
  <ThemeProvider>
    <MainComponent />
  </ThemeProvider>
);
```

#### 3. **消费 Context 值**

在子组件中，使用 `useContext` 钩子获取 context 的值。

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

- `useContext` 钩子接受一个 context 对象，并返回该 context 的当前值。

#### 4. **Context 的默认值**

在创建 Context 对象时，可以提供一个默认值。如果组件没有找到对应的 Provider，则会使用这个默认值。

```jsx
const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} });
```

#### 5. **嵌套的 Context Provider**

可以在应用的多个层级中使用 Context Provider。子组件可以访问最近的 Provider 提供的值。

```jsx
const App = () => (
  <ThemeProvider>
    <AnotherProvider>
      <MainComponent />
    </AnotherProvider>
  </ThemeProvider>
);
```

#### 6. **Context 与性能**

- Context 的更新会导致所有消费该 Context 的组件重新渲染。如果 Context 的值变化频繁，可能会影响性能。
- 可以通过 `React.memo` 或 `useMemo` 优化组件的重新渲染，减少不必要的渲染。

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

#### 7. **Context API 的最佳实践**

- **避免频繁的 Context 更新**：频繁更新 context 的值可能导致性能问题。将需要更新的部分拆分成更小的 context 或使用 state management 库如 Redux。
- **使用多个 Context**：如果有不同类型的数据需要传递，可以使用多个 context 而不是一个大的 context。
- **提供默认值**：为 Context 提供合理的默认值，以便在没有 Provider 的情况下，应用能正常工作。

### 总结

- **创建 Context**：使用 `React.createContext` 创建 context。
- **提供 Context**：使用 `Context.Provider` 提供 context 的值。
- **消费 Context**：使用 `useContext` 钩子在函数组件中消费 context。
- **优化性能**：使用 `React.memo` 和 `useMemo` 减少不必要的渲染。
- **最佳实践**：避免频繁更新、使用多个 context 进行分层管理。