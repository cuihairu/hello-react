# React Glossary

This page collects the core terms used across this site's React documentation, grouped by theme. Each entry gives a one-sentence definition, an authoritative source, and related pages. The Chinese term list lives on the Chinese page of the same name (use the language switcher).

**Maintenance rule:** any new entry must cite a clickable authoritative source. If none can be found, write "no authoritative source found (unverified)" instead of inventing a link from memory.

## Core Concepts

### React
A JavaScript library for building user interfaces, built on componentization and a declarative programming model.
**Source**: [React official docs (external link)](https://react.dev/learn)
**Related pages**: [typescript-react/react-basics](/typescript-react/react-basics),[typescript-react/react-history-principles](/typescript-react/react-history-principles)

### Component
The basic unit of a React application: it receives input (props) and returns React elements describing the interface.
**Source**: [React official docs · Describing the UI](https://react.dev/learn/describing-the-ui)
**Related pages**: [api/component-api](/api/component-api),[typescript-react/component-development](/typescript-react/component-development)

### Props
A component's input parameters, passed in by the parent and read-only inside the component.
**Source**: [React official docs · Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
**Related pages**: [api/state-props](/api/state-props),[typescript-react/state-props](/typescript-react/state-props)

### State
Data managed inside a component; changes to it trigger a re-render.
**Source**: [React official docs · State](https://react.dev/learn/state-a-components-memory)
**Related pages**: [api/state-props](/api/state-props),[ecosystem/state-management](/ecosystem/state-management)

### JSX
A syntax extension of JavaScript for describing UI structure in JavaScript; it compiles down to `createElement` calls.
**Source**: [React official docs · Describing the UI](https://react.dev/learn/describing-the-ui)
**Related pages**: [typescript-react/jsx-syntax](/typescript-react/jsx-syntax),[api/jsx-api](/api/jsx-api)

### Virtual DOM
A lightweight JavaScript representation of the real DOM; React compares differences between virtual DOM trees to minimize real DOM operations.
**Source**: [React repository](https://github.com/react/react)
**Related pages**: [architecture/virtual-dom](/architecture/virtual-dom),[source-code/virtual-dom](/source-code/virtual-dom)

### Reconciliation
The process by which React compares old and new virtual DOM trees and computes the minimal set of operations needed to update the real DOM.
**Source**: [React repository](https://github.com/react/react)
**Related pages**: [architecture/reconciliation](/architecture/reconciliation),[source-code/reconciliation](/source-code/reconciliation)

### Fiber
The fundamental unit of work in the reconciliation architecture introduced in React 16, enabling interruptible rendering and priority scheduling.
**Source**: [React repository](https://github.com/react/react)
**Related pages**: [architecture/react-fiber](/architecture/react-fiber),[source-code/react-fiber](/source-code/react-fiber)

### One-way Data Flow
Data flows down the component tree from parent to child; state changes propagate through props and callbacks, layer by layer.
**Source**: [React official docs · Managing State](https://react.dev/learn/managing-state)
**Related pages**: [ecosystem/state-management](/ecosystem/state-management),[ecosystem/context-reducer](/ecosystem/context-reducer)

### Declarative
Describing what the interface *is* rather than how to change it; React handles updating the DOM efficiently to match the description.
**Source**: [React official docs · Describing the UI](https://react.dev/learn/describing-the-ui)
**Related pages**: [typescript-react/react-basics](/typescript-react/react-basics)

## Components and Props

### Function Component
A component defined as a function: it takes props and returns React elements.
**Source**: [React official docs · Describing the UI](https://react.dev/learn/describing-the-ui)
**Related pages**: [typescript-react/component-development](/typescript-react/component-development)

### Class Component
A component defined as an ES6 class, returning the interface from a `render` method.
**Source**: [React official docs · Component](https://react.dev/reference/react/Component)
**Related pages**: [api/component-api](/api/component-api),[typescript-react/render-method](/typescript-react/render-method)

### Controlled Component
A form element whose value is driven by React state, updated through `onChange` on every change.
**Source**: [React official docs · Form component](https://react.dev/reference/react-dom/components/form)
**Related pages**: [api/reactdom-api](/api/reactdom-api)

### Uncontrolled Component
A form element whose value is managed by the DOM itself, read through a ref when needed.
**Source**: [React official docs · input component](https://react.dev/reference/react-dom/components/input)
**Related pages**: [api/reactdom-api](/api/reactdom-api),[typescript-react/refs](/typescript-react/refs)

### Composition
Nesting and combining components through `props.children` or dedicated props, rather than through inheritance.
**Source**: [React official docs · Describing the UI](https://react.dev/learn/describing-the-ui)
**Related pages**: [typescript-react/deep-dive-components](/typescript-react/deep-dive-components)

### Higher-Order Component (HOC)
A function that takes a component and returns a new component, used to reuse component logic.
**Source**: [React official docs · Managing State](https://react.dev/learn/managing-state)
**Related pages**: [typescript-react/hoc](/typescript-react/hoc),[api/react-hoc-patterns](/api/react-hoc-patterns)

### Render Props
A pattern for sharing code between components via a function prop; the function's return value becomes the rendered content.
**Source**: [React official docs · Managing State](https://react.dev/learn/managing-state)
**Related pages**: [typescript-react/render-props](/typescript-react/render-props)

### Component Lifecycle
The journey a component takes from mounting to updating to unmounting. Class components express it through lifecycle methods; function components express it through `useEffect`.
**Source**: [React official docs · Render and Commit](https://react.dev/learn/render-and-commit)
**Related pages**: [api/lifecycle-methods](/api/lifecycle-methods),[typescript-react/component-lifecycle](/typescript-react/component-lifecycle)

### Error Boundary
A class component that catches JavaScript errors in its child component tree and displays a fallback interface.
**Source**: [React official docs · Describing the UI](https://react.dev/learn/describing-the-ui)
**Related pages**: [api/error-boundaries-api](/api/error-boundaries-api),[typescript-react/error-boundaries](/typescript-react/error-boundaries)

### Code Splitting
Breaking code into chunks that load on demand, shrinking the initial load size.
**Source**: [React official docs · lazy](https://react.dev/reference/react/lazy)
**Related pages**: [api/react-core](/api/react-core),[build-tools/build-tools](/build-tools/build-tools)

### Lazy Loading
Using `lazy` together with `Suspense` so the corresponding code loads only when a component first renders.
**Source**: [React official docs · lazy](https://react.dev/reference/react/lazy)
**Related pages**: [api/react-core](/api/react-core)

### Suspense
A mechanism that displays a fallback interface while children wait for asynchronous content, such as lazily loaded code.
**Source**: [React official docs · Suspense](https://react.dev/reference/react/Suspense)
**Related pages**: [api/react-core](/api/react-core)

### Portal
A mechanism for rendering children to a different location in the DOM tree; commonly used for modals and overlays.
**Source**: [React official docs · DOM components](https://react.dev/reference/react-dom/components/common)
**Related pages**: [api/portals-profiler-api](/api/portals-profiler-api),[typescript-react/portals](/typescript-react/portals)

### Fragment
Syntax for grouping multiple children without adding an extra DOM node.
**Source**: [React official docs · Fragment](https://react.dev/reference/react/Fragment)
**Related pages**: [api/react-core](/api/react-core)

### Profiler
A component and API for measuring the render performance of a component tree, including render count and time spent.
**Source**: [React official docs · Profiler](https://react.dev/reference/react/Profiler)
**Related pages**: [api/portals-profiler-api](/api/portals-profiler-api),[typescript-react/profiler](/typescript-react/profiler)

### StrictMode
A component that enables extra checks in development mode, such as double-invoking effects, to surface potential issues.
**Source**: [React official docs · StrictMode](https://react.dev/reference/react/StrictMode)
**Related pages**: [api/react-core](/api/react-core)

### memo
A higher-order component that skips re-rendering when props have not changed.
**Source**: [React official docs · memo](https://react.dev/reference/react/memo)
**Related pages**: [api/react-core](/api/react-core)

### forwardRef
Lets a function component forward a ref to an inner DOM node or child component.
**Source**: [React official docs · forwardRef](https://react.dev/reference/react/forwardRef)
**Related pages**: [api/refs-api](/api/refs-api)

## State and Events

### useState
The Hook for declaring a state variable in a function component.
**Source**: [React official docs · useState](https://react.dev/reference/react/useState)
**Related pages**: [api/hooks-api](/api/hooks-api),[architecture/use-state](/architecture/use-state)

### useReducer
A Hook that manages complex state logic with the reducer pattern; suited to multiple sub-states or cases where the next value depends on the previous one.
**Source**: [React official docs · useReducer](https://react.dev/reference/react/useReducer)
**Related pages**: [api/hooks-api](/api/hooks-api),[architecture/use-reducer](/architecture/use-reducer),[source-code/use-reducer](/source-code/use-reducer)

### Context
A mechanism for sharing data through a component tree without passing props down through every layer.
**Source**: [React official docs · Context](https://react.dev/learn/scaling-up-with-reducer-and-context)
**Related pages**: [api/context-api](/api/context-api),[architecture/use-context](/architecture/use-context),[source-code/context-api](/source-code/context-api)

### Lifting State Up
Moving shared state into the nearest common parent component, then distributing it to children via props.
**Source**: [React official docs · Managing State](https://react.dev/learn/managing-state)
**Related pages**: [ecosystem/state-management](/ecosystem/state-management)

### SyntheticEvent
React's cross-browser event wrapper object, providing a uniform event interface.
**Source**: [React official docs · Responding to Events](https://react.dev/learn/responding-to-events)
**Related pages**: [typescript-react/synthetic-events](/typescript-react/synthetic-events)

### Event Handling
Responding to browser events and updating state through props such as `onChange` and `onClick`.
**Source**: [React official docs · Responding to Events](https://react.dev/learn/responding-to-events)
**Related pages**: [typescript-react/synthetic-events](/typescript-react/synthetic-events)

### Derived State
A value computed from props or existing state, which usually needs no separate storage.
**Source**: [React official docs · Managing State](https://react.dev/learn/managing-state)
**Related pages**: [ecosystem/state-management](/ecosystem/state-management)

## Hooks

### Hook
A function prefixed with `use` that lets a function component use React features such as state and lifecycle.
**Source**: [React official docs · Hooks reference](https://react.dev/reference/react/apis)
**Related pages**: [api/hooks-api](/api/hooks-api),[architecture/hooks-deep-dive](/architecture/hooks-deep-dive)

### useEffect
The Hook for running side effects after render: subscriptions, requests, DOM manipulation.
**Source**: [React official docs · useEffect](https://react.dev/reference/react/useEffect)
**Related pages**: [api/hooks-api](/api/hooks-api),[architecture/use-effect](/architecture/use-effect)

### useRef
Returns a mutable ref object, used to access a DOM node or hold a value that persists across renders.
**Source**: [React official docs · useRef](https://react.dev/reference/react/useRef)
**Related pages**: [api/hooks-api](/api/hooks-api),[typescript-react/refs](/typescript-react/refs)

### useMemo
Caches a computed result, avoiding recomputation while dependencies are unchanged.
**Source**: [React official docs · useMemo](https://react.dev/reference/react/useMemo)
**Related pages**: [api/hooks-api](/api/hooks-api)

### useCallback
Caches a function reference, avoiding unnecessary child re-renders while dependencies are unchanged.
**Source**: [React official docs · useCallback](https://react.dev/reference/react/useCallback)
**Related pages**: [api/hooks-api](/api/hooks-api)

### useLayoutEffect
Runs side effects synchronously before the browser paints; suited to reading layout and updating synchronously.
**Source**: [React official docs · useLayoutEffect](https://react.dev/reference/react/useLayoutEffect)
**Related pages**: [api/hooks-api](/api/hooks-api)

### Custom Hook
A function prefixed with `use` that can call other Hooks, used to reuse stateful logic.
**Source**: [React official docs · Hooks reference](https://react.dev/reference/react/apis)
**Related pages**: [architecture/custom-hooks](/architecture/custom-hooks),[source-code/custom-hooks](/source-code/custom-hooks)

### Rules of Hooks
Hooks may only be called at the top level of a function component or custom Hook; never inside a conditional or a loop.
**Source**: [React official docs · Rules reference](https://react.dev/reference/rules)
**Related pages**: [api/hooks-api](/api/hooks-api)

## Rendering and Commit

### Render
The process of React calling a component function and producing a virtual DOM.
**Source**: [React official docs · Render and Commit](https://react.dev/learn/render-and-commit)
**Related pages**: [typescript-react/render-method](/typescript-react/render-method)

### Commit
The phase in which React applies virtual DOM changes to the real DOM.
**Source**: [React official docs · Render and Commit](https://react.dev/learn/render-and-commit)
**Related pages**: [source-code/component-mounting](/source-code/component-mounting)

### Batching
React's mechanism for merging multiple state updates into a single re-render.
**Source**: [React official docs · Managing State](https://react.dev/learn/managing-state)
**Related pages**: [source-code/use-state-effect](/source-code/use-state-effect)

## Concurrent Features

### useTransition
Marks a state update as non-urgent, allowing React to interrupt it in favor of more urgent updates.
**Source**: [React official docs · useTransition](https://react.dev/reference/react/useTransition)
**Related pages**: [api/hooks-api](/api/hooks-api)

### useDeferredValue
Defers updating a value so the interface stays responsive while urgent updates are in flight.
**Source**: [React official docs · useDeferredValue](https://react.dev/reference/react/useDeferredValue)
**Related pages**: [api/hooks-api](/api/hooks-api)

### startTransition
Wraps state updates as non-urgent updates.
**Source**: [React official docs · startTransition](https://react.dev/reference/react/startTransition)
**Related pages**: [api/hooks-api](/api/hooks-api)

### Concurrent Rendering
React's interruptible, resumable rendering mechanism, which underpins features such as transitions and deferred updates.
**Source**: [React official docs · React Compiler](https://react.dev/learn/react-compiler)
**Related pages**: [architecture/concurrent-mode](/architecture/concurrent-mode),[future/react-concurrent-mode](/future/react-concurrent-mode)

## Server-Side Rendering and RSC

### SSR (Server-Side Rendering)
HTML is rendered on the server and sent to the client, improving first-screen time and SEO.
**Source**: [React official docs · Server-side rendering](https://react.dev/reference/react-dom/server)
**Related pages**: [ecosystem/ssr](/ecosystem/ssr),[ecosystem/what-is-ssr](/ecosystem/what-is-ssr)

### Server Components
Components that run on the server; their code is never sent to the client and they can access backend resources directly.
**Source**: [React official docs · Server Components](https://react.dev/reference/rsc/server-components)
**Related pages**: [future/react-server-components](/future/react-server-components)

### Client Components
Components rendered in the browser and responsible for interaction; they must be marked with the `use client` directive.
**Source**: [React official docs · use client](https://react.dev/reference/rsc/use-client)
**Related pages**: [future/react-server-components](/future/react-server-components)

### Streaming
Sending HTML to the client progressively as server components render.
**Source**: [React official docs · renderToPipeableStream](https://react.dev/reference/react-dom/server/renderToPipeableStream)
**Related pages**: [ecosystem/ssr](/ecosystem/ssr)

### Hydration
The client taking over server-rendered HTML and attaching event handlers.
**Source**: [React official docs · hydrateRoot](https://react.dev/reference/react-dom/client/hydrateRoot)
**Related pages**: [ecosystem/ssr](/ecosystem/ssr)

### SEO (Search Engine Optimization)
Improving search engine indexing through server-side rendering and semantic HTML.
**Source**: [React official docs · Server-side rendering](https://react.dev/reference/react-dom/server)
**Related pages**: [ecosystem/ssr-seo](/ecosystem/ssr-seo)

## Ecosystem Tools

### React Router
The mainstream router in the React ecosystem, offering declarative routing and data loading.
**Source**: [React Router official docs](https://reactrouter.com/home)
**Related pages**: [ecosystem/react-router](/ecosystem/react-router),[ecosystem/react-router-setup](/ecosystem/react-router-setup)

### Next.js
A full-stack framework built on React, providing server-side rendering, routing, and build optimization.
**Source**: [Next.js official docs](https://nextjs.org/docs)
**Related pages**: [ecosystem/nextjs](/ecosystem/nextjs),[projects/nextjs-overview](/projects/nextjs-overview)

### Redux
A predictable state container that manages global state through actions and reducers.
**Source**: [Redux official docs](https://redux.js.org/introduction/getting-started)
**Related pages**: [ecosystem/redux](/ecosystem/redux)

### MobX
A state management library based on reactive programming that tracks dependencies automatically through observable state.
**Source**: [MobX official docs](https://mobx.js.org/README.html)
**Related pages**: [ecosystem/mobx](/ecosystem/mobx)

### Vite
A frontend build tool based on native ESM, providing a fast dev server and production builds.
**Source**: [Vite official docs](https://vite.dev/guide/)
**Related pages**: [build-tools/vite](/build-tools/vite)

### Webpack
A module bundler that packages all kinds of assets into a bundle the browser can load.
**Source**: [Webpack official docs](https://webpack.js.org/concepts/)
**Related pages**: [build-tools/webpack](/build-tools/webpack)

### Babel
A JavaScript compiler that transpiles new syntax and JSX into compatible code.
**Source**: [Babel official docs](https://babeljs.io/docs/)
**Related pages**: [build-tools/babel](/build-tools/babel)

### ESLint
A JavaScript static code checker for finding and fixing code problems.
**Source**: [ESLint official docs](https://eslint.org/docs/latest/)
**Related pages**: [basics/eslint-prettier](/basics/eslint-prettier)

### Prettier
A code formatter for enforcing a consistent code style.
**Source**: [Prettier official docs](https://prettier.io/docs/en/)
**Related pages**: [basics/eslint-prettier](/basics/eslint-prettier)

### Testing Library
A user-behavior-oriented collection of testing tools for React components.
**Source**: [Testing Library official docs](https://testing-library.com/docs/)
**Related pages**: [ecosystem/testing](/ecosystem/testing)

### Jest
A JavaScript testing framework, commonly used for React unit tests and snapshot tests.
**Source**: [Jest official docs](https://jestjs.io/docs/getting-started)
**Related pages**: [ecosystem/mocks-snapshots](/ecosystem/mocks-snapshots)

### Vitest
A testing framework built on Vite that shares configuration with Vite projects.
**Source**: [Vitest official docs](https://vitest.dev/guide/)
**Related pages**: [ecosystem/testing-tools](/ecosystem/testing-tools)

### Taro
An open-source multi-platform framework from JD, supporting React for mini-programs and H5.
**Source**: [Taro official docs](https://docs.taro.zone/docs/)
**Related pages**: [build-tools/taro](/build-tools/taro),[build-tools/taro-intro](/build-tools/taro-intro)

### React Native
A framework for building native mobile apps with React.
**Source**: [React official docs · React reference](https://react.dev/reference/react)
**Related pages**: [projects/react-native](/projects/react-native)

### TypeScript
A superset of JavaScript that provides a static type system.
**Source**: [TypeScript official docs](https://www.typescriptlang.org/docs/)
**Related pages**: [typescript-react/typescript-basics](/typescript-react/typescript-basics)

### npm
Node.js's package manager, used to install and manage dependencies.
**Source**: [npm official docs](https://docs.npmjs.com/)
**Related pages**: [basics/npm-usage](/basics/npm-usage)

### Node.js
An event-driven, non-blocking-I/O JavaScript runtime.
**Source**: [Node.js official docs](https://nodejs.org/en/docs)
**Related pages**: [basics/nodejs-setup](/basics/nodejs-setup)

### Git
A distributed version control system for code collaboration and version management.
**Source**: [Git official docs](https://git-scm.com/doc)
**Related pages**: [basics/project-management](/basics/project-management)

---

**Maintenance rule:** any new entry must cite a clickable authoritative source. If none can be found, write "no authoritative source found (unverified)" instead of inventing a link from memory.

<!-- BACKLINKS-AUTO -->
## Related Pages

- [knowledge](knowledge.md)
