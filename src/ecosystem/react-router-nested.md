### 16.3 嵌套路由与页面跳转

嵌套路由和页面跳转是 React Router 的重要功能，使得开发者能够创建更复杂的界面结构和用户交互流程。下面介绍如何使用 React Router 实现嵌套路由和页面跳转。

#### 16.3.1 嵌套路由

嵌套路由允许在一个路由中定义子路由，从而创建层次结构的页面视图。这对于具有复杂布局的应用程序非常有用，例如具有多个面板或选项卡的管理面板。

**1. 定义嵌套路由**

可以在主路由的组件中定义子路由：
```javascript
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// 子组件
function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="overview">Overview</Link></li>
          <li><Link to="settings">Settings</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="overview" element={<Overview />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

function Overview() {
  return <h3>Overview Page</h3>;
}

function Settings() {
  return <h3>Settings Page</h3>;
}

// 主应用组件
function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return <h2>Home Page</h2>;
}

export default App;
```

**解释**：
- **主路由定义**：`/dashboard/*` 路由下定义了子路由 `overview` 和 `settings`。
- **嵌套的 `Routes` 组件**：在 `Dashboard` 组件中定义了子路由，使得点击不同链接时会渲染不同的子页面。

#### 16.3.2 页面跳转

页面跳转允许用户在应用中导航到不同的页面或视图。在 React Router 中，可以使用 `Link` 组件和 `useNavigate` 钩子来实现页面跳转。

**1. 使用 `Link` 组件**

`Link` 组件用于在应用内进行导航，类似于 HTML 的 `<a>` 标签，但不会导致页面重新加载：
```javascript
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}
```

**2. 使用 `useNavigate` 钩子**

`useNavigate` 钩子用于在函数组件中编程式地进行导航：
```javascript
import { useNavigate } from 'react-router-dom';

function LoginButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    // 导航到登录页面
    navigate('/login');
  };

  return <button onClick={handleClick}>Login</button>;
}
```

**完整示例**：
```javascript
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
      </ul>
    </nav>
  );
}

function Home() {
  return <h2>Home Page</h2>;
}

function About() {
  return <h2>About Page</h2>;
}

function Contact() {
  return <h2>Contact Page</h2>;
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="overview">Overview</Link></li>
          <li><Link to="settings">Settings</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="overview" element={<Overview />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

function Overview() {
  return <h3>Overview Page</h3>;
}

function Settings() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard/overview');
  };

  return (
    <div>
      <h3>Settings Page</h3>
      <button onClick={handleClick}>Go to Overview</button>
    </div>
  );
}

export default App;
```

**总结**：
- **嵌套路由**：通过在父路由中定义子路由，实现层次结构的页面。
- **页面跳转**：使用 `Link` 组件进行链接导航，或使用 `useNavigate` 钩子进行编程式导航。

这些功能使得你能够创建更加灵活和动态的用户界面，增强用户体验。