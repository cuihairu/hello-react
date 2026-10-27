# Knowledge Map

> This page gathers into a single page the knowledge points scattered through the body pages of every section: core concepts, official documentation, application scenarios and common pitfalls. Each entry names its source and links back to its body page; entries with no supporting evidence in the body pages are marked "source unverified". The body pages cite no external books, so the authoritative books section is honestly left empty.

## Core Concepts

### Web Basics

- Node.js is an event-driven JavaScript runtime built on Chrome V8 with non-blocking I/O; nvm pins a project's version through `.nvmrc`, and `nvm use` switches automatically. See [Installing and Configuring Node.js](basics/nodejs-setup.md) and [Managing Node.js Versions with nvm](basics/nvm-setup.md).
- npm is Node.js's default package manager; the scripts, dependencies, devDependencies and engines fields of package.json record project metadata, and package-lock.json pins exact versions. Yarn installs faster with better offline support, and pnpm uses hard links to save disk space. See [Using npm and Package Managers](basics/npm-usage.md) and [Creating and Managing Projects](basics/project-management.md).
- HTML semantic tags (header, nav, main, section, article, aside, footer) bring benefits in three areas at once: readability, SEO and accessibility. See [HTML Structure and Semantic Tags](basics/html-structure.md).
- The CSS cascade order is inline styles > ID selectors > class/attribute/pseudo-class selectors > type selectors; inheritance can be controlled with the inherit, initial and unset keywords. See [CSS Syntax and Selectors](basics/css-syntax-selectors.md).
- The CSS box model has four parts: content, padding, border and margin. Under the default content-box, width/height cover only the content area, while border-box also includes padding and border. Flexbox is one-dimensional layout and Grid is two-dimensional; positioning comes in five kinds: static, relative, absolute, fixed and sticky. See [CSS Box Model and Layout](basics/css-box-model-layout.md) and [Flexbox and Grid Layout](basics/flexbox-grid.md).
- The three principles of responsive design are fluid layout, flexible media and media queries; the site example uses breakpoints of ≤600px for phones, 601–900px for tablets and ≥901px for desktops. See [Responsive Design and Media Queries](basics/responsive-design.md).
- JavaScript was developed by Brendan Eich at Netscape in 1995; it was first called Mocha, then LiveScript, and finally JavaScript. There are seven primitive types: undefined, null, boolean, number, bigint, string and symbol. See [A Brief History of JavaScript](basics/js-history-development.md) and [Variables, Data Types, and Operators](basics/js-variables-types-operators.md).
- ES6 (2015) introduced 14 features in one go — let/const, arrow functions, class, template strings, destructuring assignment, Promise, Map/Set and more; ES8 (2017) added async/await, and ES11 (2020) added `??` and `?.`. See [Key ES6+ Features](basics/es6-features.md) and [A Brief History of JavaScript](basics/js-history-development.md).
- A Promise has three states — Pending/Fulfilled/Rejected — and then/catch/finally return new Promises so calls can be chained; Promise.all succeeds only when everything succeeds, and Promise.race returns whichever settles first. async/await is syntactic sugar built on Promises, and await may only be used inside an async function. See [Promises and Asynchronous Programming](basics/js-promise-async.md).
- ES6 modules: a module may have only one default export but any number of named exports; the benefits are code organization, reusability and dependency management. See [Modules: import and export](basics/js-modules.md).
- From ESLint 9 on, the official recommendation is the flat config (eslint.config.js), while ESLint 8 and earlier use .eslintrc.json. Prettier 3 replaced the old jsxBracketSameLine with bracketSameLine. See [ESLint and Prettier Configuration](basics/eslint-prettier.md).

### TypeScript Fundamentals

- TypeScript is a superset of JavaScript: all valid JavaScript code is valid TypeScript code, and migration can be gradual; static type checking moves errors earlier, to the compile stage. See [Why TypeScript](typescript-react/why-typescript.md).
- There are 10 basic types: number, string, boolean, array, tuple, enum, any, void, null/undefined and never. any bypasses type checking and should be avoided wherever possible; never stands for a value that never occurs. See [Basic Types and Interfaces](typescript-react/types-interfaces.md).
- Interfaces support optional properties, read-only properties, function types, indexable types, inheritance (extends) and implementation (implements); the three access modifiers are public (the default), private and protected; abstract classes cannot be instantiated, only extended. See [Basic Types and Interfaces](typescript-react/types-interfaces.md) and [Classes and Generics](typescript-react/classes-generics.md).
- A generic constraint such as `<T extends Lengthwise>` guarantees that a type parameter has specific members; a generic default only takes effect when inference fails. See [Classes and Generics](typescript-react/classes-generics.md).
- Modules are recommended for modern projects and namespaces for legacy code; a module can have only one default export. See [Modules and Namespaces in TypeScript](typescript-react/modules-namespaces.md).
- Key tsconfig.json options: target, module, strict, esModuleInterop and skipLibCheck; Vite supports TypeScript natively, while Webpack needs ts-loader. See [TypeScript Installation and Setup](typescript-react/setup.md).
- From React 18 on, the official type definitions no longer give React.FC an implicit children prop (React 17 and earlier did); if you need children, declare them explicitly in Props. See [Using TypeScript in React Projects](typescript-react/react-typescript.md).

### React Core and Component Development

