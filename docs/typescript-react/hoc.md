### 7.5 Higher-Order Components (HOC)

A Higher-Order Component (HOC) is a powerful design pattern in React for reusing component logic and functionality. It lets you extend functionality by composing components rather than modifying a component directly.

---

## 7.5.1 What Is a Higher-Order Component

### Definition

A Higher-Order Component is a function that takes a component as a parameter and returns a new component. This new component usually enhances the original component's functionality or adds extra logic.

### Example

```jsx
// Higher-order component function
const withLogging = (WrappedComponent) => {
  return class extends React.Component {
    componentDidMount() {
      console.log('Component mounted');
    }

    render() {
      // Render the original component as the wrapped component
      return <WrappedComponent {...this.props} />;
    }
  };
};

// Using the higher-order component
const MyComponent = (props) => <div>{props.message}</div>;
const MyComponentWithLogging = withLogging(MyComponent);
```

In the example above, `withLogging` is a Higher-Order Component. It takes `MyComponent` as a parameter and returns a new component, `MyComponentWithLogging`. The new component logs a message when it mounts while retaining all of the original component's functionality.

## 7.5.2 Uses of Higher-Order Components

### Reusing Component Logic

A Higher-Order Component is a pattern for reusing logic. You can abstract a component's logic and functionality into an HOC and then use it across multiple components.

```jsx
const withUserData = (WrappedComponent) => {
  return class extends React.Component {
    state = { user: null };

    componentDidMount() {
      fetch('/api/user')
        .then(response => response.json())
        .then(user => this.setState({ user }));
    }

    render() {
      return <WrappedComponent user={this.state.user} {...this.props} />;
    }
  };
};

// Using the higher-order component
const UserProfile = ({ user }) => <div>{user ? `Hello, ${user.name}` : 'Loading...'}</div>;
const UserProfileWithData = withUserData(UserProfile);
```

### Enhancing Component Functionality

A Higher-Order Component can be used to extend a component's functionality, such as adding authorization checks, logging, and data fetching.

```jsx
const withAuthorization = (WrappedComponent, requiredRole) => {
  return class extends React.Component {
    render() {
      const { user } = this.props;
      if (user && user.role === requiredRole) {
        return <WrappedComponent {...this.props} />;
      } else {
        return <div>Access Denied</div>;
      }
    }
  };
};

// Using the higher-order component
const AdminPanel = () => <div>Admin Panel</div>;
const AdminPanelWithAuthorization = withAuthorization(AdminPanel, 'admin');
```

## 7.5.3 Notes on Higher-Order Components

### Do Not Modify the Original Component

A Higher-Order Component should not modify the original component's behavior or implementation, but enhance it through composition. This preserves the original component's reusability and maintainability.

### Passing Through Props

A Higher-Order Component should pass all received `props` to the original component. This ensures the original component gets every property it needs.

```jsx
const withExtraProps = (WrappedComponent) => {
  return (props) => <WrappedComponent {...props} extraProp="value" />;
};
```

### Avoiding Name Conflicts

A Higher-Order Component may introduce new `props` or state. Make sure these do not conflict with the original component's `props` or state.

### Static Methods on Components

If the original component has static methods, note that an HOC does not automatically inherit them. You can use the `hoist-non-react-statics` library to solve this.

```jsx
import hoistNonReactStatic from 'hoist-non-react-statics';

const withExtraProps = (WrappedComponent) => {
  class HOC extends React.Component {
    // HOC implementation
    render() {
      return <WrappedComponent {...this.props} extraProp="value" />;
    }
  }

  return hoistNonReactStatic(HOC, WrappedComponent);
};
```

## 7.5.4 Comparing Higher-Order Components with Other Patterns

### Compared with Render Props

- **Higher-Order Components**: extend the original component's functionality by creating a new component.
- **Render Props**: share code by passing a function to a component as a prop. Both can be used for reusing logic, but the implementation differs.

### Compared with Hooks

- **Higher-Order Components**: enhance functionality through component composition.
- **Hooks**: reuse state logic through functions and hooks. Hooks are more concise and flexible, but HOCs are still needed for certain scenarios.

---

Higher-Order Components suit reusing logic outside a component. In my projects I watch the prop types and component name passthrough. HOCs are a powerful pattern in React; used well, they raise code reusability and maintainability.

---

## React 18 → 19 Comparison

The body of this page follows React 18. The table below maps this page's HOC patterns to React 19:

| Pattern | React 18 status | React 19 change | Notes |
| --- | --- | --- | --- |
| `forwardRef` | Required to forward ref | **No longer required** | ref is passed directly as a prop; `forwardRef` still works |
| Function component `defaultProps` | Available | **Removed** | Default values inside an HOC use ES6 default parameters |
| `propTypes` | Runtime validation | **Ignored** | Migrate to type systems such as TypeScript |
| `element.ref` | Readable | **Deprecated** | Read `element.props.ref` instead |
| `React.memo` and the HOC pattern itself | Available | No change | No API change at the pattern level |

Reference: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

## References

- [React official docs · Managing State](https://react.dev/learn/managing-state)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [glossary](/glossary.md))
- [knowledge](/knowledge.md))
- [README](README.md)
- [deep-dive-components](deep-dive-components.md)
