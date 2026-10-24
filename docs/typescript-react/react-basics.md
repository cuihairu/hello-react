###  React Basics

This page collects the basic relationships among JSX, components, State/Props, and lifecycle — a few concepts I often revisit in React projects.

---

## 1. React's Development History and Core Principles

### 1.1 React's History

React is an open-source JavaScript library developed and maintained by Facebook for building user interfaces. It was first released in May 2013 and quickly became a popular choice for front-end development. React's main features are its declarative programming model and component-based structure.

### 1.2 React's Core Principles

- **Components**: Break the user interface into reusable components, each managing its own state and rendering logic.
- **Declarative programming**: Describe what the UI should look like, and React handles updating and rendering it.
- **One-way data flow**: Data flows from parent components to child components through Props, ensuring data is controllable and predictable.
- **Virtual DOM**: Efficiently update the real DOM through the Virtual DOM to improve performance.

---

## 2. JSX Syntax and Basic Usage

### 2.1 What Is JSX

JSX is a JavaScript syntax extension that allows embedding HTML in JavaScript code. It makes writing React components more intuitive and concise.

### 2.2 Basic JSX Syntax

- **Expressions**: JSX can contain JavaScript expressions, which are evaluated at render time and inserted into the output.

```jsx
const name = 'Alice';
const element = <h1>Hello, {name}!</h1>;
```

- **Attributes**: JSX supports attributes, similar to HTML attributes, but attribute names use camelCase style.

```jsx
const element = <img src="logo.png" alt="Logo" />;
```

- **Children**: JSX can contain child elements, which are rendered as nested HTML.

```jsx
const element = (
  <div>
    <h1>Hello, world!</h1>
    <p>Welcome to React.</p>
  </div>
);
```

### 2.3 JSX Compilation

JSX code needs to be compiled into JavaScript by tools such as Babel. The compiled code uses `React.createElement` to create Virtual DOM nodes.

```jsx
const element = <h1>Hello, world!</h1>;
```

Compiles to:

```jsx
const element = React.createElement('h1', null, 'Hello, world!');
```

---

## 3. Component-Based Development

### 3.1 Function Components

Function components are the simplest form of component, defined using functions:

```jsx
import React from 'react';

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

export default Welcome;
```

### 3.2 Class Components

Class components are defined using ES6 classes and support more features, such as lifecycle methods:

```jsx
import React, { Component } from 'react';

class Welcome extends Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

export default Welcome;
```

### 3.3 Organizing Components

Components can be nested and composed, achieving more complex UIs by nesting components inside other components.

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

## 4. Using State and Props

### 4.1 Props

Props are data passed to a component, which the component accesses via the `props` object. Props are read-only and cannot be modified inside the component.

```jsx
function Greeting(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Using the component
<Greeting name="Alice" />
```

### 4.2 State

State is data inside a component. A component can manage state using `this.state` or the `useState` hook. State is mutable and can be updated via `setState` or a `set` function.

#### 4.2.1 State in Class Components

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

#### 4.2.2 State in Function Components

Use the `useState` hook to manage state:

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

## 5. The Component Lifecycle

The component lifecycle covers the component's creation, update, and destruction. Class components provide lifecycle methods, while function components handle side effects through the `useEffect` hook.

### 5.1 Lifecycle Methods in Class Components

- `componentDidMount`: Called after the component mounts.
- `componentDidUpdate`: Called after the component updates.
- `componentWillUnmount`: Called before the component unmounts.

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

### 5.2 Handling Side Effects in Function Components

Use the `useEffect` hook to handle side effects such as data fetching and subscriptions:

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
  }, []); // an empty array means it only runs on mount and unmount

  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}

export default DataFetcher;
```

---

## React 18 → 19 Version Comparison

This page's body uses React 18 as its baseline. The table below summarizes the React 19 changes covered in this chapter, for reference during upgrades:

| Topic | React 18 Status | React 19 Change | Notes |
| --- | --- | --- | --- |
| New JSX transform | Recommended | **Required** | A warning is emitted if not enabled; `import React` is still not required |
| `React.createFactory` | Available (deprecated) | **Removed** | Just rewrite as JSX |
| Function component `defaultProps` | Available | **Removed** | Use ES6 default parameters instead; class components keep it |
| `propTypes` | Runtime validation | **Ignored** | Migrate to a typing solution such as TypeScript |
| String refs | Available for class components | **Removed** | Use a ref callback or `useRef` instead |
| Legacy Context (`contextTypes` / `getChildContext`) | Available | **Removed** | Use `createContext` + `contextType` instead |
| `ref` as a prop | Requires `forwardRef` to pass through | **Directly supported** | Function components can receive `ref` directly |
| New Hooks | — | **New** | `use`, `useActionState`, `useOptimistic`, see [React 19 New Features](../future/react-new-features.md) |

Source: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

## 6. Summary

This page covers JSX, components, State/Props, and lifecycle. When maintaining older components, I usually look at the lifecycle and component structure together.

## References

- [React Official Documentation (external link)](https://react.dev/learn)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [glossary](/glossary.md))
