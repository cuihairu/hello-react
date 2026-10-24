### ReactDOM & Rendering-related APIs

`ReactDOM` is part of the React library and is responsible for rendering React components into the DOM. It provides key APIs for handling component mounting, unmounting, and updates. Below are the main `ReactDOM` APIs and what they do:

#### 1. **`ReactDOM.render()`**

**Description**:
- Renders a React component into a specified DOM element.

**Usage**:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => <div>Hello, world!</div>;

ReactDOM.render(<App />, document.getElementById('root'));
```

**Notes**:
- The first argument is the React element or component to render.
- The second argument is the DOM element used as the mount point for the React element.

**Caveat**:
- `ReactDOM.render()` has been marked as deprecated since React 18; use the `createRoot` method for mounting instead.

#### 2. **`ReactDOM.createRoot()`**

**Description**:
- Creates a new root node for rendering React components. This is the recommended approach in React 18 and later.

**Usage**:

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => <div>Hello, world!</div>;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

**Notes**:
- `createRoot` returns a `Root` instance used to render React components.
- It provides a more efficient rendering mechanism and supports concurrent features.

#### 3. **`ReactDOM.unmountComponentAtNode()`**

**Description**:
- Unmounts an already-mounted React component, clearing the React component and event handlers on that DOM element.

**Usage**:

```jsx
import ReactDOM from 'react-dom';

ReactDOM.unmountComponentAtNode(document.getElementById('root'));
```

**Notes**:
- The argument is the DOM element where the component is mounted.

#### 4. **`ReactDOM.hydrate()`**

**Description**:
- Converts server-side-rendered HTML into interactive React components. Like `render`, but used to take over existing server-rendered HTML.

**Usage**:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => <div>Hello, world!</div>;

ReactDOM.hydrate(<App />, document.getElementById('root'));
```

**Notes**:
- The `hydrate` method applies to server-side rendering (SSR). It reuses the HTML the server sends, reducing the overhead of client rendering.

#### 5. **`ReactDOM.flushSync()`**

**Description**:
- Forces a synchronous render update, flushing all pending updates immediately even in concurrent mode.

**Usage**:

```jsx
import ReactDOM from 'react-dom';

ReactDOM.flushSync(() => {
  // Code that needs a synchronous update
});
```

**Notes**:
- Used to ensure a specific update is applied immediately in concurrent mode, avoiding a delayed update.

#### 6. **`ReactDOM.findDOMNode()`**

**Description**:
- Returns a direct reference to the DOM node of a React component. Note that this API is deprecated in newer versions.

**Usage**:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

class MyComponent extends React.Component {
  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    console.log(node); // Prints the component's DOM node
  }

  render() {
    return <div>Hello, world!</div>;
  }
}
```

**Notes**:
- Generally not recommended, because direct DOM manipulation goes against React's philosophy. Use `ref` for DOM operations instead.

#### 7. **`ReactDOM.createPortal()`**

**Description**:
- Renders a child component into a different part of the DOM tree rather than into the parent component's DOM hierarchy.

**Usage**:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children }) => {
  return ReactDOM.createPortal(
    <div className="modal">{children}</div>,
    document.getElementById('modal-root')
  );
};
```

**Notes**:
- The first argument is the content to render; the second is the target DOM node.
- Use it for modals, notifications, and other components that need to escape the normal DOM structure.

### React 18 → 19 Version Comparison

The body of this page is based on React 18. React 19 is the version with the biggest changes to ReactDOM's rendering APIs; the table below is for upgrade reference:

| API | React 18 Status | React 19 Change | Notes |
| --- | --- | --- | --- |
| `ReactDOM.render()` | Available (deprecated) | **Removed** | Use `createRoot` + `root.render()` |
| `ReactDOM.createRoot()` | New in 18, recommended | No change | Adds root options `onCaughtError`, `onUncaughtError` |
| `ReactDOM.unmountComponentAtNode()` | Available (deprecated) | **Removed** | Use `root.unmount()` |
| `ReactDOM.hydrate()` | Available (deprecated) | **Removed** | Use `hydrateRoot` |
| `ReactDOM.flushSync()` | Stable | No change | — |
| `ReactDOM.findDOMNode()` | Deprecated | **Removed** | Use a ref to get the DOM node |
| `ReactDOM.createPortal()` | Stable | No change | — |

Other React 19 changes related here: new static rendering APIs `prerender` / `prerenderToNodeStream` in `react-dom/static`; `act` from `react-dom/test-utils` is removed (use `React.act`); the UMD build is removed in favor of ESM.

Source: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

### Summary

- **`ReactDOM.render()`** and **`ReactDOM.createRoot()`** mount React components into the DOM.
- **`ReactDOM.unmountComponentAtNode()`** unmounts an already-mounted component.
- **`ReactDOM.hydrate()`** handles server-rendered content.
- **`ReactDOM.flushSync()`** forces a synchronous render update.
- **`ReactDOM.findDOMNode()`** is a deprecated legacy API for getting the DOM node directly.
- **`ReactDOM.createPortal()`** renders components elsewhere in the DOM.

These APIs provide powerful functionality for rendering and manipulating React components, helping developers manage the component lifecycle and DOM operations more flexibly.

## References

- [React Official Docs · ReactDOM Reference](https://react.dev/reference/react-dom)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [glossary](glossary.md))
- [knowledge](knowledge.md))