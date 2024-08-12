### Hooks API：useState、useEffect、useContext、useReducer 等

React Hooks 是 React 16.8 引入的一种功能，使函数组件能够使用 state 和其他 React 特性。以下是一些常用的 Hooks API 及其详细说明：

#### 1. **`useState`**

**描述**：
- `useState` 用于在函数组件中添加 state 变量。

**用法**：

```jsx
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```

**说明**：
- `useState` 返回一个数组，包含当前的 state 值和更新该值的函数。
- 初始 state 值作为 `useState` 的参数传入。

#### 2. **`useEffect`**

**描述**：
- `useEffect` 用于处理副作用，如数据获取、订阅或手动操作 DOM。

**用法**：

```jsx
import React, { useEffect, useState } from 'react';

const DataFetcher = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => setData(data));
  }, []); // 空数组表示仅在组件挂载时执行一次

  return <div>{data ? data.message : 'Loading...'}</div>;
};
```

**说明**：
- `useEffect` 接受一个函数，该函数在组件渲染后执行。
- 可以传入一个依赖数组，指定副作用依赖的变量。若依赖数组为空，则副作用仅在组件挂载和卸载时执行。

#### 3. **`useContext`**

**描述**：
- `useContext` 用于访问 React 上下文的值，使组件能够从上下文中获取数据。

**用法**：

```jsx
import React, { createContext, useContext } from 'react';

const ThemeContext = createContext('light');

const ThemedComponent = () => {
  const theme = useContext(ThemeContext);

  return <div style={{ background: theme === 'light' ? '#fff' : '#333' }}>
    The current theme is {theme}
  </div>;
};
```

**说明**：
- `useContext` 接受一个 context 对象（由 `createContext` 创建），并返回该 context 的当前值。
- 组件需要在 `Context.Provider` 中包裹才能正确访问到 context 的值。

#### 4. **`useReducer`**

**描述**：
- `useReducer` 是 `useState` 的替代方案，用于处理更复杂的 state 逻辑。

**用法**：

```jsx
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
    </div>
  );
};
```

**说明**：
- `useReducer` 接受一个 reducer 函数和初始 state，返回当前 state 和 dispatch 函数。
- reducer 函数根据 action 类型更新 state。

#### 5. **`useCallback`**

**描述**：
- `useCallback` 返回一个 memoized（记忆化的）回调函数，以避免组件重复渲染时创建新的函数实例。

**用法**：

```jsx
import React, { useCallback, useState } from 'react';

const MyComponent = ({ onClick }) => {
  return <button onClick={onClick}>Click me</button>;
};

const ParentComponent = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]); // 依赖 count，使 handleClick 函数在 count 变化时重新创建

  return (
    <div>
      <p>Count: {count}</p>
      <MyComponent onClick={handleClick} />
    </div>
  );
};
```

**说明**：
- `useCallback` 接受一个回调函数和依赖数组，返回 memoized 回调。
- 当依赖数组中的值发生变化时，回调函数会重新创建。

#### 6. **`useMemo`**

**描述**：
- `useMemo` 用于 memoize（记忆化）计算结果，以避免不必要的重复计算。

**用法**：

```jsx
import React, { useMemo, useState } from 'react';

const ExpensiveComponent = ({ value }) => {
  const computedValue = useMemo(() => {
    // 假设这里有昂贵的计算
    return value * 2;
  }, [value]); // 依赖 value，当 value 改变时重新计算

  return <div>Computed value: {computedValue}</div>;
};
```

**说明**：
- `useMemo` 接受一个计算函数和依赖数组，返回 memoized 计算结果。
- 只有当依赖数组中的值发生变化时，计算函数才会重新执行。

#### 7. **`useImperativeHandle`**

**描述**：
- `useImperativeHandle` 用于定制 ref 的暴露值，以便父组件可以访问子组件的实例方法。

**用法**：

```jsx
import React, { useImperativeHandle, forwardRef, useRef } from 'react';

const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));

  return <input ref={inputRef} />;
});

const ParentComponent = () => {
  const ref = useRef();

  const handleClick = () => {
    ref.current.focus();
  };

  return (
    <div>
      <FancyInput ref={ref} />
      <button onClick={handleClick}>Focus the input</button>
    </div>
  );
};
```

**说明**：
- `useImperativeHandle` 用于定义组件暴露给父组件的实例值。
- 需要与 `forwardRef` 一起使用，允许父组件通过 `ref` 访问子组件的方法。

#### 8. **`useLayoutEffect`**

**描述**：
- `useLayoutEffect` 和 `useEffect` 类似，但在 DOM 更新完成后立即同步执行。

**用法**：

```jsx
import React, { useLayoutEffect, useRef } from 'react';

const LayoutEffectExample = () => {
  const divRef = useRef();

  useLayoutEffect(() => {
    console.log('Layout effect:', divRef.current.getBoundingClientRect());
  }, []);

  return <div ref={divRef}>Hello, world!</div>;
};
```

**说明**：
- `useLayoutEffect` 在浏览器绘制之前同步执行。
- 用于需要同步测量 DOM 元素的场景。

### 总结

- **`useState`** 用于在函数组件中添加 state。
- **`useEffect`** 用于处理副作用。
- **`useContext`** 用于访问 React 上下文。
- **`useReducer`** 用于处理复杂的 state 逻辑。
- **`useCallback`** 用于 memoize 回调函数。
- **`useMemo`** 用于 memoize 计算结果。
- **`useImperativeHandle`** 用于定制暴露给父组件的 ref 实例值。
- **`useLayoutEffect`** 用于在 DOM 更新后立即执行副作用。

这些 Hooks 提供了强大的功能，使函数组件能够处理各种状态和副作用逻辑，同时保持代码的简洁和可维护性。