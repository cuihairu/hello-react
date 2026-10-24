### Components Deep Dive

This page collects React's core component concepts and features, covering the `render` method, how `setState` works, the synthetic event system, Higher-Order Components (HOC), Render Props, using `refs`, the `Context API`, `Portals`, `Profiler`, and error boundaries. All of these come in handy when reusing, updating, or profiling components for performance.

---

## 7.1 The render Method and Component Rendering

### 7.1.1 The `render` Method

- **Purpose**: the `render` method is the heart of a React component, used to define the component's UI output. It is called every time the component's `props` or `state` changes.

- **Implementation**: the `render` method should be a pure function, meaning it should not perform side effects (such as data fetching or DOM manipulation). It should return the component's JSX description.

  ```jsx
  class MyComponent extends React.Component {
    render() {
      return <div>{this.props.message}</div>;
    }
  }
  ```

- **Component updates**: when `props` or `state` changes, the `render` method is called again to update the component's displayed content.

### 7.1.2 The Component Rendering Process

1. **Initial render**: after the component is instantiated, the `render` method is called for the first time, producing a Virtual DOM and updating the real DOM.

2. **Update render**: when the component's `props` or `state` changes, the `render` method is called again, computing a new Virtual DOM. React compares the old and new Virtual DOM and updates the real DOM.

3. **Performance optimization**: using `shouldComponentUpdate` or `React.memo` can avoid unnecessary re-renders.

  ```jsx
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.value !== this.props.value;
  }
  ```

  ```jsx
  const MemoizedComponent = React.memo(MyComponent);
  ```

## 7.2 How setState Works

### 7.2.1 Basic Functionality of setState

- **Purpose**: `setState` is used to update the component's `state` and trigger a re-render.

- **Asynchronous updates**: `setState` is asynchronous. React batches multiple `setState` calls into a single update to improve performance.

  ```jsx
  this.setState({ count: this.state.count + 1 });
  ```

### 7.2.2 Batching and Merging

- **Batched updates**: multiple `setState` calls are merged into a single update to avoid frequent renders.

  ```jsx
  this.setState({ count: this.state.count + 1 });
  this.setState({ count: this.state.count + 2 });
  ```

- **Updater functions**: `setState` can take a function as an argument, to update state based on the previous state.

  ```jsx
  this.setState(prevState => ({ count: prevState.count + 1 }));
  ```

## 7.3 The Synthetic Event System

### 7.3.1 Event Handling

- **Purpose**: React's synthetic event system provides a cross-browser consistent event handling mechanism, wrapping native events.

- **Event binding**: use JSX syntax to bind event handler functions.

  ```jsx
  <button onClick={this.handleClick}>Click me</button>
  ```

- **Event object**: the synthetic event object is similar to the native event object, but in React it is synthetic.

  ```jsx
  handleClick(event) {
    console.log(event.nativeEvent); // Native event object
  }
  ```

### 7.3.2 Event Delegation

- **Mechanism**: React uses an event delegation mechanism, binding event handlers on the root element to reduce memory usage.

  ```jsx
  ReactDOM.render(<App />, document.getElementById('root'));
  ```

## 7.4 Higher-Order Components (HOC)

### 7.4.1 Definition and Use

- **Definition**: a Higher-Order Component (HOC) is a function that takes a component as a parameter and returns a new component. It is used to reuse component logic.

  ```jsx
  function withLogging(WrappedComponent) {
    return class extends React.Component {
      componentDidMount() {
        console.log('Component mounted');
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    };
  }
  ```

### 7.4.2 Use Cases

- **Enhancing component functionality**: an HOC can add extra functionality to a component, such as logging, authorization checks, and so on.

  ```jsx
  const EnhancedComponent = withLogging(MyComponent);
  ```

## 7.5 Render Props

### 7.5.1 Definition and Use

- **Definition**: Render Props is a technique that passes a function as a `prop` to a component, letting the child component decide how to render content.

  ```jsx
  class DataProvider extends React.Component {
    state = { data: 'Some data' };

    render() {
      return this.props.render(this.state.data);
    }
  }

  function MyComponent() {
    return (
      <DataProvider render={data => <div>{data}</div>} />
    );
  }
  ```

### 7.5.2 Use Cases

- **Dynamic rendering**: useful when you need to render content dynamically, increasing component flexibility and reusability.

## 7.6 Using and Managing Refs

