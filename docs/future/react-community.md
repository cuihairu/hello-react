# React 社区与生态演进

跟踪 React 核心团队决策流程、主流库适配进度与迁移工具链，帮助团队制定技术跟进策略。

## 1. RFC 流程：特性从提案到落地的标准路径

### 1.1 RFC 生命周期

```
Idea (Issue/Discord) → RFC PR (github.com/reactjs/rfcs)
    │
    ├─► 探索期：讨论设计、替代方案、破坏性变更评估
    │
    ├─► 实现期：核心团队/社区在 Canary 分支实现
    │       ├─► 实验性标记（需 `experimental_` 前缀或配置开启）
    │       └─► 文档同步更新（react.dev/canary）
    │
    ├─► 稳定期：Canary → Stable 发布通道
    │       ├─► 移除实验性标记
    │       └─► 语义版本：次版本号（Minor）发布
    │
    └─► 弃用期：废弃旧 API
            ├─► 弃用警告（开发环境控制台）
            ├─► 文档标注替代方案
            └─► 主版本号（Major）移除
```

### 1.2 关键 RFC 状态追踪（2024-2025）

| RFC | 标题 | 状态 | 预计稳定版本 | 关注点 |
|-----|------|------|--------------|--------|
| #229 | `use` Hook | **已合并** | 19 | 数据获取模式重构 |
| #271 | Server Actions | **已合并** | 19 | 表单/突变新范式 |
| #299 | React Compiler | **实现中** | 19.x/20 | 自动优化、迁移成本 |
| #309 | Offscreen API | **讨论中** | 20+ | 离屏预渲染、标签页保活 |
| #315 | Signals 集成 | **探索中** | 未定 | 细粒度响应式、替代部分 useState |
| #320 | View Transitions API | **提案中** | 19+ | 页面转场动画原生支持 |

### 1.3 如何参与

- **观察**：Watch `github.com/reactjs/rfcs`，关注 `Status: Accepted` 标签
- **反馈**：在 RFC PR 中留言生产场景痛点、边界用例
- **试用**：Canary 版本（`npm install react@canary react-dom@canary`）提前验证
- **贡献**：实现 Polyfill、编写 Codemod、补充文档翻译

## 2. 核心团队路线图（公开信息汇总）

### 2.1 近期重点（2024 H2 - 2025 H1）

| 领域 | 目标 | 进度指标 |
|------|------|----------|
| **Compiler** | 生产就绪、默认开启 | Canary 可用、ESLint 规则完善、主流框架集成 |
| **Server Components** | 标准化协议、跨框架互操作 | Flight 规范定稿、Next.js/Remix/Waku 对齐 |
| **并发生态** | Suspense 数据获取库生态成熟 | TanStack Query v5、SWR 3、Apollo Client 支持 RSC |
| **开发体验** | 更好的错误堆栈、调试工具 | React DevTools v5、控制台链接源码、错误码文档 |

### 2.2 中期愿景（2025-2026）

- **零配置优化**：Compiler + 自动代码分割 + 预加载 = 无需手调性能
- **统一数据层**：Server Components + Client Cache（类似 Relay/Apollo 但内置）
- **原生动画**：View Transitions + Layout Animations 无需 Framer Motion 等重库
- **边缘计算原生**：Edge Runtime 标准化、流式 SSR 无冷启动

## 3. 主流库适配进度表（2024-10 截面）

### 3.1 路由

