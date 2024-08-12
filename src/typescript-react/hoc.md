### 7.5 高阶组件（HOC）

高阶组件（Higher-Order Component, HOC）是 React 中一种强大的设计模式，用于复用组件逻辑和功能。它允许你通过组合组件来扩展功能，而不是直接修改组件。

---

## 7.5.1 什么是高阶组件

### **定义**

高阶组件是一个函数，它接受一个组件作为参数，并返回一个新的组件。这个新的组件通常会增强原组件的功能或提供额外的逻辑。

### **示例**

```jsx
// 高阶组件函数
const withLogging = (WrappedComponent) => {
  return class extends React.Component {
    componentDidMount() {
      console.log('Component mounted');
    }

    render() {
      // 将原组件渲染为包装组件
      return <WrappedComponent {...this.props} />;
    }
  };
};

// 使用高阶组件
const MyComponent = (props) => <div>{props.message}</div>;
const MyComponentWithLogging = withLogging(MyComponent);
```

在上面的示例中，`withLogging` 是一个高阶组件，它接受 `MyComponent` 作为参数，并返回一个新组件 `MyComponentWithLogging`。新组件在挂载时会打印一条日志信息，同时保留了原组件的所有功能。

## 7.5.2 高阶组件的用途

### **复用组件逻辑**

高阶组件是一种用于逻辑复用的模式，可以将组件的逻辑和功能抽象到一个高阶组件中，然后在多个组件中使用。

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

// 使用高阶组件
const UserProfile = ({ user }) => <div>{user ? `Hello, ${user.name}` : 'Loading...'}</div>;
const UserProfileWithData = withUserData(UserProfile);
```

### **增强组件功能**

高阶组件可以用来扩展组件的功能，如添加权限检查、日志记录、数据获取等。

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

// 使用高阶组件
const AdminPanel = () => <div>Admin Panel</div>;
const AdminPanelWithAuthorization = withAuthorization(AdminPanel, 'admin');
```

## 7.5.3 高阶组件的注意事项

### **不要修改原组件**

高阶组件应当不修改原组件的行为和实现，而是通过组合的方式来增强功能。这确保了原组件的可重用性和可维护性。

### **传递 props**

高阶组件应当将所有接收到的 `props` 传递给原组件。这保证了原组件能够接收到它所需的所有属性。

```jsx
const withExtraProps = (WrappedComponent) => {
  return (props) => <WrappedComponent {...props} extraProp="value" />;
};
```

### **避免命名冲突**

高阶组件可能会引入新的 `props` 或状态，确保这些不会与原组件中的 `props` 或状态发生冲突。

### **组件的静态方法**

如果原组件有静态方法，使用高阶组件时要注意这些静态方法不会被自动继承。可以使用 `hoist-non-react-statics` 库来解决这个问题。

```jsx
import hoistNonReactStatic from 'hoist-non-react-statics';

const withExtraProps = (WrappedComponent) => {
  class HOC extends React.Component {
    // HOC 实现
    render() {
      return <WrappedComponent {...this.props} extraProp="value" />;
    }
  }

  return hoistNonReactStatic(HOC, WrappedComponent);
};
```

## 7.5.4 高阶组件与其他模式的比较

### **与 Render Props 比较**

- **高阶组件**：通过创建一个新组件来扩展原组件的功能。
- **Render Props**：通过向组件传递一个函数来共享代码。两者都可以用于逻辑复用，但实现方式不同。

### **与 Hooks 比较**

- **高阶组件**：使用组件组合来增强功能。
- **Hooks**：使用函数和 hooks 来复用状态逻辑。Hooks 更加简洁和灵活，但仍然需要高阶组件用于某些场景。

---

理解高阶组件的概念和使用场景，可以帮助你更好地管理和复用 React 组件的逻辑。高阶组件是 React 中一个强大的模式，通过它可以提升代码的可复用性和可维护性。