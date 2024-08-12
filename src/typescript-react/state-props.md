### State 与 Props 的使用

---

## **1. Props**

### **1.1 Props 的定义**

`props`（属性）是 React 组件之间传递数据的机制。通过 `props`，父组件可以将数据和回调函数传递给子组件。`props` 是只读的，子组件不能直接修改它们。

### **1.2 使用 Props**

- **在函数组件中使用 Props**

函数组件通过 `props` 参数接收属性，并在 JSX 中使用这些属性。

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}
```

- **在类组件中使用 Props**

类组件通过 `this.props` 访问属性。

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

### **1.3 PropTypes**

React 提供了 `PropTypes` 库用于类型检查，确保组件接收到的 `props` 符合预期。

```jsx
import PropTypes from 'prop-types';

function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

Welcome.propTypes = {
  name: PropTypes.string.isRequired
};
```

### **1.4 默认 Props**

可以为组件定义默认的 `props` 值，确保即使父组件未提供某些属性时，组件也能正常工作。

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

Welcome.defaultProps = {
  name: 'Guest'
};
```

## **2. State**

### **2.1 State 的定义**

`state` 是组件的内部状态，决定了组件的行为和渲染。与 `props` 不同，`state` 是可变的。组件可以更新自己的 `state`，并根据状态的变化重新渲染。

### **2.2 使用 State**

- **在函数组件中使用 State**

通过 `useState` 钩子管理状态。

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

- **在类组件中使用 State**

类组件使用 `this.state` 定义状态，并通过 `this.setState` 更新状态。

```jsx
class Counter extends React.Component {
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
```

### **2.3 State 的更新**

状态的更新是异步的，可以通过 `setState`（类组件）或 `useState`（函数组件）的更新函数来修改状态。

```jsx
// 使用 useState 更新状态
const [count, setCount] = useState(0);
setCount(count + 1);
```

### **2.4 State 的管理**

- **局部状态**：组件内部的状态，适用于单个组件的状态管理。
- **全局状态**：通过状态管理库（如 Redux、MobX）管理跨组件共享的状态。

### **2.5 使用 State 和 Props 进行数据流**

组件的数据流是单向的：从父组件通过 `props` 传递到子组件，子组件通过事件回调将数据传递回父组件。父组件可以使用 `state` 管理和更新数据。

```jsx
function Parent() {
  const [message, setMessage] = useState('Hello from parent!');

  return <Child message={message} onMessageChange={setMessage} />;
}

function Child(props) {
  return (
    <div>
      <p>{props.message}</p>
      <button onClick={() => props.onMessageChange('New message from child!')}>
        Change Message
      </button>
    </div>
  );
}
```

## **3. 总结**

在 React 中，`props` 和 `state` 是组件之间传递数据和管理状态的核心机制。`props` 用于从父组件向子组件传递数据，而 `state` 用于组件内部的状态管理。理解如何有效地使用 `props` 和 `state` 是构建 React 应用的基础，能够帮助开发者创建可维护和可重用的组件。