### 第20章：React 核心 API 参考

本章将详细介绍 React 的核心 API，包括 JSX 语法、组件相关 API、生命周期方法、Hooks、Context API、Refs、Portals 和 Profiler 等。每个部分将包括其定义、用法以及常见示例，以帮助读者深入理解 React 的功能和如何在实际项目中应用这些 API。

#### 20.1 JSX 语法与 JSX 相关 API

**JSX 语法**：
- **定义**：JSX（JavaScript XML）是一种 JavaScript 的语法扩展，允许在 JavaScript 中编写类似 HTML 的代码。JSX 代码在编译时会被转换成 React 元素的 JavaScript 表达式。
- **用法**：JSX 语法可以用来创建 React 元素和组件的 UI 结构。它允许嵌套 HTML 元素、使用 JavaScript 表达式以及定义组件。
  
**示例**：

```jsx
// 创建一个简单的组件
const HelloWorld = () => {
  return <h1>Hello, World!</h1>;
};
```

**JSX 相关 API**：
- **`React.createElement`**：在 JSX 语法被编译为 JavaScript 时，会调用 `React.createElement` 方法来创建元素。
  
  **示例**：
  ```javascript
  React.createElement('h1', null, 'Hello, World!');
  ```

#### 20.2 组件相关 API

**React.Component**：
- **定义**：`React.Component` 是 React 提供的一个基类，用于创建具有生命周期方法和状态的组件。
- **用法**：继承 `React.Component` 并实现 `render` 方法来定义组件的 UI。

**示例**：

```jsx
class MyComponent extends React.Component {
  render() {
    return <div>My Component</div>;
  }
}
```

**React.PureComponent**：
- **定义**：`React.PureComponent` 是 `React.Component` 的子类，提供了浅层比较以优化组件的渲染性能。
- **用法**：类似于 `React.Component`，但具有默认的 `shouldComponentUpdate` 方法。

**示例**：

```jsx
class MyPureComponent extends React.PureComponent {
  render() {
    return <div>My Pure Component</div>;
  }
}
```

#### 20.3 生命周期方法

**常见生命周期方法**：
- **`componentDidMount`**：组件挂载后调用，用于执行副作用操作。
- **`componentDidUpdate`**：组件更新后调用，用于响应状态或属性的变化。
- **`componentWillUnmount`**：组件卸载前调用，用于清理操作。
- **`shouldComponentUpdate`**：用于控制组件是否重新渲染。

**示例**：

```jsx
class LifecycleComponent extends React.Component {
  componentDidMount() {
    console.log('Component did mount');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Component did update');
  }

  componentWillUnmount() {
    console.log('Component will unmount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.value !== this.props.value;
  }

  render() {
    return <div>{this.props.value}</div>;
  }
}
```

#### 20.4 State 与 Props API

**State**：
- **定义**：组件的本地状态，用于保存组件的动态数据。
- **用法**：通过 `this.state` 访问，使用 `this.setState` 更新状态。

**示例**：

```jsx
class StatefulComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}
```

**Props**：
- **定义**：组件的外部数据，通过属性传递给组件。
- **用法**：通过 `this.props` 访问，props 是只读的，不能被修改。

**示例**：

```jsx
const FunctionalComponent = (props) => {
  return <div>{props.message}</div>;
};

// 使用组件
<FunctionalComponent message="Hello, Props!" />
```

#### 20.5 ReactDOM 与渲染相关 API

**ReactDOM.render**：
- **定义**：将 React 元素渲染到 DOM 节点中。
- **用法**：使用 `ReactDOM.render` 将组件挂载到指定的 DOM 元素上。

**示例**：

```jsx
ReactDOM.render(<App />, document.getElementById('root'));
```

**ReactDOM.hydrate**：
- **定义**：在服务器端渲染的 HTML 上进行客户端渲染，用于恢复已渲染的 HTML 状态。
- **用法**：与 `ReactDOM.render` 类似，但用于服务器端渲染的场景。

**示例**：

```jsx
ReactDOM.hydrate(<App />, document.getElementById('root'));
```

#### 20.6 Hooks API

**`useState`**：
- **定义**：用于在函数组件中添加状态。
- **用法**：返回一个状态变量和一个更新函数。

**示例**：

```jsx
const [count, setCount] = useState(0);
```

**`useEffect`**：
- **定义**：用于在函数组件中处理副作用。
- **用法**：可以执行数据获取、订阅和 DOM 操作等副作用。

**示例**：

```jsx
useEffect(() => {
  // 副作用代码
  return () => {
    // 清理副作用
  };
}, [dependencies]);
```

**`useContext`**：
- **定义**：用于在函数组件中访问上下文值。
- **用法**：使用 `useContext` 获取 `Context` 的值。

**示例**：

```jsx
const value = useContext(MyContext);
```

**`useReducer`**：
- **定义**：用于在函数组件中管理复杂的状态逻辑。
- **用法**：使用 `reducer` 函数和 `dispatch` 方法管理状态。

**示例**：

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

**`useCallback`**、**`useMemo`** 和 **`useRef`**：
- **`useCallback`**：返回记忆化的回调函数。
- **`useMemo`**：返回记忆化的计算结果。
- **`useRef`**：返回可变的 `ref` 对象。

**示例**：

```jsx
const memoizedCallback = useCallback(() => { /* callback */ }, [dependencies]);
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
const myRef = useRef(null);
```

#### 20.7 Context API 与相关用法

**Context**：
- **定义**：用于在组件树中传递数据，而无需通过 props 一层一层传递。
- **用法**：创建上下文对象，并使用 `Provider` 和 `Consumer` 组件进行上下文数据的提供和消费。

**示例**：

```jsx
const MyContext = React.createContext(defaultValue);

const ProviderComponent = ({ children }) => {
  return <MyContext.Provider value={/* context value */}>{children}</MyContext.Provider>;
};

const ConsumerComponent = () => {
  const contextValue = useContext(MyContext);
  return <div>{contextValue}</div>;
};
```

#### 20.8 Refs 与 DOM 交互 API

**`React.createRef`**：
- **定义**：创建一个 `ref` 对象，用于访问 DOM 元素或 React 组件实例。
- **用法**：将 `ref` 赋给元素，并通过 `ref.current` 访问。

**示例**：

```jsx
const myRef = React.createRef();

const MyComponent = () => (
  <div ref={myRef}>Hello</div>
);
```

**`useRef`**：
- **定义**：在函数组件中创建 `ref` 对象。
- **用法**：类似于 `createRef`，但在函数组件中使用。

**示例**：

```jsx
const myRef = useRef(null);
```

#### 20.9 Portals 与 Profiler API

**Portals**：
- **定义**：允许将子节点渲染到父组件以外的 DOM 节点中。
- **用法**：使用 `ReactDOM.createPortal` 将子节点渲染到指定的 DOM 节点中。

**示例**：

```jsx
ReactDOM.createPortal(<div>Portal Content</div>, document.getElementById('portal-root'));
```

**Profiler**：
- **定义**：用于分析 React 应用的性能。
- **用法**：使用 `Profiler` 组件包裹需要性能分析的部分，并提供性能回调。

**示例**：

```jsx
<Profiler id="MyComponent" onRender={(id, phase, actualDuration) => {
  console

.log(id, phase, actualDuration);
}}>
  <MyComponent />
</Profiler>
```

#### 总结

本章介绍了 React 的核心 API，从 JSX 语法到组件相关 API，再到生命周期方法、Hooks、Context API、Refs、Portals 和 Profiler。了解和掌握这些 API 能够帮助开发者高效地创建和管理 React 组件、优化应用性能，并提升开发体验。