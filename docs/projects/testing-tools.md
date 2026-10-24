### Testing and Quality Assurance

#### 19.4. Testing Tools and Methods

**Testing tools** and **testing methods** are essential for ensuring the quality and stability of React applications. Here I collect the common testing tools and methods and note what they're used for when verifying the reliability of a React app.

#### 19.4.1. React Testing Tools

1. **Jest**
   - **Overview**: Jest is a JavaScript testing framework developed by Facebook, providing a simple API for writing and running tests. It supports snapshot testing, mocking, async testing, and more.
   - **Features**:
     - Out-of-the-box configuration, suitable for a variety of JavaScript applications.
     - Built-in assertion library and test runner.
     - Supports snapshot testing, able to capture a component's render output.
   - **Installation**:
     ```bash
     npm install --save-dev jest
     ```
   - **Configuration**:
     Add a test script to `package.json`:
     ```jsonc
     "scripts": {
       "test": "jest"
     }
     ```

2. **Enzyme**
   - **Overview**: Enzyme is a testing tool developed by Airbnb, dedicated to unit testing React components. It provides an API for interacting with components, making them easy to test.
   - **Note**: Enzyme is essentially unmaintained, and there is no official React 18 adapter (`enzyme-adapter-react-16` only works with React 16). Know it for legacy projects; **use React Testing Library for new projects**.
   - **Features**:
     - Supports shallow rendering, full rendering, and static rendering.
     - Provides deep manipulation of mocked events, mocked functions, and components.
   - **Installation**:
     ```bash
     npm install --save-dev enzyme enzyme-adapter-react-16
     ```
   - **Configuration**:
     Set up the Enzyme adapter in your test file:
     ```javascript
     import { configure } from 'enzyme';
     import Adapter from 'enzyme-adapter-react-16';

     configure({ adapter: new Adapter() });
     ```

3. **React Testing Library**
   - **Overview**: React Testing Library is a testing library aimed at encouraging testing practices that better match real user interaction. It encourages testing component behavior rather than internal implementation details.
   - **Features**:
     - Provides a concise API for querying DOM elements.
     - Encourages writing test cases that better match real user actions.
   - **Installation**:
     ```bash
     npm install --save-dev @testing-library/react
     ```
   - **Basic usage**:
     ```jsx
     import { render, screen } from '@testing-library/react';
     import MyComponent from './MyComponent';

     test('renders hello text', () => {
       render(<MyComponent />);
       expect(screen.getByText(/hello/i)).toBeInTheDocument();
     });
     ```

#### 19.4.2. Testing Methods

1. **Unit Testing**
   - **Overview**: Unit testing verifies the isolated functionality of a component or function. It focuses on testing a single "unit", typically a component's inputs and outputs.
   - **Purpose**: Ensure components behave correctly under different inputs and that the implemented functionality matches expectations.
   - **Example**: Test a component's render output, state changes, event handling, and so on.

2. **Integration Testing**
   - **Overview**: Integration testing verifies the interaction and combined effect between components. It tests how multiple components or system modules behave when working together.
   - **Purpose**: Ensure component interaction and data flow match expectations, resolving integration issues that may arise.
   - **Example**: Test how a component interacts with its parent or child components, verifying integration with Redux or the Context API.

3. **Snapshot Testing**
   - **Overview**: Snapshot testing captures a component's render output and compares it against a previously stored snapshot. It helps detect unexpected changes in a component's render output.
   - **Purpose**: Ensure a component's render output stays consistent across multiple test runs.
   - **Example**: Use Jest's snapshot feature to save a component's render result and compare it in subsequent tests.
   - **Usage**:
     ```jsx
     import { render } from '@testing-library/react';
     import MyComponent from './MyComponent';
     import renderer from 'react-test-renderer';

     test('matches snapshot', () => {
       const tree = renderer.create(<MyComponent />).toJSON();
       expect(tree).toMatchSnapshot();
     });
     ```

     > `react-test-renderer` has been officially marked deprecated since React 18.3 and is fully removed in React 19. For snapshot tests in new projects, use RTL's `render(...).asFragment()` or the `container` output paired with `toMatchSnapshot()` instead.

4. **Mock Testing**
   - **Overview**: Mock testing substitutes a component's real dependencies (such as functions or modules) and provides fake implementations or data, so the component's behavior can be tested.
   - **Purpose**: Test component behavior under specific conditions, avoiding complex interactions with real dependencies.
   - **Example**: Use Jest's `jest.mock` method to mock API calls or component dependencies.

5. **End-to-End Testing (E2E testing)**
   - **Overview**: End-to-end testing verifies the functionality of the entire application by simulating real user actions to test the app's overall workflow.
   - **Purpose**: Ensure the application's core features work correctly from the user's perspective.
   - **Tools**:
     - **Cypress**: A modern end-to-end testing framework with a concise API and good developer experience.
     - **Selenium**: A testing tool for automating browser operations, supporting multiple browsers and platforms.
   - **Example**: Write a test case with Cypress:
     ```javascript
     describe('My App', () => {
       it('should display welcome message', () => {
         cy.visit('/');
         cy.contains('Welcome to My App');
       });
     });
     ```

#### 19.4.3. Continuous Integration and Code Quality Management

- **Continuous Integration (CI)**:
  - **Overview**: Continuous integration is a development practice that keeps code in a working state after each commit by automating the build and test process.
  - **Tools**:
    - **GitHub Actions**: A CI/CD tool provided by GitHub that can automate build, test, and deployment workflows.
    - **CircleCI**: Supports automated builds and tests, offering integration with GitHub and Bitbucket.

- **Code quality management**:
  - **Overview**: Code quality management uses automated tools to check code style, potential errors, and best practices, ensuring high-quality and consistent code.
  - **Tools**:
    - **ESLint**: A tool for checking and enforcing JavaScript code style.
    - **Prettier**: A code formatting tool that automatically formats code to conform to a specified style guide.
    - **Husky**: Used to automatically run lint and test scripts on Git commit and push.

By using these testing tools and methods, you can effectively improve the quality and stability of a React app and ensure functionality works correctly across different environments.

## References

- [Testing Library Official Documentation](https://testing-library.com/docs/)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [component-development](/typescript-react/component-development.md))
- [profiler](/typescript-react/profiler.md))