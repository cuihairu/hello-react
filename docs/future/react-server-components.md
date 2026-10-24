# React Server Components (RSC) Explained in Depth

RSC is a new paradigm introduced by the React team: **components render on the server, ship zero bundle bytes, and access backend resources directly**, fundamentally changing full-stack development.

## 1. Core Concept Comparison

| Dimension | Client Component (traditional) | Server Component (RSC) |
|------|------------------------|------------------------|
| **Runtime environment** | Browser | Server (Node.js / Edge) |
| **Bundle size** | Bundled into the JS bundle | **Zero bytes** (no JS sent) |
| **Data fetching** | `useEffect` + `fetch` / SWR | `await fetch()` / `db.query()` directly in the component |
| **State** | `useState` / `useReducer` | **Stateless** (re-executed fresh per request) |
| **Interactivity** | Fully supported (onClick, etc.) | **Not supported** (no lifecycles, no Hooks) |
| **Backend access** | Requires an API route in between | **Direct** database, filesystem, internal services |
| **Streaming** | Requires Suspense | **Natively supported** `readableStream` |

## 2. Boundary Drawing: the `"use client"` Directive

```tsx
// app/components/InteractiveChart.tsx
'use client';  // ← A single directive at the top of the file, marking the client boundary

import { useState } from 'react';
import { Chart } from 'chart.js';

export function InteractiveChart({ data }) {
  const [zoom, setZoom] = useState(1); // Only client components can use Hooks
  return <canvas onClick={() => setZoom(z => z * 1.2)} />;
}
```

### 2.1 Boundary Propagation Rules

```
Server Component (default)
    │
    ├── import ServerComponentA  → Still a Server Component
    ├── import ServerComponentB  → Still a Server Component
    │
    └── import ClientComponent   →  **Boundary cut**
            │
            ├── import ChildClient  → Client component (propagates)
            └── import ServerUtil   → Error: a client cannot import a server module
```

**Key principles**:
- Add `"use client"` **only when you need interaction/state/browser APIs**
- Server components can import client components (passed as children/props)
- Client components **cannot** import server components (it errors)

## 3. Data Fetching Pattern Comparison

### 3.1 Traditional Client Component (mixed CSR/SSR)

```tsx
// Anti-pattern · client component: waterfall, requires useEffect, hydration overhead
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`/api/users/${userId}`).then(r => r.json()).then(setUser);
    fetch(`/api/users/${userId}/posts`).then(r => r.json()).then(setPosts);
  }, [userId]);

  if (!user) return <Skeleton />;
  return <div>{user.name}'s {posts.length} posts</div>;
}
```

### 3.2 Server Component (parallel, zero bundle, direct DB)

```tsx
// Right pattern · server component: parallel fetching, no hydration, direct database
async function UserProfile({ userId }) {
  // Two independent queries, run in parallel with Promise.all to avoid serial waits
  const [user, posts] = await Promise.all([
    db.user.findUnique({ where: { id: userId } }),
    db.post.findMany({ where: { authorId: userId } }),
  ]);

  return <div>{user.name}'s {posts.length} posts</div>;
}
```

### 3.3 Suspense Streaming Render

```tsx
// app/page.tsx (Server Component)
import { Suspense } from 'react';
import { UserHeader } from './UserHeader';
import { UserPosts } from './UserPosts';

export default function Page({ params: { userId } }) {
  return (
    <section>
      {/* Header is fast, stream it out first */}
      <UserHeader userId={userId} />

      {/* Posts is slow, wait streaming */}
      <Suspense fallback={<PostsSkeleton />}>
        <UserPosts userId={userId} />
      </Suspense>
    </section>
  );
}

// app/UserPosts.tsx (Server Component)
async function UserPosts({ userId }) {
  const posts = await fetchPosts(userId); // May take 500ms
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}
```

**Streaming response timeline**:
```
T+0ms    HTTP 200 + Transfer-Encoding: chunked
T+50ms   <header>username</header> arrives in the browser, rendered visible
T+300ms  <ul><li>post1</li>...</ul> arrives, replacing the Skeleton
T+300ms  Stream ends, the page is fully interactive
```

## 4. The Serialization Protocol: React Flight

### 4.1 What Is Flight

Flight is RSC's **serialization format**, encoding the server component tree into a streaming JSON that the browser deserializes into a Client Component tree.

### 4.2 A Simplified Example

