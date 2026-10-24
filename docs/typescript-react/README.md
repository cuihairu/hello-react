# TypeScript & React Development

Here I record the type systems, component patterns, and core APIs used in TypeScript and React projects.

## Page Index

### TypeScript Basics
- [Why Choose TypeScript](why-typescript.md) — static types, the tooling chain, support for large projects
- [Installing & Configuring TypeScript](setup.md) — key tsconfig.json options, compilation target, strict mode
- [Primitive Types & Interfaces](types-interfaces.md) — primitive types, object types, interfaces vs. type aliases
- [Classes & Generics](classes-generics.md) — class types, generic constraints, an overview of utility types
- [Type Inference & Type Guards](type-inference-guards.md) — inference flow, the `is` type predicate, in/typeof/narrowing
- [Modules & Namespaces in TypeScript](modules-namespaces.md) — ESM/CommonJS interoperability, path mapping, declaration merging
- [Using TypeScript in React Projects](react-typescript.md) — component types, Props/State generics, event handler types

### React Basics
- [React's History & Core Principles](react-history-principles.md) — the evolution from createClass to Hooks
- [JSX Syntax & Basic Usage](jsx-syntax.md) — JSX transpilation, expression interpolation, Fragment, conditional rendering
- [Component-Based Development](component-development.md) — function components, default Props, children, composition vs. inheritance
- [Using State & Props](state-props.md) — one-way data flow, immutable updates, controlled/uncontrolled components
- [The Component Lifecycle](component-lifecycle.md) — class lifecycles, equivalent patterns for function components, marking deprecated APIs
- [Component Mounting & Unmounting](component-mounting.md) — mount order, cleanup functions, StrictMode's double invocation

### A Deep Dive into Components
- [The render Method & Component Rendering](render-method.md) — what triggers a render, pure components, memo optimization
- [How setState Works](setstate.md) — batching, async/sync boundaries, functional updates
- [The Synthetic Event System](synthetic-events.md) — event delegation, pooling, accessing native events
- [Higher-Order Components (HOC)](hoc.md) — enhancement patterns, forwarding refs, static property hoisting
- [The Render Props Pattern](render-props.md) — sharing logic, scoped slots, compared with Hooks
- [Using & Managing Refs](refs.md) — createRef, useRef, useImperativeHandle, callback Ref
- [Applying the Context API](context-api.md) — consuming Providers, performance pitfalls, default values
- [Portals: Use Cases & Implementation](portals.md) — modals, tooltips, event bubbling pass-through
- [Using the Profiler & Performance Analysis](profiler.md) — flame charts, render timing, optimization metrics
- [Implementing Error Boundaries & Best Practices](error-boundaries.md) — componentDidCatch, getDerivedStateFromError, fallback UI

## Content Angles

This page collects the entry points to my personal notes on this topic; each page unfolds from a conceptual, practical, or implementation angle, so feel free to read across them as needed.

## References

- [React Official Docs · Reference](https://react.dev/reference/react)

## Related Pages

- [classes-generics](classes-generics.md)
