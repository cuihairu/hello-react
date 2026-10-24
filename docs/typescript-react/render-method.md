### 7.1 The `render` Method and Component Rendering

In React, the `render` method is the core of a component; it defines the component's UI structure. Understanding how the `render` method works and the component rendering process is essential for developing efficient React applications.

---

## 7.1.1 The `render` Method

### Function and Role

- **Function**: The `render` method is a required method in React component classes. It describes how the component should be presented and returns a React element (usually JSX).

  ```jsx
  class MyComponent extends React.Component {
    render() {
      return <div>Hello, World!</div>;
    }
  }
  ```

- **Return value**: The return value of the `render` method is a React element or `null`. A React element can be a basic HTML element or another React component.

### Implementation Details

- **Pure function**: The `render` method should be treated as a pure function — it should not modify the component's `state` or `props`, but rather generate the content to display based on `props` and `state`.

- **Side effects**: Avoid performing side-effect operations in the `render` method, such as network requests or DOM manipulation. Side effects should go in `componentDidMount` or the `useEffect` hook.

  ```jsx
  class MyComponent extends React.Component {
    render() {
      // no side-effect operations here
      return <div>{this.props.message}</div>;
    }
  }
  ```

## 7.1.2 The Component Rendering Process

### Initial Render

1. **Component instantiation**: The component is instantiated and mounted to the DOM. React calls the component's `render` method and converts the returned JSX into actual DOM elements.

2. **Virtual DOM**: React uses the Virtual DOM mechanism to optimize performance. The JSX returned by `render` generates a Virtual DOM, after which React compares the Virtual DOM with the actual DOM (called "Diffing").

3. **Updating the actual DOM**: React computes the minimal DOM update operations and applies them to the actual DOM. This operation is called "Reconciliation".

### Update Render

1. **State or prop changes**: When a component's `props` or `state` changes, React calls the `render` method again.

2. **Recomputing the Virtual DOM**: React regenerates the Virtual DOM based on the new `props` and `state`.

3. **Comparing the Virtual DOM**: React compares the new Virtual DOM with the previous one, finds the differences, and computes the minimal update operations.

4. **Updating the actual DOM**: The computed differences are applied to the actual DOM to optimize performance and reduce repaints.

### Performance Optimization

- **`shouldComponentUpdate`**: You can implement the `shouldComponentUpdate` method to control whether a component needs updating. This is important for performance optimization, especially in large applications.

  ```jsx
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.value !== this.props.value;
  }
  ```

- **`React.memo`**: Function components can use the `React.memo` higher-order component to avoid unnecessary re-renders. It only re-renders the component when `props` change.

  ```jsx
  const MyComponent = React.memo(props => {
    return <div>{props.value}</div>;
  });
  ```

- **`PureComponent`**: For class components, `React.PureComponent` provides a mechanism that automatically implements `shouldComponentUpdate`, performing a shallow comparison of `props` and `state`.

  ```jsx
  class MyComponent extends React.PureComponent {
    render() {
      return <div>{this.props.value}</div>;
    }
  }
  ```

---

`render` determines the UI returned by a class component; when investigating component behavior and performance, I look at the render trigger conditions alongside it.

---

## React 18 → 19 Version Comparison

This page's body uses React 18 as its baseline. The table below maps the rendering-related content here to React 19:

| Behavior / API | React 18 Status | React 19 Change | Notes |
| --- | --- | --- | --- |
| `render()` must be a pure function | Required | No change | — |
| Errors thrown in render | Caught and re-thrown | **No longer re-thrown** | Uncaught errors go to `window.reportError`; ones caught by a boundary go to `console.error` |
| Reentrant render-phase updates | Warning in development | **Detected and error thrown directly** | Prevents infinite loops during the render phase |
| Reading a Promise / Context in render | Requires a custom solution | **New `use`** | See [React 19 New Features](../future/react-new-features.md) |
| Double render in StrictMode | Already present | **Refined behavior** | `useMemo` / `useCallback` reuse the first render's results |
| New JSX transform | Optional | **Required** | Features like `ref` as a prop depend on the new transform |

Source: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

## References

- [React Official Documentation · Component](https://react.dev/reference/react/Component)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [glossary](/glossary.md))
- [knowledge](/knowledge.md))
- [README](README.md)
