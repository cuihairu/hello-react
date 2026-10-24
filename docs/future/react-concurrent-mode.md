# React Concurrent Mode Explained in Depth

Concurrent Mode (concurrent rendering) is the core architecture upgrade introduced in React 18, making rendering interruptible and schedulable by priority, fundamentally changing how updates are processed.

## 1. Why Concurrent Mode Is Needed

Traditional synchronous rendering (Stack Reconciler / early Fiber) has two major pain points:

| Scenario | Synchronous Rendering | Concurrent Mode |
|------|--------------|--------------|
| Large list, first paint | Main thread blocked 200ms+, interaction unresponsive | Slice-based rendering, high-priority interactions jump the queue |
| Typing to trigger autocomplete search | Every keypress triggers a full re-render, dropped frames | `startTransition` marks it low-priority, typing stays responsive |
| Code-splitting load | `Suspense` falls back to a full-screen loading state | Fine-grained `Suspense` boundaries, partial skeletons |

**The core conflict**: CPU time slices are finite, rendering work is unpredictable, and high-priority interactions (clicks, input) cannot be blocked by low-priority work (list rendering, data fetching).

## 2. The Three Pillars of Concurrent Rendering

### 2.1 Priority Lanes — `lanes` / `LanePriority`

```js
// Simplified priority hierarchy (react-reconciler/src/ReactPriorityLevels.js)
export const SyncLane = 1;           // Synchronous: clicks, input, setState (default)
export const InputContinuousLane = 4; // Continuous input: drag, scroll
export const DefaultLane = 16;        // Default: data fetching, list rendering
export const TransitionLane = 64;     // Transition: marked by startTransition
export const IdleLane = 1024;         // Idle: preloading, offscreen prerendering
```

- **A lane is not a single priority** but a bitmask, supporting batch operations and subset checks
- `Scheduler` decides the next unit of work based on the lane

### 2.2 Time Slicing — `workLoopAsync`

```js
function workLoopAsync() {
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress);
  }
}

function shouldYield() {
  return getCurrentPriorityLevel() > UserBlockingPriority ||
         navigator.scheduling.isInputPending();
}
```

- `shouldYield()` decides whether to return the main thread: a high-priority task arrives or input is pending
- Low-priority work (Transition/Idle) yields frequently, high-priority work (Sync) does not

### 2.3 Double-Buffered Trees — `current` ↔ `workInProgress`

```
current (committed)          workInProgress (in progress)
    │                          │
    ▼                          ▼
RootFiber ────── clone ──────► RootFiber
    │                          │
    ├── App (complete) ──────► ├── App (pending)
    │   ├── Header (done)       │   ├── Header (done)
    │   └── List (pending)  ◄───┤   └── List (working)
    │       └── Item×1000         │       └── Item×500 (yield)
    ▼                          ▼
```

- Updates are built on the `workInProgress` tree, then atomically switched at the end: `current = workInProgress`
- On interruption, `workInProgress` is discarded, leaving the committed UI untouched

## 3. Key APIs and Usage Patterns

### 3.1 `useTransition` — Marking Non-Blocking Updates

```tsx
function SearchResults({ query }) {
  const [isPending, startTransition] = useTransition();
  const [inputValue, setInputValue] = useState(query);

  function handleChange(e) {
    const value = e.target.value;
    setInputValue(value);                    // High priority: the input responds instantly
    startTransition(() => {                  // Low priority: the results list can be delayed
      setQuery(value);                       // Triggers expensive filtering/rendering
    });
  }

  return (
    <>
      <input value={inputValue} onChange={handleChange} />
      {isPending ? <Spinner /> : <List query={query} />}
    </>
  );
}
```

- `isPending` tells the UI whether low-priority work is in flight, showing a skeleton instead of blocking input
- **It does not block the current render** — it only schedules new work

### 3.2 `useDeferredValue` — Deferring a Value Read

```tsx
function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query); // Low-priority read
  const items = useMemo(() => expensiveFilter(list, deferredQuery), [deferredQuery]);
  return <List items={items} />;
}
```

- Equivalent to `startTransition`, but for **derived values** rather than state updates
- `deferredQuery` lags behind `query`, so rendering can reuse the previous frame's result

### 3.3 `Suspense` + Data Fetching

