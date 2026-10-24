# The Future of React's Architecture

Based on the React core team's RFCs, Canary releases, and the public roadmap, a rundown of the major architectural directions for the next 1–2 years.

## 1. React Compiler (React Forget) — Compile-Time Automatic Optimization

### 1.1 Core Goals

```tsx
// The developer's code (no memo/useMemo/useCallback needed)
function UserList({ users, filter }) {
  const filtered = users.filter(u => u.name.includes(filter));
  return <ul>{filtered.map(u => <UserItem key={u.id} user={u} />)}</ul>;
}

function UserItem({ user }) {
  return <li onClick={() => navigate(`/user/${user.id}`)}>{user.name}</li>;
}
```

The compiler automatically:
- Applies component-level `React.memo` (props shallow comparison)
- Stabilizes event handlers (inline arrow functions → stable references)
- Caches derived computation (the `users.filter` → a `useMemo` equivalent)

### 1.2 How Compilation Works

```
Source AST
    │
    ▼
Forget analysis: build a dependency graph (which values change with which Props/State)
    │
    ▼
Memoization injection: insert `_c` (cache) slots at JSX creation points
    │
    ▼
Output: code with useMemo/useCallback-equivalent logic, zero runtime overhead
```

### 1.3 Current Status and Timeline

| Stage | Version | Status | Notes |
|------|------|------|------|
| Experimental | Canary | Already gone through a long trial period of `babel-plugin-react-compiler` | Requires the ESLint rules |
| Stable release | Compiler v1.0 | **Released** (open-sourced at React Conf 2025, supports React 17+) | Opted in via build config (e.g. Next.js's `experimental.reactCompiler`) |
| Fully mature | 20+ | Planned | Support for more complex control flow, library code optimization |

> When a single component needs to opt out of compiler optimization, use the `"use no memo"` directive inside the component.

### 1.4 Migration Preparation

- **Now**: enable `eslint-plugin-react-compiler` to catch violation patterns (render-side effects, mutating Props)
- **When upgrading**: delete hand-written `memo`/`useMemo`/`useCallback` and watch the performance baseline
- **Note**: the compiler **does not optimize** library code, `forwardRef` components, or dynamically `import()`-ed components

## 2. Standardizing Server Components — Formalizing RSC

### 2.1 Status Quo

- Next.js App Router led RSC adoption (the `app/` directory defaults to Server Components)
- Remix v2, RedwoodJS, Waku and other frameworks followed
- **Problem**: each framework's serialization protocol and Client/Server boundary APIs are not fully consistent

### 2.2 The Standardization Direction (RFC #227 / #271)

```tsx
// Unified boundary markers (proposed)
'use client';  // File-level directive: this file and its import chain render on the client
'use server';  // Function-level directive: a Server Action, direct form submission
```


```jsonc
// A unified serialization format (React Flight)
{
  "type": "ClientComponent",
  "key": null,
  "props": { "children": [] },
  "module": "app/components/InteractiveChart.client.js"
}
```

### 2.3 Impact on Developers

| Change | Status Quo | After Standardization |
|------|------|----------|
| Cross-framework migration | High cost (incompatible protocols) | Low cost (a unified Flight protocol) |
| Library author adaptation | Separate adaptation for Next.js/Remix | A single standard, `"react-server": "export"` |
| Type safety | Framework-specific type tools | A unified `@types/react-server` |

## 3. Offscreen API — Offscreen Prerendering and Hidden Keep-Alive

> Naming update: this proposal has been renamed **Activity**, with a final API shape of `<Activity mode="hidden|visible">` (available on the Canary channel). This article still uses Offscreen to explain the design rationale; the semantics are identical.

### 3.1 Problems It Solves

| Scenario | Pain Points of Existing Approaches | The Offscreen Approach |
|------|--------------|----------------|
| Keeping tab state across switches | `display: none` triggers unmount/remount | `<Offscreen mode="hidden">` preserves the Fiber tree |
| Hover-to-preload a detail page | `import()` early but don't render; first interaction still lags | `<Offscreen mode="prerender">` finishes rendering in the background |
| Virtual list buffer | Manual DOM recycling | Native support for an offscreen instance pool |

### 3.2 API Design (Experimental)

```tsx
import { Offscreen } from 'react/offscreen';

function TabPanel({ activeTab, children }) {
  return (
    <Offscreen mode={activeTab ? 'visible' : 'hidden'}>
      {children}
    </Offscreen>
  );
}

// Prerender mode (used with Suspense)
<Offscreen mode="prerender" fallback={<Spinner />}>
  <HeavyComponent />
</Offscreen>
```

### 3.3 Lifecycle Semantics

| Mode | Mount | Unmount | State Retention | Render Cost |
|------|------|------|----------|----------|
| `visible` | Normal | Normal | Normal | Normal |
| `hidden` | Normal | **Not unmounted** (detached) | **Fully retained** | Normal on first render, zero-cost switching afterward |
| `prerender` | Background render | Activated when switched visible | Retained | Spread across the background, near-zero switch latency |

## 4. Resource Preloading and Priority Scheduling Enhancements

### 4.1 The `preload` / `preinit` API

```tsx
import { preloadModule, preinitModule } from 'react-dom';

function App() {
  // Route-level preloading (triggered on mouse hover over a Link)
  function handleLinkHover() {
    preloadModule('/lazy/HeavyPage');
    preinitModule('/lazy/HeavyPage'); // Compiles in parallel
  }

  return <Link onMouseEnter={handleLinkHover} href="/heavy">Enter</Link>;
}
```

### 4.2 Priority Inheritance and Deep `useOptimistic` Integration

```tsx
// In the future: priority propagates automatically
function Parent() {
  const [text, setText] = useState('');
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      {/* Child components inherit low priority automatically, no explicit startTransition needed */}
      <ExpensiveList filter={text} />
    </>
  );
}
```

## 5. Migration Strategy Recommendations

### 5.1 Short Term (within 6 months of the React 19 release)

| Action | Rationale |
|------|------|
| Upgrade to React 19, enable `createRoot` | The concurrent-features infrastructure is in place |
| Try `babel-plugin-react-compiler` (non-production) | Evaluate automatic-optimization coverage, clean up violation patterns |
| Gradually introduce `useOptimistic`/`useActionState` | A clear boost to form-interaction experience, low risk |
| Track framework RSC standardization progress | Evaluate lock-in risk when choosing a framework |

### 5.2 Medium Term (12–18 months)

| Action | Rationale |
|------|------|
| Turn on React Compiler in production | Delete a lot of hand-written optimization code, reduce maintenance burden |
| Adopt standardized RSC (after a framework upgrade) | Reuse component libraries across frameworks, lower migration cost |
| Try Offscreen for keeping tabs/drawers alive | Replace hand-written `display:none` + state-retention workarounds |

### 5.3 Long Term (18+ months)

| Direction | Potential Gains |
|------|----------|
| Compile-time CSS-in-JS (with the Compiler) | A zero-runtime styling approach |
| Fine-grained reactivity (Signals integration) | Replace some `useState`, more precise updates |
| A WASM version of the React Reconciler | Render off the main thread, fully solving large-tree blocking |

## 6. Risks and Mitigations

| Risk | Impact | Mitigation |
|------|------|------|
| Compiler mis-optimization (a side-effecting component gets memoized) | Production bugs | Strictly enable the ESLint rules, phased canary rollout, keep manual `memo` as a fallback |
| RSC standardization delayed or forked | Framework lock-in | Decouple core business logic from the framework, keep pure React component libraries portable |
| Offscreen API changes | Migration cost for early adopters | Only try it in non-core scenarios, wrap an adaptation layer |

## Related Resources

- [React Compiler RFC](https://github.com/reactjs/rfcs/pull/299)
- [Server Components RFC](https://github.com/reactjs/rfcs/pull/227)
- [Offscreen API exploration](https://github.com/reactjs/rfcs/pull/309)
- [React Conf 2024 recap](https://conf.react.dev/)

## References

- [React Official Docs · React Compiler](https://react.dev/learn/react-compiler)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [knowledge](/knowledge.md))
- [timeline](/timeline.md))
