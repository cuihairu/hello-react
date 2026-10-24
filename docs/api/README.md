# React API Reference

This collection organizes React's core and extended APIs by topic, as a lookup reference for day-to-day development.

## Page Index

### React Core API Reference
- [React Core Concepts & API Overview](react-overview.md) — an overview of core concepts like componentization, JSX, and the Virtual DOM, plus the main APIs
- [JSX Syntax & JSX-related APIs](jsx-api.md) — createElement, cloneElement, createContext, forwardRef, Fragment
- [Component-related APIs: React.Component, PureComponent](component-api.md) — class component base classes, shallow comparison optimization, usage comparison
- [Lifecycle Methods: componentDidMount, shouldComponentUpdate, etc.](lifecycle-methods.md) — mount/update/unmount phases, error boundaries, getDerivedStateFromProps
- [State & Props API](state-props.md) — this.state, setState, forceUpdate, defaultProps, propTypes
- [ReactDOM & Rendering-related APIs](reactdom-api.md) — createRoot, render, hydrate, flushSync, findDOMNode, createPortal
- [Hooks API: useState, useEffect, useContext, useReducer, etc.](hooks-api.md) — definitions, usage, and examples of commonly used Hooks
- [Context API & Related Usage](context-api.md) — createContext, Provider, useContext, default values and performance optimization
- [Refs & DOM Interaction APIs](refs-api.md) — createRef, useRef, forwardRef, callback ref, best practices
- [Portals & Profiler API](portals-profiler-api.md) — createPortal, Profiler, onRender callback parameters
- [Error Boundary-related APIs](error-boundaries-api.md) — componentDidCatch, getDerivedStateFromError, limited scenarios

### React Extended APIs
- [React Higher-Order Functions & Patterns](react-hoc-patterns.md) — HOC, Render Props, Context, lazy/Suspense, error boundaries, memo
- [Other Common Helper APIs](other-apis.md) — Fragment, StrictMode, createRef, forwardRef, Profiler, batchedUpdates

## Usage Suggestions

- **Consult during development**: use alongside IDE type hints; this documentation supplements details and pitfalls the official docs don't cover
- **Version comparison**: the main text is based on React 18; each page includes a "React 18 → 19 version comparison" table listing version changes and alternatives
- **Source code comparison**: every API entry links to its corresponding source-code topic page, making it easy to cross-reference implementation details

## React 19 Quick Reference

The following summarizes the APIs removed and deprecated in React 19; the "React 18 → 19 version comparison" section on each page explains each item individually.

**Removed**

| Removed | Alternative |
| --- | --- |
| `ReactDOM.render` | `createRoot` + `root.render()` |
| `ReactDOM.hydrate` | `hydrateRoot` |
| `ReactDOM.unmountComponentAtNode` | `root.unmount()` |
| `ReactDOM.findDOMNode` | ref |
| `act` from `react-dom/test-utils` | `React.act` |
| `React.createFactory` | JSX |
| String ref | Callback ref |
| Legacy Context (`contextTypes` / `getChildContext`) | `createContext` |
| Module factory pattern | Plain functions returning JSX |
| `defaultProps` on function components | ES6 default parameters |
| `propTypes` (silently ignored) | Type systems such as TypeScript |
| UMD build | ESM |

**Newly Deprecated**

| Deprecated | Alternative |
| --- | --- |
| `element.ref` | `element.props.ref` |
| `React.forwardRef` | `ref` as a regular prop |
| `<Context.Provider>` | `<Context>` |
| `react-test-renderer` | `@testing-library/react` |

Source: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

## References

- [React Official Docs · Reference](https://react.dev/reference/react)

## Related Pages

- [component-api](component-api.md)
- See the [Architecture Topic](../architecture/README.md) for Hooks design and practice, and the [Source Code Topic](../source-code/README.md) for internal calling mechanisms.
