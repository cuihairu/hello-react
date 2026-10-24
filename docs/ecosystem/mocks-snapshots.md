### Mocks and Snapshot Testing

When testing React applications, mocking and snapshot testing are two commonly used test strategies that help ensure components behave and render as expected. Below is a detailed look at both testing methods and how they apply in React applications:

#### 1. **Mocking**

**Definition**:
- Mocking means replacing real implementations with virtual objects or functions during tests, to control the test environment and inputs. This helps isolate the code under test and ensures test results are not affected by external factors.

**Characteristics**:
- **Control dependencies**: Use mock objects to control the test environment, avoiding actual dependencies on external services or modules.
- **Improve test stability**: Less dependence on the external environment makes test results more stable.
- **Simplify tests**: You can mock specific return values or behaviors to test different scenarios.

**Common tools**:
- **Jest**: The built-in `jest.mock()` can mock modules and functions.
- **Sinon**: A powerful mocking library for creating spies, mock functions, and handling clocks.

**Example**:

Suppose there is a `UserProfile` component that fetches user data from an API and displays it:

```jsx
// UserProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('/api/user')
      .then(response => setUser(response.data))
      .catch(error => console.error(error));
  }, []);

  return user ? <div>{user.name}</div> : <div>Loading...</div>;
}
```

In the test, we can mock the `axios` module to control the returned data:

```jsx
// UserProfile.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UserProfile from './UserProfile';
import axios from 'axios';

// Mock the axios module
jest.mock('axios');

test('displays user name after fetching', async () => {
  const user = { name: 'John Doe' };
  axios.get.mockResolvedValue({ data: user });

  render(<UserProfile />);

  await waitFor(() => screen.getByText('John Doe'));
  expect(screen.getByText('John Doe')).toBeInTheDocument();
});
```

#### 2. **Snapshot Testing**

**Definition**:
- Snapshot testing means saving a component's output during a test as a snapshot, then comparing subsequent test results against it. This detects unintended changes in a component's UI.

**Characteristics**:
- **Detect UI changes**: Easily check whether a component's UI matches the expected snapshot.
- **Fast detection**: Well suited for detecting structural and layout changes in components.
- **Snapshot updates**: If a component's UI change is intentional, you can update the snapshot to reflect the latest UI.

**Common tools**:
- **Jest**: Has built-in snapshot testing support, providing the `toMatchSnapshot()` method.

**Example**:

Suppose there is a `Button` component — we can create a snapshot test for it:

```jsx
// Button.js
import React from 'react';

export default function Button({ label }) {
  return <button>{label}</button>;
}
```

Create a snapshot test:

```jsx
// Button.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import Button from './Button';

test('Button snapshot', () => {
  const tree = renderer.create(<Button label="Click Me" />).toJSON();
  expect(tree).toMatchSnapshot();
});
```

If the component's UI changes, the snapshot test will fail and prompt you to update the snapshot:

```bash
$ jest --updateSnapshot
```

#### Comparison of Mocking and Snapshot Testing

| Feature           | Mocking                                  | Snapshot Testing                          |
|--------------------|-----------------------------------------|-------------------------------------------|
| **Purpose**           | Control the test environment, isolate the code under test                | Detect UI changes in components                         |
| **What is tested**       | Behavior of functions or modules                          | A component's rendered output                            |
| **Use cases**       | Testing components with external dependencies or complex interactions           | Ensuring component UI matches expectations                    |
| **Tools**           | Jest, Sinon                             | Jest                                      |
| **How to update**       | Manually update mock behavior                          | Update the snapshot to match the component's latest output              |

#### Summary

- **Mocking** is mainly used to control the test environment and dependencies, ensuring test independence and stability. It is particularly good at handling complex situations like async operations and external services.
- **Snapshot testing** is mainly used to detect UI changes in components, suited for catching unintended structural and layout changes. It provides fast feedback on UI changes but must stay in sync with actual UI changes.

Combining mocking and snapshot testing lets you comprehensively test React components' behavior and output, ensuring the application's stability and quality.

---

## React 18 → 19 Mapping

The main text on this page targets React 18. The table below maps this page's snapshot- and mock-related approaches to React 19:

| Approach | React 18 status | React 19 change | Notes |
| --- | --- | --- | --- |
| `renderer.create(<C />).toJSON()` | Works | **Renderer deprecated** | `react-test-renderer` logs a deprecation warning and switches to concurrent rendering; migrate to RTL |
| `react-test-renderer/shallow` | Spun out to a separate package | **Removed** | Install `react-shallow-renderer` directly, or switch to RTL |
| `render(<C />).asFragment()` | Works | No change | The recommended snapshot source, replacing `toJSON()` |
| Where `act` is imported from | `react-dom/test-utils` | **Import from `react`** | Test cases asserting state updates need an updated import |
| Module and API mocking (`jest.mock`) | Works | No change | — |

Reference: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

## References

- [Jest Official Docs](https://jestjs.io/docs/getting-started)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [testing-tools](testing-tools.md)
- [glossary](/glossary.md))
