### 服务器端渲染（SSR）

服务器端渲染（Server-Side Rendering，简称 SSR）是一种在服务器上渲染页面并将 HTML 内容直接发送到客户端的技术。与客户端渲染（Client-Side Rendering，简称 CSR）不同，SSR 在服务器端预先渲染页面，这对于提升首屏加载速度和 SEO（搜索引擎优化）有显著的好处。

#### 概念与取舍

SSR 与 CSR 的定义、渲染过程对比以及首屏、SEO、服务负载和交互延迟等取舍，集中维护在[什么是服务器端渲染](what-is-ssr.md)。这里保留 React 服务端渲染 API 与实现方式的实践笔记。

#### 3. React 中的 SSR 实现

React 提供了 `renderToString` 和 `renderToNodeStream` 两个方法用于在服务器端渲染 React 组件。

##### 1. `renderToString` 方法

`renderToString` 是最常用的 SSR 方法，它将 React 组件渲染为一个字符串，并将该字符串直接插入到 HTML 模板中。

```jsx
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App';

const express = require('express');
const app = express();

app.get('*', (req, res) => {
  const content = ReactDOMServer.renderToString(<App />);
  
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SSR Example</title>
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `;
  
  res.send(html);
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
```

在这个例子中，`renderToString` 方法将 `<App />` 组件渲染为 HTML 字符串，然后将其插入到 HTML 模板的 `#root` 元素中。这个页面发送到客户端时，浏览器会立即显示内容。

##### 2. `renderToNodeStream` 方法

`renderToNodeStream` 方法可以逐步地将 React 组件流式渲染为 HTML，这对于处理大型页面或提升服务器性能非常有用。

```jsx
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App';

const express = require('express');
const app = express();

app.get('*', (req, res) => {
  res.write(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SSR Example</title>
      </head>
      <body>
        <div id="root">
  `);

  const stream = ReactDOMServer.renderToNodeStream(<App />);
  stream.pipe(res, { end: false });
  stream.on('end', () => {
    res.write(`
        </div>
        <script src="/bundle.js"></script>
      </body>
    </html>
    `);
    res.end();
  });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
```

在这个例子中，`renderToNodeStream` 逐步生成 HTML 并发送到客户端。这样，客户端可以更早地开始显示内容，同时服务器可以在渲染完成前继续处理其他请求。

#### 4. 使用 Next.js 进行 SSR 开发

Next.js 是一个基于 React 的框架，专门用于构建 SSR 和静态网站生成（Static Site Generation，SSG）。它极大简化了 SSR 的配置和开发流程。

##### 1. 快速开始

要使用 Next.js 进行 SSR 开发，可以按照以下步骤：

```bash
npx create-next-app my-next-app
cd my-next-app
npm run dev
```

这将创建一个新的 Next.js 项目，并在开发模式下运行。Next.js 自动处理 SSR，不需要额外的配置。

##### 2. 基本页面与路由

在 Next.js 中，任何在 `pages` 目录下的文件都会被自动映射为路由。

```jsx
// pages/index.js
import React from 'react';

const Home = () => {
  return <div>Welcome to Next.js SSR!</div>;
};

export default Home;
```

这个简单的页面将会在 `/` 路由下进行服务器端渲染。

##### 3. 数据获取

Next.js 提供了 `getServerSideProps` 函数用于在服务器端获取数据，并将其作为 props 传递给页面组件。

```jsx
// pages/index.js
import React from 'react';

export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();

  return {
    props: { data },
  };
}

const Home = ({ data }) => {
  return <div>Data from server: {data.message}</div>;
};

export default Home;
```

在这个例子中，`getServerSideProps` 函数会在服务器端执行，并将获取到的数据传递给 `Home` 组件进行渲染。

#### 5. SSR 的最佳实践

- **合理使用缓存**：SSR 可能增加服务器负担，因此应该合理使用缓存技术（如 CDN 缓存或 HTTP 缓存头）来减轻压力。
- **谨慎选择 SSR 页面**：并非所有页面都需要 SSR，对于动态性强、与 SEO 无关的页面，可以使用 CSR 或混合渲染（Hybrid Rendering）。
- **优化数据获取**：在 SSR 中，数据获取时间直接影响到页面渲染速度，因此需要优化 API 请求并减少不必要的数据获取。
- **管理客户端状态**：SSR 后，客户端需要接管页面的交互性，因此需要考虑如何在服务器端和客户端之间同步状态，如使用同构的状态管理库（如 Redux 或 MobX）。

**总结**：服务器端渲染（SSR）在提升首屏加载速度和改善 SEO 方面具有显著的优势。React 提供了简单的 API 实现 SSR，而 Next.js 则进一步简化了 SSR 的开发流程。通过合理的架构设计和性能优化，可以在 SSR 项目中获得良好的用户体验和可维护性。

## 参考资料

- [React 官方文档 · renderToPipeableStream](https://react.dev/reference/react-dom/server/renderToPipeableStream)

<!-- BACKLINKS-AUTO -->
## 相关页面

- [glossary](/zh/glossary.md))
- [knowledge](/zh/knowledge.md))
