### React Native 简介与移动开发

**React Native** 是一个开源框架，用于使用 React 和 JavaScript 构建原生移动应用程序。它允许开发者使用相同的代码库来开发 Android 和 iOS 平台上的应用程序，从而显著减少了开发时间和成本。React Native 的主要优势在于它使开发者能够利用 React 的组件化理念和开发经验，同时获得原生应用的性能和用户体验。

#### 23.2.1. React Native 简介
- **核心理念**：
  - **跨平台开发**：使用一套代码库同时开发 Android 和 iOS 应用，减少了重复工作和维护成本。
  - **原生组件**：React Native 使用原生组件（如 `View`, `Text`, `Image`）来渲染界面，确保应用具有原生的外观和性能。
  - **热重载（Hot Reloading）**：开发过程中可以即时查看代码更改带来的效果，而无需重新编译整个应用。

- **React Native 的架构**：
  - **JavaScript 线程**：负责处理应用的业务逻辑和 UI 渲染的更新。
  - **原生线程**：负责渲染原生组件和处理用户交互。
  - **桥接机制**：JavaScript 线程和原生线程通过桥接机制进行通信，传递数据和调用方法。

#### 23.2.2. 创建和配置 React Native 项目
1. **安装开发环境**：
   - 安装 [Node.js](https://nodejs.org/).
   - macOS 上开发 iOS 需安装 Xcode 与 [Watchman](https://facebook.github.io/watchman/docs/install)（用于监控文件变化）。

2. **创建新项目**（二选一）：
   - **Expo（官方推荐，开箱即用）**：
     ```bash
     npx create-expo-app MyApp
     cd MyApp
     npx expo start
     ```
   - **React Native CLI（需要原生能力时）**：早期的全局 `react-native-cli` 已废弃，现在通过 `npx` 调用社区 CLI：
     ```bash
     npx @react-native-community/cli@latest init MyApp
     cd MyApp
     ```

3. **运行开发服务器**：
   - 对于 Android（RN CLI 项目，需已连接设备或启动模拟器）：
     ```bash
     npm run android
     ```
   - 对于 iOS（需要 macOS 和 Xcode）：
     ```bash
     npm run ios
     ```
   - Expo 项目则直接使用 `npx expo run:android` / `npx expo run:ios`，或用 Expo Go 扫码预览。

#### 23.2.3. 开发基础
- **组件化开发**：
  - 使用 React 的组件化理念来构建 UI 组件。
  - 核心组件包括 `View`, `Text`, `Image`, `ScrollView`, `FlatList`, `Button` 等。

- **样式与布局**：
  - 使用内联样式或 StyleSheet API 来定义组件的样式。
  - 样式的书写方式类似于 CSS，但有些差异，例如单位为 `dp`（密度独立像素）。

- **路由和导航**：
  - 使用 React Navigation 库来处理应用的导航和路由管理。
  - 提供了堆栈导航、标签导航、抽屉导航等多种导航模式。

#### 23.2.4. 与原生代码集成
- **调用原生模块**：
  - 使用 `NativeModules` 从 JavaScript 访问原生功能，例如相机、定位、传感器等。
  - 自定义原生模块，以便在 React Native 应用中使用原生代码。

- **原生 UI 组件**：
  - 如果需要使用原生 UI 组件，可以通过桥接机制创建自定义的原生组件。

#### 23.2.5. 部署与发布
- **构建 APK（Android）**：
  - 使用 Gradle 构建 APK 文件，生成用于分发和发布的安装包。
  - 在 `android/app/build.gradle` 中配置发布设置。

- **构建 IPA（iOS）**：
  - 使用 Xcode 构建 IPA 文件，准备上传到 App Store。
  - 配置 Xcode 项目以满足 Apple 的发布要求。

#### 23.2.6. 常见的开发工具和资源
- **开发工具**：
  - **Expo**：提供了一整套开发工具，可以简化 React Native 开发过程，特别适用于快速原型开发。
  - **React Native DevTools**：React Native 0.76 起内置的新调试器（基于 Chrome DevTools 协议，配合 Hermes 引擎），支持断点、Console 与内存审查。早期的 Flipper 已停止维护，新项目不建议再引入。

- **学习资源**：
  - [React Native 官方文档](https://reactnative.dev/docs/getting-started)
  - [React Navigation 官方文档](https://reactnavigation.org/docs/getting-started)
  - [Expo 文档](https://docs.expo.dev/)

通过 React Native，开发者可以高效地构建跨平台的移动应用，同时享受原生应用的性能和用户体验。