| 库 | React 18 并发 | React 19 / RSC | 迁移指南 |
|----|---------------|----------------|----------|
| **React Router v7** | ✅ 完整支持 | 🚧 v7 beta 支持 RSC | [迁移指南](https://reactrouter.com/start/declarative/routing) |
| **TanStack Router** | ✅ 类型安全优先 | ✅ 完整 RSC 支持 | [文档](https://tanstack.com/router) |
| **Wouter** | ✅ 轻量兼容 | 🚧 实验性 RSC | 极简场景可用 |

### 3.2 状态管理

| 库 | React 18 并发 | React 19 / RSC | 备注 |
|----|---------------|----------------|------|
| **Redux Toolkit** | ✅ `useSyncExternalStore` 兼容 | ✅ RSC 兼容（客户端边界） | 推荐配合 `createSlice` |
| **Zustand** | ✅ 原生并发安全 | ✅ RSC 兼容 | 无 Provider，天然适配 |
| **Jotai** | ✅ 原子级并发 | ✅ RSC 服务端原子 | 服务端可序列化 |
| **Recoil** | ⚠️ 维护模式 | ❌ 无 RSC 计划 | 建议迁移 Jotai/Zustand |
| **MobX** | ✅ `observer` 兼容 | 🚧 实验性 RSC | 需 `makeObservable` 配置 |

### 3.3 数据获取与缓存

| 库 | React 18 Suspense | React 19 RSC | 推荐度 |
|----|-------------------|--------------|--------|
| **TanStack Query v5** | ✅ 完整支持 | ✅ Server/Client 双模式 | ⭐⭐⭐⭐⭐ 首选 |
| **SWR 3** | ✅ 支持 | ✅ RSC 兼容 | ⭐⭐⭐⭐ 轻量替代 |
| **Apollo Client** | ✅ 支持 | 🚧 GraphQL RSC 实验 | GraphQL 必选 |
| **RTK Query** | ✅ 支持 | ✅ 兼容 | Redux 生态首选 |

### 3.4 UI 组件库

| 库 | React 18 | React 19 / RSC | 备注 |
|----|----------|----------------|------|
| **Radix UI / shadcn/ui** | ✅ 完美 | ✅ 无运行时依赖 | 无头组件首选 |
| **MUI (v6)** | ✅ 支持 | 🚧 逐步适配 | 重组件库场景 |
| **Ant Design (v5)** | ✅ 支持 | 🚧 适配中 | 企业级后台首选 |
| **Chakra UI** | ⚠️ v2 维护模式 | ❌ 无 RSC 计划 | 建议迁移 Panda CSS / shadcn |
| **Tailwind CSS** | ✅ 无关 | ✅ 无关 | 原子化 CSS 标准配置 |

### 3.5 测试工具

| 工具 | React 18 | React 19 | 备注 |
|------|----------|----------|------|
| **Vitest + RTL** | ✅ 推荐 | ✅ 推荐 | 现代首选组合 |
| **Jest + RTL** | ✅ 支持 | ✅ 支持 | 老项目维护 |
| **Playwright** | ✅ E2E 标准 | ✅ E2E 标准 | 必配 |
| **Storybook** | ✅ v8 支持 | ✅ v8 RSC 支持 | 组件文档驱动开发 |

## 4. 迁移工具链

### 4.1 官方 Codemods

```bash
# React 19 破坏性变更自动修复
npx @react/codemod@latest react-19-codemods .

# 典型修复：
# - createRoot 替代 render
# - useEffect 清理函数异步化
# - PropTypes 移除建议
# - UNSAFE_ 生命周期重命名
```

### 4.2 社区工具

| 工具 | 用途 | 适用阶段 |
|------|------|----------|
| `react-scan` | 运行时渲染性能可视化 | 开发调优 |
| `why-did-you-render` | 检测不必要重渲染 | 开发调优 |
| `babel-plugin-react-compiler` | 编译时自动优化 | 生产构建（实验） |
| `eslint-plugin-react-compiler` | 静态检查 Compiler 兼容性 | CI 阻断 |
| `next-codemod` | Next.js 版本间迁移 | 框架升级 |
| `typescript-eslint` + `eslint-plugin-react-hooks` | 类型+Hooks 规则 | 日常开发 |

### 4.3 升级清单模板

```markdown
# React 19 升级检查清单

## 依赖更新
- [ ] react@19 / react-dom@19
- [ ] @types/react@19 / @types/react-dom@19
- [ ] eslint-plugin-react-hooks@5（支持 19 新规则）
- [ ] typescript@5.5+（满足 19 类型要求）

## 破坏性变更
- [ ] 移除 `React.render` / `ReactDOM.render`，已迁移 `createRoot`
- [ ] 检查 `useEffect` 清理函数是否依赖同步执行顺序
- [ ] 移除 `componentWillMount` 等 UNSAFE_ 生命周期（若仍在用）
- [ ] `act()` 测试工具行为对齐（严格模式双重调用）

## 新特性采纳
- [ ] 评估 `use` 替代数据获取 useEffect
- [ ] 表单场景试用 `useActionState` + `<form action>`
- [ ] 乐观更新场景试用 `useOptimistic`
- [ ] 文档元数据迁移到 `<Title>` `<Meta>` 组件

## 构建与工具
- [ ] 尝试 `babel-plugin-react-compiler`（非阻断）
- [ ] 更新 CI Node 版本至 20/22 LTS
- [ ] 验证生产构建体积、首屏指标无回退

## 验收
- [ ] 单元/集成测试全绿
- [ ] E2E 核心流程通过
- [ ] Lighthouse 性能/无障碍/SEO 无回退
- [ ] 灰度 5% 流量 48h 无异常
```

## 5. 信息源订阅清单

| 来源 | 类型 | 频次 | 关注重点 |
|------|------|------|----------|
| [React 官方博客](https://react.dev/blog) | 官方发布 | 重大版本 | 发布日志、迁移指南、新特性演示 |
| [React RFCs](https://github.com/reactjs/rfcs) | 设计讨论 | 持续 | 提案状态、破坏性变更预警 |
| [React DevTools 更新](https://github.com/facebook/react-devtools) | 工具 | 月度 | 调试新功能、性能分析增强 |
| [Next.js 博客](https://nextjs.org/blog) | 框架标杆 | 月度 | RSC 落地实践、Compiler 集成 |
| [TanStack 博客](https://tanstack.com/blog) | 生态库 | 月度 | 数据获取、路由、表单最佳实践 |
| [Reactiflux Discord](https://discord.gg/reactiflux) | 社区即时 | 实时 | 疑难解答、早期反馈 |
| [This Week In React](https://thisweekinreact.com/) | 周刊 | 周度 | 生态动态聚合、文章精选 |

## 6. 团队跟进节奏建议

| 节奏 | 活动 | 产出 |
|------|------|------|
| **每周** | 浏览 This Week In React、关注 RFC 进展 | 记录需评估的新特性/破坏性变更 |
| **每月** | 团队技术分享 30min：某库新版本/新特性实战 | 决策：是否引入、试用计划 |
| **每季度** | 依赖大扫描：`npm outdated`、安全审计、废弃库替换 | 升级 PR、技术债清单 |
| **大版本发布时** | 启动升级清单、灰度发布、回滚预案 | 生产稳定升级 |

---

> **原则**：**跟进不等于追新**。每项新特性/库升级都要经过「收益评估 → 试用验证 → 灰度发布」三步走，核心业务优先稳定，边缘场景先试新。