### JSX Syntax & JSX-related APIs

JSX is a very important syntax extension in React. It lets you write HTML-like code in JavaScript, which makes UI descriptions far more intuitive. Below is a detailed walkthrough of the basic JSX syntax and related APIs:

#### JSX Syntax

**1. Basic syntax**

- **JSX syntax** lets you embed HTML structure in JavaScript. It is actually a syntactic sugar over JavaScript and is ultimately compiled down to `React.createElement` calls.

```jsx
const element = <h1>Hello, world!</h1>;
```

**2. Attributes**

- **Attributes** use HTML-like syntax in JSX. Attribute names use camelCase rather than HTML's lowercase names.

```jsx
const element = <img src="logo.png" alt="Logo" />;
```

- **Boolean attributes** in JSX: if the value is `true`, write just the attribute name. If it is `false`, the attribute is not rendered at all.

```jsx
const element = <input type="checkbox" checked />;
```

**3. Nesting**

- **Nested elements** can be nested directly in JSX. JSX supports nested structures much like nested HTML tags.

```jsx
const element = (
  <div>
    <h1>Hello, world!</h1>
    <p>Welcome to learning React!</p>
  </div>
);
```

**4. Expressions**

- **Expressions** can be wrapped in curly braces `{}` in JSX. This lets you interpolate JavaScript expressions into JSX.

```jsx
const name = 'John';
const element = <h1>Hello, {name}!</h1>;
```

**5. Conditional rendering**

- **Conditional rendering** can be controlled with JavaScript operators such as the ternary operator or the logical AND operator.

```jsx
const isLoggedIn = true;
const element = (
  <div>
    {isLoggedIn ? <p>Welcome back!</p> : <p>Please sign up.</p>}
  </div>
);
```

**6. List rendering**

- **List rendering** generates an array of elements with `map()`, letting you render list data in JSX.

```jsx
const numbers = [1, 2, 3, 4];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>{number}</li>
);
const element = <ul>{listItems}</ul>;
```

**7. JSX comments**

- **Comments** in JSX use the `{/* comment */}` syntax, not JavaScript's `//` or `/* */` comment syntax.

```jsx
const element = (
  <div>
    {/* This is a comment */}
    <h1>Hello, world!</h1>
  </div>
);
```

#### JSX-related APIs

**1. `React.createElement`**

- **Definition**: creates a React element. JSX is compiled into `React.createElement` calls.
- **Usage**: `React.createElement(type, props, ...children)`.

**Example**:

```jsx
const element = React.createElement('h1', { className: 'title' }, 'Hello, world!');
```

**2. `React.cloneElement`**

- **Definition**: clones a React element, optionally adding new props or children.
- **Usage**: `React.cloneElement(element, [props], [...children])`.

**Example**:

```jsx
const element = <button>Click me</button>;
const clonedElement = React.cloneElement(element, { className: 'btn' });
```

**3. `React.createContext`**

- **Definition**: creates a context object for sharing data across the component tree.
- **Usage**: `const MyContext = React.createContext(defaultValue)`.

**Example**:

```jsx
const MyContext = React.createContext('default value');
```

**4. `React.forwardRef`**

- **Definition**: forwards refs to a child component. Used for ref forwarding in function components.
- **Usage**: `const ForwardedComponent = React.forwardRef((props, ref) => { /* component code */ })`.

**Example**:

```jsx
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="fancy-button">
    {props.children}
  </button>
));
```

**5. `React.Fragment`**

- **Definition**: returns multiple child elements without adding extra DOM nodes.
- **Usage**: `<React.Fragment>...</React.Fragment>`, or the shorthand `<></>`.

**Example**:

```jsx
const element = (
  <React.Fragment>
    <h1>Hello</h1>
    <p>World</p>
  </React.Fragment>
);
```

#### React 18 → 19 Version Comparison

The body of this page is based on React 18. The table below maps this page's JSX-related APIs to React 19:

| API | React 18 Status | React 19 Change | Notes |
| --- | --- | --- | --- |
| `React.createElement` | Stable | No change | — |
| `React.cloneElement` | Stable | No change | — |
| `React.createContext` | Stable since 16.3 | No change | — |
| `React.forwardRef` | Stable since 16.3 | Still usable, no longer needed in most cases | A function component's `ref` becomes a regular prop and can be received directly; official deprecation is planned for a future version |
| `React.Fragment` | Stable | No change | — |

Other React 19 changes related here: `React.createFactory` is removed (use JSX instead); the new JSX transform must be enabled, otherwise you get a runtime warning.

Source: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

#### Summary

JSX is a powerful syntax extension provided by React that lets developers define UI structure in a more intuitive way. It combines the expressiveness of JavaScript with the structural description of HTML, making React's componentized development more efficient and easier to understand. JSX syntax and its related APIs are the common way to describe complex React user interfaces.

## References

- [React Official Docs · createElement](https://react.dev/reference/react/createElement)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [glossary](glossary.md))