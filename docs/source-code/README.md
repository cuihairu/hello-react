# React.js Source Code Analysis

Here I record the internal mechanisms and key implementations I pay attention to when reading React's source code, so they're easy to look up against the source.

## Page Index

### Understanding React's Internal Mechanisms
- [An Overview of React's Architecture](react-architecture.md) — React's overall architectural layers and data flow
- [How the Virtual DOM Is Implemented](virtual-dom.md) — Fiber node structure, element creation and the diff entry point
- [The Reconciliation Algorithm Explained](reconciliation.md) — the core logic of the reconciliation algorithm, collecting and committing side effects
- [React Fiber Architecture & the Update Mechanism](react-fiber.md) — building the Fiber tree, the work loop, priority scheduling

### React Lifecycle: Internal Implementation
- [The Mounting & Update Flow of Components](component-mounting.md) — the full call stack for the mount/update phases
- [React's Event System & Synthetic Events](events.md) — event delegation, the synthetic event pool, bubbling and capturing
- [The Internal Implementation of the Context API](context-api.md) — the Provider/Consumer mechanism, subscriptions and propagation

### React Hooks Source Code Analysis
- [How useState & useEffect Work Internally](use-state-effect.md) — the Hook linked list, update queues, when side effects run
- [How to Implement a Custom Hook](custom-hooks.md) — patterns and best practices for composing Hooks
- [Implementing useReducer & Complex State Management](use-reducer.md) — Dispatcher, reducer execution, lazy initialization

## Content Angles

This page collects the entry points to my personal notes on this topic; each page unfolds from a conceptual, practical, or implementation angle, so feel free to read across them as needed.

## Prerequisites

The source-code notes and the architecture topic unfold from different angles; read them side by side with [React Architecture](../architecture/README.md).

## References

- [The React Repository](https://github.com/react/react)

## Related Pages

- [component-mounting](component-mounting.md)
- Related angles: the [React Architecture notes](../architecture/README.md) discuss design and runtime mechanics, and the [Hooks API Reference](../api/hooks-api.md) makes it easy to look up the public interface.
