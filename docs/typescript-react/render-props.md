### 7.6 The Render Props Pattern

The Render Props pattern is a design pattern in React for sharing code and logic between components. It achieves component logic reuse and flexible UI design by passing a function as a `prop` to a component and rendering dynamic content in that function.

---

## 7.6.1 What Are Render Props

### Definition

Render Props is a pattern in which a function is passed as a `prop` to a component. This function receives the component's state or data and returns a React element used to render the component's UI.

### Example

```jsx
class DataFetcher extends React.Component {
  state = { data: null };

  componentDidMount() {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  render() {
    // render the child component using the render prop
    return this.props.render(this.state.data);
  }
}

const App = () => (
  <DataFetcher
    render={data => (
      <div>
        {data ? <p>Data: {data}</p> : <p>Loading...</p>}
      </div>
    )}
  />
);
```

In this example, the `DataFetcher` component receives a `render` function as a `prop` and calls it in the `render` method to render the UI. The `App` component passes a function as the `render` prop, deciding what content to show based on the data's state.

## 7.6.2 Uses of Render Props

### Reusing Logic

The Render Props pattern is well suited to reusing component logic. You can encapsulate logic in a component and pass it to other components via a render prop.

```jsx
class WindowSize extends React.Component {
  state = { width: window.innerWidth };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    return this.props.render(this.state.width);
  }
}

const App = () => (
  <WindowSize
    render={width => (
      <div>
        <p>Window width: {width}px</p>
      </div>
    )}
  />
);
```

In this example, the `WindowSize` component manages the window size and passes it to the child component via a render prop, achieving dynamic display of the window size.

### Decoupling Components

Render Props can help you decouple a component's logic from its rendering logic, separating logic from UI to make components more flexible and reusable.

```jsx
class ClickCounter extends React.Component {
  state = { count: 0 };

  handleClick = () => {
    this.setState(prevState => ({ count: prevState.count + 1 }));
  };

  render() {
    return this.props.render(this.state.count, this.handleClick);
  }
}

const App = () => (
  <ClickCounter
    render={(count, onClick) => (
      <button onClick={onClick}>
        Clicked {count} times
      </button>
    )}
  />
);
```

In this example, the `ClickCounter` component provides the count and click handler, passing them to the child component via a render prop. The child component decides how to present this information.

## 7.6.3 Considerations for Render Props

### Avoid Deep Nesting

Excessive nesting of Render Props makes code hard to understand and maintain. Avoid deep nesting where possible to keep code concise.

### Performance Considerations

Each render creates a new render prop function. If the render prop is an inline function, it can cause unnecessary re-renders. You can use `useCallback` or `React.memo` to optimize performance.

### Function as a Render Prop

Make sure the function passed as a render prop does not cause side effects. Render Props should be pure functions used only for rendering the UI.

## 7.6.4 Comparing Render Props with Other Patterns

### Comparing with Higher-Order Components

- **Higher-Order Components (HOCs)**: Enhance functionality by creating a wrapper component.
- **Render Props**: Share code and logic by passing a function as a prop. Render Props are more flexible, allowing dynamic rendering.

### Comparing with Hooks

- **Render Props**: Pass rendering logic via a function.
- **Hooks**: Share state logic via custom hooks. Hooks are more concise and well suited to logic reuse.

---

The Render Props pattern is a powerful pattern in React; through it you can achieve reuse and decoupling of component logic and UI. Render Props hand rendering logic to the caller; when using them, keep an eye on the readability of the function prop and the render frequency.

---

## React 18 → 19 Version Comparison

This page's body uses React 18 as its baseline. The table below maps the Render Props-related code here to React 19:

| Pattern | React 18 Status | React 19 Change | Notes |
| --- | --- | --- | --- |
| `children` as a function | Available | No change | — |
| `forwardRef` | Required to forward ref | **No longer required** | `ref` is passed directly as a prop |
| Function component `defaultProps` | Available | **Removed** | Use ES6 default parameters instead |
| `propTypes` | Runtime validation | **Ignored** | Migrate to a typing solution such as TypeScript |
| Sharing values and state across layers | Relies on render props / HOCs | **New `use`** | You can read a Promise and Context directly inside async components; see [React 19 New Features](../future/react-new-features.md) |

Source: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

## References

- [React Official Documentation · Managing State](https://react.dev/learn/managing-state)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [glossary](/glossary.md))
- [knowledge](/knowledge.md))
- [README](README.md)
- [deep-dive-components](deep-dive-components.md)
