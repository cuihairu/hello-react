### 单元测试与集成测试

在软件测试中，单元测试和集成测试是两种主要的测试类型，各自有不同的目的和方法。以下是对这两种测试的详细介绍及其在 React 应用中的应用：

#### 1. **单元测试**

**定义**：
- 单元测试（Unit Testing）是对代码中的最小可测试单元（通常是函数或方法）进行测试的过程。其目的是验证单个单元是否按照预期的方式工作。

**特点**：
- **测试范围**：单元测试通常聚焦于测试单个函数或组件的逻辑和功能。
- **隔离性**：测试通常在隔离的环境中运行，不依赖于外部资源或系统（如数据库、网络服务）。
- **快速反馈**：由于测试的范围很小，单元测试通常运行迅速，可以提供快速的反馈。

**在 React 中的应用**：
- 测试组件的渲染逻辑、事件处理、状态管理等。
- 确保组件在不同的输入下产生正确的输出。
- 使用工具：Jest、Enzyme、React Testing Library。

**示例**：

`Counter.js`：

```jsx
export default function Counter({ count }) {
  return <div>Count: {count}</div>;
}
```

`Counter.test.js`：

```jsx
import { render } from '@testing-library/react';
import Counter from './Counter';

test('displays the correct count', () => {
  const { getByText } = render(<Counter count={5} />);
  expect(getByText('Count: 5')).toBeInTheDocument();
});
```

#### 2. **集成测试**

**定义**：
- 集成测试（Integration Testing）是测试多个组件或模块之间的交互和集成的过程。其目的是验证不同单元在一起工作时的正确性。

**特点**：
- **测试范围**：集成测试通常覆盖多个组件或模块，测试它们如何协作以实现更复杂的功能。
- **依赖性**：可能会涉及到外部资源（如网络请求、数据库），并且测试的复杂性通常较高。
- **较慢的反馈**：由于测试的范围较大，集成测试的执行时间通常较长，反馈也不如单元测试迅速。

**在 React 中的应用**：
- 测试组件之间的交互，如表单提交、数据传递等。
- 验证多个组件的集成效果，确保它们能一起正常工作。
- 使用工具：Jest、React Testing Library（推荐）、Enzyme。

**示例**：

`Form.js`：

```jsx
import React, { useState } from 'react';

export default function Form({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

`Form.test.js`：

```jsx
import { render, fireEvent } from '@testing-library/react';
import Form from './Form';

test('submits the form with the input value', () => {
  const handleSubmit = jest.fn();
  const { getByText, getByRole } = render(<Form onSubmit={handleSubmit} />);

  fireEvent.change(getByRole('textbox'), { target: { value: 'Test Value' } });
  fireEvent.click(getByText('Submit'));

  expect(handleSubmit).toHaveBeenCalledWith('Test Value');
});
```

#### 单元测试与集成测试的对比

| 特性               | 单元测试                       | 集成测试                     |
|--------------------|--------------------------------|------------------------------|
| **测试对象**       | 单个函数或组件                   | 多个组件或模块的交互         |
| **测试范围**       | 小范围，局部测试                 | 大范围，综合测试             |
| **依赖性**         | 通常不依赖外部资源               | 可能依赖外部资源（如网络、数据库） |
| **测试速度**       | 快速                             | 较慢                         |
| **反馈速度**       | 快速                             | 较慢                         |
| **常用工具**       | Jest、Enzyme、React Testing Library | Jest、React Testing Library  |

#### 选择和策略

- **单元测试** 应优先考虑，因为它们更快速、可靠，并且可以更早地发现问题。推荐将单元测试作为测试策略的基础。
- **集成测试** 用于验证组件之间的协作和集成，确保系统整体功能的正确性。它们通常在较大的功能或复杂的组件交互时使用。

在实际项目中，通常会结合使用单元测试和集成测试，以确保代码的功能和质量。单元测试可以提供详细的功能验证，而集成测试可以确保各个部分的协同工作。

---

## React 18 → 19 版本对照

本页正文以 React 18 为准。下表把本页测试策略对到 React 19：

| 主题 | React 18 状态 | React 19 变化 | 说明 |
| --- | --- | --- | --- |
| 单元 / 集成测试框架 | Jest + RTL | 无变化 | 策略不变，见[测试工具](testing-tools.md) |
| Enzyme | 无 React 18 适配器 | **不可用于 React 19** | 集成测试统一迁移到 RTL |
| `react-test-renderer` | 18.3 起弃用 | **打印弃用告警** | 用 `render(...).asFragment()` 替代 |
| `act` 导入位置 | `react-dom/test-utils` | **改自 `react`** | 直接断言状态更新的用例需改导入 |
| 错误路径断言 | 错误重新抛出 | **不再重新抛出** | 未捕获的走 `window.reportError`，被边界捕获的走 `console.error` |
| CI 运行环境 | Node 16/18 | **建议 Node 20/22 LTS** | 与 React 19 升级清单一致，见[社区与生态演进](../future/react-community.md) |

依据：[React 19 升级指南](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)。
