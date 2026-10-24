### React Core API Reference

This organizes React's core APIs by purpose, covering JSX, components, lifecycle, Hooks, Context, Refs, Portals, and the Profiler, each with common usage examples.

#### 20.1 JSX Syntax & JSX-related APIs

**JSX syntax**:
- **Definition**: JSX (JavaScript XML) is a syntax extension of JavaScript that lets you write HTML-like code in JavaScript. JSX is compiled into JavaScript expressions that create React elements.
- **Usage**: JSX syntax is used to create the UI structure of React elements and components. It allows nested HTML elements, JavaScript expressions, and component definitions.

**Example**:

```jsx
// Create a simple component
const HelloWorld = () => {
  return <h1>Hello, World!</h1>;
};
```

**JSX-related APIs**:
- **`React.createElement`**: when JSX syntax is compiled to JavaScript, `React.createElement` is called to create the element.

  **Example**:
  ```javascript
  React.createElement('h1', null, 'Hello, World!');
  ```

#### 20.2 Component-related APIs

**React.Component**:
- **Definition**: `React.Component` is a base class provided by React, used to create components with lifecycle methods and state.
- **Usage**: extend `React.Component` and implement the `render` method to define the component's UI.

**Example**:

```jsx
class MyComponent extends React.Component {
  render() {
    return <div>My Component</div>;
  }
}
```

**React.PureComponent**:
- **Definition**: `React.PureComponent` is a subclass of `React.Component` that provides shallow comparison to optimize render performance.
- **Usage**: like `React.Component`, but with a default `shouldComponentUpdate` method.

**Example**:

```jsx
class MyPureComponent extends React.PureComponent {
  render() {
    return <div>My Pure Component</div>;
  }
}
```

#### 20.3 Lifecycle Methods

**Common lifecycle methods**:
- **`componentDidMount`**: called after the component mounts, used to run side effects.
- **`componentDidUpdate`**: called after the component updates, used to respond to changes in state or props.
- **`componentWillUnmount`**: called before the component unmounts, used for cleanup.
- **`shouldComponentUpdate`**: controls whether the component re-renders.

**Example**:

```jsx
class LifecycleComponent extends React.Component {
  componentDidMount() {
    console.log('Component did mount');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Component did update');
  }

  componentWillUnmount() {
    console.log('Component will unmount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.value !== this.props.value;
  }

  render() {
    return <div>{this.props.value}</div>;
  }
}
```

#### 20.4 State & Props API

**State**:
- **Definition**: the component's local state, used to hold the component's dynamic data.
- **Usage**: accessed via `this.state`, updated with `this.setState`.

**Example**:

```jsx
class StatefulComponent extends React.Component {
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

**Props**:
- **Definition**: external data passed to a component through attributes.
- **Usage**: accessed via `this.props`; props are read-only and cannot be modified.

**Example**:

```jsx
const FunctionalComponent = (props) => {
  return <div>{props.message}</div>;
};

