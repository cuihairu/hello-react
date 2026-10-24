### JSX Syntax and Basic Usage

---

## 1. What Is JSX

JSX (JavaScript XML) is a JavaScript syntax extension that makes writing HTML structure inside JavaScript code more intuitive and concise. JSX lets developers embed HTML in JavaScript; React converts it into JavaScript objects that are ultimately rendered to the page.

### 1.1 The Basic Concepts of JSX

- **Syntax extension**: JSX looks like HTML, but it is actually syntactic sugar for JavaScript objects.
- **Compilation**: JSX must be compiled by a tool (such as Babel) into plain JavaScript code.

## 2. The Basic Syntax of JSX

### 2.1 Expressions

JSX supports inserting JavaScript expressions inside curly braces `{}`. These expressions are evaluated at render time and inserted into the output.

```jsx
const name = 'Alice';
const element = <h1>Hello, {name}!</h1>;
```

### 2.2 Attributes

JSX elements can use attributes. Attribute names follow camelCase style rather than HTML's lowercase style.

- **Basic attributes**

```jsx
const element = <img src="logo.png" alt="Logo" />;
```

- **Boolean attributes**

For boolean attributes, you can shorten it to just `attribute`. If the attribute is present it is `true`; otherwise the attribute is not included.

```jsx
const element = <input type="checkbox" checked />;
```

### 2.3 Child Elements

JSX supports nested child elements, which are rendered as nested HTML.

```jsx
const element = (
  <div>
    <h1>Hello, world!</h1>
    <p>Welcome to React.</p>
  </div>
);
```

### 2.4 Conditional Rendering

JSX supports using JavaScript expressions for conditional rendering.

- **Using the ternary operator**

```jsx
const isLoggedIn = true;
const element = (
  <div>
    {isLoggedIn ? <p>Welcome back!</p> : <p>Please sign up.</p>}
  </div>
);
```

- **Using the logical AND operator**

```jsx
const showMessage = true;
const element = (
  <div>
    {showMessage && <p>Message is visible.</p>}
  </div>
);
```

### 2.5 List Rendering

JSX can render lists with the `map` method. Every list item needs a unique `key` attribute.

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>{number}</li>
);

const element = <ul>{listItems}</ul>;
```

## 3. JSX Compilation

JSX code needs to be compiled into plain JavaScript so it can run in the browser. Babel is a common compilation tool; it converts JSX into `React.createElement` calls. Here is a simple example:

### 3.1 JSX Example

```jsx
const element = <h1>Hello, world!</h1>;
```

### 3.2 Compiled JavaScript

```javascript
const element = React.createElement('h1', null, 'Hello, world!');
```

## 4. Using JSX in Components

Using JSX in React components makes describing UI structure more intuitive. A component's `render` method or a function component's return value is typically JSX.

### 4.1 JSX in Function Components

```jsx
import React from 'react';

function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

export default Greeting;
```

### 4.2 JSX in Class Components

```jsx
import React, { Component } from 'react';

class Greeting extends Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}

export default Greeting;
```

## React 18 → 19 Comparison

The body of this page follows React 18. The table below maps this page's JSX patterns to React 19:

| Pattern | React 18 status | React 19 change | Notes |
| --- | --- | --- | --- |
| New JSX transform | Optional | **Must be enabled** | Relying on the old transform warns |
| `React.createFactory('div')` | Available (deprecated) | **Removed** | Rewrite as `<div />` |
| `element.ref` | Readable | **Deprecated** | `ref` is now an ordinary prop; read `element.props.ref` |
| `<Child ref={r} />` | Needs `forwardRef` passthrough | **Directly supported** | ref is passed directly as a prop |
| `<MyContext>` as a Provider | Must write `<MyContext.Provider>` | **Can be used directly** | `<MyContext value={...}>` is equivalent |
| String ref `ref="input"` | Available | **Removed** | Use a ref callback |
| Global `JSX` namespace (TypeScript) | Globally available | **Moved to `React.JSX`** | Module augmentation must be wrapped in `declare module "react"` |

Reference: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

## 5. Summary

JSX is a powerful syntax extension that makes writing HTML structure in JavaScript more concise and intuitive. By using JSX, developers can more easily describe and manage the structure of a user interface. JSX is the common syntax for describing UI in React components.

## References

- [React official docs · Describing the UI](https://react.dev/learn/describing-the-ui)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [glossary](/glossary.md))
- [knowledge](/knowledge.md))
- [README](README.md)
