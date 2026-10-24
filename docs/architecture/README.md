# The Evolution of React's Architecture

This page traces React's architectural changes over time, from the Stack Reconciler through Fiber to concurrent rendering, and records the implementation trade-offs at each stage.

## Page Index

### Legacy Architecture
- [The Virtual DOM: Concepts & Implementation](virtual-dom.md) — element descriptions, tree construction, the diff entry point, limitations
- [The DOM Diffing Algorithm Explained](dom-diff.md) — same-level comparison, the role of keys, list scheduling, O(n) time complexity
- [Strengths & Weaknesses of the Legacy Architecture, and Its Historical Context](old-architecture-comparison.md) — synchronous blocking rendering, no priority scheduling, lag on large lists

### New Architecture
- [React Fiber Architecture Explained](react-fiber.md) — Fiber node structure, double-buffered tree, the work loop, linked-list traversal
- [The Evolution of the Reconciliation Mechanism](reconciliation.md) — from stack recursion to incremental reconciliation, the side-effect linked list, the completion phase
- [Concurrent Mode & the Scheduler](concurrent-mode.md) — priority lanes, time slicing, Suspense integration, useTransition
- [Comparing the Legacy and New Architectures](architecture-comparison.md) — throughput vs. responsiveness, memory footprint, migration cost

### A Deep Dive into Hooks
- [useState: Internal Implementation & Usage](use-state.md) — the Hook linked list, update queues, lazy initialization, batching boundaries
- [useEffect & Side-Effect Management](use-effect.md) — mount/update/unmount timing, cleanup functions, flushSync, Layout vs. Passive
- [useContext & State Sharing](use-context.md) — the Context subscription mechanism, propagating Provider value changes, performance optimization
- [useReducer & Complex State Management](use-reducer.md) — Dispatcher, reducer purity, lazy initialization, dispatch stability
- [Creating & Using Custom Hooks](custom-hooks.md) — composition patterns, state isolation, naming conventions, testing strategies

## Content Angles

This page collects the entry points to my personal notes on this topic; each page unfolds from a conceptual, practical, or implementation angle, so feel free to read across them as needed.

## References

- [React Official Docs (external link)](https://react.dev/learn)

## Related Pages

- [architecture-comparison](architecture-comparison.md)
- Related angles: the [Hooks API Reference](../api/hooks-api.md) records the public interface, and the [Hooks Source Code Notes](../source-code/hooks-source.md) track the internal implementation.
