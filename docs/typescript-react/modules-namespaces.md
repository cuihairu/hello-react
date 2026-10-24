### Modules and Namespaces in TypeScript

In TypeScript, modules and namespaces are the two main mechanisms for organizing code and handling dependencies. They differ in purpose and characteristics, so you can choose based on your project's needs.

---

## Modules

Modules are a mechanism in TypeScript for organizing code. They make code more modular and maintainable, and let you handle dependencies across different files. Modules can export and import content, so code can be shared across multiple files.

### 1. Basic Module Usage

In TypeScript, each file is a module by default. You can use the `export` and `import` keywords to export and import module content.

#### 1.1 Exporting a Module

You can export variables, functions, classes, and so on:

```typescript
// utils.ts
export const PI = 3.14;

export function add(a: number, b: number): number {
  return a + b;
}

export class Calculator {
  multiply(a: number, b: number): number {
    return a * b;
  }
}
```

#### 1.2 Importing a Module

In another file, you can import this exported content:

```typescript
// main.ts
import { PI, add, Calculator } from './utils';

console.log(PI); // Output: 3.14
console.log(add(5, 3)); // Output: 8

const calc = new Calculator();
console.log(calc.multiply(5, 2)); // Output: 10
```

### 2. Default Exports and Named Exports

#### 2.1 Default Export

A module can have only one default export. Use `export default` for a default export:

```typescript
// greeter.ts
export default class Greeter {
  greet(name: string): string {
    return `Hello, ${name}!`;
  }
}
```

When importing a default export, you can use any name:

```typescript
// main.ts
import Greeter from './greeter';

const greeter = new Greeter();
console.log(greeter.greet('Alice')); // Output: Hello, Alice!
```

#### 2.2 Named Export

You can export multiple named members:

```typescript
// math.ts
export const add = (a: number, b: number): number => a + b;
export const subtract = (a: number, b: number): number => a - b;
```

When importing, you need to use curly braces `{}` to specify the members to import:

```typescript
// main.ts
import { add, subtract } from './math';

console.log(add(10, 5)); // Output: 15
console.log(subtract(10, 5)); // Output: 5
```

### 3. Re-exporting Modules

You can re-export another module's content through one module:

```typescript
// index.ts
export * from './math'; // Re-export everything from the math module
```

### 4. Module Resolution

TypeScript supports different module resolution strategies, which you can configure via the `tsconfig.json` file:

```jsonc
{
  "compilerOptions": {
    "module": "commonjs", // Use the CommonJS module system
    "moduleResolution": "node" // Use Node.js-style module resolution
  }
}
```

---

## Namespaces

Namespaces are an older way of organizing code. In TypeScript, they are used to define and organize code within one file or across multiple files. The main difference between namespaces and modules is their usage and scope.

### 1. Defining and Using a Namespace

#### 1.1 Defining a Namespace

You can use the `namespace` keyword to define a namespace:

```typescript
// shapes.ts
namespace Shapes {
  export interface Circle {
    radius: number;
  }

  export interface Rectangle {
    width: number;
    height: number;
  }
}
```

#### 1.2 Using a Namespace

When using a namespace, you can access its members with the `Shapes.` prefix:

```typescript
// main.ts
let myCircle: Shapes.Circle = {
  radius: 10
};

let myRectangle: Shapes.Rectangle = {
  width: 20,
  height: 30
};
```

### 2. Merging Namespaces

You can merge multiple namespaces together, which lets you organize code across different files:

```typescript
// shapes1.ts
namespace Shapes {
  export interface Circle {
    radius: number;
  }
}

// shapes2.ts
namespace Shapes {
  export interface Rectangle {
    width: number;
    height: number;
  }
}
```

### 3. Comparing Namespaces and Modules

- **Modules**: recommended for organizing code, because they offer better encapsulation and modularity, and are compatible with modern JavaScript and toolchains.
- **Namespaces**: mainly used in older code and some specific scenarios. Although they can group code, they are less flexible and modern than modules.

### 4. Choosing Between Modules and Namespaces

- If your project uses modern JavaScript/TypeScript and needs to handle multiple files or packages, modules are recommended.
- If you need to organize code within a single file or work with an older codebase, you can use namespaces.

---

## Summary

- **Modules**: the mechanism for organizing and managing code in modern JavaScript and TypeScript, implemented via the `export` and `import` keywords.
- **Namespaces**: an older code-organization mechanism for grouping code within one file or across multiple files, defined and used with the `namespace` keyword.

## References

- [TypeScript](https://www.typescriptlang.org/docs/)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [knowledge](/knowledge.md))
- [README](README.md)
