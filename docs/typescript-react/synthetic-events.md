###  Synthetic Events System

React's synthetic events system (Synthetic Events) is one of the cores of its event handling mechanism. It wraps native DOM events, provides a consistent event handling interface, and optimizes performance.

---

## 7.4.1 The Concept of Synthetic Events

### What Are Synthetic Events

Synthetic events are React's custom event system. They wrap native browser events and provide a unified event handling interface. Through synthetic events, React ensures consistency of event handling across browsers while also improving performance.

### Features and Advantages

- **Consistency**: Synthetic events provide a consistent event handling interface, smoothing out differences in event handling across browsers.
- **Performance optimization**: React's synthetic events system attaches event handlers to the root element via event delegation, reducing memory usage and event handling overhead.
- **Event pooling**: React 16 and earlier used an event pool to optimize memory management for event objects; event objects were reused after handling. **Note: the event pool has been removed since React 17**. Synthetic event objects are no longer reused, and there is no need to call `event.persist()` for asynchronous access either.

## 7.4.2 Using Synthetic Events

### Event Handling

In React, you handle synthetic events by attaching event handlers to components. React supports events including click, submit, keyboard events, and more.

```jsx
class MyComponent extends React.Component {
  handleClick = (event) => {
    console.log('Button clicked:', event);
  };

  render() {
    return <button onClick={this.handleClick}>Click Me</button>;
  }
}
```

### The Event Object

The synthetic event object contains properties and methods similar to the native event object, such as `event.target` and `event.preventDefault()`. You can use these properties to access information about the event.

```jsx
handleClick = (event) => {
  console.log('Event target:', event.target);
  event.preventDefault();
};
```

### Event Propagation

React supports event propagation (i.e., event bubbling). You can call `event.stopPropagation()` in an event handler to stop the event from propagating further.

```jsx
handleClick = (event) => {
  event.stopPropagation();
  console.log('Click event stopped from bubbling.');
};
```

## 7.4.3 Performance Optimization of Synthetic Events

### Event Delegation

- **Event delegation**: React attaches all event handlers to the root element rather than to every component or DOM element. This delegation mechanism reduces the number of event handlers and improves performance.

### Event Pooling

- **Event pooling (React 16 and earlier only)**: React returned event objects to the event pool after handling, reusing them to reduce the cost of memory allocation and garbage collection. **The event pool has been removed since React 17**; event objects are ordinary objects and work fine asynchronously.

  ```jsx
  handleClick = (event) => {
    // React 16: the event object is reused; call event.persist() before async access
    // React 17+: no event pool, no special handling needed
    console.log('Event object:', event);
  };
  ```

### Asynchronous Access to the Event Object

- **React 16 and earlier**: The synthetic event object was reused after handling (with all properties nulled out), so you should avoid asynchronous access to the event object inside an event handler; if you need it asynchronously, extract the properties inside the handler or call `event.persist()`.

  ```jsx
  handleClick = (event) => {
    const { clientX, clientY } = event;
    setTimeout(() => {
      console.log('X:', clientX, 'Y:', clientY);
    }, 1000);
  };
  ```

- **React 17 and later**: The event pool is gone. The code above still works, but accessing `event` directly in an async callback is safe too.

  ```jsx
  handleClick = (event) => {
    const { clientX, clientY } = event;
    setTimeout(() => {
      console.log('X:', clientX, 'Y:', clientY);
    }, 1000);
  };
  ```

## 7.4.4 Differences Between Synthetic Events and Native Events

### Native Events

- **Direct manipulation**: Native events are the events provided by the browser, tied directly to DOM elements. Their behavior and characteristics may differ across browsers.

### Synthetic Events

- **Abstraction and wrapping**: Synthetic events are wrapped by React's event system, providing a consistent interface and behavior, making cross-browser event handling simpler and more consistent.

---

React's synthetic events unify the event handling interface; when investigating interactions, I check both event delegation and the boundary with native events.

---

## React 18 → 19 Version Comparison

This page's body uses React 18 as its baseline. The table below maps the event-related content here to React 19:

| Behavior / API | React 18 Status | React 19 Change | Notes |
| --- | --- | --- | --- |
| Synthetic events system (delegated to the root since React 17) | Stable | No change | — |
| Event pool | Removed since React 17 | No change | Async access to event objects is still safe |
| `javascript:` URLs in `src` / `href` | Allowed at runtime | **Errors out directly** | react-dom refuses to render |
| Empty string for `src` / `href` | Set to empty string | **Warns and does not set** | Anchors like `<a href="">` are exempt |
| Transitions within popstate | Scheduled asynchronously | **Changed to synchronous** | State updates triggered by route forward / back commit synchronously |
| `defaultProps` / `propTypes` (on event components) | Available | **Removed / ignored** | Function components use default parameters and TypeScript instead |

Source: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

## References

- [React Official Documentation · Responding to Events](https://react.dev/learn/responding-to-events)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [glossary](/glossary.md))
- [knowledge](/knowledge.md))
- [README](README.md)
- [deep-dive-components](deep-dive-components.md)