// Use the component
<FunctionalComponent message="Hello, Props!" />
```

#### 20.5 ReactDOM & Rendering-related APIs

**ReactDOM.render**:
- **Definition**: renders a React element into a DOM node.
- **Usage**: use `ReactDOM.render` to mount a component onto a specified DOM element.

**Example**:

```jsx
ReactDOM.render(<App />, document.getElementById('root'));
```

**ReactDOM.hydrate**:
- **Definition**: performs client rendering on top of server-rendered HTML, restoring the already-rendered HTML state.
- **Usage**: like `ReactDOM.render`, but intended for server-side rendering scenarios.

**Example**:

```jsx
ReactDOM.hydrate(<App />, document.getElementById('root'));
```

#### 20.6 Hooks API

**`useState`**:
- **Definition**: adds state to a function component.
- **Usage**: returns a state variable and an update function.

**Example**:

```jsx
const [count, setCount] = useState(0);
```

**`useEffect`**:
- **Definition**: handles side effects in a function component.
- **Usage**: can run side effects such as data fetching, subscriptions, and DOM operations.

**Example**:

```jsx
useEffect(() => {
  // Side-effect code
  return () => {
    // Clean up the side effect
  };
}, [dependencies]);
```

**`useContext`**:
- **Definition**: accesses context values in a function component.
- **Usage**: use `useContext` to get the value of a `Context`.

**Example**:

```jsx
const value = useContext(MyContext);
```

**`useReducer`**:
- **Definition**: manages complex state logic in a function component.
- **Usage**: use a `reducer` function and a `dispatch` method to manage state.

**Example**:

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

**`useCallback`**, **`useMemo`**, and **`useRef`**:
- **`useCallback`**: returns a memoized callback function.
- **`useMemo`**: returns a memoized computed result.
- **`useRef`**: returns a mutable `ref` object.

**Example**:

```jsx
const memoizedCallback = useCallback(() => { /* callback */ }, [dependencies]);
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
const myRef = useRef(null);
```

#### 20.7 Context API & Related Usage

**Context**:
- **Definition**: used to pass data through the component tree without threading it through props at every level.
- **Usage**: create a context object, then use `Provider` and `Consumer` components to provide and consume context data.

**Example**:

```jsx
const MyContext = React.createContext(defaultValue);

const ProviderComponent = ({ value, children }) => {
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

const ConsumerComponent = () => {
  const contextValue = useContext(MyContext);
  return <div>{contextValue}</div>;
};
```

#### 20.8 Refs & DOM Interaction APIs

**`React.createRef`**:
- **Definition**: creates a `ref` object for accessing a DOM element or a React component instance.
- **Usage**: assign the `ref` to an element and access it via `ref.current`.

**Example**:

```jsx
const myRef = React.createRef();

const MyComponent = () => (
  <div ref={myRef}>Hello</div>
);
```

**`useRef`**:
- **Definition**: creates a `ref` object in a function component.
- **Usage**: like `createRef`, but used in function components.

**Example**:

```jsx
const myRef = useRef(null);
```

#### 20.9 Portals & Profiler API

**Portals**:
- **Definition**: allows children to be rendered into a DOM node outside the parent component.
- **Usage**: use `ReactDOM.createPortal` to render children into a specified DOM node.

**Example**:

```jsx
ReactDOM.createPortal(<div>Portal Content</div>, document.getElementById('portal-root'));
```

**Profiler**:
- **Definition**: used to analyze the performance of a React app.
- **Usage**: wrap the part you want to profile with the `Profiler` component and provide a performance callback.

**Example**:

```jsx
<Profiler id="MyComponent" onRender={(id, phase, actualDuration) => {
  console.log(id, phase, actualDuration);
}}>
  <MyComponent />
</Profiler>
```

#### React 18 → 19 Version Comparison

The body of each section in this chapter is based on React 18. The table below summarizes React 19's changes by section; see each chapter's page for item-by-item comparisons:

| Section | React 19 Change |
| --- | --- |
| 20.1 JSX & JSX-related APIs | No change except `forwardRef`; `createFactory` removed, the new JSX transform is required |
| 20.2 Component-related APIs | No change; class components remain a valid style |
| 20.3 Lifecycle Methods | The methods themselves are unchanged; render-phase errors are no longer rethrown |
| 20.4 State & Props API | `defaultProps` removed from function components, `propTypes` ignored |
| 20.5 ReactDOM & Rendering-related APIs | `render` / `hydrate` / `unmountComponentAtNode` / `findDOMNode` all removed |
| 20.6 Hooks API | No change; adds `use`, `useActionState`, `useOptimistic` |
| 20.7 Context API | `<Context>` can serve directly as the Provider |
| 20.8 Refs & DOM Interaction APIs | `ref` becomes a regular prop, `forwardRef` no longer needed in most cases; callback refs can return a cleanup function |
| 20.9 Portals & Profiler API | No change |

Source: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

#### Summary

This covers React's core APIs by JSX, components, lifecycle, Hooks, Context, Refs, Portals, and Profiler, noting where each is used in component development and performance analysis.

## References

- [React Official Docs · React Reference](https://react.dev/reference/react)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [glossary](glossary.md))