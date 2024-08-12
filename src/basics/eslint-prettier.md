## ESLint 与 Prettier 配置

在前端开发中，保持代码质量和一致性是至关重要的。ESLint 和 Prettier 是两种常用的工具，它们分别用于代码静态分析和代码格式化。通过配置这些工具，您可以确保代码风格一致性，减少错误，并提升开发效率。

### 1. ESLint 配置

#### **1.1 什么是 ESLint**

ESLint 是一个用于识别和报告 JavaScript 代码中的问题（如语法错误、代码风格问题）的工具。它有助于提高代码质量和一致性。

#### **1.2 安装 ESLint**

在项目根目录下运行以下命令以安装 ESLint：

```bash
npm install eslint --save-dev
```

#### **1.3 初始化 ESLint**

安装完成后，可以使用以下命令初始化 ESLint 配置：

```bash
npx eslint --init
```

这个命令将引导您完成配置过程，包括选择代码风格、使用的语法特性以及代码质量标准等。根据提示选择适合您的选项，生成 `.eslintrc.json` 配置文件。

#### **1.4 配置 ESLint**

在 `.eslintrc.json` 文件中，您可以设置各种规则和选项。以下是一个基本的 ESLint 配置示例：

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

这个配置包括：
- **环境配置** (`env`): 指定代码运行环境。
- **扩展配置** (`extends`): 基于推荐的配置，如 ESLint、React 和 TypeScript。
- **解析器配置** (`parser` 和 `parserOptions`): 使用 TypeScript 解析器，并设置 ECMAScript 版本和模块类型。
- **插件配置** (`plugins`): 启用 React 和 TypeScript 插件。
- **规则配置** (`rules`): 自定义代码风格规则，如缩进、换行风格、引号样式和分号要求。

### 2. Prettier 配置

#### **2.1 什么是 Prettier**

Prettier 是一个代码格式化工具，自动格式化代码以保持一致的风格。它可以与 ESLint 配合使用，以确保代码风格的一致性。

#### **2.2 安装 Prettier**

在项目根目录下运行以下命令以安装 Prettier：

```bash
npm install prettier --save-dev
```

#### **2.3 配置 Prettier**

在项目根目录下创建一个 `.prettierrc` 文件，用于配置 Prettier。以下是一个基本的 Prettier 配置示例：

```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "jsxBracketSameLine": false
}
```

这个配置包括：
- **printWidth**: 每行的最大字符数。
- **tabWidth**: 缩进的空格数。
- **useTabs**: 是否使用制表符（Tab）进行缩进。
- **semi**: 是否在语句末尾添加分号。
- **singleQuote**: 是否使用单引号。
- **trailingComma**: 在多行结构的最后一个元素后添加逗号。
- **bracketSpacing**: 对象文字中是否添加空格。
- **jsxBracketSameLine**: JSX 标签的右括号是否与最后一行保持在同一行。

#### **2.4 使用 Prettier**

可以通过以下命令手动格式化代码：

```bash
npx prettier --write .
```

这将格式化项目中的所有文件。

#### **2.5 将 ESLint 与 Prettier 配合使用**

为了确保 ESLint 和 Prettier 兼容，需要安装 `eslint-config-prettier` 和 `eslint-plugin-prettier`：

```bash
npm install eslint-config-prettier eslint-plugin-prettier --save-dev
```

然后，将 Prettier 插件添加到 `.eslintrc.json` 中的 `extends` 部分，并在 `rules` 部分启用 Prettier 规则：

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

这将确保 ESLint 规则和 Prettier 格式化保持一致，并将 Prettier 规则作为错误报告。

### 3. 总结

配置 ESLint 和 Prettier 是提高代码质量和一致性的关键步骤。通过安装和配置 ESLint，您可以进行代码静态分析，识别潜在问题；通过安装和配置 Prettier，您可以自动格式化代码，确保代码风格一致。将这两个工具结合使用，可以帮助您保持高质量的代码，并提升开发效率。

