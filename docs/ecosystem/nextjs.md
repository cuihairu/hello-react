### Basic Usage of Next.js

Next.js is a lightweight React-based framework that provides out-of-the-box server-side rendering (SSR), along with features like static site generation (SSG) and incremental static regeneration (ISR). Next.js simplifies complex configuration, helping developers build high-performance web apps quickly.

#### 1. **Creating a Next.js Project**

To start with Next.js, you first need to create a new project. Use the `create-next-app` scaffolding tool with the command below to initialize a Next.js project:

```bash
npx create-next-app@latest my-next-app
```

`my-next-app` is the project name. Once created, you can enter the project directory and start the dev server:

```bash
cd my-next-app
npm run dev
```

Visit `http://localhost:3000` in your browser to view the running Next.js app.

#### 2. **Project Structure Overview**

A Next.js project has a specific directory structure and set of files:

- **`pages/`**: Files in this directory are automatically converted to routes. For example, `pages/index.js` corresponds to the root path `/`, and `pages/about.js` corresponds to the `/about` route.
  
- **`public/`**: This directory stores static assets (images, fonts, etc.), which can be accessed directly via the `/` path.

- **`_app.js`**: The file at `pages/_app.js` customizes the app's root component. You can add global styles, global state management, and so on here.

- **`_document.js`**: The file at `pages/_document.js` customizes the HTML structure used for server-side rendering, typically used to add meta tags or modify the page structure.

#### 3. **Routing and Pages**

In Next.js, pages are defined by files in the `pages/` directory. Each file corresponds to a route — no extra configuration needed.

- **Static routes**: `pages/about.js` produces the `/about` route.
  
- **Dynamic routes**: Use square brackets `[]` to define dynamic route parameters. For example, `pages/posts/[id].js` corresponds to `/posts/:id`, where `id` is the dynamic parameter.

```jsx
// pages/posts/[id].js
import { useRouter } from 'next/router';

function Post() {
  const router = useRouter();
  const { id } = router.query; // Get the dynamic route parameter

  return <p>Post: {id}</p>;
}

export default Post;
```

#### 4. **Data Fetching**

Next.js supports several data fetching methods:

- **`getStaticProps`**: Used for static generation (SSG). Fetches data at build time and generates static pages.
  
- **`getStaticPaths`**: Used with `getStaticProps` to generate static pages for dynamic routes.
  
- **`getServerSideProps`**: Used for server-side rendering (SSR). Fetches data on each request and generates the page.

- **`getInitialProps`**: A legacy, generic data fetching method that works for both SSR and SSG, but is not recommended for new projects.

Example code:

```jsx
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

#### 5. **Styles and CSS**

Next.js supports several styling solutions:

- **Inline styles and Styled JSX**: Next.js has built-in support for styled-jsx, allowing scoped styles defined inside components.

```jsx
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

- **CSS Modules**: Name a CSS file `[name].module.css` to use CSS Modules.

```css
/* styles/Home.module.css */
.title {
  color: blue;
}
```

```jsx
// pages/index.js
import styles from '../styles/Home.module.css';

function Home() {
  return <h1 className={styles.title}>Hello, Next.js</h1>;
}
```

- **Global styles**: Import global styles in `_app.js`.

```jsx
// pages/_app.js
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

#### 6. **API Routes**

Next.js provides built-in API routes. Define API endpoints in the `pages/api` directory.

```javascript
// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello, world!' });
}
```

Visiting `/api/hello` returns the JSON response `{ message: 'Hello, world!' }`.

#### 7. **Deploying a Next.js App**

Next.js supports multiple deployment options. You can deploy to Vercel, Netlify, and other platforms, or self-host.

- **Vercel deployment**: Next.js's official hosting platform. Just push your code to GitHub and deploy automatically through Vercel.

- **Static export**: Use `next export` to export the app as pure static HTML files, suitable for serverless deployment scenarios.

```bash
npm run build
npm run export
```

I continue to check ISR, custom webpack configuration, and internationalization as my projects need them; whether to bring these features in depends on the runtime and deployment scenario.

## References

- [Next.js Official Docs](https://nextjs.org/docs)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [glossary](/glossary.md))
- [knowledge](/knowledge.md))
