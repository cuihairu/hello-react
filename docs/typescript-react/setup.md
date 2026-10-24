### TypeScript Installation and Configuration

TypeScript is an open-source programming language that provides static type checking and extends JavaScript. Installing and configuring TypeScript is the first step in developing projects with it. Here are the detailed installation and configuration steps:

#### 1. **Install TypeScript**

TypeScript can be installed via npm (Node.js's package manager). You can choose a global or local installation.

- **Global installation**: For when you want to use TypeScript anywhere on your system.

  ```bash
  npm install -g typescript
  ```

  After installation, you can use the `tsc` command to compile TypeScript files anywhere.

- **Local installation**: For when each project needs its own version. A local installation in the project directory is recommended.

  ```bash
  npm install --save-dev typescript
  ```

  With a local installation, the `tsc` command is usually in the `node_modules/.bin` directory. You can run it via `npx tsc`, or configure a script in `package.json` to use it.

#### 2. **Initialize a TypeScript Project**

Create a TypeScript configuration file `tsconfig.json` in the project's root directory. This file contains the TypeScript compiler's configuration options.

- **Initialization command**:

  ```bash
  npx tsc --init
  ```

  This generates a basic `tsconfig.json` file that you can modify to fit your project's needs.

- **`tsconfig.json` example**:

  ```jsonc
  {
    "compilerOptions": {
      "target": "es6",                      // JavaScript version to compile to
      "module": "commonjs",                 // module system to use
      "strict": true,                       // enable all strict type-checking options
      "esModuleInterop": true,              // enable interoperability with CommonJS modules
      "skipLibCheck": true,                 // skip type checking of library files
      "forceConsistentCasingInFileNames": true // enforce consistent file name casing
    },
    "include": [
      "src/**/*.ts"                          // files to include
    ],
    "exclude": [
      "node_modules",                       // folders to exclude
      "**/*.spec.ts"                        // test files to exclude
    ]
  }
  ```

  - `target`: Specifies the ECMAScript target version (e.g., `es5`, `es6`, `es2015`).
  - `module`: Specifies the module system (e.g., `commonjs`, `es6`).
  - `strict`: Enables all strict type-checking options, increasing type safety of the code.
  - `esModuleInterop`: Enables interoperability with CommonJS modules.
  - `skipLibCheck`: Skips type checking of library files to speed up compilation.
  - `forceConsistentCasingInFileNames`: Enforces consistent file name casing, avoiding cross-platform file name issues.

#### 3. **Write TypeScript Code**

Create `.ts` or `.tsx` files and write TypeScript code in them. Here is a simple TypeScript file example:

- **Example code** (`src/index.ts`):

  ```typescript
  // Define a simple function
  function greet(person: string): string {
    return `Hello, ${person}!`;
  }

  let user = 'Alice';

  console.log(greet(user));
  ```

#### 4. **Compile TypeScript Code**

Use the TypeScript compiler `tsc` to compile TypeScript code into JavaScript code.

- **Compile a single file**:

  ```bash
  npx tsc src/index.ts
  ```

  This generates a `src/index.js` file.

- **Compile the whole project**:

  Running the following command compiles the entire project based on the `tsconfig.json` configuration:

  ```bash
  npx tsc
  ```

  The generated JavaScript files are saved to the location specified in `tsconfig.json`.

#### 5. **Configure the Development Environment**

For better TypeScript support during development, you can configure your development tools and IDE.

- **VSCode configuration**:
  - VSCode has built-in TypeScript language support; code hints, auto-completion, refactoring, and more work without installing extra plugins (to try the latest language service, you can optionally install [TypeScript Next](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)).
  - Keep VSCode's TypeScript version in sync with the one in the project's `package.json` to avoid mismatches between editor and compiler behavior.

- **Linting and formatting**:
  - Configure ESLint and Prettier to keep code style consistent and avoid common coding errors.

  - **Install ESLint and Prettier**:

    ```bash
    npm install --save-dev eslint prettier eslint-plugin-prettier eslint-config-prettier
    ```

  - **Example `.eslintrc.js` configuration**:

    ```javascript
    module.exports = {
      parser: '@typescript-eslint/parser',
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
      ],
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
      },
      rules: {
        'prettier/prettier': ['error']
      }
    };
    ```

  - **Example `prettier.config.js` configuration**:

    ```javascript
    module.exports = {
      singleQuote: true,
      trailingComma: 'all',
      printWidth: 80
    };
    ```

#### 6. **Integrate TypeScript into Build Tools**

If you use build tools (such as Webpack or Vite), you can configure them to support TypeScript.

- **Webpack configuration**:
  - Install TypeScript and the relevant loader:

    ```bash
    npm install --save-dev typescript ts-loader
    ```

  - **`webpack.config.js` configuration**:

    ```javascript
    module.exports = {
      entry: './src/index.ts',
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
          }
        ]
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js']
      },
      output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
      }
    };
    ```

- **Vite configuration**:
  - Vite supports TypeScript natively with no extra configuration; just install the `typescript` dependency.

#### 7. **Summary**

Installing and configuring TypeScript lets you take advantage of its type system and modern JavaScript features to improve development efficiency and code quality. With proper configuration and tooling integration, you can fully harness TypeScript's benefits, boosting your project's reliability and maintainability.

## References

- [TypeScript](https://www.typescriptlang.org/docs/)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [knowledge](/knowledge.md))
- [README](README.md)
