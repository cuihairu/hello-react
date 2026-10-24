### Build Tools & Automation

#### 11.4. Continuous Integration & Automated Deployment

Continuous integration (CI) and automated deployment (CD) are indispensable practices in modern software development; they help teams ship high-quality applications faster. Below is a detailed guide to implementing CI and CD.

---

#### 11.4.1. Continuous Integration (CI)

**Continuous integration** means developers integrate code into a shared codebase frequently, so bugs are caught and fixed early. The CI process automatically runs builds, tests, and code quality checks, ensuring every commit stays stable.

**Main features of CI tools**:
- **Automated builds**: After each commit, the project builds automatically, making sure the code compiles and builds successfully.
- **Automated testing**: Runs unit, integration, and end-to-end tests, verifying that functionality and behavior are correct.
- **Code quality checks**: Uses static analysis and style checkers to ensure the code follows team conventions and best practices.

**Common CI tools**:
1. **GitHub Actions**
   - **Overview**: A CI/CD tool provided by GitHub, seamlessly integrated with GitHub repositories. Supports custom workflows for automated builds, tests, and deployments.
   - **Configuration example**:
     Create a workflow file (such as `ci.yml`) in the `.github/workflows` directory:
     ```yaml
     name: CI

     on:
       push:
         branches: [main]
       pull_request:
         branches: [main]

     jobs:
       build:
         runs-on: ubuntu-latest

         steps:
           - uses: actions/checkout@v4
           - name: Set up Node.js
             uses: actions/setup-node@v4
             with:
               node-version: '20'
               cache: 'npm'
           - run: npm ci
           - run: npm test
     ```
   - **Features**:
     - Flexible workflow configuration.
     - Detailed logs and build reports.
     - Tight integration with GitHub repositories.

2. **CircleCI**
   - **Overview**: Supports automated builds and testing, offers integration with GitHub and Bitbucket, and handles distributed builds and parallel execution.
   - **Configuration example**:
     Create a `.circleci/config.yml` file in the project root:
     ```yaml
     version: 2.1
     jobs:
       build:
         docker:
           - image: cimg/node:20.18
         steps:
           - checkout
           - run:
               name: Install dependencies
               command: npm install
           - run:
               name: Run tests
               command: npm test
     workflows:
       version: 2
       build:
         jobs:
           - build
     ```
   - **Features**:
     - Strong parallel build and test capability.
     - Support for multiple languages and frameworks.

3. **GitLab CI/CD**
   - **Overview**: A built-in CI/CD tool provided by GitLab, supporting automated builds, testing, and deployment.
   - **Configuration example**:
     Create a `.gitlab-ci.yml` file in the project root:
     ```yaml
     stages:
       - build
       - test

     build:
       stage: build
       script:
         - npm install
         - npm run build

     test:
       stage: test
       script:
         - npm test
     ```
   - **Features**:
     - Tight integration with GitLab repositories.
     - Visualized CI/CD pipelines.

---

#### 11.4.2. Automated Deployment (CD)

**Automated deployment** means built code is deployed automatically to production or test environments. Automating deployment reduces manual mistakes and improves both the speed and reliability of releases.

**Main features of CD tools**:
- **Automated deployment**: After the CI process completes, the built application is deployed to the target environment automatically.
- **Rollback mechanisms**: If a deployment goes wrong, you can roll back quickly to a previous stable version.
- **Environment configuration**: Manages and configures deployment settings for different environments (development, testing, production).

**Common CD tools**:
1. **GitHub Actions**
   - **Deployment example**:
     Add a deployment step to the workflow file:
     ```yaml
     jobs:
       deploy:
         runs-on: ubuntu-latest
         steps:
           - uses: actions/checkout@v4
           - name: Deploy to server
             run: |
               scp -r ./build user@server:/path/to/deploy
     ```

2. **CircleCI**
   - **Deployment example**:
     Add a deployment step to the `.circleci/config.yml` file:
     ```yaml
     deploy:
       docker:
         - image: cimg/node:20.18
       steps:
         - checkout
         - run:
             name: Deploy
             command: |
               scp -r ./build user@server:/path/to/deploy
     ```

3. **GitLab CI/CD**
   - **Deployment example**:
     Add a deployment stage to the `.gitlab-ci.yml` file:
     ```yaml
     deploy:
       stage: deploy
       script:
         - scp -r ./build user@server:/path/to/deploy
     ```

4. **Deployment platforms** (such as Vercel, Netlify)
   - **Overview**: One-click deployment services that automate builds and deployment, with integration for GitHub and GitLab.
   - **Example**: Using Vercel, pushing code to GitHub triggers the build and deployment automatically.

---

#### 11.4.3. Integrating the CI/CD Pipeline

Combining CI and CD forms a complete automated development workflow. Here is a typical CI/CD flow:

1. **Code commit**: The developer pushes code to the repository.
2. **CI starts**: The CI workflow is triggered, automatically running builds, tests, and code quality checks.
3. **Build succeeds**: If CI passes, the CD pipeline is triggered.
4. **Automated deployment**: The built application is deployed to the target environment automatically.
5. **Monitoring and feedback**: Monitor the deployment process and gather feedback on the result, ensuring the application runs normally.

Through continuous integration and automated deployment, you can significantly improve development efficiency, reduce manual mistakes, and ensure the quality and stability of the application.

## References

- [ESLint Official Documentation](https://eslint.org/docs/latest/)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [react-ecosystem](react-ecosystem.md)
- [knowledge](/knowledge.md))