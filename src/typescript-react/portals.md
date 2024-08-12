### 7.9 Portals 的使用场景与实现

React Portals 是一种在 React 组件树外部渲染子组件的技术。这在一些特殊场景下非常有用，比如模态对话框、工具提示、下拉菜单等，它们需要在 DOM 的不同位置渲染，而不受限于组件树的结构。

---

## 7.9.1 什么是 Portals

Portals 提供了一种将组件渲染到组件树外部的方式，但保持它们与父组件的关联。它通过 `ReactDOM.createPortal` 方法实现，允许将子组件挂载到 DOM 中的任意位置。

### **定义**

Portals 使用 `ReactDOM.createPortal` 方法，将组件渲染到指定的 DOM 节点中，而不是当前组件的父节点。

### **语法**

```jsx
ReactDOM.createPortal(child, container)
```

- `child`：要渲染的 React 元素。
- `container`：要渲染到的 DOM 节点。

## 7.9.2 使用 Portals 的场景

### **模态对话框**

模态对话框通常需要在页面的最上层显示，不受组件树的结构影响。

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
    document.body // 渲染到 body 元素中
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

### **工具提示**

工具提示（Tooltip）通常需要在特定的 DOM 元素上方显示，超出父组件的范围。

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

### **下拉菜单**

下拉菜单需要在按钮或触发元素的下方显示，通常也是需要在 DOM 的不同位置渲染。

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

## 7.9.3 Portals 的实现步骤

### **1. 创建 Portals**

使用 `ReactDOM.createPortal` 创建 Portals，并指定渲染的目标 DOM 节点。

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

const MyPortal = ({ children }) => {
  return ReactDOM.createPortal(
    children,
    document.getElementById('portal-root') // 目标节点
  );
};
```

### **2. 设置目标 DOM 节点**

在 `public/index.html` 文件中添加目标 DOM 节点。例如：

```html
<body>
  <div id="root"></div>
  <div id="portal-root"></div> <!-- Portals 渲染的目标 -->
</body>
```

### **3. 使用 Portals 渲染组件**

将组件渲染到目标 DOM 节点中。

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

## 7.9.4 使用 Portals 的注意事项

### **样式与定位**

使用 Portals 渲染的组件需要在 CSS 中手动处理定位和样式，因为它们在 DOM 中的位置不再受限于组件树的结构。

### **性能影响**

Portals 的使用不会显著影响性能，但需要确保它们只在需要时渲染。避免在 Portals 中使用过多的复杂逻辑，以保持渲染的流畅性。

### **事件处理**

Portals 中的事件处理与常规的组件一样，需要确保事件能够正确处理和传播。注意事件冒泡和捕获的机制。

---

Portals 是一个强大的工具，用于处理需要在 DOM 结构外部渲染的场景。通过合理使用 Portals，可以提升用户体验，保持组件的结构清晰。