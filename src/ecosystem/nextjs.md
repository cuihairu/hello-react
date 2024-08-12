### Next.js 的基本用法

Next.js 是一个基于 React 的轻量级框架，提供了开箱即用的服务器端渲染（SSR）功能，以及静态站点生成（SSG）和增量静态再生（ISR）等特性。Next.js 简化了复杂的配置，帮助开发者快速构建高性能的 Web 应用。

#### 1. **创建 Next.js 项目**

要开始使用 Next.js，你首先需要创建一个新项目。你可以使用以下命令通过 `create-next-app` 脚手架工具来初始化一个 Next.js 项目：

```bash
npx create-next-app@latest my-next-app
```

`my-next-app` 是项目的名称，创建完成后，你可以进入项目目录并启动开发服务器：

```bash
cd my-next-app
npm run dev
```

浏览器中访问 `http://localhost:3000` 即可查看运行中的 Next.js 应用。

#### 2. **项目结构概览**

Next.js 项目有一些特定的目录结构和文件：

- **`pages/`**：该目录下的文件会被自动转换为路由。例如，`pages/index.js` 对应根路径 `/`，`pages/about.js` 对应 `/about` 路由。
  
- **`public/`**：该目录用于存放静态资源（如图片、字体等），这些资源可以通过 `/` 路径直接访问。

- **`_app.js`**：位于 `pages/_app.js` 的文件用于自定义应用根组件。可以在这里添加全局样式、全局状态管理等。

- **`_document.js`**：位于 `pages/_document.js` 的文件用于自定义服务器端渲染的 HTML 结构，通常用于添加 meta 标签或修改页面结构。

#### 3. **路由与页面**

在 Next.js 中，页面（Page）是通过 `pages/` 目录下的文件来定义的。每个文件对应一个路由，无需额外配置。

- **静态路由**：`pages/about.js` 将生成 `/about` 路由。
  
- **动态路由**：使用方括号 `[]` 定义动态路由参数。例如，`pages/posts/[id].js` 对应 `/posts/:id`，其中 `id` 是动态参数。

```javascript
// pages/posts/[id].js
import { useRouter } from 'next/router';

function Post() {
  const router = useRouter();
  const { id } = router.query; // 获取动态路由参数

  return <p>Post: {id}</p>;
}

export default Post;
```

#### 4. **数据获取（Data Fetching）**

Next.js 支持多种数据获取方式：

- **`getStaticProps`**：用于静态生成（SSG）。在构建时获取数据，生成静态页面。
  
- **`getStaticPaths`**：与 `getStaticProps` 配合使用，为动态路由生成静态页面。
  
- **`getServerSideProps`**：用于服务器端渲染（SSR）。在每个请求时获取数据，生成页面。

- **`getInitialProps`**：一种旧式的通用数据获取方法，适用于 SSR 和 SSG，但不推荐在新项目中使用。

示例代码：

```javascript
// pages/posts/[id].js
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

function Post({ postData }) {
  return (
    <article>
      <h1>{postData.title}</h1>
      <p>{postData.content}</p>
    </article>
  );
}

export default Post;
```

#### 5. **样式与 CSS**

Next.js 支持多种样式解决方案：

- **内联样式与 Styled JSX**：Next.js 内置支持 styled-jsx，允许在组件内部定义作用域样式。

```javascript
function Home() {
  return (
    <div>
      <h1>Hello, Next.js</h1>
      <style jsx>{`
        h1 {
          color: red;
        }
      `}</style>
    </div>
  );
}
```

- **CSS 模块**：将 CSS 文件名命名为 `[name].module.css`，即可使用 CSS 模块。

```javascript
// styles/Home.module.css
.title {
  color: blue;
}
```

```javascript
// pages/index.js
import styles from '../styles/Home.module.css';

function Home() {
  return <h1 className={styles.title}>Hello, Next.js</h1>;
}
```

- **全局样式**：可以在 `_app.js` 中引入全局样式。

```javascript
// pages/_app.js
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

#### 6. **API 路由**

Next.js 提供了内置的 API 路由功能，可以在 `pages/api` 目录下定义 API 端点。

```javascript
// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello, world!' });
}
```

访问 `/api/hello` 即可获取 JSON 响应 `{ message: 'Hello, world!' }`。

#### 7. **部署 Next.js 应用**

Next.js 支持多种部署方式，可以部署到 Vercel、Netlify 等平台，也可以自托管。

- **Vercel 部署**：Next.js 的官方托管平台，只需将代码推送到 GitHub，然后通过 Vercel 进行自动部署。

- **静态导出**：使用 `next export` 将应用导出为纯静态 HTML 文件，适用于无服务器的部署场景。

```bash
npm run build
npm run export
```

这些基础用法可以帮助你快速上手 Next.js 开发。你可以根据项目需求深入探索 Next.js 提供的其他高级功能，如增量静态再生（ISR）、自定义 webpack 配置、国际化支持等。