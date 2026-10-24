### Component-Based Development

---

## 1. The Concept of Componentization

Component-based development is a key idea in modern frontend development. It breaks the user interface into reusable, independent modules, each called a "component." The core idea is to decompose complex UI structures into smaller, simpler, more maintainable components, which improves code reuse and maintainability.

### 1.1 Defining a Component

In React, a component is the basic building block of the UI. Each component can manage its own state, receive props, and is responsible for rendering UI. A component can be either a function component or a class component.

### 1.2 Benefits of Components

- **Reusability**: Components can be reused in different places, reducing duplicate code.
- **Modularity**: Each component can be developed, tested, and maintained independently.
- **Clear separation**: By dividing into components, logic and styling can be organized and separated more clearly.
- **Maintainability**: Small components are easy to understand and modify, making the overall code structure more maintainable.

## 2. Types of Components

### 2.1 Function Components

A function component is a JavaScript function that takes `props` as a parameter and returns JSX. It is the recommended way to create simple components.

```jsx
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}
```

### 2.2 Class Components

A class component is a class created by extending `React.Component`. It must include a `render` method, which returns JSX. Class components can include more features, such as lifecycle methods.

```jsx
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

### 2.3 Stateful and Stateless Components

- **Stateful components**: manage their own state (`state`) and respond to user interaction. Typically class components or function components using the `useState` hook.

- **Stateless components**: do not manage state, only render UI. Typically function components.

## 3. The Anatomy of a Component

### 3.1 Component Structure

Each component usually consists of the following parts:

- **Props**: the component's input parameters, which pass data into the component.
- **State**: the component's internal state, used to manage and control the component's behavior.
- **Lifecycle methods**: used to handle the component's mounting, updating, and unmounting processes (class components only).

### 3.2 Component Composition

Components can be nested and composed to form more complex UI structures. A parent component can pass data and callback functions to child components as `props`, and child components can receive this data through `props` and render the UI.

```jsx
function ParentComponent() {
  return (
    <div>
      <ChildComponent message="Hello from parent!" />
    </div>
  );
}

function ChildComponent(props) {
  return <p>{props.message}</p>;
}
```

## 4. The Component Lifecycle

### 4.1 Class Component Lifecycle Methods

Class components provide a series of lifecycle methods, used to perform specific actions at different stages of the component's life:

- **componentDidMount**: called after the component mounts.
- **componentDidUpdate**: called after the component updates.
- **componentWillUnmount**: called before the component unmounts.

### 4.2 Function Component Lifecycle

Function components use hooks to simulate lifecycle behavior:

- **useEffect**: used to handle side effects, equivalent to a class component's `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`.

```jsx
import { useEffect } from 'react';

function ExampleComponent() {
  useEffect(() => {
    // Code that runs when the component mounts
    return () => {
      // Code that runs when the component unmounts
    };
  }, []); // An empty array means it only runs on mount and unmount

  return <div>Example Component</div>;
}
```

## 5. Component State Management

### 5.1 Ways to Manage State

- **Internal state**: managed through the component's `state` property or the `useState` hook.
- **External state**: managed using a state management library (such as Redux or MobX) for application-level state.

### 5.2 Updating State

A component's state can be updated via the `setState` method (class components) or the `useState` hook (function components). State updates trigger a re-render of the component.

Class component:

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

Function component:

```jsx
import { useState } from 'react';

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

## 6. Testing Components

Testing components ensures their behavior and rendering meet expectations. Common testing tools include Jest and React Testing Library.

### 6.1 Basic Testing

- **Render tests**: verify that the component renders correctly.
- **Behavior tests**: simulate user interaction and verify the component's response.

```jsx
// Using React Testing Library
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('renders count and increments on button click', () => {
  render(<Counter />);
  const countElement = screen.getByText(/Count:/i);
  expect(countElement).toHaveTextContent('Count: 0');
  
  const button = screen.getByText(/Increment/i);
  fireEvent.click(button);
  expect(countElement).toHaveTextContent('Count: 1');
});
```

## React 18 → 19 Comparison

The body of this page follows React 18. The table below maps this page's component patterns to React 19:

| Pattern | React 18 status | React 19 change | Notes |
| --- | --- | --- | --- |
| Function component `defaultProps` | Available | **Removed** | Use ES6 default parameters; class components retain it |
| Function component `propTypes` | Runtime validation | **Ignored** | Migrate to type systems such as TypeScript |
| `forwardRef` | Required to forward ref | **No longer required** | ref is passed directly as a prop; `forwardRef` still works |
| `useRef()` with no argument | Type permits it | **TypeScript requires an argument** | Write `useRef(undefined)`; all refs are now mutable |
| StrictMode double render | Already present | **Behavior refined** | `useMemo` / `useCallback` reuse the first result; ref callbacks double-call on initial mount |
| `react-test-renderer` | Available | **Deprecated** | Move tests to React Testing Library; see [Testing tools](../projects/testing-tools.md) |

Reference: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

## 7. Summary

Component-based development is one of React's core ideas. It makes building user interfaces more modular, reusable, and maintainable. By understanding component definition, lifecycle, state management, and testing, you can effectively develop and manage complex user interfaces. Component-based development not only improves development efficiency but also raises the quality and maintainability of the application.

## References

- [React official docs · Describing the UI](https://react.dev/learn/describing-the-ui)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [glossary](/glossary.md))
- [README](README.md)
