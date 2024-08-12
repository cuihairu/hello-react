第16章：React 路由
---

在 React 应用程序中，路由用于管理应用程序的不同视图或页面。React Router 是最流行的路由库之一，它提供了强大的功能来创建动态、可导航的单页面应用（SPA）。本章将介绍 React Router 的基本使用、配置和高级特性。

### 16.1 React Router 的安装与基本配置

#### 16.1.1 安装 React Router

React Router 的核心库是 `react-router-dom`，用于在 Web 应用中实现路由功能。可以使用以下命令安装：

```bash
npm install react-router-dom
```

或者使用 yarn：

```bash
yarn add react-router-dom
```

#### 16.1.2 基本用法

在 React 应用中使用 React Router 需要以下几个基本步骤：

1. **导入所需的组件**：
   ```javascript
   import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
   ```

2. **设置路由**：
   ```javascript
   function App() {
     return (
       <Router>
         <nav>
           <ul>
             <li><Link to="/">Home</Link></li>
             <li><Link to="/about">About</Link></li>
             <li><Link to="/contact">Contact</Link></li>
           </ul>
         </nav>

         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/about" element={<About />} />
           <Route path="/contact" element={<Contact />} />
         </Routes>
       </Router>
     );
   }
   ```

3. **创建组件**：
   ```javascript
   function Home() {
     return <h2>Home Page</h2>;
   }

   function About() {
     return <h2>About Page</h2>;
   }

   function Contact() {
     return <h2>Contact Page</h2>;
   }
   ```

### 16.2 路由参数与动态加载

#### 16.2.1 路由参数

React Router 支持在路由路径中使用参数。可以通过在路由路径中添加 `:` 前缀来定义参数，例如 `"/user/:id"`。在组件中，可以通过 `useParams` Hook 来获取这些参数：

```javascript
import { useParams } from 'react-router-dom';

function User() {
  const { id } = useParams();
  return <h2>User ID: {id}</h2>;
}

// 在 Routes 中配置
<Route path="/user/:id" element={<User />} />
```

#### 16.2.2 动态加载

有时需要根据条件动态加载组件或内容。可以使用 React 的 `lazy` 和 `Suspense` 来实现代码拆分和动态加载：

```javascript
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// 使用 lazy 加载组件
const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));
const Contact = lazy(() => import('./Contact'));

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
```

### 16.3 嵌套路由与页面跳转

#### 16.3.1 嵌套路由

嵌套路由允许在子路由中定义更多的路由。例如，您可能希望在一个页面中显示不同的子页面：

```javascript
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
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
```

#### 16.3.2 页面跳转

React Router 提供了 `useNavigate` Hook 用于编程式导航。可以在事件处理程序中使用它进行页面跳转：

```javascript
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // 进行登录逻辑
    navigate('/dashboard');
  };

  return (
    <button onClick={handleSubmit}>Login</button>
  );
}
```

### 16.4 路由保护与认证

#### 16.4.1 路由保护

可以创建一个高阶组件或组件封装来保护路由：

```javascript
import { Navigate } from 'react-router-dom';

function PrivateRoute({ element, ...rest }) {
  const isAuthenticated = /* 逻辑判断用户是否已认证 */;
  
  return isAuthenticated ? element : <Navigate to="/login" />;
}

// 使用 PrivateRoute
<Routes>
  <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
</Routes>
```

### 16.5 路由配置与编程式导航

#### 16.5.1 配置

React Router 支持通过配置对象的方式进行路由设置。可以将路由配置提取到一个单独的文件中：

```javascript
const routes = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/contact', element: <Contact /> },
  { path: '/user/:id', element: <User /> },
];
```

#### 16.5.2 编程式导航

使用 `useNavigate` 进行编程式导航：

```javascript
import { useNavigate } from 'react-router-dom';

function NavigateButton() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/somepath')}>
      Go to Some Path
    </button>
  );
}
```

### 总结

本章介绍了如何在 React 应用中使用 React Router 实现路由功能，包括基本配置、路由参数、动态加载、嵌套路由、页面跳转、路由保护和编程式导航。掌握这些技术可以帮助你创建更复杂和动态的单页面应用。