### 7.11 Error Boundaries: Implementation and Best Practices

React provides Error Boundaries to catch and handle JavaScript errors in child components. Error boundaries help you handle errors gracefully instead of letting the entire application crash.

---

## 7.11.1 The Concept of Error Boundaries

Error boundaries are a React component feature used to catch JavaScript errors that occur in a component tree and render a fallback UI. Error boundaries only catch errors in their child component tree; they do not catch their own errors.

### How Error Boundaries Work

- **Catching errors**: an error boundary catches errors in child components by implementing the `componentDidCatch` lifecycle method.
- **Rendering a fallback UI**: once an error is caught, the error boundary renders a fallback UI in place of the crashing component.

## 7.11.2 Implementing an Error Boundary

### Creating an Error Boundary Component

An error boundary component needs to implement two methods: the static method `getDerivedStateFromError` and the instance method `componentDidCatch`.

1. **getDerivedStateFromError (static method)**

   This method is called when an error is caught, returning an updated state to render the fallback UI.

   ```jsx
   static getDerivedStateFromError(error) {
     // Update state to render the fallback UI
     return { hasError: true };
   }
   ```

2. **componentDidCatch (instance method)**

   This method is called after an error is caught. It receives the error and the component stack information, making it a good place to report error logs.

   ```jsx
   componentDidCatch(error, info) {
     // Log the error to a logging service
     logErrorToMyService(error, info);
   }
   ```

### Implementation Example

```jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to render the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log the error to a logging service
    console.error("Error caught by Error Boundary:", error);
    console.error("Error info:", info);
  }

  render() {
    if (this.state.hasError) {
      // Render the fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}
```

### Using an Error Boundary

Wrap the error boundary component around child components that might throw errors:

```jsx
const App = () => (
  <ErrorBoundary>
    <MyComponent />
  </ErrorBoundary>
);
```

## 7.11.3 Best Practices for Error Boundaries

### 1. Wrap Critical Components

- **Critical components**: wrap error boundaries around critical components to ensure the application's core does not crash from an error. For example, you can wrap error boundaries around route components and major page components.

### 2. Use a Global Error Boundary

- **Root-level error boundary**: use a global error boundary at the application root to catch any unhandled errors in the application. For example, wrap the entire app in the `App` component.

### 3. Provide User-Friendly Error Information

- **Fallback UI**: design a user-friendly fallback UI so users know something went wrong, while the application remains usable. Avoid showing technical details or error messages to end users.

### 4. Log Errors

- **Error logging**: record error information to a logging service in `componentDidCatch` for later analysis and fixes. You can use services such as Sentry or LogRocket to track and record errors.

### 5. Avoid Overuse

- **Error boundary granularity**: do not over-fragment error boundaries to every single component. Use them only where needed, such as when catching errors for a specific feature or page.

### 6. Mind Errors in the Error Boundary Itself

- **Child component lifecycle errors**: errors thrown in a child component's `render`, constructor, and lifecycle methods (such as `componentDidMount`) **can** be caught by an error boundary above.
- **Errors in the boundary itself**: an error boundary cannot catch errors thrown inside itself. If its own `render` or lifecycle method fails, wrap another error boundary around it as a backstop.

## 7.11.4 Limitations of Error Boundaries

- **Cannot catch errors in event handlers**: error boundaries do not catch errors in event handler functions. These errors must be caught manually inside the handler.
  
- **Cannot catch errors in async code**: error boundaries cannot catch errors in asynchronous code (such as setTimeout, fetch, etc.). These errors must be handled by the async code's own error handling mechanisms.

---

By implementing and using error boundaries effectively, you can improve the stability and user experience of a React application, ensuring the application handles errors gracefully and provides necessary error information and recovery options.

---

## React 18 → 19 Comparison

The body of this page follows React 18. The table below maps this page's error boundary content to React 19:

| Behavior / API | React 18 status | React 19 change | Notes |
| --- | --- | --- | --- |
| `componentDidCatch` / `getDerivedStateFromError` | Stable | No change | — |
| Errors caught by a boundary | Re-thrown after being caught | **No longer re-thrown** | Goes to `console.error`; no more duplicate logs in development |
| Errors not caught by a boundary | Re-thrown to the host | **Reported via `window.reportError`** | Custom reporting can hook into global error monitoring |
| `createRoot` error callbacks | None | **Added** | `onUncaughtError` / `onCaughtError` handle uncaught and caught errors respectively |
| Declarative error boundaries | Not provided | No change | React 19 still requires class components |

Reference: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

## References

- [React official docs · Describing the UI](https://react.dev/learn/describing-the-ui)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [glossary](/glossary.md))
- [knowledge](/knowledge.md))
- [README](README.md)
- [deep-dive-components](deep-dive-components.md)
