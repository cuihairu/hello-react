# React Testing Tools: Jest, Enzyme, React Testing Library

In React development, testing is an essential part of ensuring code quality. To verify the correctness of components and applications, we can use various testing tools to write and run tests. Jest, Enzyme, and React Testing Library are the most commonly used testing tools in the React ecosystem. Below are detailed introductions to these tools and their use cases.

#### 1. **Jest**

**Introduction**:
- **Jest** is a JavaScript testing framework developed by Facebook, designed for React applications but also usable for testing any JavaScript project. It integrates a test runner, assertion library, test coverage tool, and snapshot testing functionality, providing a comprehensive testing solution.

**Features**:
- **Zero configuration**: Jest works out of the box — you can start testing without complex configuration.
- **Snapshot testing**: Automatically generates UI snapshots of components, making it easy to track UI changes.
- **Parallel testing**: Jest runs test cases in parallel by default, improving test speed.
- **Mocking and timer control**: Jest provides built-in mocking and timer control, making it easier to test async code.

**Usage example**:
```jsx
import { render } from '@testing-library/react';
import MyComponent from './MyComponent';

test('renders MyComponent with correct text', () => {
  const { getByText } = render(<MyComponent />);
  const element = getByText(/hello world/i);
  expect(element).toBeInTheDocument();
});
```

**Use cases**:
- Unit testing, integration testing, end-to-end testing
- Snapshot testing to track UI changes
- Testing async operations, such as network requests

#### 2. **Enzyme**

**Introduction**:
- **Enzyme** is a JavaScript testing tool developed by Airbnb, specifically for testing React components. Enzyme provides a set of APIs for easily manipulating and traversing the output structure of React components and simulating component lifecycle methods, which is convenient for unit testing.

**Features**:
- **Shallow Rendering**: Renders only the top-level element of a component, avoiding dependencies on child components — suitable for unit testing.
- **Full Rendering**: Uses the `mount` method to render the complete DOM tree — suitable for testing component lifecycle methods and DOM interaction.
- **Static Rendering**: Generates static HTML markup — suitable for testing generated HTML structure.

**Usage example**:
```jsx
import { shallow } from 'enzyme';
import MyComponent from './MyComponent';

test('renders the correct text', () => {
  const wrapper = shallow(<MyComponent />);
  expect(wrapper.text()).toContain('Hello World');
});
```

**Use cases**:
- Unit testing components
- Testing component lifecycle methods
- Testing DOM manipulation and interaction

**Using Jest and Enzyme together**:
- Although Jest already has many built-in testing features, Enzyme's APIs for DOM manipulation are more powerful. Jest and Enzyme are usually used together, combining Jest's power with Enzyme's flexibility.

#### 3. **React Testing Library**

**Introduction**:
- **React Testing Library** is a lightweight testing tool library focused on testing React components by simulating user behavior. It encourages writing tests from the user's perspective, focusing on what the component renders rather than its implementation details.

**Features**:
- **User-centric**: React Testing Library focuses more on component accessibility and user experience rather than testing internal implementation.
- **Fewer dependencies**: It encourages reducing reliance on implementation details, avoiding test cases that break when the implementation changes.
- **Rich selectors**: Provides a range of selectors to find elements by text, tag, role, and more.

**Usage example**:
```jsx
import { render, fireEvent } from '@testing-library/react';
import MyComponent from './MyComponent';

test('button click updates count', () => {
  const { getByText } = render(<MyComponent />);
  const button = getByText('Click me');
  fireEvent.click(button);
  expect(getByText('Clicked 1 times')).toBeInTheDocument();
});
```

**Use cases**:
- Testing user interactions, such as clicking buttons and submitting forms
- Tests focused on UI accessibility
- Unit testing and integration testing

#### 4. **Tool Comparison and Selection**

- **Jest** is a comprehensive testing framework suitable for various testing scenarios. It fits projects that need a full testing solution.
- **Enzyme** provides powerful component manipulation APIs, suitable for projects that need to deeply test React component internals.
- **React Testing Library** emphasizes writing tests from the user's perspective, suitable for projects that prioritize user experience.

In practice, projects typically combine Jest with React Testing Library, or Jest with Enzyme, to cover different testing needs. Based on the project's characteristics and testing goals, you can choose the most suitable tool or combination.

---

## React 18 → 19 Mapping

The main text on this page targets React 18. The table below maps this page's testing tools to React 19:

| Tool / API | React 18 status | React 19 change | Notes |
| --- | --- | --- | --- |
| React Testing Library | Recommended | No change | Still officially recommended as the first choice |
| Enzyme | No React 18 adapter | **Cannot be used with React 19** | Maintenance stopped; migrate to RTL or `@testing-library/react-native` |
| `react-test-renderer` | Deprecated since 18.3 | **Logs a deprecation warning and switches to concurrent rendering** | Officially recommended to migrate to RTL |
| `react-test-renderer/shallow` | Spun out to `react-shallow-renderer` | **Removed** | Install `react-shallow-renderer` directly, or switch to RTL |
| Where `act` is imported from | `react-dom/test-utils` | **Import from `react`** | `import { act } from 'react'` |
| Other `react-dom/test-utils` tools (like `Simulate`) | Works | **Errors on call** | Exports removed in later versions |
| Jest snapshots | Works | No change | The renderer changed, so snapshot usage needs matching adjustments — see [Mocks and Snapshot Testing](mocks-snapshots.md) |

Reference: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

## References

- [Testing Library Official Docs](https://testing-library.com/docs/)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [unit-integration-tests](unit-integration-tests.md)
- [glossary](/glossary.md))
- [knowledge](/knowledge.md))
