###  合成事件系统

React 的合成事件系统（Synthetic Events）是其事件处理机制的核心之一，它封装了原生 DOM 事件，提供了一致的事件处理接口，并优化了性能。

---

## 7.4.1 合成事件的概念

### 什么是合成事件

合成事件是 React 自定义的事件系统，它封装了原生浏览器事件，提供了一套统一的事件处理接口。通过合成事件，React 使得事件处理在不同浏览器之间的一致性得到保证，同时还能提高性能。

### 特点与优势

- **一致性**：合成事件提供了一致的事件处理接口，简化了不同浏览器的事件处理差异。
- **性能优化**：React 合成事件系统会通过事件委托机制将事件处理程序附加到根元素上，减少了内存占用和事件处理的开销。
- **事件池**：React 16 及之前的版本使用事件池来优化事件对象的内存管理，事件对象在事件处理后会被重用。**注意：React 17 起已移除事件池机制**，合成事件对象不再被重用，异步访问事件对象也无需再调用 `event.persist()`。

## 7.4.2 合成事件的使用

### 事件处理

在 React 中，你可以通过在组件上添加事件处理程序来处理合成事件。React 支持的事件包括点击、提交、键盘事件等。

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

### 事件对象

合成事件对象包含与原生事件对象类似的属性和方法，例如 `event.target` 和 `event.preventDefault()`。你可以使用这些属性来访问事件的相关信息。

```jsx
handleClick = (event) => {
  console.log('Event target:', event.target);
  event.preventDefault();
};
```

### 事件传递

React 支持事件的传递（即事件冒泡）。你可以在事件处理程序中调用 `event.stopPropagation()` 来阻止事件继续传播。

```jsx
handleClick = (event) => {
  event.stopPropagation();
  console.log('Click event stopped from bubbling.');
};
```

## 7.4.3 合成事件的性能优化

### 事件委托

- **事件委托**：React 将所有事件处理程序附加到根元素上，而不是每个组件或 DOM 元素。这种事件委托机制减少了事件处理程序的数量，提高了性能。

### 事件池

- **事件池（仅 React 16 及之前）**：React 在事件处理完成后会将事件对象放回事件池中，以便重用，以减少内存分配和垃圾回收的开销。**React 17 起已移除事件池**，事件对象就是普通对象，可正常异步使用。

  ```jsx
  handleClick = (event) => {
    // React 16：事件对象将被重用，异步访问前需 event.persist()
    // React 17+：无事件池，无需任何特殊处理
    console.log('Event object:', event);
  };
  ```

### 事件对象的异步访问

- **React 16 及之前**：合成事件对象在事件处理后会被重用（所有属性被置空），因此在事件处理函数中应当避免异步访问事件对象；如需异步使用，可在事件处理函数中将属性提取出来，或调用 `event.persist()`。

  ```jsx
  handleClick = (event) => {
    const { clientX, clientY } = event;
    setTimeout(() => {
      console.log('X:', clientX, 'Y:', clientY);
    }, 1000);
  };
  ```

- **React 17 及之后**：事件池已移除，上面的写法依然兼容，但直接在异步回调中访问 `event` 也是安全的。

  ```jsx
  handleClick = (event) => {
    const { clientX, clientY } = event;
    setTimeout(() => {
      console.log('X:', clientX, 'Y:', clientY);
    }, 1000);
  };
  ```

## 7.4.4 合成事件与原生事件的区别

### 原生事件

- **直接操作**：原生事件是浏览器提供的原生事件，直接与 DOM 元素关联。它们在不同浏览器中可能具有不同的行为和特性。

### 合成事件

- **抽象封装**：合成事件通过 React 的事件系统进行封装，提供了一致的接口和行为，使得跨浏览器的事件处理变得更加简单和一致。

---

理解 React 合成事件系统的工作原理，能够帮助你更好地管理和优化事件处理。在开发过程中，利用合成事件系统的特点，可以提高应用的性能和稳定性。

---

## React 18 → 19 版本对照

本页正文以 React 18 为准。下表把本页事件相关内容对到 React 19：

| 行为 / API | React 18 状态 | React 19 变化 | 说明 |
| --- | --- | --- | --- |
| 合成事件系统（React 17 起委托到根节点） | 稳定 | 无变化 | — |
| 事件池 | React 17 起已移除 | 无变化 | 异步访问事件对象依旧安全 |
| `src` / `href` 中的 `javascript:` URL | 运行时可用 | **直接报错** | react-dom 拒绝渲染 |
| `src` / `href` 为空字符串 | 设置为空串 | **告警且不设置** | `<a href="">` 等锚点除外 |
| popstate 中的 transition | 异步调度 | **改为同步** | 路由前进 / 后退触发的状态更新同步提交 |
| `defaultProps` / `propTypes`（事件组件） | 可用 | **已移除 / 被忽略** | 函数组件改用默认参数与 TypeScript |

依据：[React 19 升级指南](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)。