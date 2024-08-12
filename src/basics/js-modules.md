### 模块化：import 与 export

模块化是现代 JavaScript 的一个重要特性，它允许将代码分割成多个文件，以便于管理和复用。ES6 引入了模块化语法，提供了 `import` 和 `export` 关键字来实现模块的导入和导出。下面是对这两个关键字的详细解释和用法：

#### 1. **模块导出（`export`）**

- **命名导出**：可以导出多个变量、函数或类，导出的内容需要通过名字来引用。

  ```javascript
  // math.js
  export const PI = 3.14;
  export function add(a, b) {
      return a + b;
  }
  export class Calculator {
      constructor() {
          this.value = 0;
      }
      add(value) {
          this.value += value;
      }
  }
  ```

- **默认导出**：每个模块只能有一个默认导出，适用于导出单一的内容（如函数、类或对象）。

  ```javascript
  // greet.js
  export default function greet(name) {
      return `Hello, ${name}!`;
  }
  ```

  或者

  ```javascript
  // user.js
  const user = {
      name: 'Alice',
      age: 25
  };
  export default user;
  ```

#### 2. **模块导入（`import`）**

- **导入命名导出**：通过指定导出的名字来导入。

  ```javascript
  // app.js
  import { PI, add, Calculator } from './math.js';

  console.log(PI); // 3.14
  console.log(add(2, 3)); // 5

  const calc = new Calculator();
  calc.add(10);
  console.log(calc.value); // 10
  ```

- **导入默认导出**：可以指定一个名称来接收默认导出的内容。

  ```javascript
  // app.js
  import greet from './greet.js';

  console.log(greet('Alice')); // Hello, Alice!
  ```

  或者

  ```javascript
  // app.js
  import user from './user.js';

  console.log(user.name); // Alice
  ```

- **重命名导入**：导入时可以重命名导出的内容，避免命名冲突。

  ```javascript
  // app.js
  import { add as sum, PI as piValue } from './math.js';

  console.log(piValue); // 3.14
  console.log(sum(2, 3)); // 5
  ```

- **导入所有内容**：可以使用 `* as` 语法将模块中的所有导出内容作为一个对象导入。

  ```javascript
  // app.js
  import * as math from './math.js';

  console.log(math.PI); // 3.14
  console.log(math.add(2, 3)); // 5
  ```

#### 3. **使用模块化的好处**

- **代码组织**：将代码分割成模块，能够更好地组织和管理代码，提高可维护性。
- **重用性**：模块化使得代码可以在多个文件和项目中重用，避免重复编写相同的代码。
- **依赖管理**：清晰地定义模块之间的依赖关系，有助于减少耦合，提高代码的可靠性。
- **加载优化**：现代构建工具和打包工具（如 Webpack、Rollup）能够优化模块加载，提升应用的性能。

#### 4. **总结**

ES6 的模块化语法通过 `import` 和 `export` 关键字提供了一个强大而灵活的方式来组织和管理 JavaScript 代码。理解和使用这些模块化特性能够使得代码更加模块化、清晰，并且易于维护和扩展。