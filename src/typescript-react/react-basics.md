###  React 基础

在这一章中，我们将介绍 React 的基础知识，包括 JSX 语法、组件化开发、State 和 Props 的使用，以及组件的生命周期等重要概念。这些是理解和使用 React 的核心要素。

---

## **1. React 的发展历程与核心理念**

### **1.1 React 的历史**

React 是由 Facebook 开发并维护的一个开源 JavaScript 库，用于构建用户界面。它首次发布于 2013 年 5 月，并迅速成为前端开发的热门选择。React 的主要特点是其声明式编程模型和组件化结构。

### **1.2 React 的核心理念**

- **组件化**：将用户界面分解为可复用的组件，每个组件管理自己的状态和渲染逻辑。
- **声明式编程**：描述界面应该是什么样的，React 会负责更新和渲染界面。
- **单向数据流**：数据通过 Props 从父组件传递到子组件，确保数据的可控性和可预测性。
- **虚拟 DOM**：通过虚拟 DOM 高效地更新真实 DOM，提高性能。

---

## **2. JSX 语法与基本用法**

### **2.1 什么是 JSX**

JSX 是一种 JavaScript 语法扩展，允许在 JavaScript 代码中嵌入 HTML。它使得编写 React 组件更加直观和简洁。

### **2.2 JSX 的基本语法**

- **表达式**：JSX 可以包含 JavaScript 表达式，这些表达式会在渲染时被计算并插入到输出中。

```jsx
const name = 'Alice';
const element = <h1>Hello, {name}!</h1>;
```

- **属性**：JSX 支持使用属性，类似于 HTML 属性，但属性名使用 camelCase 风格。

```jsx
const element = <img src="logo.png" alt="Logo" />;
```

- **子元素**：JSX 可以包含子元素，这些子元素会被渲染为嵌套的 HTML。

```jsx
const element = (
  <div>
    <h1>Hello, world!</h1>
    <p>Welcome to React.</p>
  </div>
);
```

### **2.3 JSX 编译**

JSX 代码需要通过 Babel 等工具编译为 JavaScript。编译后的代码使用 `React.createElement` 创建虚拟 DOM 节点。

```jsx
const element = <h1>Hello, world!</h1>;

// 编译为
const element = React.createElement('h1', null, 'Hello, world!');
```

---

## **3. 组件化开发**

### **3.1 函数组件**

函数组件是最简单的组件形式，使用函数来定义组件：

```jsx
import React from 'react';

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

export default Welcome;
```

### **3.2 类组件**

类组件使用 ES6 类来定义，并支持更多的功能，如生命周期方法：

```jsx
import React, { Component } from 'react';

class Welcome extends Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

export default Welcome;
```

### **3.3 组件的组织**

组件可以被嵌套和组合，通过将组件嵌套在其他组件中实现更复杂的 UI。

```jsx
import React from 'react';

function App() {
  return (
    <div>
      <Welcome name="Alice" />
      <Welcome name="Bob" />
    </div>
  );
}

export default App;
```

---

## **4. State 与 Props 的使用**

### **4.1 Props**

Props 是传递给组件的数据，组件通过 `props` 对象访问这些数据。Props 是只读的，不能在组件内部修改。

```jsx
function Greeting(props) {
  return <h1>Hello, {props.name}</h1>;
}

// 使用组件
<Greeting name="Alice" />
```

### **4.2 State**

State 是组件内部的数据，组件可以使用 `this.state` 或 `useState` 钩子来管理状态。State 是可变的，可以通过 `setState` 或 `set` 函数更新。

#### **4.2.1 类组件中的 State**

```jsx
import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default Counter;
```

#### **4.2.2 函数组件中的 State**

使用 `useState` 钩子来管理状态：

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default Counter;
```

---

## **5. 组件的生命周期**

组件的生命周期包括组件的创建、更新和销毁过程。类组件提供了生命周期方法，而函数组件通过 `useEffect` 钩子处理副作用。

### **5.1 类组件的生命周期方法**

- `componentDidMount`：组件挂载后调用。
- `componentDidUpdate`：组件更新后调用。
- `componentWillUnmount`：组件卸载前调用。

```jsx
import React, { Component } from 'react';

class LifecycleDemo extends Component {
  componentDidMount() {
    console.log('Component did mount');
  }

  componentDidUpdate() {
    console.log('Component did update');
  }

  componentWillUnmount() {
    console.log('Component will unmount');
  }

  render() {
    return <div>Lifecycle Demo</div>;
  }
}

export default LifecycleDemo;
```

### **5.2 函数组件的副作用处理**

使用 `useEffect` 钩子处理副作用，如数据获取、订阅等：

```jsx
import React, { useEffect, useState } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => setData(data));

    return () => {
      console.log('Cleanup');
    };
  }, []); // 空数组表示只在组件挂载和卸载时调用

  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}

export default DataFetcher;
```

---

## **6. 总结**

在这一章中，我们介绍了 React 的基础知识，包括 JSX 语法、组件化开发、State 和 Props 的使用，以及组件的生命周期。掌握这些基础概念将帮助你在 React 中构建高效、可维护的用户界面。继续深入学习，将有助于你掌握更高级的 React 特性和最佳实践。