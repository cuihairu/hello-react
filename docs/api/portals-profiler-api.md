### Portals 与 Profiler API

#### Portals

React Portals 提供了一种将子节点渲染到 DOM 节点的不同位置的方式。通常，子节点会渲染到其父组件所在的 DOM 节点中，而 Portals 允许你将子节点渲染到 DOM 树的不同位置，这对于某些 UI 模式（如模态框、对话框或浮动层）非常有用。

##### 创建和使用 Portals

1. **创建 Portal**

   要创建一个 Portal，你需要使用 `ReactDOM.createPortal` 函数。这个函数接受两个参数：
   - **子节点**：要渲染的子节点。
   - **容器**：子节点将被渲染到的 DOM 节点。

   ```jsx
   import React from 'react';
   import ReactDOM from 'react-dom';

   const MyPortal = ({ children }) => {
     const portalRoot = document.getElementById('portal-root');
     return ReactDOM.createPortal(children, portalRoot);
   };

   const App = () => {
     return (
       <div>
         <h1>App Component</h1>
         <MyPortal>
           <div>Rendered in Portal</div>
         </MyPortal>
       </div>
     );
   };

   export default App;
   ```

   在上面的例子中，`MyPortal` 组件将其子节点渲染到 `portal-root` DOM 节点中。你需要在 HTML 文件中提供一个具有相应 ID 的 DOM 节点，如：

   ```html
   <div id="portal-root"></div>
   ```

2. **Portals 的应用场景**

   - **模态框**：将模态框渲染到文档的根节点，以便它不会被其父组件的 CSS 影响。
   - **提示框**：将提示框渲染到页面的其他位置，以确保它始终位于视口的顶部。
   - **对话框**：在应用程序中添加对话框时，将其渲染到根节点可以避免样式问题。

##### 注意事项

- **事件处理**：Portal 中的事件处理会继续冒泡到 DOM 树的父节点。
- **CSS 样式**：Portal 内的子节点会使用其父组件的 CSS 样式，但其渲染位置不受限制。

#### Profiler API

Profiler API 用于分析 React 应用的性能。React Profiler 允许开发者收集和查看组件的渲染时间，以便优化性能。

##### 使用 Profiler 组件

1. **Profiler 组件**

   `Profiler` 组件用来包裹你想要分析的部分。它接受两个主要的属性：
   - **id**：一个字符串，唯一标识 Profiler 实例。
   - **onRender**：一个回调函数，在组件渲染时调用。

   ```jsx
   import React, { Profiler } from 'react';

   const onRenderCallback = (
     id,
     phase,
     actualDuration,
     baseDuration,
     startTime,
     commitTime,
     interactions
   ) => {
     console.log(`Profiler data for ${id}:`);
     console.log(`Phase: ${phase}`);
     console.log(`Actual Duration: ${actualDuration}`);
     console.log(`Base Duration: ${baseDuration}`);
     console.log(`Start Time: ${startTime}`);
     console.log(`Commit Time: ${commitTime}`);
   };

   const MyComponent = () => {
     return (
       <Profiler id="MyComponent" onRender={onRenderCallback}>
         <div>My Profiler Component</div>
       </Profiler>
     );
   };

   export default MyComponent;
   ```

   在这个例子中，`onRenderCallback` 会在组件每次渲染时被调用，它提供了关于渲染的详细信息。

2. **Profiler 的应用场景**

   - **性能调优**：在开发阶段使用 Profiler 组件来检测性能瓶颈，识别那些渲染时间过长的组件。
   - **监控应用**：在生产环境中使用 Profiler 以确保应用的性能稳定。

##### Profiler 数据

- **id**：组件的唯一标识符。
- **phase**：渲染的阶段（"mount" 或 "update"）。
- **actualDuration**：实际渲染时间。
- **baseDuration**：不包括“隐藏”状态下渲染的时间。
- **startTime**：渲染开始时间。
- **commitTime**：渲染提交时间。
- **interactions**：组件相关的交互信息。

##### 注意事项

- **开销**：Profiler 组件在开发模式中有性能开销，因此应仅在开发阶段使用。
- **分析数据**：分析 Profiler 提供的数据时，需结合应用的整体性能来做出优化决策。

### 总结

- **Portals**：允许将子节点渲染到 DOM 树的不同位置，非常适用于模态框、对话框等场景。
- **Profiler**：用于收集和分析组件的渲染性能数据，以优化应用的性能。通过 `Profiler` 组件和 `onRender` 回调获取详细的渲染时间和性能信息。

这两种 API 提供了有力的工具来帮助开发者管理和优化 React 应用的渲染性能和 DOM 操作。