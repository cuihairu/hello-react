# 第四部分：编译系统与构建工具

本部分系统讲解前端构建工具链，从 Webpack 到 Vite，再到 Taro 多端开发，覆盖配置、优化与 CI/CD 集成。

## 章节概览

### 第11章：构建工具与自动化
- [前端构建工具概述：Webpack、Vite、Parcel](build-tools-overview.md) —— 架构差异、冷启动/热更新、插件生态、选型建议
- [Webpack 的配置与优化](webpack.md) —— Entry/Output/Module/Plugins/Resolve、代码分割、Tree Shaking、缓存策略
- [使用 Babel 转译 ES6+ 代码](babel.md) —— Preset/Plugin、Polyfill、Target、缓存、TypeScript 集成
- [自动化构建与 CI/CD 集成](automation-ci-cd.md) —— GitHub Actions/GitLab CI、制品上传、环境变量、部署策略
- [使用 Vite 提升开发效率](vite.md) —— 无包开发服务器、Rollup 生产构建、插件兼容、库模式

### 第12章：Taro 与多端开发
- [什么是 Taro：一套代码，多端适配](taro-intro.md) —— 编译时转换、运行时适配、小程序/H5/RN/QuickApp
- [Taro 项目的初始化与配置](taro-setup.md) —— CLI、模板、config/index.ts、环境变量、别名
- [在 Taro 中使用 React.js 进行小程序开发](taro-react.md) —— 组件映射、生命周期对应、JSX 受限、样式隔离
- [处理不同平台的兼容性问题](taro-compatibility.md) —— API 差异、条件编译、环境变量、原生组件嵌入
- [Taro 与小程序 API 的集成](taro-api.md) —— Taro.* 命名空间、Promise 风格、云开发、插件机制
- [Taro 项目的构建与发布](taro-build.md) —— 多环境构建、代码压缩、分包、上传预览、CI 自动化

## 学习目标

完成本部分后，你将能够：
- 从零配置 Webpack/Vite 生产级构建流程
- 使用 Babel 处理最新 ECMAScript 与 TypeScript
- 设计多环境 CI/CD 流水线并实现自动化部署
- 用 Taro 开发一套代码多端运行的小程序应用