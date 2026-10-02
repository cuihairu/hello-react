# React Concurrent Mode 深度解析

Concurrent Mode（并发模式）是 React 18 引入的核心架构升级，使渲染可中断、可优先级调度，从根本上改变了更新的处理方式。

## 1. 为什么需要并发模式

传统同步渲染（Stack Reconciler / 早期 Fiber）存在两大痛点：

| 场景 | 同步渲染表现 | 并发模式表现 |
|------|--------------|--------------|
| 大列表首屏渲染 | 主线程阻塞 200ms+，交互无响应 | 切片渲染，高优先级交互插队 |
| 打字时联想搜索 | 每次键入触发完整重渲染，掉帧 | `startTransition` 标记低优，打字优先 |
| 代码分割加载 | `Suspense` 回退全屏 loading | 细粒度 `Suspense` 边界，局部骨架屏 |

**核心矛盾**：CPU 时间片有限，渲染工作不可预测，高优交互（点击、输入）不能被低优工作（列表渲染、数据获取）阻塞。

## 2. 并发渲染的三大支柱

### 2.1 优先级车道 —— `lanes` / `LanePriority`

```js
// 简化版优先级层级（react-reconciler/src/ReactPriorityLevels.js）
export const SyncLane = 1;           // 同步：点击、输入、setState(默认)
export const InputContinuousLane = 4; // 连续输入：拖拽、滚动
export const DefaultLane = 16;        // 默认：数据获取、列表渲染
export const TransitionLane = 64;     // 过渡：startTransition 标记
export const IdleLane = 1024;         // 空闲：预加载、离屏预渲染
```

- **车道不是单一优先级**，而是位掩码，支持批量操作与子集判断
- `Scheduler` 根据车道决定下一个工作单元

### 2.2 时间切片 —— `workLoopAsync`

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

- `shouldYield()` 判断是否归还主线程：高优任务到来或输入待处理
- 低优工作（Transition/Idle）频繁让步，高优工作（Sync）不让步

### 2.3 双缓冲树 —— `current` ↔ `workInProgress`

```
current (已提交)          workInProgress (构建中)
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

- 更新在 `workInProgress` 树上构建，完成后原子切换 `current = workInProgress`
- 中断时丢弃 `workInProgress`，不污染已提交 UI

## 3. 关键 API 与使用模式

### 3.1 `useTransition` —— 标记非阻塞更新

```tsx
function SearchResults({ query }) {
  const [isPending, startTransition] = useTransition();
  const [inputValue, setInputValue] = useState(query);

  function handleChange(e) {
    const value = e.target.value;
    setInputValue(value);                    // 高优：输入框即时响应
    startTransition(() => {                  // 低优：结果列表可延后
      setQuery(value);                       // 触发昂贵的过滤/渲染
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

- `isPending` 告知 UI 是否有低优工作进行中，显示骨架屏而非阻塞输入
- **不阻塞当前渲染**，只调度新工作

### 3.2 `useDeferredValue` —— 推迟值的读取

```tsx
function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query); // 低优读取
  const items = useMemo(() => expensiveFilter(list, deferredQuery), [deferredQuery]);
  return <List items={items} />;
}
```

- 等价于 `startTransition` 但用于**派生值**而非状态更新
- `deferredQuery` 滞后于 `query`，渲染可复用上一帧结果

### 3.3 `Suspense` + 数据获取

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
  const posts = await fetchPosts(userId); // 抛出 Promise，触发 Suspense
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}
```

- **数据获取即组件渲染**，无需 `useEffect` + `useState` 样板
- 嵌套 `Suspense` 实现流式渐进渲染：Header 先出，Posts 后出

### 3.4 `flushSync` —— 强制同步刷新

```tsx
function handleClick() {
  flushSync(() => {
    setCount(c => c + 1); // 同步执行，DOM 立即更新
  });
  // 此时 DOM 已反映新状态，可安全测量尺寸、聚焦
  inputRef.current.focus();
}
```

- 仅用于**必须同步**的场景（测量、聚焦、第三方库集成）
- 滥用会破坏并发优势，退化为同步渲染

## 4. 并发模式下的生命周期变化

| 生命周期 / Hook | 同步模式 | 并发模式 | 注意事项 |
|-----------------|----------|----------|----------|
| `useEffect` | 渲染后异步执行 | 同（但可能被中断重跑） | 清理函数必须幂等 |
| `useLayoutEffect` | 同步布局后执行 | 同步，但**可能延迟到提交前** | 避免重度计算，改 `useEffect` |
| `componentDidMount` | 挂载后 | 同 | Class 组件无并发感知 |
| `getDerivedStateFromError` | 错误边界 | 同 | 不受并发影响 |

**严格模式双重调用**（开发环境）模拟并发中断：
- `useState` 初始化函数执行 2 次
- `useEffect` 挂载→卸载→重新挂载
- 组件函数体执行 2 次
- **目的**：暴露副作用不纯、状态依赖渲染次数的 bug

## 5. 性能调优检查清单

```tsx
// 错误示范：每次渲染创建新函数/对象，破坏 memo
<Child onClick={() => doSomething(id)} style={{ color: 'red' }} />

// 正确写法：稳定引用
const handleClick = useCallback(() => doSomething(id), [id]);
const style = useMemo(() => ({ color: 'red' }), []);
<Child onClick={handleClick} style={style} />
```

| 优化手段 | 适用场景 | 成本 |
|----------|----------|------|
| `React.memo` | 纯展示组件、Props 浅比较通过 | 微小 |
| `useMemo` / `useCallback` | 昂贵计算、稳定回调传给 memo 子组件 | 依赖数组维护 |
| `useTransition` | 状态更新导致大量子树重渲染 | 需配合 `isPending` UI |
| 虚拟列表 (`react-window`) | 千级以上列表 | 引入依赖 |
| 代码分割 + `Suspense` | 首屏非关键模块 | 路由/组件粒度设计 |

## 6. 迁移路线图

```
React 17 同步渲染
    │
    ▼ 启用 createRoot（自动开启并发特性）
React 18 并发特性可用
    │
    ├─► 逐步替换 setState 为 startTransition（输入、筛选、切页）
    ├─► 数据获取迁移到 Suspense + async/await（配合框架/库）
    ├─► 移除冗余 useEffect 数据获取，改用 Server Components（Next.js）或 SWR/TanStack Query
    └─► 严格模式清理副作用不纯问题
    │
    ▼
React 19+ use/useOptimistic/useActionState 进一步简化模式
```

## 7. 常见误区澄清

| 误区 | 事实 |
|------|------|
| "并发模式让渲染变快" | 总工作量不变，**感知更快**（高优先级不被阻塞） |
| "必须用 `useTransition` 所有 setState" | 仅用于**可延迟**的更新；点击、表单提交保持同步 |
| "`Suspense` 只能用于代码分割" | React 18+ 支持**数据获取 Suspense**（需框架/库配合） |
| "并发模式破坏 `useLayoutEffect`" | `useLayoutEffect` 仍同步执行，但调度时机微调，**不破坏语义** |

## 相关资源

- [React 18 发布：并发特性](https://react.dev/blog/2022/03/29/react-v18)
- [深入 React Fiber 与并发调度](https://github.com/acdlite/rfcs/blob/main/text/0008-concurrent-mode.md)
- [useTransition 与 useDeferredValue 实战](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-keys)