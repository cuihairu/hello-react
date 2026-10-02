# React 新特性速览

基于 React 19 RC 与 Canary 通道的最新特性汇总，帮助你评估升级收益与迁移成本。

## 1. `use` —— 在组件中读取 Promise/Context

```tsx
import { use } from 'react';

function Comments({ promise }: { promise: Promise<Comment[]> }) {
  const comments = use(promise); // 暂停渲染直到 resolve
  return <ul>{comments.map(c => <li key={c.id}>{c.text}</li>)}</ul>;
}
```

- 可在组件体、循环、条件分支中调用（不受 Hook 规则限制）
- 读取 Promise 时会抛出并触发最近的 `<Suspense>` 边界
- 读取 Context 等价于 `useContext`，但可在任意位置使用

## 2. `useOptimistic` —— 乐观更新

```tsx
function LikeButton({ initialLikes }: { initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes);
  const [optimisticLikes, addOptimistic] = useOptimistic(likes, (curr, delta) => curr + delta);

  return (
    <button onClick={() => { addOptimistic(1); api.like().then(() => setLikes(l => l + 1)); }}>
      ❤️ {optimisticLikes}
    </button>
  );
}
```

- 立即反映 UI 变化，后台请求失败自动回滚
- 适用于点赞、收藏、表单提交等高频交互

## 3. `useActionState` / `useFormStatus` —— 表单 Action

```tsx
function SearchForm() {
  const [state, formAction] = useActionState(async (prev, formData) => {
    const res = await fetch('/api/search', { method: 'POST', body: formData });
    return res.json();
  }, { results: [] });

  return (
    <form action={formAction}>
      <input name="q" />
      <button type="submit">搜索</button>
      {state.results.map(r => <div key={r.id}>{r.title}</div>)}
    </form>
  );
}
```

- `<form action={asyncFn}>` 原生表单提交，无需手动 `preventDefault`
- `useFormStatus` 在子组件中读取 `pending`/`data`/`method`/`action`
- 配合 `useOptimistic` 实现无感刷新

## 4. 表单 Action 与 `<form>` 增强

```tsx
export default function Page() {
  return (
    <form action={async (formData) => {
      'use server';
      await db.post.create({ title: formData.get('title') });
      redirect('/posts');
    }}>
      <input name="title" required />
      <button type="submit">发布</button>
    </form>
  );
}
```

- Server Action：在 Server Component 中定义，客户端表单直连服务端
- `redirect`、`revalidatePath`、`cookies` 等服务端工具可用
- 逐步替代 `onSubmit` + `fetch` 手写模式

## 5. 文档元数据 `<head>` 支持

```tsx
import { Title, Meta, Link } from 'react';

export default function Article({ slug }) {
  return (
    <article>
      <Title>文章标题 - Hello React</Title>
      <Meta name="description" content="文章摘要..." />
      <Meta property="og:image" content="/cover.png" />
      <Link rel="canonical" href={`/articles/${slug}`} />
      {/* 正文 */}
    </article>
  );
}
```

- 在组件树任意位置声明，渲染时自动提升到 `<head>`
- 替代 `react-helmet` 等第三方库，零运行时开销

## 6. `useId` 稳定化与 SSR 一致性

```tsx
function FormField() {
  const id = useId(); // :r0:、:r1:... 服务端客户端一致
  return (
    <label htmlFor={id}>邮箱</label>
    <input id={id} type="email" />
  );
}
```

- 解决 hydration mismatch，无需手写 `id` 生成逻辑

## 7. `forwardRef` 简化（实验性）

```tsx
// 旧写法
const Input = forwardRef((props, ref) => <input {...props} ref={ref} />);

// 新写法（需启用 experimental）
function Input(props, ref) {
  return <input {...props} ref={ref} />;
}
Input.displayName = 'Input';
```

- 函数组件直接接收 `ref` 作为第二参数，无需 `forwardRef` 包装

## 迁移建议

| 特性 | 稳定版本 | 迁移优先级 | 备注 |
|------|----------|------------|------|
| `use` | 19 | 高 | 替代 Suspense + useEffect 数据获取模式 |
| `useOptimistic` | 19 | 高 | 显著提升交互感知速度 |
| `useActionState` | 19 | 中 | 表单重构配合 Server Action 收益最大 |
| 文档元数据 | 19 | 低 | 可渐进式替换 helmet |
| `forwardRef` 简化 | 实验 | 低 | 等稳定后再统一重构 |

## 相关资源

- [React 19 RC 发布日志](https://react.dev/blog/2024/12/05/react-19)
- [RFC: use Hook](https://github.com/reactjs/rfcs/pull/229)
- [RFC: Server Actions](https://github.com/reactjs/rfcs/pull/271)