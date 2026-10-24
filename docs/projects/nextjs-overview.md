### Next.js and Server-Side Rendering (SSR)

**Next.js** is a popular React framework for building server-side rendered (SSR) and statically generated applications. It provides powerful features that simplify and optimize React development, especially around server-side rendering, static generation, and routing. Here are the details on Next.js and SSR:

#### 23.1.1. Next.js Introduction
- **Next.js features**:
  - **Server-Side Rendering (SSR)**: Generates HTML on every request, suitable for data that updates frequently.
  - **Static Generation (SSG)**: Generates static HTML pages at build time, suitable for pages whose content doesn't change often.
  - **Automated code splitting**: Produces a separate JavaScript file for each page to optimize load speed.
  - **Routing system**: File-system-based routing simplifies route configuration and management.
  - **API routes**: Creates API routes inside the app to handle server-side logic.

#### 23.1.2. Creating a Next.js Project
1. **Initialize the project**:
   ```bash
   npx create-next-app@latest my-next-app
   cd my-next-app
   ```

2. **Project structure**:
   - `pages/`: Contains the app's page components; each file represents a route.
   - `public/`: Static assets directory, containing images and static files.
   - `styles/`: Global styles and CSS modules.

3. **Run the dev server**:
   ```bash
   npm run dev
   ```
   By default, the dev server starts at `http://localhost:3000`.

#### 23.1.3. Pages and Routes
- **Page components**: Create JavaScript or TypeScript files in the `pages/` directory, and the corresponding routes are generated automatically. For example, `pages/about.js` maps to the route `/about`.
- **Dynamic routes**: Use square brackets to create dynamic routes, for example `pages/posts/[id].js` maps to `/posts/:id`.

#### 23.1.4. API Routes
- **Creating API routes**: Create files in the `pages/api/` directory, for example `pages/api/hello.js`. Each file exports a function that handles the request:
  ```javascript
  export default function handler(req, res) {
    res.status(200).json({ message: 'Hello World' });
  }
  ```

#### 23.1.5. Data Fetching
- **Static Generation (SSG)**: Use `getStaticProps` to fetch data at build time and generate static pages.
  ```javascript
  export async function getStaticProps() {
    const res = await fetch('https://api.example.com/data');
    const data = await res.json();
    return { props: { data } };
  }
  ```
- **Server-Side Rendering (SSR)**: Use `getServerSideProps` to fetch data on every request.
  ```javascript
  export async function getServerSideProps(context) {
    const res = await fetch('https://api.example.com/data');
    const data = await res.json();
    return { props: { data } };
  }
  ```
- **Incremental Static Generation (ISR)**: Use the `revalidate` option to regenerate static pages after a given time interval.
  ```javascript
  export async function getStaticProps() {
    const res = await fetch('https://api.example.com/data');
    const data = await res.json();
    return { 
      props: { data },
      revalidate: 10, // regenerate the page after 10 seconds
    };
  }
  ```

#### 23.1.6. SSR and SEO Optimization
- **Server-Side Rendering (SSR)**: By generating complete HTML on the server, it improves initial load speed and SEO friendliness.
- **Static Generation (SSG)**: For pages whose content changes infrequently, use static generation to improve performance.
- **SEO best practices**:
  - Use Next.js's `Head` component to manage page titles and metadata.
  - Optimize page load time and content accessibility.
  - Ensure the site is search-engine friendly, generating valid HTML and metadata.

With Next.js, you can leverage its powerful server-side rendering and static generation features to optimize application performance and improve user experience and SEO results.

## References

- [Next.js Official Documentation](https://nextjs.org/docs)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [glossary](/glossary.md))
- [knowledge](/knowledge.md))
- [README](README.md)