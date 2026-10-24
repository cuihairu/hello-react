## ESLint and Prettier Configuration

In frontend development, maintaining code quality and consistency is critical. ESLint and Prettier are two commonly used tools: ESLint for static analysis, Prettier for formatting. Configuring them keeps your code style consistent, cuts down on errors, and speeds up development.

### 1. ESLint Configuration

#### 1.1 What is ESLint

ESLint is a tool for identifying and reporting problems in JavaScript code, such as syntax errors and style issues. It helps improve code quality and consistency.

#### 1.2 Installing ESLint

Run the following command in the project root to install ESLint:

```bash
npm install eslint --save-dev
```

#### 1.3 Initializing ESLint

Once installed, initialize the ESLint configuration with (the officially recommended way since ESLint 9):

```bash
npm init @eslint/config
```

This command walks you through configuration: choosing a code style, which syntax features you use, code quality standards, and so on. Pick the options that fit your project and it generates a flat config file, `eslint.config.js`.

::: tip Version note
ESLint 8 and earlier use `npx eslint --init` to generate a config in `.eslintrc.json` format; ESLint 9 defaults to flat config. The rule semantics are the same in both formats — new projects should just use flat config.
:::

#### 1.4 Configuring ESLint

In the `.eslintrc.json` file (or the corresponding `rules` / `languageOptions` fields in flat config), you can set various rules and options. Here is a basic ESLint configuration example:

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "@typescript-eslint"
  ],
  "rules": {
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "always"]
  }
}
```

This configuration includes:
- **Environment** (`env`): Specifies the environments the code runs in.
- **Extends** (`extends`): Builds on recommended configs such as ESLint's, React's, and TypeScript's.
- **Parser** (`parser` and `parserOptions`): Uses the TypeScript parser and sets the ECMAScript version and module type.
- **Plugins** (`plugins`): Enables the React and TypeScript plugins.
- **Rules** (`rules`): Custom style rules such as indentation, linebreak style, quote style, and semicolons.

### 2. Prettier Configuration

#### 2.1 What is Prettier

Prettier is a code formatter that automatically formats code to keep the style consistent. It works well alongside ESLint to enforce a uniform style.

#### 2.2 Installing Prettier

Run the following command in the project root to install Prettier:

```bash
npm install prettier --save-dev
```

#### 2.3 Configuring Prettier

Create a `.prettierrc` file in the project root to configure Prettier. Here is a basic example:

```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "bracketSameLine": false
}
```

This configuration includes:
- **printWidth**: Maximum characters per line.
- **tabWidth**: Number of spaces per indentation level.
- **useTabs**: Whether to indent with tabs.
- **semi**: Whether to add semicolons at the end of statements.
- **singleQuote**: Whether to use single quotes.
- **trailingComma**: Whether to add a trailing comma after the last element of multi-line structures.
- **bracketSpacing**: Whether to add spaces inside object literals.
- **bracketSameLine**: Whether the closing bracket of a JSX tag stays on the same line as the last line (Prettier 3 replaced the old `jsxBracketSameLine` with this).

#### 2.4 Using Prettier

You can manually format code with:

```bash
npx prettier --write .
```

This formats every file in the project.

#### 2.5 Using ESLint with Prettier

To make sure ESLint and Prettier stay compatible, install `eslint-config-prettier` and `eslint-plugin-prettier`:

```bash
npm install eslint-config-prettier eslint-plugin-prettier --save-dev
```

Then add the Prettier plugin to the `extends` section of `.eslintrc.json` and enable the Prettier rules in `rules`:

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended"
  ],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

This keeps ESLint's rules in sync with Prettier's formatting and reports Prettier violations as errors.

### 3. Summary

Configuring ESLint and Prettier is a key step toward better code quality and consistency. ESLint gives you static analysis that catches potential problems; Prettier formats your code automatically and keeps the style uniform. Using the two together helps you maintain high-quality code and develop faster.

## References

- [ESLint configuration](https://eslint.org/docs/latest/use/configure/)
- [Prettier documentation](https://prettier.io/docs/en/)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [environment-setup](environment-setup.md)
- [glossary](/glossary.md))
- [knowledge](/knowledge.md))
