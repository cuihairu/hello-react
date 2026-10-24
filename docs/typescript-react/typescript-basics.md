###  TypeScript Basics

TypeScript is a superset of JavaScript that adds static type checking, helping developers catch errors in code earlier and improving maintainability and readability. This page collects TypeScript fundamentals, including installation and configuration, basic types and interfaces, classes and generics, and more.

#### 5.1 **Why Choose TypeScript**

TypeScript offers several important advantages:

- **Static type checking**: Catches potential errors at compile time.
- **Strong tooling support**: Editors (such as VSCode) provide smart hints and auto-completion.
- **Modern JavaScript features**: TypeScript supports ES6+ features and compiles them to compatible JavaScript code.
- **Type inference**: Although TypeScript is statically typed, it can infer types automatically in many situations, reducing the need for type declarations.
- **Large project support**: The type system and module boundaries can be used to organize large projects.

#### 5.2 **TypeScript Installation and Configuration**

**Install TypeScript**

You can install TypeScript with npm:

```bash
npm install -g typescript
```

**Initialize a TypeScript project**

Initialize the TypeScript configuration file in the project's root directory:

```bash
tsc --init
```

This creates a `tsconfig.json` file containing TypeScript compiler configuration.

**Configuration file example**

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

- `target`: The compilation target version (e.g., ES5, ES6).
- `module`: Specifies the module system (e.g., `commonjs`, `es6`).
- `strict`: Enables all strict type-checking options.
- `esModuleInterop`: Enables interoperability with CommonJS modules.
- `skipLibCheck`: Skips type checking of library files.
- `forceConsistentCasingInFileNames`: Enforces consistent casing in file names.

#### 5.3 **Basic Types and Interfaces**

**Basic Types**

TypeScript supports all of JavaScript's basic types and introduces additional ones:

- **Primitive data types**:

  ```typescript
  let isDone: boolean = false;
  let age: number = 30;
  let userName: string = 'Alice';
  ```

- **Arrays and tuples**:

  ```typescript
  let numbers: number[] = [1, 2, 3];
  let tuple: [string, number] = ['Alice', 30];
  ```

- **Enums**:

  ```typescript
  enum Color {
      Red,
      Green,
      Blue
  }
  let c: Color = Color.Green;
  ```

- **Any type**:

  ```typescript
  let anything: any = 'This can be anything';
  anything = 123;
  ```

**Interfaces**

Interfaces define the structure of objects, specifying which properties and methods an object should contain.

- **Defining an interface**:

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

- **Optional and read-only properties**:

  ```typescript
  interface Person {
      name: string;
      age?: number; // optional property
      readonly id: string; // read-only property
  }

  let person: Person = {
      name: 'Alice',
      id: '1234'
  };
  ```

#### 5.4 **Classes and Generics**

**Classes**

TypeScript extends JavaScript's classes to support more object-oriented features such as access modifiers and inheritance.

- **Defining a class**:

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

- **Inheritance**:

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

**Generics**

Generics let you use type variables when defining functions, classes, and interfaces, making code more flexible and reusable.

- **Generic functions**:

  ```typescript
  function identity<T>(arg: T): T {
      return arg;
  }

  let output = identity<string>('Hello, TypeScript');
  ```

- **Generic classes**:

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

- **Generic interfaces**:

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

#### 5.5 **Modules and Namespaces in TypeScript**

**Modules**

In TypeScript, you can use `import` and `export` syntax to organize code into modules.

- **Exporting a module**:

  ```typescript
  // math.ts
  export function add(a: number, b: number): number {
      return a + b;
  }
  ```

- **Importing a module**:

  ```typescript
  // app.ts
  import { add } from './math';

  console.log(add(2, 3)); // 5
  ```

**Namespaces**

Namespaces group related functionality together, but in modern TypeScript development, modules are generally recommended over namespaces.

- **Defining a namespace**:

  ```typescript
  namespace Utility {
      export function log(message: string): void {
          console.log(message);
      }
  }

  Utility.log('Hello, namespace');
  ```

#### 5.6 **Using TypeScript in React Projects**

Using TypeScript helps improve type safety and maintainability of React components.

- **Typed components**:

  ```tsx
  import React from 'react';

  interface Props {
      message: string;
  }

  const Greeting: React.FC<Props> = ({ message }) => {
      return <h1>{message}</h1>;
  }

  export default Greeting;
  ```

- **Using TypeScript in React projects**:

  When creating a new React project, you can use `create-react-app` with the TypeScript template:

  ```bash
  npx create-react-app my-app --template typescript
  ```

  ::: warning
  Create React App entered maintenance mode in 2023 and is no longer actively developed. The official React documentation recommends using frameworks such as [Vite](https://vitejs.dev/) or Next.js for new projects. This section keeps the CRA command for reference with older projects; prefer Vite for new projects (see "Using TypeScript in React Projects").
  :::

#### 5.7 **Summary**

TypeScript provides static type checking and modern JavaScript features, making it easier and safer to write and maintain large codebases. Type constraints surface many issues at compile time; the trade-off is keeping type definitions consistent with runtime data.

## References

- [TypeScript](https://www.typescriptlang.org/docs/)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [glossary](/glossary.md))
- [knowledge](/knowledge.md))
