### 7.7 Using and Managing Refs

Refs are a mechanism in React for accessing and manipulating DOM elements or component instances. Through refs, you can directly access DOM elements or component instances in a React component and perform read/write operations, which is especially useful in certain scenarios (such as animations, focusing, and form control manipulation).

---

## 7.7.1 What Are Refs

### Definition

Refs (References) are a special kind of prop in React, used to obtain references to components or DOM elements. You can create and manage refs with `React.createRef()` or `callback refs`. Refs let you access DOM elements or component instances in both function components and class components.

### Basic Usage

#### 1. Using `React.createRef()`

```jsx
import React from 'react';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef(); // create a ref
  }

  componentDidMount() {
    // access the DOM element
    this.myRef.current.focus();
  }

  render() {
    return <input ref={this.myRef} type="text" />;
  }
}
```

In this example, `myRef` is a ref object, and `this.myRef.current` accesses the actual DOM element. In the `componentDidMount` lifecycle method, we can directly call the `focus()` method to give focus to the input.

#### 2. Using Callback Refs

```jsx
import React from 'react';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = null; // initialize the ref
  }

  setRef = (element) => {
    this.myRef = element; // set the ref
  };

  componentDidMount() {
    // access the DOM element
    if (this.myRef) {
      this.myRef.focus();
    }
  }

  render() {
    return <input ref={this.setRef} type="text" />;
  }
}
```

In this example, `setRef` is a callback function used to set the value of `myRef` to the DOM element. This method can also be used to get a reference to a DOM element.

## 7.7.2 Use Cases for Refs

### Accessing DOM Elements

The most common use of refs is to access and manipulate DOM elements, such as focusing, selecting text, or getting element dimensions.

```jsx
class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  handleClick = () => {
    this.inputRef.current.select(); // select text
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

### Interacting with Form Controls

Refs can be used to directly control the behavior of form controls, such as clearing an input or setting default values.

```jsx
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  clearInput = () => {
    this.inputRef.current.value = ''; // clear the input
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

### Managing Focus

Refs can be used to control the focus of elements, especially when dynamically generating forms or components.

```jsx
class FocusForm extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.inputRef.current.focus(); // auto focus
  }

  render() {
    return <input ref={this.inputRef} type="text" />;
  }
}
```

## 7.7.3 Considerations When Managing Refs

### Avoid Unnecessary Use

When using refs, avoid direct manipulation of DOM elements where possible; React's declarative programming model usually satisfies most needs. Refs are mainly for scenarios that require direct control of DOM elements.

### Combining with Controlled Components

When working with controlled components, you usually do not need refs. The state and behavior of controlled components should be managed by the component's state, not by directly manipulating DOM elements.

### Avoid Refs in Function Components

Function components do not support instance methods or lifecycle methods, so there are fewer scenarios for using refs. Try to use the `useRef` hook to manage refs in function components.

## 7.7.4 Using the `useRef` Hook (Function Components)

### Basic Usage

The `useRef` hook is used to create and manage refs in function components.

```jsx
import React, { useRef, useEffect } from 'react';

const MyComponent = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // auto focus
  }, []);

  return <input ref={inputRef} type="text" />;
};
```

### Using `useRef` to Manage Component Instances

`useRef` can be used to store and manage component instances or other mutable data in function components.

```jsx
import React, { useRef } from 'react';

const MyComponent = () => {
  const instanceRef = useRef();

  const handleClick = () => {
    // use the instance or data stored in the ref
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

Understanding how to use and manage refs helps you directly manipulate DOM elements and component instances in React components. Although refs are a powerful tool, they should be used cautiously to preserve React's declarative programming style and component maintainability.

---

## React 18 → 19 Version Comparison

This page's body uses React 18 as its baseline. The table below maps the refs-related code here to React 19:

| Pattern | React 18 Status | React 19 Change | Notes |
| --- | --- | --- | --- |
| String ref `ref="input"` | Available for class components | **Removed** | Use a ref callback or `useRef` instead |
| `ReactDOM.findDOMNode` | Deprecated | **Removed** | Use a DOM ref instead |
| `ref` as a prop | Requires `forwardRef` to pass through | **Directly supported** | Function components receive `ref` directly |
| Ref callback | Only assigns the value | **Can return a cleanup function** | Cleanup runs on unmount; under TypeScript it must not implicitly return other values |
| `useRef()` with no arguments | Allowed by types | **TypeScript requires an argument** | Write `useRef(undefined)`; all `RefObject` are mutable, `MutableRef` deprecated |
| `element.ref` | Readable | **Deprecated** | `ref` becomes an ordinary prop; read `element.props.ref` instead |

Source: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

## References

- [React Official Documentation · useRef](https://react.dev/reference/react/useRef)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [hooks-deep-dive](/architecture/hooks-deep-dive.md))
- [glossary](/glossary.md))
- [knowledge](/knowledge.md))
- [README](README.md)
- [deep-dive-components](deep-dive-components.md)
