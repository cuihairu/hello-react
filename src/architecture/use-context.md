### `useContext` 与状态共享

`useContext` 是 React 提供的一个 Hook，用于在组件树中共享状态而不必通过组件的 prop 层层传递。它结合了 `Context API` 的功能，使得在多个组件中访问和更新状态变得更加简便。

---

## **1. Context API 概述**

Context API 是 React 中一个用于共享全局状态的机制。它允许将状态传递到组件树中的任意深度，而不需要通过层级传递 props。Context API 由以下几个主要部分组成：

- **`React.createContext`**：创建一个 Context 对象。
- **`Context.Provider`**：提供 Context 的值。
- **`Context.Consumer`**：订阅 Context 的变化。

`useContext` 是一个简化了的 Hook，用于访问 Context 的值，而不必使用传统的 `Context.Consumer` 组件。

---

## **2. 使用 `useContext` 的步骤**

### **2.1 创建 Context**

首先，使用 `React.createContext` 创建一个 Context 对象。这个对象包含了 Provider 和 Consumer。

```jsx
import React, { createContext, useState } from 'react';

// 创建一个 Context 对象
const ThemeContext = createContext();
```

### **2.2 使用 `Context.Provider` 提供 Context 的值**

在组件树的根组件或其他需要共享状态的组件中，使用 `Context.Provider` 包裹需要访问这个状态的组件。通过 `value` 属性传递 Context 的值。

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

### **2.3 使用 `useContext` 访问 Context**

在子组件中，使用 `useContext` Hook 来访问 Context 的值。`useContext` 接受一个 Context 对象作为参数，并返回当前的 Context 值。

```jsx
import React, { useContext } from 'react';

// 使用 useContext 访问 Context
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

## **3. 进阶用法**

### **3.1 默认值**

在创建 Context 时可以传递一个默认值。这个默认值在组件树中没有找到 Provider 时使用。

```jsx
const ThemeContext = createContext('light'); // 默认值为 'light'
```

### **3.2 组合多个 Context**

可以在同一个组件中使用多个 Context，例如同时管理主题和用户认证状态。

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

### **3.3 性能优化**

对于大型应用，可以考虑使用 `React.memo` 和 `useMemo` 来优化组件性能，避免不必要的重渲染。

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

## **4. 总结**

`useContext` 提供了一种简洁的方式来在组件树中共享状态。结合 Context API，`useContext` 可以有效地解决 props 层层传递的问题，使得跨层级的状态管理变得更加直观和易于维护。在复杂的应用中，合理使用 Context 和 `useContext` 可以显著提高代码的可读性和可维护性。