### 7.9 Portals: Use Cases and Implementation

React Portals is a technique for rendering child components outside the React component tree. It is very useful in some special scenarios, such as modal dialogs, tooltips, and dropdown menus, which need to render at different positions in the DOM and are not limited by the component tree structure.

---

## 7.9.1 What Are Portals

Portals provide a way to render components outside the component tree while keeping their association with the parent component. It is implemented through the `ReactDOM.createPortal` method, allowing child components to be mounted at any position in the DOM.

### Definition

Portals use the `ReactDOM.createPortal` method to render a component into a specified DOM node rather than the current component's parent node.

### Syntax

```jsx
ReactDOM.createPortal(child, container)
```

- `child`: the React element to render.
- `container`: the DOM node to render into.

## 7.9.2 Scenarios for Using Portals

### Modal Dialogs

Modal dialogs usually need to appear on the very top layer of the page, unaffected by the component tree structure.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <div style={modalStyle}>
      <div style={overlayStyle} onClick={onClose} />
      <div style={contentStyle}>
        {children}
      </div>
    </div>,
    document.body // Render into the body element
  );
};

const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const overlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
};

const contentStyle = {
  position: 'relative',
  padding: '20px',
  backgroundColor: 'white',
  borderRadius: '5px',
};

export default Modal;
```

### Tooltips

Tooltips usually need to appear above a specific DOM element, extending beyond the parent component's bounds.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

const Tooltip = ({ children, tooltipText, targetRef }) => {
  const [visible, setVisible] = React.useState(false);

  const handleMouseEnter = () => setVisible(true);
  const handleMouseLeave = () => setVisible(false);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      {children}
      {visible && targetRef.current && ReactDOM.createPortal(
        <div style={tooltipStyle}>
          {tooltipText}
        </div>,
        document.body
      )}
    </div>
  );
};

const tooltipStyle = {
  position: 'absolute',
  top: '100%',
  left: '50%',
  transform: 'translateX(-50%)',
  padding: '5px',
  backgroundColor: 'black',
  color: 'white',
  borderRadius: '3px',
  whiteSpace: 'nowrap',
};

export default Tooltip;
```

### Dropdown Menus

Dropdown menus need to appear below a button or trigger element, which usually also requires rendering at a different position in the DOM.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

const Dropdown = ({ isOpen, toggleDropdown, children }) => {
  return isOpen ? ReactDOM.createPortal(
    <div style={dropdownStyle} onClick={toggleDropdown}>
      {children}
    </div>,
    document.body
  ) : null;
};

const dropdownStyle = {
  position: 'absolute',
  top: '100%',
  right: 0,
  width: '200px',
  backgroundColor: 'white',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

export default Dropdown;
```

## 7.9.3 Steps for Implementing Portals

### 1. Creating Portals

Use `ReactDOM.createPortal` to create Portals, specifying the target DOM node to render into.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

const MyPortal = ({ children }) => {
  return ReactDOM.createPortal(
    children,
    document.getElementById('portal-root') // Target node
  );
};
```

### 2. Setting Up the Target DOM Node

Add the target DOM node to the `public/index.html` file. For example:

```html
<body>
  <div id="root"></div>
  <div id="portal-root"></div> <!-- Target for Portals rendering -->
</body>
```

### 3. Rendering Components with Portals

Render the component into the target DOM node.

```jsx
import React from 'react';
import MyPortal from './MyPortal';

const App = () => (
  <div>
    <h1>My App</h1>
    <MyPortal>
      <div>Content rendered using Portals</div>
    </MyPortal>
  </div>
);

export default App;
```

## 7.9.4 Notes on Using Portals

### Styling and Positioning

Components rendered with Portals require manual handling of positioning and styles in CSS, because their position in the DOM is no longer constrained by the component tree structure.

### Performance Impact

Using Portals does not significantly affect performance, but you should ensure they render only when needed. Avoid using too much complex logic inside Portals to keep rendering smooth.

### Event Handling

Event handling in Portals works like regular components. Make sure events are handled and propagated correctly. Pay attention to the event bubbling and capturing mechanisms.

---

Portals is a powerful tool for handling scenarios that require rendering outside the DOM structure. Used well, Portals can improve the user experience while keeping the component structure clear.

---

## React 18 → 19 Comparison

The body of this page follows React 18. The table below maps this page's Portals behavior to React 19:

| Behavior / API | React 18 status | React 19 change | Notes |
| --- | --- | --- | --- |
| `ReactDOM.createPortal` | Stable | No change | — |
| Event bubbling and React tree association | Events propagate along the React tree | No change | Still stays associated with the parent component's event handling |
| `ref` on child components inside a portal | Needs `forwardRef` passthrough | **Directly supported** | ref is passed as a prop |
| Suspense inside a portal | Suspends and waits for the sibling tree | **Fallback committed immediately** | A React 19-wide behavior; applies inside portals too |

Reference: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

## References

- [React official docs · DOM Components](https://react.dev/reference/react-dom/components/common)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [glossary](/glossary.md))
- [knowledge](/knowledge.md))
- [README](README.md)
