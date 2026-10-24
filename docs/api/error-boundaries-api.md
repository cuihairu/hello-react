### Error Boundary-related APIs

React error boundaries are a mechanism for handling JavaScript errors, especially those in a component tree's rendering, lifecycle methods, and constructors. An error boundary can catch JavaScript errors anywhere in its child tree, log them, and show a fallback UI instead of letting the whole tree crash.

#### Creating an Error Boundary

To create an error boundary component, you implement the `componentDidCatch` lifecycle method and the static `getDerivedStateFromError` method. `componentDidCatch` captures the error; `getDerivedStateFromError` updates the component's state to show the fallback UI.

```jsx
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the fallback UI renders
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error-reporting service
    console.error("Error occurred:", error);
    console.error("Error info:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render the fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

In the code above:
- **Constructor**: initializes state `hasError` to `false`.
- **`getDerivedStateFromError`**: static method that takes the error as its argument and returns an object to update the component's state.
- **`componentDidCatch`**: captures the error and logs it (this is where you can integrate an error-reporting service).
- **`render`**: based on state, renders either the error UI or the normal children.

#### Using an Error Boundary

You can use an error boundary component like a higher-order component to wrap the part of the tree that needs error capture.

```jsx
import React from 'react';
import ErrorBoundary from './ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
};

export default App;
```

In this example, `MyComponent` and its children are protected by the `ErrorBoundary`. If `MyComponent` or one of its children throws, `ErrorBoundary` catches the error and shows the fallback UI instead of crashing the whole app.

#### Limitations of Error Boundaries

- **Cannot catch errors in event handlers**: error boundaries cannot catch errors thrown inside event handlers. Use `try-catch` in the handler to catch these.

  ```jsx
  const handleClick = () => {
    try {
      // Code that might throw
    } catch (error) {
      console.error("Caught an error:", error);
    }
  };
  ```

- **Cannot catch errors in async code**: error boundaries cannot catch errors in async code (such as `setTimeout`, `fetch`, and the like). In those cases, use `try-catch` inside the async function.

  ```jsx
  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
      // Handle the response
    } catch (error) {
      console.error("Caught an error during fetch:", error);
    }
  };
  ```

- **Cannot catch errors in server rendering**: error boundaries do not cover errors during server-side rendering; that needs server-side error handling.

#### React 18 → 19 Version Comparison

The body of this page is based on React 18. The table below maps the error boundary APIs to React 19:

| API | React 18 Status | React 19 Change | Notes |
| --- | --- | --- | --- |
| `static getDerivedStateFromError` | Stable since 16.6 | No change | — |
| `componentDidCatch` | Stable since 16 | No change | — |

React 19 changes error handling behavior: render-phase errors are no longer rethrown, uncaught errors go through `window.reportError`, and caught errors are logged only once; you can customize handling with the `onUncaughtError` and `onCaughtError` root options in `createRoot`.

Source: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

#### Summary

- **Error boundaries**: catch JavaScript errors in the child tree so the whole app does not crash.
- **`componentDidCatch`**: captures the error and handles it (for example, logging it).
- **`getDerivedStateFromError`**: static method that updates state to show the fallback UI.
- **Limitations**: cannot catch errors in event handlers, async code, or server rendering.

Using error boundaries makes a React app more robust and its UX better: even when a component fails, the app keeps running.

## References

- [React Official Docs · Describing the UI](https://react.dev/learn/describing-the-ui)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [lifecycle-methods](lifecycle-methods.md)
- [glossary](glossary.md))
- [knowledge](knowledge.md))