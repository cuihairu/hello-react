# 第七部分：React API 参考

本部分提供 React 核心与扩展 API 的系统性参考，适合查阅与速查。

## 章节概览

### 第20章：React 核心 API 参考
- [React 核心概念与 API 概述](react-overview.md) —— 组件化、JSX、虚拟 DOM 等核心概念与主要 API 一览
- [JSX 语法与 JSX 相关 API](jsx-api.md) —— createElement、cloneElement、createContext、forwardRef、Fragment
- [组件相关 API：React.Component、PureComponent](component-api.md) —— 类组件基类、浅比较优化、用法对比
- [生命周期方法：componentDidMount、shouldComponentUpdate 等](lifecycle-methods.md) —— 挂载/更新/卸载阶段、错误边界、getDerivedStateFromProps
- [State 与 Props API](state-props.md) —— this.state、setState、forceUpdate、defaultProps、propTypes
- [ReactDOM 与渲染相关 API](reactdom-api.md) —— createRoot、render、hydrate、flushSync、findDOMNode、createPortal
- [Hooks API：useState、useEffect、useContext、useReducer 等](hooks-api.md) —— 常用 Hooks 的定义、用法与示例
- [Context API 与相关用法](context-api.md) —— createContext、Provider、useContext、默认值与性能优化
- [Refs 与 DOM 交互 API](refs-api.md) —— createRef、useRef、forwardRef、callback ref、最佳实践
- [Portals 与 Profiler API](portals-profiler-api.md) —— createPortal、Profiler、onRender 回调参数
- [错误边界相关 API](error-boundaries-api.md) —— componentDidCatch、getDerivedStateFromError、限制场景

### 第21章：React 扩展 API
- [React 的高阶函数与模式](react-hoc-patterns.md) —— HOC、Render Props、Context、lazy/Suspense、错误边界、memo
- [其他常用的辅助 API](other-apis.md) —— Fragment、StrictMode、createRef、forwardRef、Profiler、batchedUpdates

## 使用建议

- **开发时查阅**：配合 IDE 类型提示使用，本文档补充官方文档未覆盖的细节与陷阱
- **版本对照**：正文以 React 18 为准，各页附「React 18 → 19 版本对照」表，列出版本变化与替代方案
- **源码对照**：每个 API 条目关联「第五部分：源码解析」对应章节，便于深入理解实现

## React 19 速查

React 19 移除与弃用的 API 汇总如下，各页的「React 18 → 19 版本对照」节有逐条说明。

**已移除**

| 已移除 | 替代 |
| --- | --- |
| `ReactDOM.render` | `createRoot` + `root.render()` |
| `ReactDOM.hydrate` | `hydrateRoot` |
| `ReactDOM.unmountComponentAtNode` | `root.unmount()` |
| `ReactDOM.findDOMNode` | ref |
| `react-dom/test-utils` 的 `act` | `React.act` |
| `React.createFactory` | JSX |
| 字符串 ref | 回调 ref |
| 遗留 Context（`contextTypes` / `getChildContext`） | `createContext` |
| 模块工厂模式 | 普通函数返回 JSX |
| 函数组件上的 `defaultProps` | ES6 默认参数 |
| `propTypes`（被静默忽略） | TypeScript 等类型方案 |
| UMD 构建 | ESM |

**新弃用**

| 已弃用 | 替代 |
| --- | --- |
| `element.ref` | `element.props.ref` |
| `React.forwardRef` | `ref` 直接作为普通 prop |
| `<Context.Provider>` | `<Context>` |
| `react-test-renderer` | `@testing-library/react` |

依据：[React 19 升级指南](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)。