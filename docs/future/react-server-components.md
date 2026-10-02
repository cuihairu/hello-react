# React Server Components (RSC) 深度解析

RSC 是 React 团队推出的新范式：**组件在服务端渲染、零包体积传输、可直接访问后端资源**，彻底改变全栈开发模式。

## 1. 核心概念对比

| 维度 | Client Component (传统) | Server Component (RSC) |
|------|------------------------|------------------------|
| **运行环境** | 浏览器 | 服务器（Node.js / Edge） |
| **包体积** | 打包进 JS bundle | **零字节**（不发送 JS） |
| **数据获取** | `useEffect` + `fetch` / SWR | 组件内直接 `await fetch()` / `db.query()` |
| **状态** | `useState` / `useReducer` | **无状态**（每次请求全新执行） |
| **交互** | 完整支持（onClick 等） | **不支持**（无生命周期、无 Hooks） |
| **访问后端** | 需 API 路由中转 | **直连** 数据库、文件系统、内部服务 |
| **流式传输** | 需 Suspense 配合 | **原生支持** `readableStream` |

## 2. 边界划分：`"use client"` 指令

```tsx
// app/components/InteractiveChart.tsx
'use client';  // ← 文件顶部单行指令，标记客户端边界

import { useState } from 'react';
import { Chart } from 'chart.js';

export function InteractiveChart({ data }) {
  const [zoom, setZoom] = useState(1); // 仅客户端组件可用 Hooks
  return <canvas onClick={() => setZoom(z => z * 1.2)} />;
}
```

### 2.1 边界传播规则

```
Server Component (默认)
    │
    ├── import ServerComponentA  → 仍是 Server Component
    ├── import ServerComponentB  → 仍是 Server Component
    │
    └── import ClientComponent   →  **边界切断**
            │
            ├── import ChildClient  → 客户端组件（传播）
            └── import ServerUtil   → ❌ 错误：客户端不可引入服务端模块
```

**关键原则**：
- **仅在需要交互/状态/浏览器 API 时**加 `"use client"`
- 服务端组件可引入客户端组件（作为 children/props 传递）
- 客户端组件**不可**引入服务端组件（会报错）

## 3. 数据获取模式对比

### 3.1 传统 Client Component（CSR/SSR 混合）

```tsx
// ❌ 客户端组件：瀑布流、需 useEffect、水合开销
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`/api/users/${userId}`).then(r => r.json()).then(setUser);
    fetch(`/api/users/${userId}/posts`).then(r => r.json()).then(setPosts);
  }, [userId]);

  if (!user) return <Skeleton />;
  return <div>{user.name} 的 {posts.length} 篇文章</div>;
}
```

### 3.2 Server Component（并行、零包、直连 DB）

```tsx
// ✅ 服务端组件：并行获取、无水合、直连数据库
async function UserProfile({ userId }) {
  // 并行执行，无需 Promise.all 显式写（React 自动优化）
  const user = await db.user.findUnique({ where: { id: userId } });
  const posts = await db.post.findMany({ where: { authorId: userId } });

  return <div>{user.name} 的 {posts.length} 篇文章</div>;
}
```

### 3.3 Suspense 流式渲染

```tsx
// app/page.tsx (Server Component)
import { Suspense } from 'react';
import { UserHeader } from './UserHeader';
import { UserPosts } from './UserPosts';

export default function Page({ params: { userId } }) {
  return (
    <section>
      {/* Header 快，先流出 */}
      <UserHeader userId={userId} />

      {/* Posts 慢，流式等待 */}
      <Suspense fallback={<PostsSkeleton />}>
        <UserPosts userId={userId} />
      </Suspense>
    </section>
  );
}

// app/UserPosts.tsx (Server Component)
async function UserPosts({ userId }) {
  const posts = await fetchPosts(userId); // 可能耗时 500ms
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}
```

**流式响应时间线**：
```
T+0ms    HTTP 200 + Transfer-Encoding: chunked
T+50ms   <header>用户名</header> 到达浏览器，渲染可见
T+300ms  <ul><li>文章1</li>...</ul> 到达，替换 Skeleton
T+300ms  流结束，页面完全交互就绪
```

## 4. 序列化协议：React Flight

### 4.1 什么是 Flight