```jsonc
// The Flight stream produced on the server (simplified)
[
  ["$", "html", null, {"startTag": "<div>"}],
  ["$", "div", null, {"children": [
    ["$", "h1", null, {"children": "Hello RSC"}],
    ["$", "$L1", null, {"clientModule": "./InteractiveButton.client.js", "props": {"label": "Click me"}}]
  ]}],
  ["$", "html", null, {"endTag": "</div>"}]
]
```

- `$L1` = a Client Component reference marker
- `clientModule` = the module path loaded on the client
- **Only props data is transmitted**; component code is loaded on demand by the client

### 4.3 Serializable Props Limits

```tsx
<>
  {/* Allowed: primitives, plain objects, arrays, Date, Promise, React Element */}
  <ClientComponent
    name="Alice"
    count={42}
    items={['a', 'b']}
    meta={{ createdAt: new Date() }}
    promise={fetchData()}
    children={<ServerOnlyComponent />}
  />

  {/* Forbidden: class instances, functions, Symbol, DOM nodes, WeakMap, circular references */}
  <ClientComponent
    handler={() => {}}           // Functions are not serialized
    ref={someRef}                // Refs are not serialized
    classInstance={new Foo()}    // Class instances are not serialized
  />
</>
```

**Workarounds**: replace functions with Server Actions, create Refs on the client only, convert class instances to plain data.

## 5. Server Actions: A New Paradigm for Forms and Mutations

### 5.1 Defining a Server Action

```tsx
// app/actions.ts
'use server';  // File-level: every exported function is a Server Action

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  // Operate the database directly, no API route needed
  await db.post.create({ data: { title, content } });

  // Invalidate cache, redirect
  revalidatePath('/posts');
  redirect('/posts');
}
```

### 5.2 Binding Directly to a Form

```tsx
// app/posts/new/page.tsx (Server Component)
import { createPost } from '@/actions';

export default function NewPostPage() {
  return (
    <form action={createPost}>  {/* Native form action binding an async function */}
      <input name="title" required placeholder="Title" />
      <textarea name="content" required placeholder="Content" />
      <button type="submit">Publish</button>
    </form>
  );
}
```

### 5.3 Calling a Server Action from the Client

```tsx
'use client';

import { useActionState } from 'react';
import { createPost } from '@/actions';

export function CreatePostForm() {
  const [state, formAction, isPending] = useActionState(createPost, {});

  return (
    <form action={formAction}>
      <input name="title" disabled={isPending} />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Publishing...' : 'Publish'}
      </button>
      {state.error && <p className="error">{state.error}</p>}
    </form>
  );
}
```

## 6. Caching and Revalidation

### 6.1 Default Cache Behavior

| Data Source | Default Cache | Control |
|--------|----------|----------|
| `fetch()` (GET) | **Strong cache** (`force-cache`)* | `fetch(url, { cache: 'no-store' })` |
| Database queries | **No cache** (re-executed per request) | Manual `unstable_cache` |
| Server Action | **Not cached** (POST semantics) | N/A |

> \* This behavior refers to Next.js 14; **from Next.js 15 on, `fetch` defaults to no cache**, and caching requires passing `cache: 'force-cache'` explicitly.

### 6.2 Manual Caching and Tag-based Invalidation

```tsx
// Cache a database query result
import { unstable_cache } from 'next/cache';

const getUser = unstable_cache(
  async (id) => db.user.findUnique({ where: { id } }),
  ['user'],  // Cache key tag
  { revalidate: 3600, tags: ['user'] }  // 1 hour + tag-based invalidation
);

// Invalidate inside a Server Action
export async function updateUser(formData) {
  await db.user.update({ where: { id: formData.get('id') }, data: { name: formData.get('name') } });
  revalidateTag('user');  // Precisely invalidate every cache tagged 'user'
}
```

## 7. Integration with the Next.js App Router

### 7.1 Directory Structure Conventions

```
app/
├── layout.tsx          # Server Component (root layout)
├── page.tsx            # Server Component (route entry)
├── loading.tsx         # Suspense fallback (streaming load UI)
├── error.tsx           # Error Boundary (server error UI)
├── not-found.tsx       # 404 UI
├── (auth)/             # Route group (does not affect the URL)
│   ├── login/
│   └── register/
├── posts/
│   ├── [id]/
│   │   ├── page.tsx    # Server Component
│   │   └── actions.ts  # Server Actions
│   └── page.tsx
└── components/
    ├── ui/             # Pure UI, no "use client" → Server Component
    └── interactive/    # Needs interaction → "use client"
```

