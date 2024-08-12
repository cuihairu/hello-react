### 16.2 路由参数与动态加载

在 React Router 中，路由参数和动态加载是非常强大的功能，允许你创建更灵活和动态的用户界面。下面介绍如何使用路由参数和动态加载组件。

#### 16.2.1 路由参数

路由参数允许你在 URL 中传递动态数据，并根据这些数据来渲染不同的内容。例如，你可以创建一个用户页面，其中用户 ID 是通过路由参数传递的。

**1. 定义路由参数**

在路由定义中，你可以使用冒号 `:` 来定义参数：
```javascript
<Route path="/user/:id" element={<UserProfile />} />
```

**2. 访问路由参数**

在组件中，可以通过 `useParams` 钩子来访问这些参数：
```javascript
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams(); // 获取路由参数 id

  return (
    <div>
      <h2>User Profile</h2>
      <p>User ID: {id}</p>
    </div>
  );
}
```

**完整示例**：
```javascript
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/user/1">User 1</Link></li>
          <li><Link to="/user/2">User 2</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return <h2>Home Page</h2>;
}

function UserProfile() {
  const { id } = useParams();

  return (
    <div>
      <h2>User Profile</h2>
      <p>User ID: {id}</p>
    </div>
  );
}

export default App;
```

#### 16.2.2 动态加载组件

动态加载组件可以帮助你优化应用的性能，通过按需加载组件减少初始加载时间。React Router 结合 React 的 `lazy` 和 `Suspense` 组件可以实现组件的动态加载。

**1. 使用 `React.lazy` 和 `Suspense`**

`React.lazy` 用于动态加载组件，而 `Suspense` 用于在组件加载时提供备用内容或加载指示器。

**2. 动态加载组件示例**

```javascript
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// 动态加载组件
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

export default App;
```

**解释**：
- **`React.lazy(() => import('./Home'))`**：当需要渲染 `Home` 组件时才会加载对应的模块。
- **`<Suspense fallback={<div>Loading...</div>}>`**：在动态加载组件期间显示的内容。

**注意事项**：
- 使用 `React.lazy` 只能用于默认导出的组件。
- 确保 `Suspense` 组件包裹所有使用 `React.lazy` 的组件。

### 总结

通过路由参数，你可以在 URL 中传递动态数据，创建更为灵活的用户界面。动态加载组件则有助于提高应用性能，通过按需加载减少初始加载时间。这些功能结合起来，使得 React Router 成为一个强大且灵活的路由解决方案。