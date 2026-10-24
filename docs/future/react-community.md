# The Evolution of the React Community & Ecosystem

Tracking the React core team's decision process, mainstream library adaptation progress, and the migration toolchain, to help a team build its technology follow-up strategy.

## 1. The RFC Process: The Standard Path from Proposal to Shipped Feature

### 1.1 The RFC Lifecycle

```
Idea (Issue/Discord) → RFC PR (github.com/reactjs/rfcs)
    │
    ├─► Exploration: discuss design, alternatives, assess breaking changes
    │
    ├─► Implementation: core team/community implement on the Canary branch
    │       ├─► Experimental marker (requires the `experimental_` prefix or an opt-in config)
    │       └─► Docs updated in sync (react.dev/canary)
    │
    ├─► Stabilization: Canary → Stable release channel
    │       ├─► Remove the experimental marker
    │       └─► Semantic versioning: ship as a Minor release
    │
    └─► Deprecation: retire the old API
            ├─► Deprecation warnings (dev console)
            ├─► Docs note the replacement
            └─► Removed in a Major release
```

### 1.2 Tracking Key RFC Status (2024-2025 snapshot; see the table note for updates after 2025)

| RFC | Title | Status | Expected Stable Version | Focus |
|-----|------|------|--------------|--------|
| #229 | `use` Hook | **Merged** | 19 | Restructuring the data-fetching model |
| #271 | Server Actions | **Merged** | 19 | A new paradigm for forms/mutations |
| #299 | React Compiler | **In implementation** | 19.x/20 | Automatic optimization, migration cost |
| #309 | Offscreen API | **In discussion** | 20+ | Offscreen prerendering, keeping tabs alive |
| #315 | Signals integration | **Exploring** | TBD | Fine-grained reactivity, replacing some useState |
| #320 | View Transitions API | **Proposing** | 19+ | Native page transition animations |

> **2025 update**: React Compiler shipped a **v1.0 stable release** at React Conf 2025 (supports React 17+, opted in via build config); the Offscreen proposal has been renamed **Activity** (`<Activity mode="hidden">`, available on the Canary channel).

### 1.3 How to Get Involved

- **Watch**: Watch `github.com/reactjs/rfcs`, follow the `Status: Accepted` label
- **Feedback**: Comment on RFC PRs with real-world pain points and edge cases
- **Try it**: Canary builds (`npm install react@canary react-dom@canary`) let you verify early
- **Contribute**: Implement a Polyfill, write a Codemod, add doc translations

## 2. Core Team Roadmap (compiled from public info)

### 2.1 Near-Term Priorities (2024 H2 - 2025 H1)

| Area | Goal | Progress Indicators |
|------|------|----------|
| **Compiler** | Production-ready, on by default | Available on Canary, matured ESLint rules, mainstream framework integration |
| **Server Components** | A standardized protocol, cross-framework interop | The Flight spec finalized, alignment across Next.js/Remix/Waku |
| **Concurrency ecosystem** | A mature Suspense data-fetching library ecosystem | TanStack Query v5, SWR 3, Apollo Client RSC support |
| **Developer experience** | Better error stacks, debugging tools | React DevTools v5, source links in the console, error-code docs |

### 2.2 Mid-Term Vision (2025-2026)

- **Zero-config optimization**: Compiler + automatic code splitting + preloading = no need to tune performance by hand
- **A unified data layer**: Server Components + a Client Cache (like Relay/Apollo, but built in)
- **Native animation**: View Transitions + Layout Animations, without heavy libs like Framer Motion
- **Native edge compute**: a standardized Edge Runtime, streaming SSR with no cold starts

## 3. Mainstream Library Adaptation Progress (2024-10 snapshot)

### 3.1 Routing

