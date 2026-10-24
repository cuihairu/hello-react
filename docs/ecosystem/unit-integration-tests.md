### Unit Testing and Integration Testing

In software testing, unit testing and integration testing are two primary testing types, each with different purposes and methods. Below is a detailed introduction to both and how they apply in React applications:

#### 1. **Unit Testing**

**Definition**:
- Unit Testing is the process of testing the smallest testable unit in the code (usually a function or method). Its purpose is to verify that a single unit works as expected.

**Characteristics**:
- **Scope**: Unit tests typically focus on the logic and functionality of a single function or component.
- **Isolation**: Tests usually run in an isolated environment without depending on external resources or systems (such as databases or network services).
- **Fast feedback**: Because the scope is small, unit tests usually run quickly, providing fast feedback.

**Application in React**:
- Testing component rendering logic, event handling, state management, and so on.
- Ensuring components produce correct output for different inputs.
- Tools: Jest, Enzyme, React Testing Library.

**Example**:

`Counter.js`:

```jsx
export default function Counter({ count }) {
  return <div>Count: {count}</div>;
}
```

`Counter.test.js`:

```jsx
import { render } from '@testing-library/react';
import Counter from './Counter';

test('displays the correct count', () => {
  const { getByText } = render(<Counter count={5} />);
  expect(getByText('Count: 5')).toBeInTheDocument();
});
```

#### 2. **Integration Testing**

**Definition**:
- Integration Testing is the process of testing interactions and integration between multiple components or modules. Its purpose is to verify correctness when different units work together.

**Characteristics**:
- **Scope**: Integration tests typically cover multiple components or modules, testing how they collaborate to achieve more complex functionality.
- **Dependencies**: May involve external resources (such as network requests or databases), and test complexity is usually higher.
- **Slower feedback**: Because the scope is larger, integration tests usually take longer to run and feedback is less immediate than with unit tests.

**Application in React**:
- Testing interactions between components, such as form submission and data passing.
- Verifying the integration results of multiple components to ensure they work together properly.
- Tools: Jest, React Testing Library (recommended), Enzyme.

**Example**:

`Form.js`:

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

`Form.test.js`:

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

#### Comparison of Unit Testing and Integration Testing

| Feature           | Unit Testing                     | Integration Testing               |
|--------------------|----------------------------------|-----------------------------------|
| **What is tested**       | A single function or component                  | Interactions between multiple components or modules         |
| **Scope**       | Small scope, local testing                 | Large scope, comprehensive testing             |
| **Dependencies**         | Usually no external resource dependencies               | May depend on external resources (network, database, etc.) |
| **Test speed**       | Fast                             | Slower                         |
| **Feedback speed**       | Fast                             | Slower                         |
| **Common tools**       | Jest, Enzyme, React Testing Library | Jest, React Testing Library  |

#### Selection and Strategy

- **Unit testing** should be prioritized, because it is faster, more reliable, and catches problems earlier. Unit testing is recommended as the foundation of your testing strategy.
- **Integration testing** verifies collaboration and integration between components, ensuring overall system correctness. It is typically used for larger features or complex component interactions.

In practice, projects usually combine unit and integration testing to ensure both functionality and code quality. Unit testing provides detailed functional verification, while integration testing ensures the parts work together.

---

## React 18 → 19 Mapping

The main text on this page targets React 18. The table below maps this page's testing strategy to React 19:

| Topic | React 18 status | React 19 change | Notes |
| --- | --- | --- | --- |
| Unit / integration test frameworks | Jest + RTL | No change | Strategy unchanged — see [Testing Tools](testing-tools.md) |
| Enzyme | No React 18 adapter | **Cannot be used with React 19** | Migrate integration tests uniformly to RTL |
| `react-test-renderer` | Deprecated since 18.3 | **Logs a deprecation warning** | Use `render(...).asFragment()` instead |
| Where `act` is imported from | `react-dom/test-utils` | **Import from `react`** | Test cases that directly assert state updates need an updated import |
| Error path assertions | Errors rethrown | **No longer rethrown** | Uncaught errors go to `window.reportError`; boundary-caught ones go to `console.error` |
| CI runtime | Node 16/18 | **Node 20/22 LTS recommended** | Aligned with the React 19 upgrade checklist — see [Community & Ecosystem Evolution](../future/react-community.md) |

Reference: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

## References

- [Testing Library Official Docs](https://testing-library.com/docs/)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
