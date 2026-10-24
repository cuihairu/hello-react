### Server-Side Rendering (SSR)

Server-Side Rendering (SSR) is a technique that renders pages on the server and sends the HTML content directly to the client. Unlike Client-Side Rendering (CSR), SSR pre-renders pages on the server, which brings significant benefits for first-screen load speed and SEO (search engine optimization).

#### Concepts and Trade-offs

The definitions of SSR vs. CSR, a comparison of their rendering processes, and the trade-offs around first paint, SEO, server load, and interaction latency are maintained centrally in [What Is Server-Side Rendering](what-is-ssr.md). This page keeps practical notes on React's server rendering APIs and implementation approaches.

#### 3. Implementing SSR in React

React provides two methods for rendering React components on the server: `renderToString` and `renderToNodeStream`.

##### 1. The `renderToString` method

`renderToString` is the most commonly used SSR method. It renders a React component to a string, which is then inserted directly into the HTML template.

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

In this example, `renderToString` renders the `<App />` component to an HTML string, then inserts it into the HTML template's `#root` element. When the page reaches the client, the browser displays the content immediately.

##### 2. The `renderToNodeStream` method

The `renderToNodeStream` method can progressively stream the rendered HTML of React components, which is very useful for handling large pages or improving server performance.

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

In this example, `renderToNodeStream` generates the HTML progressively and sends it to the client. This way, the client can start displaying content earlier, while the server can keep handling other requests before rendering finishes.

#### 4. SSR Development with Next.js

Next.js is a React-based framework built specifically for SSR and Static Site Generation (SSG). It greatly simplifies SSR configuration and the development workflow.

##### 1. Quick start

To develop with SSR using Next.js, follow these steps:

```bash
npx create-next-app my-next-app
cd my-next-app
npm run dev
```

This creates a new Next.js project and runs it in development mode. Next.js handles SSR automatically — no extra configuration needed.

##### 2. Basic pages and routing

In Next.js, any file in the `pages` directory is automatically mapped to a route.

```jsx
// pages/index.js
import React from 'react';

const Home = () => {
  return <div>Welcome to Next.js SSR!</div>;
};

export default Home;
```

This simple page will be server-side rendered under the `/` route.

##### 3. Data fetching

Next.js provides the `getServerSideProps` function for fetching data on the server and passing it to the page component as props.

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

In this example, the `getServerSideProps` function runs on the server and passes the fetched data to the `Home` component for rendering.

#### 5. SSR Best Practices

- **Use caching wisely**: SSR can increase server load, so use caching techniques sensibly (like CDN caching or HTTP cache headers) to relieve the pressure.
- **Choose SSR pages carefully**: Not every page needs SSR. For highly dynamic pages unrelated to SEO, use CSR or hybrid rendering.
- **Optimize data fetching**: In SSR, data fetching time directly affects page rendering speed, so optimize API requests and cut unnecessary data fetching.
- **Manage client state**: After SSR, the client takes over page interactivity, so consider how to synchronize state between server and client, such as with an isomorphic state management library (like Redux or MobX).

**Summary**: Server-Side Rendering (SSR) offers significant advantages for improving first-screen load speed and SEO. React provides simple APIs for SSR, and Next.js further simplifies the SSR development workflow. With sound architecture and performance optimization, you can achieve good user experience and maintainability in SSR projects.

## References

- [React Official Docs · renderToPipeableStream](https://react.dev/reference/react-dom/server/renderToPipeableStream)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [glossary](/glossary.md))
- [knowledge](/knowledge.md))
