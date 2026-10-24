# The React Ecosystem

Here I record the commonly used libraries and engineering practices around React, covering routing, state, SSR, testing, and CI/CD.

## Page Index

### React Routing
- [Installing & Basic Configuration of React Router](react-router-setup.md) — the v6 API, Routes/Route/Link/Outlet, lazy loading
- [Route Parameters & Dynamic Loading](react-router-params.md) — useParams, useSearchParams, dynamic import, preloading
- [Nested Routes & Page Navigation](react-router-nested.md) — relative paths, index routes, layout routes, navigation guards

### State Management & Data Flow
- [Redux: Core Principles & Usage](redux.md) — Store, Reducer, Action, Middleware, recommended RTK usage
- [Combining the Context API with useReducer](context-reducer.md) — lightweight global state, avoiding excessive renders, the Selector pattern
- [MobX & State Management](mobx.md) — observable objects, the reactivity model, withObserver, compared with Redux

### Server-Side Rendering (SSR)
- [What Is Server-Side Rendering](what-is-ssr.md) — CSR vs. SSR vs. SSG, hydration, streaming, SEO benefits
- [Next.js: Basic Usage](nextjs.md) — App Router, Server Components, data fetching, route caching
- [SSR & SEO Optimization](ssr-seo.md) — meta tags, structured data, crawler-friendliness, performance metrics

### Testing & Quality Assurance
- [React Testing Tools: Jest, Enzyme, React Testing Library](testing-tools.md) — tool selection, renderers, query APIs, event simulation
- [Unit Testing & Integration Testing](unit-integration-tests.md) — isolated component tests, Hook tests, mock strategies, coverage thresholds
- [Mocks & Snapshot Testing](mocks-snapshots.md) — MSW, Jest mocks, snapshot update strategies, visual regression
- [Continuous Integration & Code Quality](ci-code-quality.md) — GitHub Actions, ESLint/Prettier, TypeCheck, bundle analysis

## Content Angles

This page collects the entry points to my personal notes on this topic; each page unfolds from a conceptual, practical, or implementation angle, so feel free to read across them as needed.

## References

- [React Official Docs · Reference](https://react.dev/reference/react)

## Related Pages

- [ci-code-quality](ci-code-quality.md)
- See the [Project Testing Tools notes](../projects/testing-tools.md) for example project configurations of testing tools, and [Next.js & SSR](../projects/nextjs-overview.md) for an overview of the Next.js project ecosystem.
