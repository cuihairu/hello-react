# Testing and Quality Assurance

In modern software development, testing and quality assurance (QA) are essential for ensuring code reliability and stability. Systematic testing strategies reduce errors in code, improve user experience, and ensure product consistency across environments. Here I collect the test tools, testing methods, and quality-check steps I use in React projects.

#### 1. **Why Testing Matters**

- **Code reliability**: Testing finds bugs and potential issues in code, ensuring it behaves as expected.
- **Code maintainability**: Good test coverage makes code easier to maintain — when updating features or refactoring, you can quickly verify that old and new code stay consistent.
- **User experience**: Comprehensive testing ensures users don't hit unexpected problems, boosting satisfaction.
- **Continuous integration**: Testing is a key part of the CI/CD pipeline, ensuring stable deployment after every commit.

#### 2. **Types of Frontend Testing**

1. **Unit Testing**
   - **Definition**: Unit testing tests the smallest testable unit in the application, usually a function or method.
   - **Tools**: Jest, Mocha, Chai.
   - **Practice**: Write isolated test cases to verify the correctness of each unit module's functionality.

2. **Integration Testing**
   - **Definition**: Integration testing verifies whether multiple modules or components work together correctly.
   - **Tools**: Jest, Testing Library, Cypress.
   - **Practice**: Simulate real scenarios and test interactions between components or modules.

3. **End-to-End Testing**
   - **Definition**: End-to-end testing, from the user's perspective, simulates a user walking through the entire app flow to verify overall functionality.
   - **Tools**: Cypress, Puppeteer, Playwright.
   - **Practice**: Write test cases that simulate user actions, such as login, navigation, and form submission.

4. **Functional Testing**
   - **Definition**: Functional testing verifies that specific application features are implemented according to the requirements document.
   - **Tools**: Jest, Cypress.
   - **Practice**: Focus on core functionality, such as cart operations and payment flows.

5. **Performance Testing**
   - **Definition**: Performance testing evaluates the application's response time, stability, and resource consumption under different conditions.
   - **Tools**: Lighthouse, WebPageTest.
   - **Practice**: Measure load time, response time, page size, etc., and optimize code and resource loading.

6. **Accessibility Testing**
   - **Definition**: Accessibility testing ensures the application is usable by everyone, including users with disabilities.
   - **Tools**: Axe, Lighthouse.
   - **Practice**: Detect and fix code that may affect accessibility, such as image alt tags and use of semantic HTML tags.

#### 3. **Testing in React Applications**

1. **Unit testing with Jest**
   - **Introduction**: Jest is a JavaScript testing framework widely used for unit and integration testing in React apps.
   - **Practice**: Write test cases to ensure component rendering and functionality work as expected.

   ```jsx
   import { render, screen } from '@testing-library/react';
   import MyComponent from './MyComponent';

   test('renders component', () => {
     render(<MyComponent />);
     const element = screen.getByText(/hello world/i);
     expect(element).toBeInTheDocument();
   });
   ```

2. **Using React Testing Library**
   - **Introduction**: React Testing Library is a lightweight tool for testing React components, focused on user behavior testing.
   - **Practice**: Simulate user behavior to test component rendering, interaction, and state management.

   ```jsx
   import { render, fireEvent } from '@testing-library/react';
   import Button from './Button';

   test('button click updates count', () => {
     const { getByText } = render(<Button />);
     const button = getByText('Click me');
     fireEvent.click(button);
     expect(getByText('Clicked 1 times')).toBeInTheDocument();
   });
   ```

3. **End-to-end testing with Cypress**
   - **Introduction**: Cypress is a powerful end-to-end testing framework that can simulate user interaction in a browser.
   - **Practice**: Write test scripts that simulate user actions and verify overall application functionality.

   ```javascript
   describe('My App', () => {
     it('should load the homepage', () => {
       cy.visit('/');
       cy.contains('Welcome to My App');
     });

     it('should navigate to the about page', () => {
       cy.get('a[href="/about"]').click();
       cy.contains('About Us');
     });
   });
   ```

4. **Snapshot Testing**
   - **Introduction**: Snapshot testing verifies the rendering output of UI components in different states, detecting UI changes by comparing current output against a previous snapshot.
   - **Practice**: Use Jest's snapshot feature to generate and compare component snapshots.

   ```jsx
   import renderer from 'react-test-renderer';
   import MyComponent from './MyComponent';

   test('renders correctly', () => {
     const tree = renderer.create(<MyComponent />).toJSON();
     expect(tree).toMatchSnapshot();
   });
   ```

#### 4. **Test Coverage and Continuous Integration**

1. **Test coverage**
   - **Introduction**: Test coverage is a key metric for measuring how much code is tested. Common coverage types include statement, branch, function, and line coverage.
   - **Tools**: Jest has built-in coverage reporting that can generate detailed reports.
   - **Practice**: Ensure core functionality modules meet a coverage threshold (e.g. 80%+) to improve code reliability.

2. **Continuous Integration (CI) and Continuous Delivery (CD)**
   - **Introduction**: CI/CD is an automated development practice that integrates testing, building, and deployment to ensure continuously high code quality.
   - **Tools**: Jenkins, GitHub Actions, GitLab CI, and others.
   - **Practice**: Configure CI tools to automatically run tests on every commit, generate test reports, and auto-deploy to test or production environments.

3. **Integrating test reports and analysis**
   - **Introduction**: Reports generated by integrated testing tools give you a clear view of test results, coverage, and potential issues.
   - **Practice**: Regularly analyze test reports, fix discovered problems, and refine test cases.

#### 5. **Summary**

Testing and quality assurance are indispensable parts of the modern frontend development workflow. Systematic testing strategies and tools significantly improve code reliability and maintainability, reduce production errors, and provide users with a stable, efficient application experience.

---

## React 18 → 19 Mapping

The main text on this page targets React 18. The table below maps this page's testing content to React 19:

| Topic | React 18 status | React 19 change | Notes |
| --- | --- | --- | --- |
| RTL's `render` / `fireEvent` | Stable | No change | Existing test cases need no modification |
| Where `act` is imported from | `react-dom/test-utils` | **Import from `react`** | `import { act } from 'react'` |
| Snapshot testing | `react-test-renderer` | **Renderer deprecated** | Use `render(<C />).asFragment()` with `toMatchSnapshot()` instead |
| Error assertions | Errors are rethrown | **No longer rethrown** | Uncaught errors go to `window.reportError`; boundary-caught ones go to `console.error` |
| Test environment dependencies | react 18 + @types/react 18 | **Must upgrade to 19** | `react@19`, `react-dom@19`, `@types/react@19`, `typescript@5.5+` |
| Strict Mode double-calling | Already exists | **Behavior refined** | ref callbacks called twice; `useMemo` / `useCallback` reuse the first result |

Reference: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

## References

- [Testing Library Official Docs](https://testing-library.com/docs/)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [glossary](/glossary.md))
- [knowledge](/knowledge.md))