| Library | React 18 Concurrency | React 19 / RSC | Migration Guide |
|----|---------------|----------------|----------|
| **React Router v7** | Full support | Partial · v7 beta supports RSC | [Migration guide](https://reactrouter.com/start/declarative/routing) |
| **TanStack Router** | Type safety first | Full RSC support | [Docs](https://tanstack.com/router) |
| **Wouter** | Light, compatible | Partial · experimental RSC | Fine for minimal setups |

### 3.2 State Management

| Library | React 18 Concurrency | React 19 / RSC | Notes |
|----|---------------|----------------|------|
| **Redux Toolkit** | `useSyncExternalStore` compatible | RSC compatible (client boundary) | Pair it with `createSlice` |
| **Zustand** | Natively concurrency-safe | RSC compatible | No Provider, fits naturally |
| **Jotai** | Atom-level concurrency | Server-side atoms in RSC | Serializably friendly on the server |
| **Recoil** | Maintenance mode | No RSC plans | Migrate to Jotai/Zustand |
| **MobX** | `observer` compatible | Partial · experimental RSC | Requires `makeObservable` config |

### 3.3 Data Fetching and Caching

| Library | React 18 Suspense | React 19 RSC | Recommendation |
|----|-------------------|--------------|--------|
| **TanStack Query v5** | Full support | Server/Client dual mode | 5/5 first choice |
| **SWR 3** | Supported | RSC compatible | 4/5 a lighter alternative |
| **Apollo Client** | Supported | Partial · experimental GraphQL RSC | A GraphQL must-have |
| **RTK Query** | Supported | Compatible | First choice in the Redux ecosystem |

### 3.4 UI Component Libraries

| Library | React 18 | React 19 / RSC | Notes |
|----|----------|----------------|------|
| **Radix UI / shadcn/ui** | Perfect support | No runtime deps | First choice for headless components |
| **MUI (v6)** | Supported | Partial · adapting gradually | For heavy component-library needs |
| **Ant Design (v5)** | Supported | Partial · in adaptation | First choice for enterprise dashboards |
| **Chakra UI** | v2 maintenance mode | No RSC plans | Migrate to Panda CSS / shadcn |
| **Tailwind CSS** | N/A | N/A | The atomic CSS standard setup |

### 3.5 Testing Tools

| Tool | React 18 | React 19 | Notes |
|------|----------|----------|------|
| **Vitest + RTL** | Recommended | Recommended | The modern default pairing |
| **Jest + RTL** | Supported | Supported | Maintaining older projects |
| **Playwright** | The E2E standard | The E2E standard | A must-have |
| **Storybook** | v8 support | v8 RSC support | Component docs-driven development |

## 4. The Migration Toolchain

### 4.1 Official Codemods

```bash
# Official codemod tool (github.com/reactjs/react-codemod)
npx react-codemod update-react-imports .

# React 19 breaking changes that need a manual check (see the official Upgrading Guide on react.dev):
# - createRoot replaces ReactDOM.render
# - The async timing of useEffect cleanup functions
# - Removals such as defaultProps on function components, react-test-renderer/shallow, etc.
# - UNSAFE_ lifecycle methods can still be renamed on demand
```

### 4.2 Community Tools

| Tool | Purpose | When to Use |
|------|------|----------|
| `react-scan` | Runtime render-performance visualization | Dev tuning |
| `why-did-you-render` | Catch unnecessary re-renders | Dev tuning |
| `babel-plugin-react-compiler` | Automatic compile-time optimization | Production builds (experimental) |
| `eslint-plugin-react-compiler` | Static checks for Compiler compatibility | CI blocking |
| `next-codemod` | Migrations between Next.js versions | Framework upgrades |
| `typescript-eslint` + `eslint-plugin-react-hooks` | Type + Hooks rules | Day-to-day development |

### 4.3 Upgrade Checklist Template

```markdown
# React 19 Upgrade Checklist

## Dependency Updates
- [ ] react@19 / react-dom@19
- [ ] @types/react@19 / @types/react-dom@19
- [ ] eslint-plugin-react-hooks@5 (supports 19's new rules)
- [ ] typescript@5.5+ (meets 19's type requirements)

## Breaking Changes
- [ ] Remove `React.render` / `ReactDOM.render`, migrated to `createRoot`
- [ ] Check whether `useEffect` cleanup functions depend on synchronous execution order
- [ ] Remove UNSAFE_ lifecycles such as `componentWillMount` (if still in use)
- [ ] Align `act()` test-tool behavior (StrictMode double invocation)

## Adopting New Features
- [ ] Evaluate `use` as a replacement for data-fetching useEffect
- [ ] Try `useActionState` + `<form action>` in form scenarios
- [ ] Try `useOptimistic` for optimistic updates
- [ ] Move document metadata to `<Title>` `<Meta>` components

## Build and Tooling
- [ ] Try `babel-plugin-react-compiler` (non-blocking)
- [ ] Update the CI Node version to 20/22 LTS
- [ ] Verify production bundle size and first-paint metrics show no regression

## Acceptance
- [ ] Unit/integration tests all green
- [ ] Core E2E flows pass
- [ ] No Lighthouse performance/accessibility/SEO regression
- [ ] 5% canary traffic for 48h with no anomalies
```

## 5. Info-Source Subscription List

| Source | Type | Frequency | Focus |
|------|------|------|----------|
| [React Official Blog](https://react.dev/blog) | Official releases | Major versions | Release notes, migration guides, new-feature demos |
| [React RFCs](https://github.com/reactjs/rfcs) | Design discussions | Ongoing | Proposal status, breaking-change warnings |
| [React DevTools updates](https://github.com/react/react-devtools) | Tooling | Monthly | New debugging features, performance-analysis improvements |
| [Next.js Blog](https://nextjs.org/blog) | Framework benchmark | Monthly | RSC rollout practice, Compiler integration |
| [TanStack Blog](https://tanstack.com/blog) | Ecosystem libs | Monthly | Data fetching, routing, form best practices |
| [Reactiflux Discord](https://discord.gg/reactiflux) | Real-time community | Live | Hard-problem help, early feedback |
| [This Week In React](https://thisweekinreact.com/) | Weekly | Weekly | Ecosystem news aggregation, curated articles |

## 6. Recommended Team Follow-Up Cadence

| Cadence | Activity | Output |
|------|------|------|
| **Weekly** | Skim This Week In React, watch RFC progress | Note new features/breaking changes that need evaluating |
| **Monthly** | A 30-min team tech share: a new library version/new feature in practice | Decision: adopt or not, a trial plan |
| **Quarterly** | A big dependency scan: `npm outdated`, security audit, replace deprecated libs | Upgrade PRs, a tech-debt list |
| **At major releases** | Kick off the upgrade checklist, canary release, a rollback plan | A stable production upgrade |

---

> **Principle**: **Following along is not the same as chasing newness.** Every new feature or library upgrade should go through a three-step path: "value assessment → trial validation → canary release". Core business prioritizes stability; try new things first in edge cases.

## References

- [React repository](https://github.com/react/react)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [ci-code-quality](/ecosystem/ci-code-quality.md))- [unit-integration-tests](/ecosystem/unit-integration-tests.md))- [knowledge](/knowledge.md))
