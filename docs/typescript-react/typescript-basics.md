###  TypeScript 基础

TypeScript 是 JavaScript 的超集，增加了静态类型检查功能，帮助开发者更早地发现代码中的错误，提高代码的可维护性和可读性。本章将介绍 TypeScript 的基础知识，包括安装与配置、基本类型与接口、类与泛型等。

#### 5.1 **为什么选择 TypeScript**

TypeScript 提供了以下几个重要优势：

- **静态类型检查**：可以在编译阶段发现潜在的错误。
- **强大的工具支持**：编辑器（如 VSCode）提供了智能提示、自动补全等功能。
- **现代 JavaScript 特性**：TypeScript 支持 ES6+ 的新特性，并且在编译时将其转化为兼容的 JavaScript 代码。
- **类型推断**：虽然 TypeScript 是静态类型语言，但它能在很多情况下自动推断类型，减少类型声明的需要。
- **大型项目支持**：类型系统能够帮助开发者更好地组织和管理大型项目。

#### 5.2 **TypeScript 安装与配置**

**安装 TypeScript**

可以使用 npm 安装 TypeScript：

```bash
npm install -g typescript
```

**初始化 TypeScript 项目**

在项目根目录下初始化 TypeScript 配置文件：

```bash
tsc --init
```

这会创建一个 `tsconfig.json` 文件，包含 TypeScript 编译器的配置信息。

**配置文件示例**

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

- `target`：编译目标版本（如 ES5、ES6）。
- `module`：指定模块系统（如 `commonjs`、`es6`）。
- `strict`：启用所有严格类型检查选项。
- `esModuleInterop`：启用与 CommonJS 模块的兼容性。
- `skipLibCheck`：跳过库文件的类型检查。
- `forceConsistentCasingInFileNames`：强制在文件名大小写方面保持一致。

#### 5.3 **基本类型与接口**

**基本类型**

TypeScript 支持 JavaScript 的所有基本类型，并引入了额外的类型：

- **基本数据类型**：

  ```typescript
  let isDone: boolean = false;
  let age: number = 30;
  let userName: string = 'Alice';
  ```

- **数组与元组**：

  ```typescript
  let numbers: number[] = [1, 2, 3];
  let tuple: [string, number] = ['Alice', 30];
  ```

- **枚举**：

  ```typescript
  enum Color {
      Red,
      Green,
      Blue
  }
  let c: Color = Color.Green;
  ```

- **Any 类型**：

  ```typescript
  let anything: any = 'This can be anything';
  anything = 123;
  ```

**接口**

接口用于定义对象的结构，指定对象中应该包含哪些属性和方法。

- **定义接口**：

  ```typescript
  interface Person {
      name: string;
      age: number;
  }

  let person: Person = {
      name: 'Alice',
      age: 30
  };
  ```

- **可选属性与只读属性**：

  ```typescript
  interface Person {
      name: string;
      age?: number; // 可选属性
      readonly id: string; // 只读属性
  }

  let person: Person = {
      name: 'Alice',
      id: '1234'
  };
  ```

#### 5.4 **类与泛型**

**类**

TypeScript 对 JavaScript 的类进行了扩展，支持更多的面向对象编程特性，如访问修饰符、继承等。

- **定义类**：

  ```typescript
  class Animal {
      name: string;

      constructor(name: string) {
          this.name = name;
      }

      speak(): void {
          console.log(`${this.name} makes a noise.`);
      }
  }

  let dog = new Animal('Dog');
  dog.speak(); // Dog makes a noise.
  ```

- **继承**：

  ```typescript
  class Dog extends Animal {
      bark(): void {
          console.log(`${this.name} barks.`);
      }
  }

  let dog = new Dog('Rover');
  dog.speak(); // Rover makes a noise.
  dog.bark();  // Rover barks.
  ```

**泛型**

泛型允许在定义函数、类和接口时使用类型变量，使得代码更加灵活和可重用。

- **泛型函数**：

  ```typescript
  function identity<T>(arg: T): T {
      return arg;
  }

  let output = identity<string>('Hello, TypeScript');
  ```

- **泛型类**：

  ```typescript
  class Box<T> {
      content: T;

      constructor(value: T) {
          this.content = value;
      }

      getContent(): T {
          return this.content;
      }
  }

  let stringBox = new Box<string>('Hello');
  let numberBox = new Box<number>(123);
  ```

- **泛型接口**：

  ```typescript
  interface Pair<T, U> {
      first: T;
      second: U;
  }

  let pair: Pair<string, number> = {
      first: 'Alice',
      second: 30
  };
  ```

#### 5.5 **TypeScript 中的模块与命名空间**

**模块**

在 TypeScript 中，可以使用 `import` 和 `export` 语法来组织代码，使其更加模块化。

- **导出模块**：

  ```typescript
  // math.ts
  export function add(a: number, b: number): number {
      return a + b;
  }
  ```

- **导入模块**：

  ```typescript
  // app.ts
  import { add } from './math';

  console.log(add(2, 3)); // 5
  ```

**命名空间**

命名空间用于将相关功能组织在一起，但在现代 TypeScript 开发中，通常推荐使用模块来代替命名空间。

- **定义命名空间**：

  ```typescript
  namespace Utility {
      export function log(message: string): void {
          console.log(message);
      }
  }

  Utility.log('Hello, namespace');
  ```

#### 5.6 **在 React 项目中使用 TypeScript**

使用 TypeScript 可以帮助提高 React 组件的类型安全和可维护性。

- **定义类型的组件**：

  ```typescript
  import React from 'react';

  interface Props {
      message: string;
  }

  const Greeting: React.FC<Props> = ({ message }) => {
      return <h1>{message}</h1>;
  }

  export default Greeting;
  ```

- **使用 TypeScript 在 React 项目中**：

  在创建新的 React 项目时，可以通过 `create-react-app` 带有 TypeScript 模板：

  ```bash
  npx create-react-app my-app --template typescript
  ```

#### 5.7 **总结**

TypeScript 提供了静态类型检查和现代 JavaScript 的特性，使得编写和维护大型代码库变得更加容易和安全。掌握 TypeScript 的基础知识将帮助你编写更可靠的代码，并提升你的开发效率。