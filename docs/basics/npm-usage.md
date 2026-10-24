## npm and Package Managers

npm (Node Package Manager) is Node.js's package manager, used to manage JavaScript libraries and dependencies. Here I record how I use npm to manage dependencies in projects, plus the basics of other common package managers.

### 1. npm Basics

npm is the default package manager for Node.js, providing a powerful CLI for managing a project's dependencies. Here are some basic npm commands and usage:

#### 1.1 Initializing a Project

Use `npm init` to initialize a new Node.js project. It creates a `package.json` file containing the project's basic info and dependencies.

```bash
npm init
```

You can use the `-y` flag to skip all prompts and generate a default configuration:

```bash
npm init -y
```

#### 1.2 Installing Dependencies

Use `npm install` to install a project's dependencies. Packages are downloaded into the `node_modules` folder and added to `package.json`.

- Install a package (for example `lodash`):

  ```bash
  npm install lodash
  ```

- Install a package and save it to `devDependencies` (development-only dependencies):

  ```bash
  npm install --save-dev eslint
  ```

#### 1.3 Uninstalling Dependencies

Use `npm uninstall` to remove dependencies you no longer need:

```bash
npm uninstall lodash
```

#### 1.4 Updating Dependencies

Use `npm update` to update all of a project's dependencies to their latest versions:

```bash
npm update
```

#### 1.5 Listing Installed Packages

Use `npm list` to see all packages installed in the current project, with their versions:

```bash
npm list
```

### 2. Other Package Managers

Besides npm, there are several other popular package managers on the market. Here's a quick introduction to a few of them and how to use them:

#### 2.1 Yarn

Yarn is a package manager developed by Facebook, built to improve on npm's performance and reliability. Its CLI is similar to npm's, but with faster installs and better offline support.

- **Install Yarn**:
  - Install Yarn with npm:
    ```bash
    npm install -g yarn
    ```
  - Install with Homebrew (macOS):
    ```bash
    brew install yarn
    ```

- **Initialize a project**:
  ```bash
  yarn init
  ```

- **Install dependencies**:
  ```bash
  yarn add lodash
  ```

- **Uninstall dependencies**:
  ```bash
  yarn remove lodash
  ```

- **Update dependencies**:
  ```bash
  yarn upgrade
  ```

- **List installed packages**:
  ```bash
  yarn list
  ```

#### 2.2 pnpm

pnpm is a performance-focused package manager that uses hard links to save disk space and speed up installs.

- **Install pnpm**:
  - Install pnpm with npm:
    ```bash
    npm install -g pnpm
    ```

- **Initialize a project**:
  ```bash
  pnpm init
  ```

- **Install dependencies**:
  ```bash
  pnpm add lodash
  ```

- **Uninstall dependencies**:
  ```bash
  pnpm remove lodash
  ```

- **Update dependencies**:
  ```bash
  pnpm update
  ```

- **List installed packages**:
  ```bash
  pnpm list
  ```

### 3. The `package.json` File in Detail

`package.json` is the core configuration file of a Node.js project, recording basic project info, dependencies, and script commands. Here are some common fields in a `package.json` file:

- **name**: The project name
- **version**: The project version
- **description**: The project description
- **scripts**: Script commands that can be run with `npm run`
- **dependencies**: Production dependencies
- **devDependencies**: Development dependencies
- **engines**: Specifies Node.js version requirements

Example `package.json` file:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "A description of my project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "jest": "^26.6.3"
  },
  "author": "Your Name",
  "license": "MIT"
}
```

### 4. Summary

I pick npm, Yarn, or another package manager based on the team's existing toolchain; what matters is that the lockfile and CI resolve dependencies the same way.

## References

- [npm official documentation](https://docs.npmjs.com/)
- [npm CLI](https://docs.npmjs.com/cli/v10/commands/npm)
- [Yarn documentation](https://classic.yarnpkg.com/en/docs)
- [pnpm motivation](https://pnpm.io/motivation)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [environment-setup](environment-setup.md)
- [glossary](/glossary.md))
- [knowledge](/knowledge.md))
