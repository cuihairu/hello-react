### 组件挂载与卸载

组件挂载与卸载是 React 组件生命周期中的关键阶段。理解这两个阶段有助于你更好地管理组件的创建、更新和销毁，确保组件在这些过程中正确地执行操作，如数据加载、事件绑定和清理。

---

## **1. 组件挂载**

组件挂载是指组件实例化并被插入到 DOM 中的过程。在这个阶段，你可以执行诸如数据获取、事件绑定和设置订阅等操作。

### **1.1 挂载过程**

1. **组件创建**  
   React 创建组件实例，并初始化其 `props` 和 `state`。

2. **调用 `constructor` 方法**  
   初始化状态和绑定方法。

   ```jsx
   constructor(props) {
     super(props);
     this.state = { count: 0 };
   }
   ```

3. **调用 `static getDerivedStateFromProps`（可选）**  
   在组件每次渲染之前调用，用于根据 `props` 更新 `state`。适用于需要根据新的 `props` 更新 `state` 的场景。

   ```jsx
   static getDerivedStateFromProps(nextProps, prevState) {
     if (nextProps.value !== prevState.value) {
       return { value: nextProps.value };
     }
     return null;
   }
   ```

4. **调用 `render` 方法**  
   渲染组件的 UI。

   ```jsx
   render() {
     return <div>{this.props.message}</div>;
   }
   ```

5. **调用 `componentDidMount` 方法**  
   组件挂载后调用。适用于数据获取、事件绑定或其他副作用操作。

   ```jsx
   componentDidMount() {
     console.log('Component mounted');
     // Fetch data or bind events
   }
   ```

### **1.2 使用 Hooks 的挂载**

在函数组件中，可以使用 `useEffect` 钩子来模拟 `componentDidMount` 行为。

```jsx
import React, { useEffect, useState } from 'react';

function Example() {
  useEffect(() => {
    console.log('Component mounted');
    // Fetch data or bind events

    // Cleanup function (optional)
    return () => {
      console.log('Cleanup on unmount');
    };
  }, []); // 空依赖数组，组件挂载时执行

  return <div>Example Component</div>;
}
```

## **2. 组件卸载**

组件卸载是指组件从 DOM 中移除的过程。在这个阶段，你可以执行清理操作，例如取消订阅、清理定时器等。

### **2.1 卸载过程**

1. **调用 `componentWillUnmount` 方法**  
   在组件卸载前调用。适用于清理操作，如取消网络请求、移除事件监听器、清理定时器等。

   ```jsx
   componentWillUnmount() {
     console.log('Component will unmount');
     // Cleanup operations
   }
   ```

### **2.2 使用 Hooks 的卸载**

在函数组件中，可以使用 `useEffect` 钩子中的返回函数来模拟 `componentWillUnmount` 行为。

```jsx
import React, { useEffect } from 'react';

function Example() {
  useEffect(() => {
    console.log('Component mounted');

    return () => {
      console.log('Component will unmount');
      // Cleanup operations
    };
  }, []); // 空依赖数组，组件卸载时执行

  return <div>Example Component</div>;
}
```

## **3. 常见操作**

### **3.1 数据获取**

- **类组件**：在 `componentDidMount` 中进行数据获取。

  ```jsx
  componentDidMount() {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }
  ```

- **函数组件**：在 `useEffect` 中进行数据获取。

  ```jsx
  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => setData(data));
  }, []); // 空依赖数组，只在挂载时执行
  ```

### **3.2 事件绑定**

- **类组件**：在 `componentDidMount` 中绑定事件。

  ```jsx
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  ```

- **函数组件**：在 `useEffect` 中绑定和移除事件。

  ```jsx
  useEffect(() => {
    const handleResize = () => {
      console.log('Window resized');
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 空依赖数组，只在挂载时执行
  ```

### **3.3 定时器**

- **类组件**：在 `componentDidMount` 中设置定时器，在 `componentWillUnmount` 中清理。

  ```jsx
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    // Update component state
  }
  ```

- **函数组件**：在 `useEffect` 中设置定时器和清理。

  ```jsx
  useEffect(() => {
    const timerID = setInterval(() => {
      // Update state
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []); // 空依赖数组，只在挂载时执行
  ```

## **4. 总结**

理解组件的挂载与卸载过程对于管理组件生命周期中的副作用非常重要。通过合理使用生命周期方法和 Hooks，你可以有效地管理数据获取、事件绑定、定时器和清理操作，确保组件在生命周期的不同阶段正确地执行所需的操作。