Flight 是 RSC 的**序列化格式**，将服务端组件树编码为流式 JSON，浏览器端反序列化为 Client Component 树。

### 4.2 简化示例

```json
// 服务端生成的 Flight 流（简化）
[
  ["$", "html", null, {"startTag": "<div>"}],
  ["$", "div", null, {"children": [
    ["$", "h1", null, {"children": "Hello RSC"}],
    ["$", "$L1", null, {"clientModule": "./InteractiveButton.client.js", "props": {"label": "Click me"}}]
  ]}],
  ["$", "html", null, {"endTag": "</div>"}]
]
```

- `$L1` = Client Component 引用标记
- `clientModule` = 客户端加载的模块路径
- **仅传递 Props 数据**，组件代码由客户端按需加载

### 4.3 可序列化 Props 限制

```tsx
// ✅ 允许：原始值、纯对象、数组、Date、Promise、React Element
<ClientComponent
  name="Alice"
  count={42}
  items={['a', 'b']}
  meta={{ createdAt: new Date() }}
  promise={fetchData()}
  children={<ServerOnlyComponent />}
/>

// ❌ 禁止：类实例、函数、Symbol、DOM 节点、WeakMap、循环引用
<ClientComponent
  handler={() => {}}           // 函数不序列化
  ref={someRef}                // Ref 不序列化
  classInstance={new Foo()}    // 类实例不序列化
/>
```

**解决方案**：函数改用 Server Actions、Ref 仅在客户端创建、类实例转纯数据。

## 5. Server Actions：表单与突变的新范式

### 5.1 定义 Server Action

```tsx
// app/actions.ts
'use server';  // 文件级：所有导出函数都是 Server Action

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  // 直接操作数据库，无需 API 路由
  await db.post.create({ data: { title, content } });

  // 失效缓存、重定向
  revalidatePath('/posts');
  redirect('/posts');
}
```

### 5.2 表单直接绑定

```tsx
// app/posts/new/page.tsx (Server Component)
import { createPost } from '@/actions';

export default function NewPostPage() {
  return (
    <form action={createPost}>  {/* 原生 form action 绑定 async 函数 */}
      <input name="title" required placeholder="标题" />
      <textarea name="content" required placeholder="内容" />
      <button type="submit">发布</button>
    </form>
  );
}
```

### 5.3 客户端调用 Server Action

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
        {isPending ? '发布中...' : '发布'}
      </button>
      {state.error && <p className="error">{state.error}</p>}
    </form>
  );
}
```

## 6. 缓存与再验证

### 6.1 默认缓存行为

| 数据源 | 默认缓存 | 控制方式 |
|--------|----------|----------|
| `fetch()` (GET) | **强缓存**（`force-cache`） | `fetch(url, { cache: 'no-store' })` |
| 数据库查询 | **无缓存**（每次请求执行） | 手动 `unstable_cache` |
| Server Action | **不缓存**（POST 语义） | N/A |

### 6.2 手动缓存与标签失效

```tsx
// 缓存数据库查询结果
import { unstable_cache } from 'next/cache';

const getUser = unstable_cache(
  async (id) => db.user.findUnique({ where: { id } }),
  ['user'],  // 缓存键标签
  { revalidate: 3600, tags: ['user'] }  // 1 小时 + 标签失效
);

// Server Action 中失效
export async function updateUser(formData) {
  await db.user.update({ where: { id: formData.get('id') }, data: { name: formData.get('name') } });
  revalidateTag('user');  // 精确失效所有带 'user' 标签的缓存
}
```

## 7. 与 Next.js App Router 的集成

### 7.1 目录结构约定

```
app/
├── layout.tsx          # Server Component（根布局）
├── page.tsx            # Server Component（路由入口）
├── loading.tsx         # Suspense fallback（流式加载 UI）
├── error.tsx           # Error Boundary（服务端错误 UI）
├── not-found.tsx       # 404 UI
├── (auth)/             # 路由组（不影响 URL）
│   ├── login/
│   └── register/
├── posts/
│   ├── [id]/
│   │   ├── page.tsx    # Server Component
│   │   └── actions.ts  # Server Actions
│   └── page.tsx
└── components/
    ├── ui/             # 纯 UI，无 "use client" → Server Component
    └── interactive/    # 需交互 → "use client"
