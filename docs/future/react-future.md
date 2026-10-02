# React 未来架构展望

基于 React 核心团队 RFC、Canary 版本与公开路线图，梳理未来 1-2 年的重大架构演进方向。

## 1. React Compiler (React Forget) —— 编译时自动优化

### 1.1 核心目标

```tsx
// 开发者写法（无需 memo/useMemo/useCallback）
function UserList({ users, filter }) {
  const filtered = users.filter(u => u.name.includes(filter));
  return <ul>{filtered.map(u => <UserItem key={u.id} user={u} />)}</ul>;
}

function UserItem({ user }) {
  return <li onClick={() => navigate(`/user/${user.id}`)}>{user.name}</li>;
}
```

编译器自动：
- 组件级 `React.memo`（Props 浅比较）
- 事件处理器稳定化（内联箭头函数 → 稳定引用）
- 派生计算缓存（`users.filter` → `useMemo` 等价）

### 1.2 编译原理

```
源码 AST
    │
    ▼
忘却分析：依赖图构建（哪些值随哪些 Props/State 变化）
    │
    ▼
记忆化注入：在 JSX 创建点插入 `_c` (cache) 槽位
    │
    ▼
输出：带有 useMemo/useCallback 等价逻辑的代码，零运行时开销
```

### 1.3 现状与时间线

| 阶段 | 版本 | 状态 | 备注 |
|------|------|------|------|
| 实验性 | Canary | 可通过 `babel-plugin-react-compiler` 试用 | 需配合 ESLint 规则 |
| 稳定发布 | 19.x / 20.x | 计划中 | 默认开启，可通过 `"react-compiler": false` 关闭 |
| 完全成熟 | 20+ | 规划中 | 支持更复杂的控制流、库代码优化 |

### 1.4 迁移准备

- **现在**：启用 `eslint-plugin-react-compiler` 检查违规模式（副作用渲染、突变 Props）
- **升级时**：删除手写 `memo`/`useMemo`/`useCallback`，观察性能基线
- **注意**：编译器**不优化**库代码、`forwardRef` 组件、动态 `import()` 组件

## 2. Server Components 标准化 —— RSC 规范化

### 2.1 现状回顾

- Next.js App Router 率先落地 RSC（`app/` 目录默认 Server Component）
- Remix v2、RedwoodJS、Waku 等框架跟进
- **问题**：各框架序列化协议、Client/Server 边界 API 不完全一致

### 2.2 标准化方向（RFC #227 / #271）

```tsx
// 统一的边界标记（提议）
'use client';  // 文件级指令：此文件及引用链在客户端渲染
'use server';  // 函数级指令：Server Action，表单直连

// 统一的序列化格式（React Flight）
{
  "type": "ClientComponent",
  "key": null,
  "props": { "children": [/* ... */] },
  "module": "app/components/InteractiveChart.client.js"
}
```

### 2.3 对开发者的影响

| 变化 | 现状 | 标准化后 |
|------|------|----------|
| 跨框架迁移 | 高成本（协议不通） | 低成本（统一 Flight 协议） |
| 库作者适配 | 针对 Next.js/Remix 分别适配 | 单一标准，`"react-server": "export"` |
| 类型安全 | 框架特定类型工具 | 统一 `@types/react-server` |

## 3. Offscreen API —— 离屏预渲染与隐藏保活

### 3.1 解决的问题

| 场景 | 现有方案痛点 | Offscreen 方案 |
|------|--------------|----------------|
| 标签页切换保持状态 | `display: none` 触发卸载/重装 | `<Offscreen mode="hidden">` 保留 Fiber 树 |
| 悬停预加载详情页 | 提前 `import()` 但不渲染，首次交互仍有延迟 | `<Offscreen mode="prerender">` 后台完成渲染 |
| 虚拟列表缓冲区 | 手动管理 DOM 回收 | 原生支持离屏实例池 |

### 3.2 API 设计（实验性）

```tsx
import { Offscreen } from 'react/offscreen';

function TabPanel({ activeTab, children }) {
  return (
    <Offscreen mode={activeTab ? 'visible' : 'hidden'}>
      {children}
    </Offscreen>
  );
}

// 预渲染模式（配合 Suspense）
<Offscreen mode="prerender" fallback={<Spinner />}>
  <HeavyComponent />
</Offscreen>
```

### 3.3 生命周期语义

| 模式 | 挂载 | 卸载 | 状态保留 | 渲染成本 |
|------|------|------|----------|----------|
| `visible` | 正常 | 正常 | 正常 | 正常 |
| `hidden` | 正常 | **不卸载**（detach） | **完全保留** | 首次正常，后续零成本切换 |
| `prerender` | 后台渲染 | 切可见时 activate | 保留 | 后台分摊，切换近零延迟 |

## 4. 资源预加载与优先级调度增强

### 4.1 `preload` / `preinit` API

```tsx
import { preloadModule, preinitModule } from 'react-dom';

function App() {
  // 路由级预加载（鼠标悬停 Link 时触发）
  function handleLinkHover() {
    preloadModule('/lazy/HeavyPage');
    preinitModule('/lazy/HeavyPage'); // 并行编译
  }

  return <Link onMouseEnter={handleLinkHover} href="/heavy">进入</Link>;
}
```

### 4.2 优先级继承与 `useOptimistic` 深度集成

```tsx
// 未来：优先级自动传播
function Parent() {
  const [text, setText] = useState('');
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      {/* 子组件自动继承低优，无需显式 startTransition */}
      <ExpensiveList filter={text} />
    </>
  );
}
```

## 5. 迁移策略建议

### 5.1 短期（React 19 发布后 6 个月内）

| 行动 | 理由 |
|------|------|
| 升级 React 19，启用 `createRoot` | 并发特性基础设施就绪 |
| 试用 `babel-plugin-react-compiler`（非生产） | 评估自动优化覆盖率，清理违规模式 |
| 逐步引入 `useOptimistic`/`useActionState` | 表单交互体验提升明显，风险低 |
| 关注框架 RSC 标准化进展 | 选型时评估锁定风险 |

### 5.2 中期（12-18 个月）

| 行动 | 理由 |
|------|------|
| 生产开启 React Compiler | 删除大量手写优化代码，减少维护负担 |
| 采用标准化 RSC（框架升级后） | 跨框架复用组件库，降低迁移成本 |
| 试用 Offscreen 解决标签页/抽屉保活 | 替代手写 `display:none` + 状态保持方案 |

### 5.3 长期（18+ 个月）

| 方向 | 潜在收益 |
|------|----------|
| 编译时 CSS-in-JS（配合 Compiler） | 零运行时样式方案 |
| 细粒度响应式（Signals 集成） | 替代部分 `useState`，更精确的更新 |
| WASM 版本 React Reconciler | 离主线程渲染，彻底解决大树阻塞 |

## 6. 风险与应对

| 风险 | 影响 | 应对 |
|------|------|------|
| Compiler 误优化（副作用组件被 memo） | 生产 bug | 严格启用 ESLint 规则、分阶段灰度、保留人工 `memo` 兜底 |
| RSC 标准化延迟/分裂 | 框架锁定 | 核心业务逻辑与框架解耦，保持纯 React 组件库可移植 |
| Offscreen API 变更 | 早期采用者迁移成本 | 仅在非核心场景试用，封装适配层 |

## 相关资源

- [React Compiler RFC](https://github.com/reactjs/rfcs/pull/299)
- [Server Components RFC](https://github.com/reactjs/rfcs/pull/227)
- [Offscreen API 探索](https://github.com/reactjs/rfcs/pull/309)
- [React Conf 2024 回顾](https://conf.react.dev/)