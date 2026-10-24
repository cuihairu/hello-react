### React's Event System and Synthetic Events

React's event system is one of its core features, providing an efficient and cross-browser compatible way to handle user interaction. Unlike the browser's native event system, React uses a synthetic event system to simplify event handling and improve performance.

#### 1. Synthetic Events

Synthetic events are a cross-browser compatible event system provided by React. They wrap native DOM events and provide a consistent event interface. Synthetic events are the core of React's event system; through synthetic events, consistent behavior can be ensured across different browsers.

**Characteristics of Synthetic Events**:
- **Consistency**: Synthetic events provide a consistent event interface, ensuring event behavior is the same across different browsers.
- **Performance optimization**: React 16 and earlier versions reused event objects through event pooling to reduce memory usage and garbage collection; **React 17 and later removed event pooling**, event objects are no longer reused, and `event.persist()` is no longer needed for asynchronous access.

**Common Methods and Properties of Synthetic Events**:
- **`event.preventDefault()`**: Prevents the event's default behavior.
- **`event.stopPropagation()`**: Stops the event from bubbling.
- **`event.nativeEvent`**: Retrieves the native DOM event.

#### 2. Event Handling

In React, event handling is implemented by passing event handler functions to components as props. React's event handling differs slightly from native DOM event handling, mainly in the following aspects:

**Event Binding**:
- In React, event handling is bound by passing handler functions to components as props. For example, using `onClick` to handle click events:

    ```jsx
    function MyComponent() {
      const handleClick = (event) => {
        console.log('Button clicked');
      };

      return <button onClick={handleClick}>Click me</button>;
    }
    ```

**Event Delegation**:
- React event handling is implemented through event delegation: React 16 attached event listeners uniformly to `document`, **React 17 and later changed this to the root element of the render container** (the DOM node passed to `createRoot`), rather than binding each DOM element individually. This reduces the number of event listeners and improves performance.

**Event Object**:
- The React event object is an instance of a synthetic event, containing information about the event. Synthetic event objects have properties and methods similar to native event objects, but they are cross-browser compatible.

#### 3. Event Handling Optimization

**Avoiding Anonymous Functions**:
- Using anonymous functions in JSX can cause performance problems, because a new function instance is created on every render. You can extract event handler functions to outside the component or into class instance methods to improve performance.

    ```jsx
    // Before optimization
    function MyComponent() {
      return <button onClick={() => console.log('Button clicked')}>Click me</button>;
    }

    // After optimization
    function MyComponent() {
      const handleClick = () => {
        console.log('Button clicked');
      };

      return <button onClick={handleClick}>Click me</button>;
    }
    ```

**Using `useCallback`**:
- In function components, you can use the `useCallback` hook to cache event handler functions and avoid unnecessary re-creation.

    ```jsx
    import React, { useCallback } from 'react';

    function MyComponent() {
      const handleClick = useCallback(() => {
        console.log('Button clicked');
      }, []);

      return <button onClick={handleClick}>Click me</button>;
    }
    ```

#### 4. Best Practices for Event Handling

- **Simplify event handler functions**: Separate event handling logic to outside the component or into a custom hook to improve code readability and maintainability.
- **Avoid unnecessary event binding**: Only bind events when needed; avoid binding too many event listeners.
- **Use event delegation**: When you need to handle a large number of similar events, you can use event delegation to improve performance.

### Summary

React's synthetic event system provides a consistent and efficient way to handle user interaction. Through synthetic events, React can simplify event handling and improve performance. Understanding how synthetic events work gives you better grounding for diagnosing component interaction and event performance issues.

## References

- [React Official Docs · Responding to Events](https://react.dev/learn/responding-to-events)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [knowledge](/knowledge.md))
- [README](README.md)