```

### 7.2 渲染策略对照

| 路由段 | 默认渲染 | 可选配置 |
|--------|----------|----------|
| `page.tsx` | **静态生成 (SSG)** | `export const dynamic = 'force-dynamic'` (SSR) |
| `layout.tsx` | 静态 | 同 page |
| `loading.tsx` | 流式 SSR | N/A |
| API Route (`route.ts`) | 边缘/Node 函数 | `export const runtime = 'edge'` |

## 8. 常见陷阱与最佳实践

### 8.1 陷阱：在 Server Component 中使用 `useState`

```tsx
// ❌ 报错：Server Component 不支持 Hooks
async function Counter() {
  const [count, setCount] = useState(0); // Error
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

**修正**：拆分为 Client Component
```tsx
// Counter.client.tsx
'use client';
export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}

// Page.tsx (Server Component)
import { Counter } from './Counter.client';
export default function Page() {
  return <Counter />; // 作为 children 传递，无序列化问题
}
```

### 8.2 陷阱：客户端组件引入服务端工具

```tsx
// ❌ ClientComponent.tsx
'use client';
import { db } from '@/lib/db'; // db 只能在服务端运行
export function Widget() { ... }
```

**修正**：通过 Server Action 或 Props 传递数据
```tsx
// ServerComponent.tsx
import { Widget } from './Widget.client';
import { getData } from '@/lib/db';

export async function Page() {
  const data = await getData(); // 服务端获取
  return <Widget initialData={data} />; // 通过 Props 传给客户端
}
```

### 8.3 最佳实践清单

| 场景 | 推荐做法 |
|------|----------|
| **页面骨架** | Server Component（默认） |
| **交互组件** (按钮、表单、图表) | `"use client"` 单独文件 |
| **数据获取** | Server Component 直接 `await` |
| **表单提交** | Server Action + `<form action>` |
| **乐观更新** | `useOptimistic` + Server Action |
| **认证状态** | Server Component 读 Cookie/Session，传给 Client |
| **主题/本地状态** | Client Component `useState` / Context |
| **第三方库** (chart.js 等) | 包裹在 Client Component |

## 9. 迁移策略：渐进式采用 RSC

### 9.1 现有项目迁移路径

```
现有 CRA/Vite SPA (全客户端)
    │
    ▼ 1. 接入 Next.js / Remix / RSC 框架
Next.js Pages Router (getServerSideProps)
    │
    ▼ 2. 逐页迁移到 App Router
App Router 混合：部分页面 Server Component
    │
    ▼ 3. 数据层下沉
移除 API Routes，Server Component 直连 DB
    │
    ▼ 4. 表单现代化
form action + Server Actions 替代 fetch
    │
    ▼ 5. 组件库拆分
UI 原语 → Server Component
交互组件 → "use client" 独立包
```

### 9.2 共存期策略

| 共存模式 | 适用场景 | 代价 |
|----------|----------|------|
| **页面级** | 低风险页面先迁移 | 路由跳转有水合闪烁 |
| **组件级** | 复杂页面局部 RSC | 边界管理心智负担 |
| **数据级** | 保留 API，Server Component 调用 | 网络跳数未减少 |

## 10. 性能基准参考（Next.js 14+ App Router）

| 指标 | 传统 CSR | SSR + Hydration | RSC (流式) |
|------|----------|-----------------|------------|
| **TTFB** | ~50ms | ~200ms (服务端渲染) | **~100ms** (流式首块) |
| **FCP** | ~800ms | ~400ms | **~200ms** |
| **TTI** | ~1200ms | ~800ms (水合阻塞) | **~400ms** (无水合) |
| **JS 体积** | 200-500KB | 150-400KB | **50-150KB** (仅交互岛屿) |
| **数据获取瀑布** | 客户端串行 | 服务端串行 | **服务端并行 + 流式** |

## 11. 相关资源

- [React Server Components RFC](https://github.com/reactjs/rfcs/pull/227)
- [Next.js App Router 文档](https://nextjs.org/docs/app)
- [React Flight 协议规范](https://github.com/reactjs/rfcs/blob/main/text/0022-server-components.md)
- [Server Actions 深度指南](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)
- [RSC 迁移案例：Cal.com](https://cal.com/blog/migrating-to-react-server-components)