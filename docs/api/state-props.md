### State & Props API

In React, `state` and `props` are two core concepts used to manage a component's data and pass information. They play different roles throughout a component's lifecycle.

#### 1. State API

**Overview**:
- `state` is a component's internal data. Each component can maintain its own `state` and update it at any point in its lifecycle.
- `state` is initialized in the component's constructor and updated via the `this.setState` method.

**Related APIs**:

- **`this.state`**: accesses the component's current `state` object.

  ```jsx
  class MyComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 0
      };
    }

    render() {
      return <div>Count: {this.state.count}</div>;
    }
  }
  ```

- **`this.setState()`**: updates `state`. `setState` is asynchronous, so React batches `state` updates and triggers a re-render once the update completes.

  ```jsx
  class MyComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 0
      };
    }

    increment = () => {
      this.setState(prevState => ({
        count: prevState.count + 1
      }));
    };

    render() {
      return (
        <div>
          Count: {this.state.count}
          <button onClick={this.increment}>Increment</button>
        </div>
      );
    }
  }
  ```

- **`this.setState(callback)`**: `setState`'s callback runs after `state` has been updated and the component has re-rendered; use it for logic that depends on the latest `state`.

  ```jsx
  this.setState({ count: this.state.count + 1 }, () => {
    console.log('State has been updated:', this.state.count);
  });
  ```

- **`this.forceUpdate()`**: forces the component to re-render. Generally not recommended, since `setState` should cover most update scenarios.

  ```jsx
  this.forceUpdate();
  ```

#### 2. Props API

**Overview**:
- `props` are data passed from a parent component to a child component. `props` are read-only; the child cannot modify them.
- `props` configure a child component's behavior and what it displays.

**Related APIs**:

- **`this.props`**: accesses the component's `props` object.

  ```jsx
  class MyComponent extends React.Component {
    render() {
      return <div>Hello, {this.props.name}!</div>;
    }
  }

  // Use the component
  <MyComponent name="Alice" />
  ```

- **`defaultProps`**: defines a component's default `props` values. If the parent doesn't pass certain `props`, the defaults are used.

  ```jsx
  class MyComponent extends React.Component {
    static defaultProps = {
      name: 'Default Name'
    };

    render() {
      return <div>Hello, {this.props.name}!</div>;
    }
  }
  ```

- **Prop Types**: type-checks a component's `props` to make sure the passed `props` match the expected types and shapes.

  ```jsx
  import PropTypes from 'prop-types';

  class MyComponent extends React.Component {
    static propTypes = {
      name: PropTypes.string.isRequired,
      age: PropTypes.number
    };

    render() {
      return <div>Hello, {this.props.name}!</div>;
    }
  }
  ```

- **Using PropTypes**:

  ```jsx
  MyComponent.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number
  };
  ```

#### React 18 → 19 Version Comparison

The body of this page is based on React 18. React 19 removed the legacy styles of props defaults and type validation covered on this page; the table below is for upgrade reference:

| API | React 18 Status | React 19 Change | Notes |
| --- | --- | --- | --- |
| `this.state` | Class component state | No change | — |
| `this.setState()` | Stable | No change | — |
| `this.forceUpdate()` | Available (deprecated) | No change | — |
| `this.props` | Class component props | No change | — |
| `defaultProps` | Available | **Removed** on function components | Retained on class components; for function components use ES6 default parameters `function A({ x = 1 })` |
| `propTypes` | Available (runtime validation) | **Ignored** | No more runtime validation; use a type solution such as TypeScript |

Source: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

#### Summary

- **State**: stores and manages a component's internal data, letting the component update itself in response to user interaction or other events.
- **Props**: pass data and callbacks from a parent to a child, keeping the component's configuration and behavior controllable from the outside.

Understanding how `state` and `props` work — and how they differ — is the foundation of building and managing React components. `state` manages a component's internal state, while `props` let a component receive external data and render from it.

## References

- [React Official Docs · Managing State](https://react.dev/learn/managing-state)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [component-api](component-api.md)
- [glossary](glossary.md))