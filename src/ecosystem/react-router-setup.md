### 16.1 React Router 的安装与基本配置

React Router 是用于在 React 应用程序中实现路由的最常用库之一。它允许你创建和管理动态的单页面应用（SPA），并提供了丰富的功能来处理不同的视图和导航。以下是安装和基本配置的步骤：

#### 16.1.1 安装 React Router

React Router 的核心库是 `react-router-dom`，用于在 Web 应用中实现路由功能。可以通过以下命令安装：

使用 npm：
```bash
npm install react-router-dom
```

使用 yarn：
```bash
yarn add react-router-dom
```

#### 16.1.2 基本用法

在 React 应用中使用 React Router 需要以下几个基本步骤：

1. **导入所需的组件**：
   ```javascript
   import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
   ```

   - `BrowserRouter`：管理应用程序的浏览器历史记录。
   - `Route`：定义一个路由规则，指定路径和渲染的组件。
   - `Routes`：包含所有 `Route` 组件的容器，用于渲染匹配的路由。
   - `Link`：用于创建导航链接。

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

   - **`<Router>`** 包裹应用程序的根组件，管理所有的路由。
   - **`<nav>`** 部分包含了导航链接，用户可以通过这些链接在应用程序中导航。
   - **`<Routes>`** 包含多个 **`<Route>`** 组件，每个 **`<Route>`** 组件定义了一个路径和相应的组件。

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

   这些组件将根据路由配置进行渲染。

#### 16.1.3 完整示例

下面是一个完整的 React Router 配置示例：

```javascript
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

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

function Home() {
  return <h2>Home Page</h2>;
}

function About() {
  return <h2>About Page</h2>;
}

function Contact() {
  return <h2>Contact Page</h2>;
}

export default App;
```

#### 16.1.4 其他 Router 组件

- **`HashRouter`**：使用 URL 哈希来管理历史记录，适用于不支持 HTML5 History API 的环境。
  ```javascript
  import { HashRouter as Router } from 'react-router-dom';
  ```

- **`MemoryRouter`**：用于测试或在非浏览器环境中使用，管理内存中的历史记录。
  ```javascript
  import { MemoryRouter as Router } from 'react-router-dom';
  ```

### 总结

通过以上步骤，你可以成功安装和配置 React Router，并创建一个简单的多页面应用。掌握这些基本用法之后，你可以进一步探索 React Router 的高级功能，如路由参数、嵌套路由和动态加载等。