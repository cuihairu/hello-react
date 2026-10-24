### 7.10 Profiler: Usage and Performance Analysis

React Profiler is a tool for performance analysis. It helps developers detect and optimize the performance of a React application. It records detailed information for each render and provides statistics about component render time, helping identify performance bottlenecks.

---

## 7.10.1 Overview of the Profiler

The React Profiler component can be used in development mode to measure component rendering performance. Through the Profiler, we can obtain information such as how long a component took to render, why it re-rendered, and how frequently it re-renders. This data is very helpful for optimizing a React application's performance.

### Basic Concepts of the Profiler

- **Profiler component**: React provides a `Profiler` component, used to wrap other components and measure their rendering performance.
- **Measured data**: the Profiler records a component's render time, update count, and so on, for performance analysis.

## 7.10.2 Using the Profiler

### Installing React DevTools

Before using the Profiler, make sure you have installed [React DevTools](https://reactjs.org/docs/getting-started.html). It provides a graphical interface for viewing the data the Profiler collects.

### Configuring the Profiler

1. **Import the Profiler component**

   First, import the `Profiler` component from the `react` package:

   ```jsx
   import React, { Profiler } from 'react';
   ```

2. **Wrapping components with the Profiler**

   Use the `Profiler` component as a wrapper around the components whose performance you want to measure. `Profiler` requires two props: `id` and `onRender`. `id` uniquely identifies the Profiler instance, and `onRender` is a callback function that runs each time the component renders.

   ```jsx
   const App = () => {
     const onRenderCallback = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
       console.log('Render:', {
         id,
         phase,
         actualDuration,
         baseDuration,
         startTime,
         commitTime,
       });
     };

     return (
       <Profiler id="AppProfiler" onRender={onRenderCallback}>
         <MainComponent />
       </Profiler>
     );
   };
   ```

3. **Analyzing the data**

   The Profiler's `onRender` callback provides the following parameters:
   
   - **id**: the identifier of the Profiler instance.
   - **phase**: the render phase (mount or update).
   - **actualDuration**: the time the component actually took to render (in milliseconds).
   - **baseDuration**: the baseline time for the component's initial render.
   - **startTime**: when the component's render started.
   - **commitTime**: when the component's render was committed.

### Viewing Profiler Data

1. **Open React DevTools**

   Open React DevTools in the browser and switch to the "Profiler" tab.

2. **Record performance data**

   Click the "Start Profiling" button to begin recording performance data. Then perform some actions to trigger component re-renders.

3. **View and analyze the performance data**

   Once recording is done, click "Stop Profiling." In DevTools you can see each component's render time and other performance data. You can view how different components render over time using the timeline to identify performance bottlenecks.

## 7.10.3 Performance Optimization Suggestions

### Reducing Unnecessary Renders

- **Avoid unnecessary renders**: use `React.memo` or `PureComponent` to avoid unnecessary component re-renders.
- **Optimize state and props passing**: make sure components only update when needed, reducing re-renders by limiting data passing between components.

### Using Code Splitting

- **Dynamic imports**: implement code splitting with `React.lazy` and `Suspense` to defer loading components and reduce the initial load time.

### Optimizing Component Structure

- **Avoid deep nesting**: keep the component tree flat by minimizing deeply nested component structures.
- **Extract complex logic into hooks**: encapsulate complex logic in custom hooks to improve component reusability and performance.

### Optimizing Rendering Performance

- **Use virtualization**: use virtualization techniques such as `react-window` or `react-virtualized` for large lists, rendering only the items in the viewport.
- **Avoid inline functions**: avoid defining inline functions inside a render method, because this can cause unnecessary component re-renders.

## 7.10.4 Limitations of the Profiler

- **Development mode only**: the Profiler only provides performance analysis in development mode. It does not collect performance data in production.
- **Performance overhead**: the Profiler itself introduces some performance overhead, so it is recommended to enable it only when analyzing performance.

---

By using the Profiler, developers can gain deep insight into component rendering performance, identify performance bottlenecks, and take the corresponding optimization measures to improve a React application's overall performance.

---

## React 18 → 19 Comparison

The body of this page follows React 18. The table below maps this page's Profiler content to React 19:

| Behavior / API | React 18 status | React 19 change | Notes |
| --- | --- | --- | --- |
| `<Profiler>` and `onRender` | Stable | No change | — |
| Sampling under concurrent rendering | Concurrent is default since React 18 | No change | Renders can be interrupted; commits are still counted by boundary |
| StrictMode double render | Double render in development | **Behavior refined** | `useMemo` / `useCallback` reuse the first result; ref callbacks double-call. Take this into account when sampling in development |
| `react-test-renderer` | Available | **Deprecated** | Move render-related tests to React Testing Library; see [Testing tools](../projects/testing-tools.md) |

Reference: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

## References

- [React official docs · Profiler](https://react.dev/reference/react/Profiler)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [glossary](/glossary.md))
- [knowledge](/knowledge.md))
- [README](README.md)
