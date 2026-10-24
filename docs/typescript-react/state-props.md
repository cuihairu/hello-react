### Using State and Props

---

## 1. Props

### 1.1 Defining Props

`props` (properties) is the mechanism for passing data between React components. Through `props`, a parent component can pass data and callback functions to a child component. `props` are read-only; child components cannot modify them directly.

### 1.2 Using Props

- **Using Props in Function Components**

  Function components receive props via the `props` parameter and use them in JSX.

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}
```

- **Using Props in Class Components**

  Class components access props via `this.props`.

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

### 1.3 PropTypes

React provides the `PropTypes` library for type checking, ensuring the `props` a component receives are as expected.

```jsx
import PropTypes from 'prop-types';

function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

Welcome.propTypes = {
  name: PropTypes.string.isRequired
};
```

### 1.4 Default Props

You can define default `props` values for a component, ensuring it works correctly even when a parent does not provide certain properties.

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

Welcome.defaultProps = {
  name: 'Guest'
};
```

::: warning
`defaultProps` on function components is deprecated (warnings appear in the console starting with React 18.3, and it is removed in React 19). Use default parameters in function components instead:

```jsx
function Welcome({ name = 'Guest' }) {
  return <h1>Hello, {name}!</h1>;
}
```
:::

## 2. State

### 2.1 Defining State

`state` is a component's internal state, determining its behavior and rendering. Unlike `props`, `state` is mutable. A component can update its own `state` and re-render in response to state changes.

### 2.2 Using State

- **Using State in Function Components**

  Manage state with the `useState` hook.

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

- **Using State in Class Components**

  Class components define state with `this.state` and update it with `this.setState`.

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

### 2.3 Updating State

State updates are asynchronous and can be made through `setState` (class components) or a `useState` updater function (function components).

```jsx
// updating state with useState
const [count, setCount] = useState(0);
setCount(count + 1);
```

### 2.4 Managing State

- **Local state**: State internal to a component, suitable for single-component state management.
- **Global state**: State shared across components, managed with state management libraries (such as Redux or MobX).

### 2.5 Data Flow with State and Props

A component's data flow is one-way: data flows from the parent component to the child through `props`, and the child passes data back to the parent through event callbacks. The parent component uses `state` to manage and update the data.

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

## React 18 → 19 Version Comparison

This page's body uses React 18 as its baseline. The table below maps the State and Props code here to React 19:

| API | React 18 Status | React 19 Change | Notes |
| --- | --- | --- | --- |
| `useState` | Stable since 16.8 | No change | — |
| `this.state` / `setState()` | Class component state | No change | — |
| Function component `defaultProps` | Available | **Removed** | Use ES6 default parameters like `function A({ x = 1 })`; class components keep it |
| `propTypes` | Runtime validation | **Ignored** | Use a typing solution such as TypeScript instead |
| `children` in `React.FC` | No longer implicit since React 18 | No change | Declare it explicitly in Props; see [Using TypeScript in React Projects](react-typescript.md) |
| `element.ref` | Readable | **Deprecated** | `ref` becomes an ordinary prop; read `element.props.ref` instead |

Source: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

## 3. Summary

In React, `props` and `state` are the core mechanisms for passing data between components and managing state. `props` are used to pass data from a parent component to a child, while `state` is used for a component's internal state management. Understanding how to use `props` and `state` effectively is the foundation of building React applications and helps developers create maintainable and reusable components.

## References

- [React Official Documentation · Managing State](https://react.dev/learn/managing-state)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [glossary](/glossary.md))
- [knowledge](/knowledge.md))
- [README](README.md)
