### Concurrent Mode and the Scheduler

React's concurrency (Concurrent Rendering) and the Scheduler are important mechanisms aimed at improving application responsiveness and performance. The Scheduler first appeared in React 16.x as experimental APIs prefixed with `unstable_`, while concurrency officially landed in **React 18** — the official wording no longer uses "Concurrent Mode" but calls it Concurrent Rendering, enabled by default through `createRoot`. It lets React manage task priorities more flexibly and keep the application smooth during user interaction. The Scheduler is responsible for managing the scheduling and priorities of those tasks. Below is a detailed introduction to the concurrency mechanisms and the Scheduler.

---

## 1. Overview of Concurrent Mode

### 1.1 What Is Concurrent Mode

Concurrent Mode is a set of new React features designed to improve the responsiveness and smoothness of the user interface. It allows React to handle rendering and updates in a non-blocking way, ensuring the application remains interactive at all times.

### 1.2 Core Concepts of Concurrent Mode

- **Incremental Rendering**: Concurrent Mode allows the rendering process to be broken into multiple small tasks that can be interrupted and resumed. This lets React prioritize user interaction when needed, reducing application response latency.

- **Priority Scheduling**: React uses a priority scheduling mechanism to decide the processing order of tasks. High-priority tasks (such as user input) are handled first, while low-priority tasks (such as background data loading) can wait until there is idle time.

- **Time Slicing**: Time slicing is a key technique in Concurrent Mode that allows React to split long-running rendering tasks into multiple time segments. Each segment handles a portion of the rendering work, ensuring the UI stays responsive.

### 1.3 Advantages of Concurrent Mode

- **Improved responsiveness**: Through incremental rendering and priority scheduling, Concurrent Mode can reduce latency during user actions, making the application smoother.

- **Handling long-running tasks**: Long-running rendering tasks can be interrupted and resumed later, avoiding long UI blocking periods.

- **Better data loading**: Concurrent Mode can optimize the data loading process, ensuring the user interface stays responsive while data is being loaded.

---

## 2. The Scheduler

### 2.1 The Role of the Scheduler

The Scheduler is one of React's core components, responsible for managing and scheduling task priorities. It allows React to dynamically adjust the processing order of tasks based on their priority.

### 2.2 How the Scheduler Works

- **Task Queue**: The Scheduler maintains a task queue into which all tasks to be handled are placed. Tasks are sorted by priority, ensuring high-priority tasks are handled first.

- **Priority Categories**: The Scheduler divides tasks into different priority categories, such as high priority (such as user input) and low priority (such as background data loading). A task's priority determines its processing order.

- **Time Slicing**: The Scheduler uses time slicing to split long-running rendering tasks into multiple small segments. Each segment handles a certain amount of work and then returns to the event loop, ensuring task scheduling does not block UI updates.

### 2.3 Example of Using the Scheduler

The Scheduler's API was introduced in React 16.8 and is mainly used to manage task scheduling. Here is an example of using the Scheduler:

```javascript
import { unstable_scheduleCallback, unstable_NormalPriority } from 'scheduler';

// Schedule a normal-priority task
unstable_scheduleCallback(unstable_NormalPriority, () => {
  console.log('Normal priority task');
});
```

In this example, `unstable_scheduleCallback` is used to schedule a normal-priority task into the task queue. The task will be executed at an appropriate time, ensuring high-priority tasks are handled first.

---

## 3. Practical Applications of Concurrent Mode

### 3.1 Using Concurrent Rendering

From React 18 onward, using `createRoot` enables concurrent rendering — **no additional configuration is needed** (concurrent features are on by default). Here is a simple example:

```jsx
import React from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));

root.render(<App />);
```

In this example, the root node created by `createRoot` runs under the concurrent rendering mechanism; you can also pair it with APIs such as `startTransition` and `useDeferredValue` to explicitly mark low-priority updates.

### 3.2 Best Practices for Concurrent Mode

- **Optimize UI interaction**: Use Concurrent Mode to handle complex UI updates and interactions, ensuring a smooth user experience.

- **Handle long-running tasks**: Use time slicing and priority scheduling to handle long-running rendering tasks, avoiding long application blocking.

- **Monitor performance**: Use React's Profiler tool to monitor application performance and understand the impact of Concurrent Mode on your application.

---

## 4. Summary

Concurrent Mode and the Scheduler are key technologies for React to improve application responsiveness and performance. Concurrent Mode ensures the application stays smooth while handling tasks through incremental rendering and priority scheduling, while the Scheduler is responsible for task priority management and scheduling. Understanding and applying these technologies helps developers build more efficient, responsive user interfaces.

## References

- [React official docs · React Compiler](https://react.dev/learn/react-compiler)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [glossary](/glossary.md))
- [knowledge](/knowledge.md))
- [react-history-principles](/typescript-react/react-history-principles.md))
