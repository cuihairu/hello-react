### Lifecycle Methods: `componentDidMount`, `shouldComponentUpdate`, etc.

In React class components, lifecycle methods run specific code at different stages of a component's life. Below are some commonly used ones:

#### 1. `componentDidMount`

**Purpose**: called immediately after the component is mounted (i.e. rendered to the DOM for the first time). This is the ideal place for async operations (such as data fetching) or DOM operations.

**Usage**:

```jsx
import React from 'react';

class MyComponent extends React.Component {
  componentDidMount() {
    // Run code after the component mounts
    console.log('Component did mount!');
  }

  render() {
    return <div>Hello, World!</div>;
  }
}

export default MyComponent;
```

**Note**: `componentDidMount` is only called once, when the component mounts. If you need to run similar logic on updates, use `componentDidUpdate` instead.

#### 2. `shouldComponentUpdate`

**Purpose**: when the component receives new props or state, it decides whether to re-render. By default a component always re-renders. Overriding `shouldComponentUpdate` lets you optimize performance and avoid unnecessary renders.

**Usage**:

```jsx
import React from 'react';

class MyComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    // Decide whether to update based on the new props and state
    return nextProps.value !== this.props.value;
  }

  render() {
    return <div>{this.props.value}</div>;
  }
}

export default MyComponent;
```

**Return value**: returning `true` allows the component to update; returning `false` prevents it.

#### 3. `componentDidUpdate`

**Purpose**: runs code after the component updates (i.e. after the `render` method is called). Use it for DOM operations or fetching new data that should happen after an update.

**Usage**:

```jsx
import React from 'react';

class MyComponent extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    // Run code after the component updates
    if (prevProps.value !== this.props.value) {
      console.log('Component did update!');
    }
  }

  render() {
    return <div>{this.props.value}</div>;
  }
}

export default MyComponent;
```

**Parameters**:
- `prevProps`: the props before the component updated.
- `prevState`: the state before the component updated.

#### 4. `componentWillUnmount`

**Purpose**: runs cleanup before the component unmounts (i.e. is removed from the DOM), such as canceling a subscription or clearing a timer.

**Usage**:

```jsx
import React from 'react';

class MyComponent extends React.Component {
  componentWillUnmount() {
    // Run cleanup before the component unmounts
    console.log('Component will unmount!');
  }

  render() {
    return <div>Hello, World!</div>;
  }
}

export default MyComponent;
```

#### 5. `componentDidCatch`

**Purpose**: catches errors in child components and runs handling logic, such as logging the error or showing an error boundary UI.

**Usage**:

```jsx
import React from 'react';

class MyComponent extends React.Component {
  componentDidCatch(error, info) {
    // Handle the error
    console.log('An error occurred:', error);
    console.log('Error info:', info);
  }

  render() {
    return <div>Hello, World!</div>;
  }
}

export default MyComponent;
```

**Parameters**:
- `error`: the caught error.
- `info`: a detailed object with error information.

#### 6. `getDerivedStateFromProps`

**Purpose**: called before render, to update state based on props. It is a static method and does not access `this`.

**Usage**:

```jsx
import React from 'react';

class MyComponent extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    // Update state based on the new props
    if (nextProps.value !== prevState.value) {
      return { value: nextProps.value };
    }
    return null; // Returning null means do not update state
  }

  render() {
    return <div>{this.state.value}</div>;
  }
}

export default MyComponent;
```

**Parameters**:
- `nextProps`: the new props about to be passed to the component.
- `prevState`: the component's current state.

#### 7. `getSnapshotBeforeUpdate`

**Purpose**: called before the latest render output is committed to the DOM. You can use it to capture snapshot information from before the render.

**Usage**:

```jsx
import React from 'react';

class MyComponent extends React.Component {
  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Capture snapshot information from before the render
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // Use the snapshot information
    console.log('Snapshot:', snapshot);
  }

  render() {
    return <div>Hello, World!</div>;
  }
}

export default MyComponent;
```

**Parameters**:
- `prevProps`: the props before the component updated.
- `prevState`: the state before the component updated.
- `snapshot`: the snapshot information returned by `getSnapshotBeforeUpdate`.

### React 18 → 19 Version Comparison

The body of this page is based on React 18. The table below maps this page's lifecycle methods to React 19:

| Method | React 18 Status | React 19 Change | Notes |
| --- | --- | --- | --- |
| `componentDidMount` | Stable | No change | — |
| `shouldComponentUpdate` | Stable | No change | — |
| `componentDidUpdate` | Stable | No change | — |
| `componentWillUnmount` | Stable | No change | — |
| `getSnapshotBeforeUpdate` | Stable since 16.3 | No change | — |

React 19's behavior change related to the lifecycle concerns error handling: uncaught render-phase errors are no longer rethrown, and instead go through `window.reportError`; you can customize reporting with the root options `onUncaughtError` and `onCaughtError`. See [Error Boundary-related APIs](error-boundaries-api.md).

Source: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

### Summary

React lifecycle methods let class components perform specific operations at different stages. When maintaining legacy components, I first confirm when each method is called, then decide whether the logic still belongs at that stage.

## References

- [React Official Docs · Render and Commit](https://react.dev/learn/render-and-commit)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [glossary](glossary.md))