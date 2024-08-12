### 7.8 Context API 的应用

Context API 是 React 提供的一种机制，用于在组件树中共享数据，而不需要通过每层组件手动传递 props。它适用于那些需要在多个层级之间传递数据的场景，比如主题、用户认证、语言设置等。

---

## 7.8.1 什么是 Context API

### **定义**

Context API 是 React 中的一个功能，用于在组件树中共享数据，而不必通过逐层传递 props。它包括两个主要的组件：

- **`React.createContext()`**：用于创建一个 Context 对象，其中包含 Provider 和 Consumer。
- **`Provider`**：提供数据的组件，允许在其子组件中访问这些数据。
- **`Consumer`**：消费数据的组件，通过 context 对象获取数据。

### **基本用法**

#### **1. 创建 Context**

使用 `React.createContext()` 创建一个 Context 对象。

```jsx
import React from 'react';

// 创建 Context 对象
const ThemeContext = React.createContext('light');
```

#### **2. 使用 Provider**

使用 `Provider` 组件来提供 context 数据。

```jsx
import React from 'react';
import ThemeContext from './ThemeContext'; // 导入创建的 Context

const App = () => (
  <ThemeContext.Provider value="dark">
    <Toolbar />
  </ThemeContext.Provider>
);

const Toolbar = () => (
  <div>
    <ThemedButton />
  </div>
);
```

#### **3. 使用 Consumer**

使用 `Consumer` 组件来消费 context 数据。

```jsx
import React from 'react';
import ThemeContext from './ThemeContext'; // 导入创建的 Context

const ThemedButton = () => (
  <ThemeContext.Consumer>
    {theme => (
      <button className={theme}>
        {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
      </button>
    )}
  </ThemeContext.Consumer>
);
```

### **示例**

```jsx
import React from 'react';

// 创建 Context 对象
const ThemeContext = React.createContext('light');

const App = () => (
  <ThemeContext.Provider value="dark">
    <Toolbar />
  </ThemeContext.Provider>
);

const Toolbar = () => (
  <div>
    <ThemedButton />
  </div>
);

const ThemedButton = () => (
  <ThemeContext.Consumer>
    {theme => (
      <button style={{ background: theme === 'dark' ? '#333' : '#FFF', color: theme === 'dark' ? '#FFF' : '#000' }}>
        {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
      </button>
    )}
  </ThemeContext.Consumer>
);

export default App;
```

## 7.8.2 使用 Context API 的场景

### **主题设置**

Context API 常用于主题设置，通过它可以在应用中共享主题信息，而不需要将主题信息逐层传递。

```jsx
import React from 'react';

// 创建 Context 对象
const ThemeContext = React.createContext('light');

const App = () => (
  <ThemeContext.Provider value="dark">
    <ThemedComponent />
  </ThemeContext.Provider>
);

const ThemedComponent = () => (
  <ThemeContext.Consumer>
    {theme => (
      <div style={{ background: theme === 'dark' ? '#333' : '#FFF', color: theme === 'dark' ? '#FFF' : '#000' }}>
        The current theme is {theme}
      </div>
    )}
  </ThemeContext.Consumer>
);

export default App;
```

### **用户认证**

Context API 还可以用于共享用户认证信息，比如当前用户、权限等。

```jsx
import React from 'react';

// 创建 Context 对象
const UserContext = React.createContext(null);

const App = () => (
  <UserContext.Provider value={{ name: 'John Doe', isAuthenticated: true }}>
    <UserProfile />
  </UserContext.Provider>
);

const UserProfile = () => (
  <UserContext.Consumer>
    {user => (
      <div>
        {user.isAuthenticated ? `Hello, ${user.name}` : 'Please log in'}
      </div>
    )}
  </UserContext.Consumer>
);

export default App;
```

### **多语言支持**

Context API 可以用来实现多语言支持，在整个应用中共享语言设置。

```jsx
import React from 'react';

// 创建 Context 对象
const LanguageContext = React.createContext('en');

const App = () => (
  <LanguageContext.Provider value="fr">
    <Greeting />
  </LanguageContext.Provider>
);

const Greeting = () => (
  <LanguageContext.Consumer>
    {language => (
      <div>
        {language === 'fr' ? 'Bonjour' : 'Hello'}
      </div>
    )}
  </LanguageContext.Consumer>
);

export default App;
```

## 7.8.3 使用 Context API 的注意事项

### **避免过度使用**

Context 应该用于那些全局的或跨多个组件共享的数据。对于局部或单一组件的数据，使用 props 可能更为合适。过度使用 Context 会导致组件之间的紧耦合，增加维护难度。

### **性能优化**

Context 变化时，所有使用该 Context 的组件都会重新渲染。为了优化性能，可以使用 `React.memo` 或 `useMemo` 来避免不必要的重新渲染。

### **组合多个 Context**

如果需要管理多个不同的数据，可以组合多个 Context。

```jsx
import React from 'react';

// 创建多个 Context 对象
const ThemeContext = React.createContext('light');
const UserContext = React.createContext(null);

const App = () => (
  <ThemeContext.Provider value="dark">
    <UserContext.Provider value={{ name: 'John Doe', isAuthenticated: true }}>
      <UserProfile />
    </UserContext.Provider>
  </ThemeContext.Provider>
);

const UserProfile = () => (
  <ThemeContext.Consumer>
    {theme => (
      <UserContext.Consumer>
        {user => (
          <div style={{ background: theme === 'dark' ? '#333' : '#FFF', color: theme === 'dark' ? '#FFF' : '#000' }}>
            {user.isAuthenticated ? `Hello, ${user.name}` : 'Please log in'}
          </div>
        )}
      </UserContext.Consumer>
    )}
  </ThemeContext.Consumer>
);

export default App;
```

## 7.8.4 使用 `useContext` 钩子（函数组件）

### **基本用法**

在函数组件中使用 `useContext` 钩子可以更加简洁地访问 context 数据。

```jsx
import React, { useContext } from 'react';

// 创建 Context 对象
const ThemeContext = React.createContext('light');

const ThemedComponent = () => {
  const theme = useContext(ThemeContext);

  return (
    <div style={{ background: theme === 'dark' ? '#333' : '#FFF', color: theme === 'dark' ? '#FFF' : '#000' }}>
      The current theme is {theme}
    </div>
  );
};

const App = () => (
  <ThemeContext.Provider value="dark">
    <ThemedComponent />
  </ThemeContext.Provider>
);

export default App;
```

### **与其他钩子的结合**

`useContext` 可以与 `useState` 或 `useReducer` 等钩子结合使用来管理和共享状态。

```jsx
import React, { useState, useContext } from 'react';

// 创建 Context 对象
const ThemeContext = React.createContext('light');

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={theme}>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
      <ThemedComponent />
    </ThemeContext.Provider>
  );
};

const ThemedComponent = () => {
  const theme = useContext(ThemeContext);

  return (
    <div style={{ background: theme === 'dark' ? '#333' : '#FFF', color: theme === 'dark' ? '#FFF' : '#000' }}>
      The current theme is {theme}
    </div>
  );
};

export default ThemeToggle;
```

---

Context API 是 React 中一种强大的工具，适用于在组件树中共享全局数据。通过正确使用 Context，可以简化组件间的数据传递和状态管理，同时保持组件的可维护性和灵活性。