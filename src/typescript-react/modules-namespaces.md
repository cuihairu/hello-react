### TypeScript 中的模块与命名空间

在 TypeScript 中，模块和命名空间是组织代码和处理依赖关系的两种主要机制。它们有不同的用途和特点，可以根据项目的需求选择使用。

---

## **模块**

模块是 TypeScript 中用于组织代码的一种机制。模块使得代码更加模块化、可维护，并且能够处理不同文件间的依赖关系。模块可以导出和导入内容，使得代码可以在多个文件间共享。

### **1. 模块的基本使用**

在 TypeScript 中，每个文件默认都是一个模块。你可以使用 `export` 和 `import` 关键字来导出和导入模块的内容。

#### **1.1 导出模块**

你可以导出变量、函数、类等：

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

#### **1.2 导入模块**

在另一个文件中，你可以导入这些导出的内容：

```typescript
// main.ts
import { PI, add, Calculator } from './utils';

console.log(PI); // 输出: 3.14
console.log(add(5, 3)); // 输出: 8

const calc = new Calculator();
console.log(calc.multiply(5, 2)); // 输出: 10
```

### **2. 默认导出与命名导出**

#### **2.1 默认导出**

一个模块只能有一个默认导出。使用 `export default` 进行默认导出：

```typescript
// greeter.ts
export default class Greeter {
  greet(name: string): string {
    return `Hello, ${name}!`;
  }
}
```

导入默认导出时可以使用任意名称：

```typescript
// main.ts
import Greeter from './greeter';

const greeter = new Greeter();
console.log(greeter.greet('Alice')); // 输出: Hello, Alice!
```

#### **2.2 命名导出**

可以导出多个命名成员：

```typescript
// math.ts
export const add = (a: number, b: number): number => a + b;
export const subtract = (a: number, b: number): number => a - b;
```

导入时需要使用花括号 `{}` 指定要导入的成员：

```typescript
// main.ts
import { add, subtract } from './math';

console.log(add(10, 5)); // 输出: 15
console.log(subtract(10, 5)); // 输出: 5
```

### **3. 模块的重新导出**

可以通过一个模块重新导出另一个模块的内容：

```typescript
// index.ts
export * from './math'; // 重新导出 math 模块的所有内容
```

### **4. 模块解析**

TypeScript 支持不同的模块解析策略，可以通过 `tsconfig.json` 文件配置：

```json
{
  "compilerOptions": {
    "module": "commonjs", // 使用 CommonJS 模块系统
    "moduleResolution": "node" // 使用 Node.js 风格的模块解析
  }
}
```

---

## **命名空间**

命名空间是一种较老的组织代码的方式，它在 TypeScript 中用于在一个文件或多个文件中定义和组织代码。命名空间与模块的主要区别是它们的使用方式和作用范围。

### **1. 定义和使用命名空间**

#### **1.1 定义命名空间**

可以使用 `namespace` 关键字来定义命名空间：

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

#### **1.2 使用命名空间**

在使用命名空间时，可以通过 `Shapes.` 前缀访问命名空间中的成员：

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

### **2. 命名空间的合并**

可以将多个命名空间合并到一起，这样可以在不同的文件中组织代码：

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

### **3. 命名空间与模块的比较**

- **模块**：推荐用于组织代码，因为它们提供了更好的封装性和模块化，且与现代 JavaScript 和工具链兼容。
- **命名空间**：主要用于旧代码和一些特定场景，尽管它们可以将代码分组，但不如模块灵活和现代。

### **4. 选择使用模块还是命名空间**

- 如果你的项目使用现代 JavaScript/TypeScript，并且需要处理多个文件或包，推荐使用模块。
- 如果你需要在一个文件中组织代码或处理较旧的代码库，可以使用命名空间。

---

## **总结**

- **模块**：现代 JavaScript 和 TypeScript 中用于组织和管理代码的机制，通过 `export` 和 `import` 关键字实现。
- **命名空间**：旧的代码组织机制，用于在一个文件或多个文件中组织代码，使用 `namespace` 关键字定义和使用。