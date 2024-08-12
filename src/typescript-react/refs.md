### 7.7 Refs 的使用与管理

Refs 是 React 中用于访问和操作 DOM 元素或组件实例的一种机制。通过 refs，你可以在 React 组件中直接访问 DOM 元素或组件实例，进行读写操作，这对于某些特殊场景（如动画、聚焦、表单控件操作等）特别有用。

---

## 7.7.1 什么是 Refs

### **定义**

Refs（References）是 React 中一种特殊的属性，用于获取组件或 DOM 元素的引用。通过 `React.createRef()` 或 `callback refs` 可以创建和管理 refs。Refs 允许你在函数组件和类组件中访问 DOM 元素或组件实例。

### **基本用法**

#### **1. 使用 `React.createRef()`**

```jsx
import React from 'react';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef(); // 创建 ref
  }

  componentDidMount() {
    // 访问 DOM 元素
    this.myRef.current.focus();
  }

  render() {
    return <input ref={this.myRef} type="text" />;
  }
}
```

在这个示例中，`myRef` 是一个 ref 对象，`this.myRef.current` 访问实际的 DOM 元素。在 `componentDidMount` 生命周期方法中，我们可以直接调用 `focus()` 方法来使输入框获得焦点。

#### **2. 使用回调 refs**

```jsx
import React from 'react';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = null; // 初始化 ref
  }

  setRef = (element) => {
    this.myRef = element; // 设置 ref
  };

  componentDidMount() {
    // 访问 DOM 元素
    if (this.myRef) {
      this.myRef.focus();
    }
  }

  render() {
    return <input ref={this.setRef} type="text" />;
  }
}
```

在这个示例中，`setRef` 是一个回调函数，用于设置 `myRef` 的值为 DOM 元素。这个方法也可以用于获取 DOM 元素的引用。

## 7.7.2 Refs 的使用场景

### **访问 DOM 元素**

Refs 最常用的场景是访问和操作 DOM 元素，如聚焦、选中文本或获取元素尺寸。

```jsx
class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  handleClick = () => {
    this.inputRef.current.select(); // 选择文本
  };

  render() {
    return (
      <div>
        <input ref={this.inputRef} type="text" defaultValue="Hello, world!" />
        <button onClick={this.handleClick}>Select Text</button>
      </div>
    );
  }
}
```

### **与表单控件交互**

Refs 可以用于直接控制表单控件的行为，如清空输入框或设置默认值。

```jsx
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  clearInput = () => {
    this.inputRef.current.value = ''; // 清空输入框
  };

  render() {
    return (
      <div>
        <input ref={this.inputRef} type="text" />
        <button onClick={this.clearInput}>Clear Input</button>
      </div>
    );
  }
}
```

### **管理焦点**

Refs 可以用来控制元素的焦点，特别是在动态生成表单或组件时。

```jsx
class FocusForm extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.inputRef.current.focus(); // 自动聚焦
  }

  render() {
    return <input ref={this.inputRef} type="text" />;
  }
}
```

## 7.7.3 管理 Refs 的注意事项

### **避免不必要的使用**

使用 refs 应当尽量避免直接操作 DOM 元素，React 的声明式编程模式通常能满足大部分需求。Refs 主要用于需要直接控制 DOM 元素的场景。

### **与受控组件的结合**

在处理受控组件时，通常不需要使用 refs。受控组件的状态和行为应由组件的状态管理，而不是直接操作 DOM 元素。

### **避免 refs 在函数组件中的使用**

函数组件不支持实例方法和生命周期方法，因此使用 refs 的场景较少。尽量使用 `useRef` 钩子来管理函数组件中的 refs。

## 7.7.4 使用 `useRef` 钩子（函数组件）

### **基本用法**

`useRef` 钩子用于在函数组件中创建和管理 refs。

```jsx
import React, { useRef, useEffect } from 'react';

const MyComponent = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // 自动聚焦
  }, []);

  return <input ref={inputRef} type="text" />;
};
```

### **使用 `useRef` 管理组件实例**

`useRef` 可以用于在函数组件中保存和管理组件实例或其它可变数据。

```jsx
import React, { useRef } from 'react';

const MyComponent = () => {
  const instanceRef = useRef();

  const handleClick = () => {
    // 使用 ref 保存的实例或数据
    console.log(instanceRef.current);
  };

  return (
    <div>
      <button onClick={handleClick}>Log Ref</button>
    </div>
  );
};
```

---

了解 Refs 的使用与管理，可以帮助你在 React 组件中直接操作 DOM 元素和组件实例。尽管 Refs 是一种强大的工具，但应当谨慎使用，以保持 React 的声明式编程风格和组件的可维护性。