- Three design principles: componentization (each component owns its state and rendering logic, and can be nested and composed), declarative (you describe what the UI should look like rather than how to update it) and unidirectional data flow (data flows from parent to child through props, and a child cannot directly modify its parent's data). See [React's History and Core Principles](typescript-react/react-history-principles.md).
- The Virtual DOM workflow: rendering produces a virtual DOM tree → the new and old trees are compared to compute a diff → real DOM operations are minimized. See [React's History and Core Principles](typescript-react/react-history-principles.md).
- JSX is an extension of JavaScript syntax that is compiled into React.createElement calls; attribute names are camelCase, boolean attributes can be written in shorthand, and every item in a rendered list needs a unique key. See [JSX Syntax and Usage](typescript-react/jsx-syntax.md).
- The class component lifecycle has three phases. Mounting: constructor → getDerivedStateFromProps → render → componentDidMount. Updating: getDerivedStateFromProps → shouldComponentUpdate → render → getSnapshotBeforeUpdate → componentDidUpdate. Unmounting: componentWillUnmount cleans up subscriptions and timers. See [Component Lifecycle](typescript-react/component-lifecycle.md).
- useEffect has three dependency patterns: an empty array runs once on mount, `[value]` runs when that dependency changes, and omitting the array runs the effect on every render. See [Component Lifecycle](typescript-react/component-lifecycle.md).
- setState is asynchronous: update requests are queued, merged and batched. With the object form, two consecutive `setState({ count: this.state.count + 1 })` calls both read the same stale state, so the count ends up only +1; with the functional form, `setState(prevState => ...)` twice in a row ends up +2. The second-argument callback runs once the re-render has completed. See [How setState Works](typescript-react/setstate.md).
- render is a pure function: it must not modify state/props and must not run side effects; the three performance-optimization tools are shouldComponentUpdate, React.memo and PureComponent. See [The render Method and Rendering](typescript-react/render-method.md).
- Three patterns for reusing logic: HOCs enhance functionality by composing components (without modifying the original component, passing every prop through, and hoisting statics with hoist-non-react-statics); render props share code through a function prop; Hooks reuse state logic in functions and are simpler and more flexible. See [Higher-Order Components (HOC)](typescript-react/hoc.md) and [The Render Props Pattern](typescript-react/render-props.md).
- The Context API consists of createContext, Provider and Consumer, with themes, user authentication and i18n as typical scenarios; when a Context value changes every consuming component re-renders, which React.memo/useMemo can mitigate. See [Using the Context API](typescript-react/context-api.md).
- Refs have two creation routes: React.createRef() and callback refs, with function components using useRef; they manage focus, trigger animations and integrate third-party libraries, while controlled components do not need refs. See [Using and Managing Refs](typescript-react/refs.md).
- Portals render a component outside the component tree through `ReactDOM.createPortal(child, container)`, with modal dialogs, tooltips and dropdown menus as typical scenarios. See [Portals: Use Cases and Implementation](typescript-react/portals.md).
- Error boundaries must implement both static getDerivedStateFromError (to render fallback UI) and componentDidCatch (to report error logs); they cannot catch errors in event handlers, in asynchronous code (setTimeout, fetch) or during SSR, nor their own errors. See [Error Boundaries: Implementation and Best Practices](typescript-react/error-boundaries.md).
- The Profiler component requires the id and onRender props; the onRender callback takes seven arguments: id, phase (mount/update), actualDuration, baseDuration, startTime, commitTime and interactions. It only works in development mode. See [Using the Profiler for Performance](typescript-react/profiler.md).
- Synthetic events wrap native browser events to present a consistent cross-browser interface, and are attached to the root element through event delegation; React 16 and earlier reused event objects through an event pool, React 17 removed the pool, and asynchronous access no longer needs event.persist(). See [The Synthetic Event System](typescript-react/synthetic-events.md).

### Architecture and Source Code

- A Virtual DOM is a lightweight JavaScript object that describes the structure of the real DOM and exists only in memory; the update flow is state change → build a new virtual DOM tree → diff → generate a patch → apply it to the real DOM. The costs are memory overhead and the fact that the initial render still has to build the whole tree. See [Virtual DOM Concepts and Implementation](architecture/virtual-dom.md).
- Fiber is the rewritten architecture introduced in React 16; it breaks rendering work into interruptible, resumable units that a scheduler hands out by priority. Fiber node fields include return, child, sibling, pendingProps, memoizedProps and effectTag (renamed flags in React 17). See [The React Fiber Architecture](architecture/react-fiber.md).
- The diff algorithm only compares at the same level (it assumes DOM nodes rarely move across levels), dropping complexity from O(n³) to O(n); if the root node type differs, the old subtree is destroyed and rebuilt in full, and the key attribute is used to reorder and move list nodes. See [The DOM Diff Algorithm](architecture/dom-diff.md).
- The Fiber update mechanism has three steps: schedule → reconcile → commit; the commit phase is always split into the Before Mutation, Mutation and Layout stages. See [React Fiber and the Update Mechanism](source-code/react-fiber.md).
- Where event delegation attaches changed over time: React 16 attached every listener to document, and from React 17 on they attach to the root of the rendering container (the DOM node passed to createRoot). See [React Events and Synthetic Events](source-code/events.md).
- Concurrent rendering: from React 18 on, the official wording is no longer "Concurrent Mode" but Concurrent Rendering; using createRoot enables it by default, with no extra configuration needed. Its three core ideas are incremental rendering, priority scheduling and time slicing. See [Concurrent Mode and the Scheduler](architecture/concurrent-mode.md).
- Hooks are stored as a linked list in the memoizedState property of a Fiber node and traversed in order on every render, which is why Hooks must be called in the same order on every render. See [useState Internals and Usage](architecture/use-state.md).
- Hooks source dispatch: useState/useEffect/useContext/useReducer are all dispatched through ReactCurrentDispatcher.current and handled by the ReactHooks and ReactFiberHooks modules. See [React Hooks Source Code Analysis](source-code/hooks-source.md).
- Trade-offs between the old and the new architecture: the old one could not interrupt updates, long tasks blocked the UI, and componentWillMount/componentWillReceiveProps easily introduced bugs; the new one buys responsiveness and priority scheduling at the price of the learning curve of incremental rendering and concurrency features. See [Legacy Architecture: Pros, Cons, and History](architecture/old-architecture-comparison.md).

### API Reference

- From React 18 on, mounting should go through `createRoot` (imported from react-dom/client), and ReactDOM.render is marked deprecated; apps created with createRoot batch updates automatically by default in every scenario — event handlers, lifecycles, setTimeout, Promises and so on. See [ReactDOM and Rendering APIs](api/reactdom-api.md) and [Other Common Utility APIs](api/other-apis.md).
- Hooks are a capability introduced in React 16.8 that let function components use state and other React features; the difference between useLayoutEffect and useEffect is that the former runs synchronously after the DOM update but before the browser paints. See [Hooks API: useState, useEffect, useContext, useReducer, etc.](api/hooks-api.md).
- PureComponent automatically implements a shallow-compare shouldComponentUpdate, but may fail to detect changes in nested objects/arrays. See [Component APIs: React.Component and PureComponent](api/component-api.md).
- Frequently changing Context values cause performance problems: split them into smaller contexts, use React.memo/useMemo, or switch to Redux. See [Context API and Related Usage](api/context-api.md).
- `ReactDOM.unstable_batchedUpdates` belongs to the React 16/17 era; since React 18 it is only kept around for legacy code compatibility. See [Other Common Utility APIs](api/other-apis.md).
- Error boundaries were introduced in React 16 and can only capture errors that occur during rendering. See [Error Boundary APIs](api/error-boundaries-api.md).
- Two mental models for portals: events bubble along the React component tree, while CSS inheritance and stacking follow the real DOM position. See [Portals and Profiler APIs](api/portals-profiler-api.md).

### Ecosystem

- React Router's four basic components are BrowserRouter, Route, Routes and Link; dynamic route parameters are declared with `:id` and read with useParams; route-level code splitting uses React.lazy + Suspense. See [React Router Setup and Configuration](ecosystem/react-router-setup.md) and [Route Params and Dynamic Loading](ecosystem/react-router-params.md).
- Redux's three principles: a single source of truth, read-only state and pure reducer functions; async middleware comes as redux-thunk and redux-saga; the strengths are predictability and DevTools time travel, the costs a learning curve and boilerplate. MobX has three concepts — observable, computed and action — bound through mobx-react's observer. Selection rule: Context API for simple global state, Redux for large complex applications, MobX for small and medium ones. See [Redux Basics](ecosystem/redux.md), [MobX and State Management](ecosystem/mobx.md) and [State Management and Data Flow](ecosystem/state-management.md).
- SSR renders complete HTML on the server and serves it directly, improving first-paint speed and SEO; React's native SSR APIs are renderToString and the streaming renderToNodeStream. See [What Is Server-Side Rendering](ecosystem/what-is-ssr.md) and [Server-Side Rendering (SSR)](ecosystem/ssr.md).
- Next.js has four data-fetching APIs: getStaticProps (SSG), getStaticPaths (staticizing dynamic routes), getServerSideProps (SSR per request) and getInitialProps (legacy, not recommended for new projects); files under the pages/ directory are the routes, and pages/api provides built-in API routes. See [Next.js Basics](ecosystem/nextjs.md).
- SSR SEO practice: next/head generates title/meta/OG tags dynamically, next/image optimizes images, and next-sitemap generates the Sitemap and robots.txt. See [SSR and SEO](ecosystem/ssr-seo.md).
- Three testing tools: Jest (from Facebook, zero-config, snapshots, parallel runs), Enzyme (from Airbnb, shallow/full/static rendering) and React Testing Library (user-centric, testing behavior rather than implementation). Six kinds of frontend tests: unit, integration, end-to-end, functional, performance and accessibility; 80%+ coverage is recommended for core modules. See [React Testing Tools: Jest, Enzyme, and React Testing Library](ecosystem/testing-tools.md) and [Testing and Quality Assurance](ecosystem/testing.md).
- Four means of code quality management: static code analysis, formatting, code review and test coverage; the tools are ESLint, Prettier, SonarQube and Codecov, with `npx eslint .` and `npx prettier --check .` run inside CI. See [CI and Code Quality Management](ecosystem/ci-code-quality.md).

### Future

- The three pillars of concurrent rendering: the lanes bitmask priority lanes, workLoopAsync + shouldYield() time slicing, and the double-buffered current/workInProgress trees (swapped atomically when work finishes, discarded when interrupted). Lane constants are SyncLane=1, InputContinuousLane=4, DefaultLane=16, TransitionLane=64 and IdleLane=1024; under synchronous rendering a large list can block the main thread for more than 200ms on first paint. See [React Concurrent Mode Explained in Depth](future/react-concurrent-mode.md).
- Non-blocking update APIs: useTransition (isPending + startTransition marks an update as low priority) and useDeferredValue (a derived value can reuse the previous frame); flushSync is only for cases that must be synchronous (measurement, focus). See [React Concurrent Mode Explained in Depth](future/react-concurrent-mode.md).
- Strict Mode's double invocation in development: the useState initializer function runs twice, useEffect mounts, unmounts and remounts after the initial mount, and the component function body runs twice — all of it to expose missing side-effect cleanup. See [React Concurrent Mode Explained in Depth](future/react-concurrent-mode.md).
- React 19's new Hooks: use (reads a Promise/Context and is not bound by the Rules of Hooks), useOptimistic (optimistic updates that roll back automatically on failure) and useActionState/useFormStatus (form Actions and pending state); `<Title>/<Meta>/<Link>` are hoisted into the head automatically, replacing react-helmet. See [A Quick Look at New React Features](future/react-new-features.md).
- React Compiler (formerly React Forget) injects logic equivalent to memo/useMemo/useCallback at build time with zero runtime overhead, and can be opted out of with `"use no memo"`; v1.0 was open-sourced and released at React Conf 2025, supports React 17+, and is enabled per build configuration. It does not optimize library code, forwardRef components or components behind a dynamic import(). See [The Future of React's Architecture](future/react-future.md).
- The RSC model: components run on the server, ship zero client JS and connect straight to the data layer; `"use client"` draws the boundary, the Flight protocol streams serialization, and Server Actions call server-side mutations directly. Performance benchmarks (Next.js 14+ App Router): TTFB around 50ms (CSR) / 200ms (SSR+hydration) / 100ms (RSC), TTI around 1200/800/400ms, and JS size 200–500KB / 150–400KB / 50–150KB. See [React Server Components (RSC) Explained in Depth](future/react-server-components.md).
- The RFC process: Idea → RFC PR → exploration/implementation (Canary) → stable (Minor) → deprecated (Major). RFC status snapshot (2024–2025): #229 (the use Hook) merged into 19, #271 (Server Actions) merged into 19, #299 (React Compiler) under implementation, and #309 (Offscreen) under discussion (later renamed Activity, with the final API `<Activity mode="hidden|visible">`). See [The Evolution of the React Community & Ecosystem](future/react-community.md).
- Mainstream library status (a snapshot as of 2024-10): React Router v7 beta supports RSC; Recoil is in maintenance mode with no RSC plans (migration to Jotai/Zustand is recommended); Chakra UI v2 is in maintenance mode (migration to Panda CSS/shadcn is recommended); TanStack Query v5 is the first choice for data fetching, and Vitest + RTL is the modern testing combination of choice. See [The Evolution of the React Community & Ecosystem](future/react-community.md).
- The team's rule for keeping up — "keeping up is not chasing novelty" — runs every new feature or upgrade through three steps: benefit assessment → trial and verification → staged rollout. Hard items on the React 19 upgrade checklist: react@19 with @types/react@19, eslint-plugin-react-hooks@5, TypeScript 5.5+, CI Node raised to the 20/22 LTS lines, and a 5% traffic canary signed off after 48 hours. See [The Evolution of the React Community & Ecosystem](future/react-community.md).

### Build Tools

- Webpack's five core concepts are Entry, Output, Module, Loader and Plugin; the four optimization moves are code splitting (`splitChunks: { chunks: 'all' }`), Tree Shaking (needs `mode: 'production'` and ES6 modules), long-lived caching (`filename: '[name].[contenthash].js'`) and minification with TerserPlugin. See [Webpack Configuration and Optimization](build-tools/webpack.md).
- Webpack 5 handles images with built-in asset modules (`type: 'asset/resource'`), so file-loader/url-loader are no longer needed; webpack-dev-server 4+ takes the static directory from `devServer.static`. Common plugins: HtmlWebpackPlugin, MiniCssExtractPlugin and TerserPlugin. See [Webpack Configuration and Optimization](build-tools/webpack.md).
- Vite serves native ES modules in development for a bundler-free dev server with fast HMR, and uses Rollup for production builds; when server.port is not configured the default port is 5173. See [Boosting Development with Vite](build-tools/vite.md) and [Frontend Build Tools Overview: Webpack, Vite, Parcel](build-tools/build-tools-overview.md).
- Babel's three pieces are @babel/core, @babel/preset-env and babel-loader; React projects add @babel/preset-react for JSX, and the babel-loader rule must `exclude: /node_modules/`. See [Transpiling ES6+ with Babel](build-tools/babel.md).
- Taro is an open-source framework from JD.com's AOTU Lab that compiles one codebase to WeChat/Alipay/ByteDance mini programs, H5, React Native and quick apps; build command target types map to weapp/alipay/swan/tt/h5. React Router is unavailable on mini programs, where routing is taken over by the built-in @tarojs/router. See [What is Taro: One Codebase, Many Platforms](build-tools/taro-intro.md), [Building and Publishing Taro Projects](build-tools/taro-build.md) and [Building Mini Programs with React.js in Taro](build-tools/taro-react.md).
- Taro compatibility relies on conditional compilation: in JS, `Taro.getEnv() === Taro.ENV_TYPE.WEAPP`; in styles, the `/* #ifdef weapp */` comment or platform-suffixed files (index.weapp.scss). See [Handling Platform Compatibility](build-tools/taro-compatibility.md).
- CI/CD: GitHub Actions workflows live in .github/workflows/ci.yml, with actions/checkout@v4 + actions/setup-node@v4 (Node 20) + npm ci; the deployment example injects the secrets.VERCEL_TOKEN secret to run `npx vercel deploy --prod --yes`, and uses `if: github.ref == 'refs/heads/main'` to restrict runs to the main branch. See [Automated Builds and CI/CD Integration](build-tools/automation-ci-cd.md).

### Projects in Practice

- The whole Todo app pipeline: requirements analysis (add, delete, edit, mark complete, filter) → component breakdown into App/TodoList/TodoItem/TodoForm/Filters → state managed with useReducer + todoReducer → Redux integration (wrapped in a Provider, wired up with useSelector/useDispatch) → `npm run build` to produce the build directory for hosting. See [Requirements Analysis and Design](projects/todo-requirements.md), [Building the App with React and TypeScript](projects/todo-development.md), [Integrating Redux for State Management](projects/todo-redux.md) and [Deployment and Performance Optimization](projects/todo-deployment.md).
- Performance optimization items in practice: React.lazy + Suspense code splitting, Tree Shaking, CDN, lazy-loading and compressing images (ImageOptim/Squoosh/SVG instead of bitmaps), Webpack Bundle Analyzer for bundle analysis, and Lighthouse/WebPageTest/Sentry for monitoring. See [Deployment and Performance Optimization](projects/todo-deployment.md).
- Next.js's five headline features: SSR, SSG, automatic code splitting, file-system routing and API routes; in the ISR example, `revalidate: 10` means the page is regenerated after 10 seconds. See [Next.js and Server-Side Rendering (SSR)](projects/nextjs-overview.md).
- React Native builds Android and iOS apps from one codebase, with a JS thread plus a native thread talking over a bridge; Expo (`npx create-expo-app`) is the officially recommended way to create a project, and the RN CLI is used when native capabilities are needed; styles use dp units and navigation uses React Navigation. See [React Native Introduction and Mobile Development](projects/react-native.md).
- Since React Native 0.76 a new debugger is built in (based on the Chrome DevTools protocol and paired with the Hermes engine), and Flipper is no longer maintained. See [React Native Introduction and Mobile Development](projects/react-native.md).
- Configuration differences among three CI tools: GitHub Actions (setup-node with `cache: 'npm'`), CircleCI (version 2.1, the cimg/node:20.18 image, supports parallelism) and GitLab CI (stages: build/test, a visual pipeline). The full flow has five steps: commit → CI build/test/quality checks → a successful build triggers CD → automatic deployment → monitoring feedback. See [CI and Automated Deployment](projects/ci-cd.md).

### Timeline

- Four eras: birth and open source (2010–2015), the kernel rewrite (2016–2019), concurrency and the server (2020–2024) and the compiler era (2025–2026); the full table has 28 milestones and 4 topic tags. See [History Timeline](timeline.md).
- Key milestones: React 0.3.0 open-sourced in May 2013 (JSConf US); React Native open-sourced in March 2015 and react-dom split out in September; Create React App released in July 2016; React 16 landed Fiber in September 2017; React 16.8 stabilized Hooks in February 2019; React 17 in October 2020 (zero new features); React 18 opened up concurrency in March 2022; React 19 in December 2024 (use, Actions, ref as a prop, RSC documented); React Compiler v1.0 GA and Activity shipping with 19.2 in October 2025. See [History Timeline](timeline.md).
- Data conventions: years are taken from the "announced or released" point in time rather than the point of wide adoption. Hooks were previewed at React Conf in October 2018 and only stabilized with 16.8 in February 2019; Server Components debuted in December 2020 and did not scale until the Next.js App Router in October 2022. See [Notes on This Data's Conventions](timeline.md#notes-on-this-data-s-conventions).

## Authoritative Books

No book citations were found in the existing body pages. The book-title brackets in the text only wrap this site's own section names (such as "React.js Complete Guide" and "TypeScript Basics"), never external bibliography. This section is therefore honestly left empty: the knowledge on this site comes from official documentation, RFCs and community articles, with no bibliography behind it, and the source is unverified.

## Official Documentation (with links)

The official documentation and authoritative sites actually cited by the body pages are gathered below, by topic.

Official React:

- [React 18 release blog post](https://react.dev/blog/2022/03/29/react-v18): the official source of the concurrency features. See [React Concurrent Mode Explained in Depth](future/react-concurrent-mode.md).
- [React 19 RC release notes](https://react.dev/blog/2024/12/05/react-19): the authoritative source for the React 19 feature roundup. See [A Quick Look at New React Features](future/react-new-features.md).
- [React docs · Rendering Lists](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-keys): the official explanation of keys and list order. See [React Concurrent Mode Explained in Depth](future/react-concurrent-mode.md).
- [The React blog](https://react.dev/blog): the source for version and feature news. See [The Evolution of the React Community & Ecosystem](future/react-community.md).
- [React Conf](https://conf.react.dev/): the venue where the Compiler and Activity were announced. See [The Future of React's Architecture](future/react-future.md).
- [React DevTools](https://github.com/react/react-devtools): the graphical front end for Profiler data. See [The Evolution of the React Community & Ecosystem](future/react-community.md).
- [reactjs.org docs](https://reactjs.org/docs/getting-started.html): the page describing how to install React DevTools. See [Using the Profiler for Performance](typescript-react/profiler.md).

The RFC repository (the standard path a React feature travels from proposal to shipping):

- [RFC #229 use Hook](https://github.com/reactjs/rfcs/pull/229): merged into React 19. See [A Quick Look at New React Features](future/react-new-features.md).
- [RFC #271 Server Actions](https://github.com/reactjs/rfcs/pull/271): merged into React 19. See [A Quick Look at New React Features](future/react-new-features.md).
- [RFC #299 React Compiler](https://github.com/reactjs/rfcs/pull/299): under implementation. See [The Future of React's Architecture](future/react-future.md).
- [RFC #227 Server Components](https://github.com/reactjs/rfcs/pull/227): the RSC specification proposal. See [The Future of React's Architecture](future/react-future.md) and [React Server Components (RSC) Explained in Depth](future/react-server-components.md).
- [RFC #309 Offscreen API](https://github.com/reactjs/rfcs/pull/309): under discussion, later renamed Activity. See [The Future of React's Architecture](future/react-future.md).
- [The Server Components text spec](https://github.com/reactjs/rfcs/blob/main/text/0022-server-components.md): the specification of the React Flight protocol. See [React Server Components (RSC) Explained in Depth](future/react-server-components.md).
- [The React RFC repository](https://github.com/reactjs/rfcs): the entry point to every proposal. See [The Evolution of the React Community & Ecosystem](future/react-community.md).
- [The Concurrent Mode design doc](https://github.com/acdlite/rfcs/blob/main/text/0008-concurrent-mode.md): the early design of Fiber and concurrent scheduling. See [React Concurrent Mode Explained in Depth](future/react-concurrent-mode.md).

Official Next.js:

- [Next.js App Router docs](https://nextjs.org/docs/app): the framework documentation for putting RSC into production. See [React Server Components (RSC) Explained in Depth](future/react-server-components.md).
- [The Server Actions in-depth guide](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions): the official Server Actions guide. See [React Server Components (RSC) Explained in Depth](future/react-server-components.md).
- [The Next.js blog](https://nextjs.org/blog): the source for App Router and RSC shipping news. See [The Evolution of the React Community & Ecosystem](future/react-community.md).

Routing and state libraries:

- [The React Router v7 migration guide](https://reactrouter.com/start/declarative/routing): migration notes for v7's RSC support. See [The Evolution of the React Community & Ecosystem](future/react-community.md).
- [TanStack Router](https://tanstack.com/router) and [the TanStack blog](https://tanstack.com/blog): the successor candidate to React Router and its source of news. See [The Evolution of the React Community & Ecosystem](future/react-community.md).

React Native ecosystem:

- [React Native docs](https://reactnative.dev/docs/getting-started), [React Navigation](https://reactnavigation.org/docs/getting-started) and [Expo](https://docs.expo.dev/): the official documentation for learning RN, navigation and scaffolding. See [React Native Introduction and Mobile Development](projects/react-native.md).
- [Watchman installation docs](https://facebook.github.io/watchman/docs/install): the file-watching tool that must be installed for iOS development on macOS. See [React Native Introduction and Mobile Development](projects/react-native.md).

Front-end toolchain:

- [The Node.js website](https://nodejs.org/): download the latest LTS installer. See [Installing and Configuring Node.js](basics/nodejs-setup.md).
- [The nvm install script](https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh) and [the nvm-windows releases page](https://github.com/coreybutler/nvm-windows/releases): the nvm installation entry points for Unix and Windows. See [Installing and Configuring Node.js](basics/nodejs-setup.md) and [Managing Node.js Versions with nvm](basics/nvm-setup.md).
- [The Vite website](https://vitejs.dev/): the project scaffold officially recommended for new projects now that CRA is in maintenance mode. See [TypeScript Basics](typescript-react/typescript-basics.md).
- [The VSCode TypeScript Next extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next): for trying the newest builds of the language service. See [TypeScript Installation and Setup](typescript-react/setup.md).

Deployment and performance monitoring:

- [Netlify](https://www.netlify.com/), [Vercel](https://vercel.com/), [GitHub Pages](https://pages.github.com/), [AWS S3](https://aws.amazon.com/s3/), [Google Cloud Storage](https://cloud.google.com/storage), [Nginx](https://www.nginx.com/) and [Apache](https://httpd.apache.org/): static hosting and self-hosting platforms. See [Deployment and Performance Optimization](projects/todo-deployment.md).
- [Lighthouse](https://developers.google.com/web/tools/lighthouse), [WebPageTest](https://www.webpagetest.org/) and [Sentry](https://sentry.io/): performance monitoring and error reporting. See [Deployment and Performance Optimization](projects/todo-deployment.md).
- [ImageOptim](https://imageoptim.com/) and [Squoosh](https://squoosh.app/): image compression tools. See [Deployment and Performance Optimization](projects/todo-deployment.md).

Mini program platforms:

- [The WeChat Official Accounts Platform](https://mp.weixin.qq.com/), [Alipay Mini Program DevTools](https://opensupport.alipay.com/) and [the Alipay Open Platform](https://open.alipay.com/): the entry points for uploading mini programs, submitting them for review and releasing them. See [Building and Publishing Taro Projects](build-tools/taro-build.md).

Community sources:

- [Reactiflux Discord](https://discord.gg/reactiflux) and [the This Week In React newsletter](https://thisweekinreact.com/): community discussion and the weekly digest. See [The Evolution of the React Community & Ecosystem](future/react-community.md).

## Use Cases

- Setting up a front-end development environment: Node.js LTS + nvm to switch versions per project + npm for dependencies + ESLint/Prettier to keep quality in check. See [Installing and Configuring Node.js](basics/nodejs-setup.md) and [ESLint and Prettier Configuration](basics/eslint-prettier.md).
- Building page structure and styling: a semantic HTML document + CSS selectors/box model + Flexbox/Grid layout + media queries to adapt to many devices. See [HTML Structure and Semantic Tags](basics/html-structure.md), [Flexbox and Grid Layout](basics/flexbox-grid.md) and [Responsive Design and Media Queries](basics/responsive-design.md).
- Writing modern JavaScript applications: ES6+ syntax, modular code organization and async/await for network requests. See [Key ES6+ Features](basics/es6-features.md) and [Promises and Asynchronous Programming](basics/js-promise-async.md).
- Cross-platform business: Taro compiles one codebase to WeChat/Alipay/ByteDance mini programs, H5, React Native and quick apps. See [What is Taro: One Codebase, Many Platforms](build-tools/taro-intro.md).
- Content sites that prioritize SEO and first-paint performance: pick SSG/SSR/ISR per page in Next.js, manage metadata with Head and optimize images with next/image. See [Next.js and Server-Side Rendering (SSR)](projects/nextjs-overview.md) and [SSR and SEO](ecosystem/ssr-seo.md).
- Shipping fast and iterating continuously in a small team: after `npm run build`, host on Netlify/Vercel/GitHub Pages, with GitHub Actions providing "commit → build, test, deploy". See [Deployment and Performance Optimization](projects/todo-deployment.md) and [Automated Builds and CI/CD Integration](build-tools/automation-ci-cd.md).
- Theme switching: create it with createContext → provide `{ theme, toggleTheme }` from a Provider → consume it with useContext to toggle light/dark, wrapping consuming components in React.memo to avoid needless re-renders. See [Context API and Related Usage](api/context-api.md).
- Overlays such as modal dialogs, tooltips and dialog boxes: render them to the document root with ReactDOM.createPortal so parent-component CSS cannot affect them and they stay on top of the viewport. See [Portals and Profiler APIs](api/portals-profiler-api.md).
- Performance tuning and monitoring: use the Profiler's onRender data in development to find components that take too long to render, and keep monitoring in production. See [Portals and Profiler APIs](api/portals-profiler-api.md).
- Global state in small and medium projects without pulling in a library: Context + useReducer for state shared across components, such as authentication, theme and shopping cart. See [Combining the Context API and useReducer](ecosystem/context-reducer.md).
- Reworking forms and high-frequency interactions for React 19: useOptimistic gives seamless refreshes for likes, favorites and form submissions; `<form action={asyncFn}>` plus a Server Action replaces the hand-written onSubmit + fetch pattern. See [A Quick Look at New React Features](future/react-new-features.md).
- Reusing logic with custom Hooks: useFetchUser for data fetching, useForm for form logic and useLocalStorage for persistence; test them with renderHook. See [Creating and Using Custom Hooks](architecture/custom-hooks.md).

## Common Pitfalls and Misconceptions

### Web Basics

1. var's hoisting and function scoping are a breeding ground for bugs; replace them with the block scoping of let/const. See [Variables, Data Types, and Operators](basics/js-variables-types-operators.md).
2. `==` performs type coercion (`5 == '5'` is true); always compare with the strict `===`. See [Variables, Data Types, and Operators](basics/js-variables-types-operators.md).
3. A const cannot be reassigned after declaration — `PI = 3.14159` throws right away. See [Key ES6+ Features](basics/es6-features.md).
4. Arrow functions do not bind their own this; do not use them where their own this is needed (object methods, for instance). See [Key ES6+ Features](basics/es6-features.md).
5. Nested traditional callbacks turn into callback hell; rewrite them with Promise chains or async/await, and remember that await can only appear inside an async function. See [Promises and Asynchronous Programming](basics/js-promise-async.md).
6. Under the default content-box, width/height describe only the content area; the space actually occupied also includes padding and border, so set `box-sizing: border-box` when you want intuitive sizes. See [CSS Box Model and Layout](basics/css-box-model-layout.md).
7. CSS nesting is best kept to 3 levels or fewer; deeper nesting hurts readability. See [Variables and Nesting Rules](basics/css-variables-nesting.md).
8. Do not mix ESLint 8's .eslintrc.json with ESLint 9's flat config; new projects should go straight to eslint.config.js. In Prettier 3, bracketSameLine has replaced jsxBracketSameLine. See [ESLint and Prettier Configuration](basics/eslint-prettier.md).
9. Atom was archived by GitHub in December 2022 and is no longer maintained; pick VSCode for new projects, or the community continuation Pulsar. See [Code Editors and Dev Tool Recommendations](basics/editor-tools.md).

### React Core and Component Development

1. The object-form setState merge trap: two consecutive `setState({ count: this.state.count + 1 })` calls end up as only +1, while the functional form gives +2. See [How setState Works](typescript-react/setstate.md).
2. Mutating state directly with `this.state.count += 1` bypasses the update mechanism; you must go through setState. See [How setState Works](typescript-react/setstate.md).
3. defaultProps on function components is deprecated: React 18.3 warns in the console and React 19 removes it — use default parameters instead. See [Using State and Props](typescript-react/state-props.md).
4. Doing network requests or DOM work inside render is wrong; side effects belong in componentDidMount or useEffect. See [The render Method and Rendering](typescript-react/render-method.md).
5. React 16's event pooling made asynchronous access to the event object come back with empty properties (you had to extract properties or call event.persist()); pooling was removed in React 17, so the old workaround can be deleted. See [The Synthetic Event System](typescript-react/synthetic-events.md).
6. A component's static methods are lost once it is wrapped by an HOC; hoist them with hoist-non-react-statics. See [Higher-Order Components (HOC)](typescript-react/hoc.md).
7. Overusing Context couples components tightly: use props for local data, and mitigate the full re-renders caused by Context changes with React.memo/useMemo. See [Using the Context API](typescript-react/context-api.md).
8. Controlled components should not use refs to manipulate the DOM directly; both data and behavior should be driven by state. In function components use useRef rather than createRef. See [Using and Managing Refs](typescript-react/refs.md).
9. The three things error boundaries do not catch — event handlers, asynchronous code and their own errors — each need another approach (try-catch, handling inside the async code itself, or an outer boundary wrapping them). See [Error Boundaries: Implementation and Best Practices](typescript-react/error-boundaries.md).
10. any bypasses TypeScript's checking; use unknown to force a check. Since React 18, React.FC no longer implicitly includes children, so declare them explicitly in Props. See [Using TypeScript in React Projects](typescript-react/react-typescript.md).
11. Inline functions in a render method create a new instance on every render and cause unnecessary re-renders; optimize them with useCallback. See [Using the Profiler for Performance](typescript-react/profiler.md) and [The Render Props Pattern](typescript-react/render-props.md).

### Architecture and Source Code

1. Hook order must not change: never call Hooks inside conditionals or loops, or React cannot match states against the linked list order. See [useState Internals and Usage](architecture/use-state.md).
2. Two ways a wrong useEffect dependency array goes wrong: omitting the array runs the effect on every render, and a wrong dependency makes it skip when it should run or run over and over. See [useEffect and Side Effects](architecture/use-effect.md).
3. Side effects in a custom Hook that are never cleaned up cause memory leaks; data fetches and event listeners must be cleaned up inside useEffect. See [Creating and Using Custom Hooks](architecture/custom-hooks.md).
4. The term "Concurrent Mode" is outdated; React 18 calls it Concurrent Rendering. Using createRoot enables it by default — there is no switch you have to flip. See [Concurrent Mode and the Scheduler](architecture/concurrent-mode.md).
5. In the diff, differing root node types destroy and rebuild the whole subtree instead of updating it finely; a list without keys triggers node recreation and reordering. See [The DOM Diff Algorithm](architecture/dom-diff.md).
6. setState does not take effect immediately: it only queues the update request, which is processed in the next render cycle — never assume you can read the new value synchronously. See [How useState and useEffect Work](source-code/use-state-effect.md).
7. Anonymous functions bound to events in JSX create a new function instance on every render; hoist handlers out of the component or use useCallback. See [React Events and Synthetic Events](source-code/events.md).
8. If a Context Provider's value is a freshly created object on every render, every Consumer below re-renders; cache the value with useMemo/useCallback. See [Context API Internals](source-code/context-api.md).
9. The legacy lifecycle methods componentWillMount/componentWillReceiveProps easily introduce hard-to-spot bugs and were progressively deprecated in the 16.3 refactor. See [Legacy Architecture: Pros, Cons, and History](architecture/old-architecture-comparison.md) and [React Lifecycle Internals](source-code/lifecycle.md).

### API and Ecosystem

1. ReactDOM.render is discouraged after React 18 — use createRoot; findDOMNode is discouraged — use a ref instead. See [ReactDOM and Rendering APIs](api/reactdom-api.md).
2. PureComponent's shallow comparison can misjudge nested objects/arrays; make sure the comparison mechanism fits your data structures. See [Component APIs: React.Component and PureComponent](api/component-api.md).
3. unstable_batchedUpdates is a React 16/17-era API; since React 18 batches automatically in every scenario by default, keep it only for legacy code compatibility. See [Other Common Utility APIs](api/other-apis.md).
4. React.lazy only works with components that are default exports, and Suspense must wrap the components that use it. See [Route Params and Dynamic Loading](ecosystem/react-router-params.md).
5. Context + useReducer hurts performance under frequent updates in large applications; design Context scope around actual needs instead of globalizing everything. See [Combining the Context API and useReducer](ecosystem/context-reducer.md).
6. getInitialProps is legacy data fetching; new projects should use getStaticProps/getServerSideProps. See [Next.js Basics](ecosystem/nextjs.md).
7. Four misconceptions about concurrent mode: it does not reduce the total amount of work, it only makes things feel faster; not every setState needs useTransition (keep clicks and form submissions synchronous); Suspense is not only for code splitting (React 18+ supports data fetching with it); and useLayoutEffect's semantics are unchanged — only its scheduling timing shifts. See [React Concurrent Mode Explained in Depth](future/react-concurrent-mode.md).
8. Inline arrow functions and inline styles create a new reference on every render and break memoization; keep references stable with useCallback/useMemo. Overusing flushSync degrades the app back into synchronous rendering. See [React Concurrent Mode Explained in Depth](future/react-concurrent-mode.md).
9. Using useState/Hooks in a Server Component throws immediately — split the interactive part into a `"use client"` component. A client component importing a server-only module (such as db) throws as well; route it through a Server Action, or fetch on the server and pass the data down via props. See [React Server Components (RSC) Explained in Depth](future/react-server-components.md).
10. Props crossing the RSC boundary may only carry serializable values: functions, refs, class instances, Symbols, DOM nodes and circular references are all forbidden. See [React Server Components (RSC) Explained in Depth](future/react-server-components.md).
11. Next.js's fetch caching differs by version: 14 caches by default, while from 15 on nothing is cached by default and you must opt in explicitly with `cache: 'force-cache'`. See [React Server Components (RSC) Explained in Depth](future/react-server-components.md).
12. React Compiler does not optimize library code, forwardRef components or dynamically imported components, and it risks mis-optimizing components with side effects; the countermeasures are enabling eslint-plugin-react-compiler, rolling out in stages, and keeping hand-written memo as a fallback. See [The Future of React's Architecture](future/react-future.md).

### Build Tools and Projects in Practice

1. CRA is officially no longer recommended and receives no new features; new projects should use Vite (`npm create vite@latest`) or Next.js, and component code carries over between scaffolds. See [Building the App with React and TypeScript](projects/todo-development.md) and [TypeScript Basics](typescript-react/typescript-basics.md).
2. Enzyme is effectively unmaintained and has no React 18 adapter, so new projects should use RTL. react-test-renderer has been deprecated since 18.3; React 19 prints deprecation warnings and renders concurrently (the `/shallow` entry point was removed), so use `render(...).asFragment()` for snapshots instead. See [React Testing Tools: Jest, Enzyme, and React Testing Library](ecosystem/testing-tools.md).
3. React Router does not work on Taro mini programs; routing is taken over by the built-in @tarojs/router, and navigation uses Taro.navigateTo. See [Building Mini Programs with React.js in Taro](build-tools/taro-react.md).
4. WeChat has deprecated getUserInfo in favor of getUserProfile (desc is required); things tightened further after 2022, and the avatar/nickname filling capability is now recommended. See [Taro and Mini Program API Integration](build-tools/taro-api.md).
5. react-redux ships its own TypeScript types from v8 on, so @types/react-redux is no longer needed (that was v7 and earlier). See [Building the App with React and TypeScript](projects/todo-development.md).
6. Tree Shaking only takes effect with `mode: 'production'` and ES6 modules; otherwise unused code cannot be removed. See [Webpack Configuration and Optimization](build-tools/webpack.md).
7. babel-loader must `exclude: /node_modules/`, otherwise transpiling dependencies drags the build down; in webpack-dev-server 4+ the static directory is now configured with `devServer.static`. See [Transpiling ES6+ with Babel](build-tools/babel.md) and [Webpack Configuration and Optimization](build-tools/webpack.md).
8. Flipper is no longer maintained; from RN 0.76 on use the built-in new debugger. See [React Native Introduction and Mobile Development](projects/react-native.md).
9. Testing several elements that share the same text makes getByText throw for multiple matches; use `getAllByText('Delete')[0]` instead. See [Project: A Full-Featured Todo App](projects/todo-app.md).
10. Once you change Vite's `root: './src'`, you must move index.html into src as well, or the entry cannot be found. See [Boosting Development with Vite](build-tools/vite.md).
11. Timeline years mark the "announced or released" point in time, not the point of wide adoption: nearly half a year separated the Hooks preview from its stabilization, and almost two years separated the RSC debut from its large-scale rollout. See [Notes on This Data's Conventions](timeline.md#notes-on-this-data-s-conventions).

## Sources and Version Conventions

- Version conventions: the sections were written at different times. The React basics, components and Hooks material follows React 18, and the relevant pages carry a "React 18 → 19" comparison table; the future section covers React 19 and Canary, where some APIs are still experimental. When citing, go by the version marked on the page.
- Deprecated API summary: ReactDOM.render → createRoot; function component defaultProps → default parameters (warned in 18.3, removed in 19); findDOMNode → ref; synthetic event pooling → removed in React 17; getInitialProps → getStaticProps/getServerSideProps; react-test-renderer → deprecated from 18.3, warns from 19, migrate to RTL; Enzyme → RTL; Flipper → the built-in RN debugger; CRA → Vite/Next.js.
- Sources unverified: none of the pages in the source-code section carry external links, so the knowledge there is compiled on-site with no external source checked; the api section, chapters 6 and 7 of typescript-react and the version-comparison tables in the architecture Hooks chapter cite the official React upgrade guide, while the remaining entries are still compiled on-site; only a few pages in basics and ecosystem carry links, architecture has no external links outside its version-comparison tables, and in the official documentation section the React official and RFC entries are concentrated in the future section.
- Cross-references: every internal link on this page points to a body page or an anchor; for how the sections map onto each other, see the topic index and [Home](/).

- [Quick term reference: the Glossary](./glossary.md) (Chinese-English pairs, one-line definitions, authoritative sources and related pages).

## References

- [React official documentation (external link)](https://react.dev/learn)