```tsx
function ProfilePage({ userId }) {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileHeader userId={userId} />
      <Suspense fallback={<PostsSkeleton />}>
        <ProfilePosts userId={userId} />
      </Suspense>
    </Suspense>
  );
}

async function ProfilePosts({ userId }) {
  const posts = await fetchPosts(userId); // Throws a Promise, triggering Suspense
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}
```

- **Data fetching is component rendering** — no `useEffect` + `useState` boilerplate
- Nested `Suspense` enables streaming, progressive rendering: Header first, Posts later

### 3.4 `flushSync` — Forcing a Synchronous Flush

```tsx
function handleClick() {
  flushSync(() => {
    setCount(c => c + 1); // Runs synchronously, the DOM updates immediately
  });
  // The DOM now reflects the new state, so measuring size or focusing is safe
  inputRef.current.focus();
}
```

- Use only for cases that **must be synchronous** (measuring, focusing, third-party library integration)
- Abuse it and you lose the concurrency benefits, degrading back to synchronous rendering

## 4. Lifecycle Changes Under Concurrent Mode

| Lifecycle / Hook | Synchronous Mode | Concurrent Mode | Notes |
|-----------------|----------|----------|----------|
| `useEffect` | Runs async after render | Same (but may be interrupted and re-run) | Cleanup functions must be idempotent |
| `useLayoutEffect` | Runs after synchronous layout | Synchronous, but **may be deferred until before commit** | Avoid heavy computation, switch to `useEffect` |
| `componentDidMount` | After mount | Same | Class components are not concurrency-aware |
| `getDerivedStateFromError` | Error boundary | Same | Unaffected by concurrency |

**StrictMode double invocation** (development only) simulates concurrency interruptions:
- `useState` initializer functions run 2 times
- `useEffect` mount → unmount → re-mount
- Component function bodies run 2 times
- **Purpose**: expose impure side effects and bugs where state depends on render count

## 5. Performance Tuning Checklist

```tsx
// Wrong: a new function/object is created on every render, breaking memo
<Child onClick={() => doSomething(id)} style={{ color: 'red' }} />

// Right: stable references
const handleClick = useCallback(() => doSomething(id), [id]);
const style = useMemo(() => ({ color: 'red' }), []);
<Child onClick={handleClick} style={style} />
```

| Technique | When to Use | Cost |
|----------|----------|------|
| `React.memo` | Pure presentational components, props pass a shallow compare | Negligible |
| `useMemo` / `useCallback` | Expensive computation, stable callbacks passed to memoized children | Maintaining the dependency array |
| `useTransition` | A state update would re-render a large subtree | Requires `isPending` UI |
| Virtual list (`react-window`) | Lists of 1000+ items | Adds a dependency |
| Code splitting + `Suspense` | Non-critical modules off the first paint | Route/component-granularity design |

## 6. Migration Roadmap

```
React 17 synchronous rendering
    │
    ▼ Enable createRoot (automatically turns on concurrent features)
React 18 concurrent features available
    │
    ├─► Gradually replace setState with startTransition (input, filtering, page switching)
    ├─► Move data fetching to Suspense + async/await (with a framework/library)
    ├─► Remove redundant data-fetching useEffect, switch to Server Components (Next.js) or SWR/TanStack Query
    └─► Clean up impure side effects under StrictMode
    │
    ▼
React 19+ use/useOptimistic/useActionState simplify the patterns further
```

## 7. Clearing Up Common Misconceptions

| Misconception | Reality |
|------|------|
| "Concurrent mode makes rendering faster" | Total work is unchanged, it just feels **faster** (high-priority work is not blocked) |
| "You must use `useTransition` for all setState" | Only for updates that **can be deferred**; clicks and form submits stay synchronous |
| "`Suspense` can only be used for code splitting" | React 18+ supports **data-fetching Suspense** (with a framework/library) |
| "Concurrent mode breaks `useLayoutEffect`" | `useLayoutEffect` still runs synchronously, only the scheduling timing shifts slightly, **the semantics are not broken** |

## Related Resources

- [React 18 release: concurrent features](https://react.dev/blog/2022/03/29/react-v18)
- [Diving into React Fiber and concurrent scheduling](https://github.com/acdlite/rfcs/blob/main/text/0008-concurrent-mode.md)
- [useTransition and useDeferredValue in practice](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-keys)

## References

- [React Official Docs · React Compiler](https://react.dev/learn/react-compiler)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [glossary](/glossary.md))
- [knowledge](/knowledge.md))