### 7.6.1 Definition and Use

- **Definition**: `refs` are a way for React to access component or DOM element instances.

  ```jsx
  class MyComponent extends React.Component {
    constructor(props) {
      super(props);
      this.myRef = React.createRef();
    }

    componentDidMount() {
      console.log(this.myRef.current); // Access the DOM element
    }

    render() {
      return <div ref={this.myRef}>Hello World</div>;
    }
  }
  ```

### 7.6.2 Use Cases

- **Direct DOM access**: used when you need to directly access or manipulate DOM elements, such as focus management and animations.

## 7.7 Using the Context API

### 7.7.1 Definition and Use

- **Definition**: the `Context API` lets components share state without passing it through `props` layer by layer.

  ```jsx
  const MyContext = React.createContext();

  class Provider extends React.Component {
    render() {
      return (
        <MyContext.Provider value="Some value">
          {this.props.children}
        </MyContext.Provider>
      );
    }
  }

  function ConsumerComponent() {
    return (
      <MyContext.Consumer>
        {value => <div>{value}</div>}
      </MyContext.Consumer>
    );
  }
  ```

### 7.7.2 Use Cases

- **Global state**: useful when state needs to be shared across many components, such as theming and language settings.

## 7.8 Portals: Use Cases and Implementation

### 7.8.1 Definition and Use

- **Definition**: `Portals` allow child nodes to render into a different part of the DOM instead of their parent component's DOM tree.

  ```jsx
  import ReactDOM from 'react-dom';

  function Modal({ children }) {
    return ReactDOM.createPortal(
      <div className="modal">{children}</div>,
      document.body
    );
  }
  ```

### 7.8.2 Use Cases

- **Modals and tooltips**: useful when components need to render outside the DOM tree, such as modals, tooltips, and so on.

## 7.9 Profiler: Usage and Performance Analysis

### 7.9.1 Definition and Use

- **Definition**: `Profiler` is a performance analysis tool provided by React, used to measure component rendering performance.

  ```jsx
  import { Profiler } from 'react';

  function onRenderCallback(id, phase, actualDuration, baseDuration, startTime, commitTime, interactions) {
    console.log('Profiler callback:', { id, phase, actualDuration });
  }

  function App() {
    return (
      <Profiler id="App" onRender={onRenderCallback}>
        <MyComponent />
      </Profiler>
    );
  }
  ```

### 7.9.2 Use Cases

- **Performance optimization**: used to analyze rendering bottlenecks, helping optimize the application's rendering performance.

## 7.10 Error Boundaries: Implementation and Best Practices

### 7.10.1 Definition and Use

- **Definition**: an error boundary is a React mechanism for catching JavaScript errors that occur in a component tree, preventing the entire application from crashing.

  ```jsx
  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
      return { hasError: true };
    }

    componentDidCatch(error, info) {
      console.log('Error occurred:', error, info);
    }

    render() {
      if (this.state.hasError) {
        return <h1>Something went wrong.</h1>;
      }

      return this.props.children;
    }
  }
  ```

### 7.10.2 Use Cases

- **Error handling**: used to handle JavaScript errors in a component tree, providing user-friendly error information and preventing the application from crashing.

---

## React 18 → 19 Comparison

The body of this chapter follows React 18. The table below summarizes the React 19 changes across this chapter's pages; see each page's own comparison table for details:

| Topic | React 19 change | See |
| --- | --- | --- |
| `forwardRef` | No longer required once ref is a prop | [Higher-Order Components](hoc.md), [Render Props](render-props.md) |
| String refs, `findDOMNode` | **Removed**; use a ref callback / `useRef` | [Refs](refs.md) |
| `useRef` types | **Must pass an argument**; all `RefObject` are mutable | [Refs](refs.md) |
| Legacy Context | **Removed**; `<Context>` can serve as a Provider directly | [Context API](context-api.md) |
| render error handling | No longer re-thrown; added `onUncaughtError` / `onCaughtError` | [Error Boundaries](error-boundaries.md) |
| Events | `javascript:` URLs error; empty `src` / `href` warn | [Synthetic Events](synthetic-events.md) |
| State updates | Broader batching; rendering-phase updates in a loop throw | [setState](setstate.md) |

Reference: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

## References

- [React official docs · Describing the UI](https://react.dev/learn/describing-the-ui)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [glossary](/glossary.md))