### 7.2 Rendering Strategy Comparison

| Route Segment | Default Render | Optional Config |
|--------|----------|----------|
| `page.tsx` | **Static generation (SSG)** | `export const dynamic = 'force-dynamic'` (SSR) |
| `layout.tsx` | Static | Same as page |
| `loading.tsx` | Streaming SSR | N/A |
| API Route (`route.ts`) | Edge/Node function | `export const runtime = 'edge'` |

## 8. Common Pitfalls and Best Practices

### 8.1 Pitfall: Using `useState` in a Server Component

```tsx
// Error: Server Components do not support Hooks
async function Counter() {
  const [count, setCount] = useState(0); // Error
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

**Fix**: split it into a Client Component
```tsx
// Counter.client.tsx
'use client';
export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```


```tsx
// Page.tsx (Server Component)
import { Counter } from './Counter.client';
export default function Page() {
  return <Counter />; // Passed as children, no serialization issues
}
```

### 8.2 Pitfall: A Client Component Importing Server Tools

```tsx
// Wrong: ClientComponent.tsx
'use client';
import { db } from '@/lib/db'; // db only runs on the server
export function Widget() { /* ... */ }
```

**Fix**: pass data via a Server Action or Props
```tsx
// ServerComponent.tsx
import { Widget } from './Widget.client';
import { getData } from '@/lib/db';

export async function Page() {
  const data = await getData(); // Fetched on the server
  return <Widget initialData={data} />; // Passed to the client via props
}
```

### 8.3 Best Practice Checklist

| Scenario | Recommended Approach |
|------|----------|
| **Page skeleton** | Server Component (default) |
| **Interactive components** (buttons, forms, charts) | A separate `"use client"` file |
| **Data fetching** | `await` directly in a Server Component |
| **Form submission** | Server Action + `<form action>` |
| **Optimistic updates** | `useOptimistic` + Server Action |
| **Auth state** | A Server Component reads Cookie/Session, passes it to the client |
| **Theme/local state** | Client Component `useState` / Context |
| **Third-party libs** (chart.js, etc.) | Wrapped in a Client Component |

## 9. Migration Strategy: Gradually Adopting RSC

### 9.1 Migration Path for an Existing Project

```
Existing CRA/Vite SPA (fully client-side)
    │
    ▼ 1. Adopt Next.js / Remix / an RSC framework
Next.js Pages Router (getServerSideProps)
    │
    ▼ 2. Migrate page by page to the App Router
App Router hybrid: some pages as Server Components
    │
    ▼ 3. Push the data layer down
Remove API Routes, Server Components connect to the DB directly
    │
    ▼ 4. Modernize forms
form action + Server Actions replace fetch
    │
    ▼ 5. Split the component library
UI primitives → Server Components
Interactive components → a separate "use client" package
```

### 9.2 Coexistence Strategies

| Coexistence Mode | When to Use | Cost |
|----------|----------|------|
| **Page-level** | Migrate low-risk pages first | Hydration flicker on route jumps |
| **Component-level** | Partial RSC on complex pages | Mental overhead of boundary management |
| **Data-level** | Keep the API, have Server Components call it | No reduction in network hops |

## 10. Performance Benchmark Reference (Next.js 14+ App Router)

| Metric | Traditional CSR | SSR + Hydration | RSC (streaming) |
|------|----------|-----------------|------------|
| **TTFB** | ~50ms | ~200ms (server render) | **~100ms** (first stream chunk) |
| **FCP** | ~800ms | ~400ms | **~200ms** |
| **TTI** | ~1200ms | ~800ms (hydration blocking) | **~400ms** (no hydration) |
| **JS size** | 200-500KB | 150-400KB | **50-150KB** (interactive islands only) |
| **Data-fetching waterfall** | Serial on the client | Serial on the server | **Parallel on the server + streaming** |

## 11. Related Resources

- [React Server Components RFC](https://github.com/reactjs/rfcs/pull/227)
- [Next.js App Router docs](https://nextjs.org/docs/app)
- [React Flight protocol spec](https://github.com/reactjs/rfcs/blob/main/text/0022-server-components.md)
- [A deep guide to Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)
- [RSC migration case study: Cal.com](https://cal.com/blog/migrating-to-react-server-components)

## References

- [React Official Docs · Server Components](https://react.dev/reference/rsc/server-components)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [glossary](/glossary.md))
- [knowledge](/knowledge.md))
