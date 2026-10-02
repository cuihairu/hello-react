# 第七部分：React API 参考

本部分提供 React 核心与扩展 API 的系统性参考，适合查阅与速查。

## 章节概览

### 第20章：React 核心 API 参考
- [React 核心概念与 API 概述](react-overview.md) —— 导出成员分类、版本稳定性、弃用时间线
- [JSX 语法与 JSX 相关 API](jsx-api.md) —— createElement、cloneElement、isValidElement、Fragment
- [组件相关 API：React.Component、PureComponent](component-api.md) —— 生命周期方法、setState、forceUpdate、静态属性
- [生命周期方法：componentDidMount、shouldComponentUpdate 等](lifecycle-methods.md) —— 挂载/更新/卸载阶段、错误边界、UNSAFE_ 前缀
- [State 与 Props API](state-props.md) —— this.state、this.props、defaultProps、propTypes
- [ReactDOM 与渲染相关 API](reactdom-api.md) —— createRoot、hydrateRoot、render、unmountComponentAtNode、findDOMNode
- [Hooks API：useState、useEffect、useContext、useReducer 等](hooks-api.md) —— 基础/进阶/实验性 Hooks 完整签名与规则
- [Context API 与相关用法](context-api.md) —— createContext、Provider、Consumer、displayName、defaultValue
- [Refs 与 DOM 交互 API](refs-api.md) —— createRef、useRef、forwardRef、useImperativeHandle、callback ref
- [Portals 与 Profiler API](portals-profiler-api.md) —— createPortal、Profiler、onRender 回调参数
- [错误边界相关 API](error-boundaries-api.md) —— componentDidCatch、getDerivedStateFromError、resetKeys

### 第21章：React 扩展 API
- [React 的高阶函数与模式](react-hoc-patterns.md) —— memo、lazy、Suspense、startTransition、useDeferredValue、useId
- [其他常用的辅助 API](other-apis.md) —— Children、isValidElement、版本号、act（测试工具）

## 使用建议

- **开发时查阅**：配合 IDE 类型提示使用，本文档补充官方文档未覆盖的细节与陷阱
- **版本对照**：标注的 API 以 React 18 为准，弃用项标注替代方案
- **源码对照**：每个 API 条目关联「第五部分：源码解析」对应章节，便于深入理解实现