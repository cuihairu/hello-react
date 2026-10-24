### React Core Concepts & API Overview

React is a JavaScript library for building user interfaces; its core concepts and APIs let developers efficiently build and manage componentized applications. Below is an overview of some of React's core concepts and main APIs:

#### 1. Core Concepts

**1.1 Components**

- **Components** are React's core concept; they let you split the UI into independent, reusable pieces. Each component can manage its own state and lifecycle.
- Components come in two kinds: **function components** and **class components**. Function components primarily use Hooks for state management and side effects, while class components use `this.state` and lifecycle methods.

**1.2 JSX**

- **JSX** (JavaScript XML) is a syntax extension of JavaScript that lets you write HTML-like code in JavaScript. JSX makes component structure more intuitive to write and read.
- JSX is compiled into `React.createElement` calls at build time.

**1.3 Virtual DOM**

- The **Virtual DOM** is an optimization technique that improves performance by keeping a virtual DOM tree in memory. React uses the Virtual DOM to diff the current state against the new state and update only the parts of the real DOM that actually changed.

**1.4 State Management**

- **State** stores and manages a component's dynamic data. A component's state can change at runtime and trigger a re-render.
- React manages component state through the `useState` Hook (function components) or `this.state` (class components).

**1.5 Props**

- **Props** are data passed from a parent component to a child component. Props are read-only and cannot be modified directly in the child. They are used for communication between components.

**1.6 Lifecycle**

- The **lifecycle** is the process of a component from creation to destruction. React provides a set of lifecycle methods (class components) and Hooks (function components) that let developers run code at different stages of a component.

**1.7 Hooks**

- **Hooks**, introduced in React 16.8, let function components use state and other React features. Common Hooks include `useState`, `useEffect`, and `useContext`.

**1.8 Context**

- **Context** provides a way to pass data through the component tree without threading it through props at every level. Use `React.createContext` to create a context object, then use `Provider` and `Consumer` to provide and consume the data.

#### 2. Main API Overview

**2.1 `React.createElement`**

- **Definition**: creates a React element representing a node in the UI.
- **Usage**: `React.createElement(type, props, ...children)`.

**Example**:

```jsx
const element = React.createElement('h1', { className: 'title' }, 'Hello, World!');
```

**2.2 `ReactDOM.render`**

- **Definition**: renders a React element into a DOM node.
- **Usage**: `ReactDOM.render(element, container)`.

**Example**:

```jsx
ReactDOM.render(<App />, document.getElementById('root'));
```

**2.3 `useState`**

- **Definition**: adds state to a function component.
- **Usage**: `const [state, setState] = useState(initialState)`.

**Example**:

```jsx
const [count, setCount] = useState(0);
```

**2.4 `useEffect`**

- **Definition**: handles side effects in a function component (such as data fetching, subscriptions, and manual DOM operations).
- **Usage**: `useEffect(() => { /*side-effect code*/ }, [dependencies])`.

**Example**:

```jsx
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);
```

**2.5 `useContext`**

- **Definition**: accesses a context value.
- **Usage**: `const contextValue = useContext(MyContext)`.

**Example**:

```jsx
const value = useContext(MyContext);
```

**2.6 `useReducer`**

- **Definition**: manages complex state logic in a function component.
- **Usage**: `const [state, dispatch] = useReducer(reducer, initialState)`.

**Example**:

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

**2.7 `React.createRef`**

- **Definition**: creates a `ref` object for accessing a DOM element or a React component instance.
- **Usage**: `const myRef = React.createRef()`.

**Example**:

```jsx
const myRef = React.createRef();
```

**2.8 `ReactDOM.hydrate`**

- **Definition**: performs client rendering on top of server-rendered HTML, restoring the already-rendered HTML state.
- **Usage**: `ReactDOM.hydrate(element, container)`.

**Example**:

```jsx
ReactDOM.hydrate(<App />, document.getElementById('root'));
```

**2.9 `Profiler`**

- **Definition**: used for performance analysis, measuring how long components take to render.
- **Usage**: `<Profiler id="MyComponent" onRender={(id, phase, actualDuration) => { /*profiling code*/ }}>`.

**Example**:

```jsx
<Profiler id="MyComponent" onRender={(id, phase, actualDuration) => {
  console.log(id, phase, actualDuration);
}}>
  <MyComponent />
</Profiler>
```

**2.10 `React.createContext`**

- **Definition**: creates a context object.
- **Usage**: `const MyContext = React.createContext(defaultValue)`.

**Example**:

```jsx
const MyContext = React.createContext(defaultValue);
```

**2.11 `ReactDOM.createPortal`**

- **Definition**: allows children to be rendered into a DOM node outside the parent component.
- **Usage**: `ReactDOM.createPortal(child, container)`.

**Example**:

```jsx
ReactDOM.createPortal(<div>Portal Content</div>, document.getElementById('portal-root'));
```

Together, these concepts and APIs form React's everyday working model; how you combine them affects the state boundaries and update paths of complex UIs.

### React 18 → 19 Version Comparison

The body of this page is based on React 18. The table below maps the APIs covered in this overview to React 19:

| API | React 18 Status | React 19 Change | Notes |
| --- | --- | --- | --- |
| `React.createElement` | Stable | No change | — |
| `ReactDOM.render` | Available (deprecated) | **Removed** | Use `createRoot` |
| `useState` / `useEffect` | Stable since 16.8 | No change | — |
| `ReactDOM.createPortal` | Stable | No change | — |

See each topic page for the full comparison of every API.

Source: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

## References

- [React Official Docs · React Reference](https://react.dev/reference/react)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)