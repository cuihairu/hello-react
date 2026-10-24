### Component-related APIs: `React.Component` and `React.PureComponent`

In React, components are the basic building blocks of the user interface. React provides two primary classes for defining components: `React.Component` and `React.PureComponent`. Both create React components, but they differ in some important behavioral ways.

#### `React.Component`

`React.Component` is the base class for React components, used to define a standard component. Using `React.Component` lets you create class components that have state and lifecycle methods. Every component must define a `render` method, which returns the React element to be rendered.

**Basic usage**:

```jsx
import React from 'react';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  handleClick = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.handleClick}>Increment</button>
      </div>
    );
  }
}

export default MyComponent;
```

**Key features**:

- **State management**: `React.Component` lets a component maintain local state (via `this.state`).
- **Lifecycle methods**: supports a full set of lifecycle methods such as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`, letting you run code at different stages of the component's lifecycle.
- **Event handling**: you can attach event handlers to respond to user interaction or other events.
- **Performance**: on every update, `React.Component`'s `render` method is called, which can cause unnecessary re-renders.

#### `React.PureComponent`

`React.PureComponent` is a variant of `React.Component`. Its implementation is similar, but it includes one important performance optimization: it automatically implements a shallow comparison method to decide whether the component needs to re-render. If a component's props and state have not changed, `React.PureComponent` skips the re-render entirely.

**Basic usage**:

```jsx
import React from 'react';

class MyPureComponent extends React.PureComponent {
  render() {
    return (
      <div>
        <p>{this.props.message}</p>
      </div>
    );
  }
}

export default MyPureComponent;
```

**Key features**:

- **Performance optimization**: `React.PureComponent`'s `shouldComponentUpdate` performs shallow comparison to avoid unnecessary re-renders.
- **Simpler development**: no need to implement `shouldComponentUpdate` manually; shallow comparison optimizes performance automatically.
- **Limitation**: because only shallow comparison is performed, complex objects (such as nested objects or arrays) may not be detected correctly, which can lead to spurious re-renders.

#### React 18 → 19 Version Comparison

The body of this page is based on React 18. The table below maps the two class-component base classes to React 19:

| API | React 18 Status | React 19 Change | Notes |
| --- | --- | --- | --- |
| `React.Component` | Class component base | No change | Class components remain valid in React 19 |
| `React.PureComponent` | Stable | No change | — |

React 19's changes that affect class components center on props validation and default values: `defaultProps` is removed from function components and `propTypes` is ignored; both are retained on class components but are legacy. See [State & Props API](state-props.md).

Source: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

#### Comparison Summary

- **`React.Component`**: suits components that need custom render logic or lifecycle control. It offers flexibility, but can lead to performance issues, especially when a component updates frequently.
- **`React.PureComponent`**: suits components that need performance optimization and have infrequent props/state changes. It reduces unnecessary renders through shallow comparison, improving render efficiency.

Choosing between `React.Component` and `React.PureComponent` mostly comes down to the component's specific needs and performance requirements. `React.PureComponent` improves performance effectively in most cases, but make sure its comparison mechanism fits the structure of your component's props and state.

## References

- [React Official Docs · Component](https://react.dev/reference/react/Component)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [react-extensions](react-extensions.md)
- [glossary](glossary.md))- [knowledge](knowledge.md))