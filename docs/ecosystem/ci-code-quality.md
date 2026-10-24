### Continuous Integration and Code Quality Management

Continuous Integration (CI) and code quality management are important practices in modern software development. They help improve code quality, reduce errors, and boost development efficiency. Below is a detailed look at both areas and how they apply in React projects.

#### 1. **Continuous Integration (CI)**

**Definition**:
Continuous Integration means that during development, developers frequently integrate code into a shared codebase and automatically run the build and test processes to quickly detect and resolve integration issues.

**Primary goals**:
- **Fast feedback**: Automatically run tests after every code commit to quickly detect whether changes have introduced issues.
- **Reduce integration issues**: Frequent integration reduces the integration problems that surface after long development cycles.
- **Automated builds**: Automate building, testing, and deploying to cut down manual work.

**Common tools**:
- **Jenkins**: A popular open-source CI tool that supports various build, test, and deploy tasks via plugins.
- **GitHub Actions**: A CI/CD tool integrated into GitHub, supporting build, test, and deploy.
- **GitLab CI/CD**: A CI/CD tool integrated into GitLab, supporting automated pipelines.
- **CircleCI**: A CI tool focused on fast builds and tests.
- **Travis CI**: A CI tool integrated with GitHub, providing automated build and test capabilities.

**Example: GitHub Actions configuration**

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Set up Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '22'

    - name: Install dependencies
      run: npm install

    - name: Run tests
      run: npm test

    - name: Build project
      run: npm run build
```

#### 2. **Code Quality Management**

**Definition**:
Code quality management means using various tools and practices to ensure code maintainability, readability, and functional correctness. This includes static code analysis, code formatting, and other quality assurance measures.

**Key aspects**:
- **Static code analysis**: Automatically analyze code quality, detecting potential errors and style violations.
- **Code formatting**: Use tools to automatically format code to match the project's style guidelines.
- **Code review**: Ensure code quality through peer review, finding and fixing potential issues.
- **Test coverage**: Measure how much of the actual code the tests cover, ensuring code is adequately tested.

**Common tools**:
- **ESLint**: A static code analysis tool that helps find and fix issues in JavaScript code.
- **Prettier**: A code formatting tool that automatically formats code to match predefined style rules.
- **SonarQube**: A code quality management platform with static analysis support for multiple languages and code quality reports.
- **Jest**: A JavaScript testing framework supporting unit, integration, and snapshot testing.
- **Codecov**: A test coverage analysis tool that aggregates test results and generates coverage reports.

**Example: ESLint and Prettier configuration**

1. **Install ESLint and Prettier**

   ```bash
   npm install eslint prettier eslint-config-prettier eslint-plugin-prettier --save-dev
   ```

2. **Configure ESLint**

   Create a `.eslintrc.js` file:

   ```javascript
   module.exports = {
     env: {
       browser: true,
       es2021: true,
     },
     extends: [
       'eslint:recommended',
       'plugin:react/recommended',
       'prettier',
       'plugin:prettier/recommended',
     ],
     parserOptions: {
       ecmaFeatures: {
         jsx: true,
       },
       ecmaVersion: 12,
       sourceType: 'module',
     },
     plugins: ['react'],
     rules: {
       'prettier/prettier': 'error',
     },
   };
   ```

3. **Configure Prettier**

   Create a `.prettierrc` file:

   ```json
   {
     "semi": false,
     "singleQuote": true,
     "trailingComma": "es5"
   }
   ```

4. **Integrate code quality checks into CI**

   Add code quality check steps to your CI configuration:

   ```yaml
   - name: Run ESLint
     run: npx eslint . --ext .js,.jsx

   - name: Run Prettier
     run: npx prettier --check .
   ```

#### Summary

- **Continuous Integration (CI)** speeds up integration issue detection and development efficiency through automated build, test, and deploy pipelines. Choosing the right CI tool and configuring a suitable workflow is key.
- **Code Quality Management** ensures code quality and stability through static analysis, formatting, code review, and test coverage. Using tools like ESLint and Prettier maintains code consistency, and integrating them into CI automates quality control.

By combining Continuous Integration and code quality management tools, dev teams can achieve an efficient development workflow, reduce code defects, and improve code maintainability and stability.

---

## React 18 → 19 Mapping

The main text on this page targets React 18. The table below maps this page's CI configuration to React 19:

| Item | React 18 era | React 19 requirement | Notes |
| --- | --- | --- | --- |
| Node version in CI | Example uses Node 16 | **20/22 LTS recommended** | Hard requirement in the React 19 upgrade checklist; example updated accordingly |
| Dependency versions | `react@18`, `@types/react@18` | **Upgrade to `react@19` and `@types/react@19`** | Also requires `typescript@5.5+` and `eslint-plugin-react-hooks@5` |
| `act` in test steps | Imported from `react-dom/test-utils` | **Import from `react`** | Otherwise CI logs a deprecation warning |
| Pre-deploy validation | Build + test | **Add canary validation** | Recommend a 5% traffic canary for 48 hours with no issues before full rollout, see [Community & Ecosystem Evolution](../future/react-community.md) |

Reference: [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide).

## References

- [ESLint Official Docs](https://eslint.org/docs/latest/)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [knowledge](/knowledge.md))
