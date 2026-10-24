### Modules: import and export

Modularity is an important feature of modern JavaScript. It lets you split code across files so it's easier to manage and reuse. ES6 introduced module syntax, providing the `import` and `export` keywords to import and export modules. Here are the details and usage:

#### 1. **Module export (`export`)**

- **Named exports**: You can export multiple variables, functions, or classes; the exported items are referenced by name.

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

- **Default export**: Each module can have only one default export, which suits exporting a single item such as a function, class, or object.

  ```javascript
  // greet.js
  export default function greet(name) {
      return `Hello, ${name}!`;
  }
  ```

  Or

  ```javascript
  // user.js
  const user = {
      name: 'Alice',
      age: 25
  };
  export default user;
  ```

#### 2. **Module import (`import`)**

- **Importing named exports**: Import by specifying the exported names.

  ```javascript
  // app.js
  import { PI, add, Calculator } from './math.js';

  console.log(PI); // 3.14
  console.log(add(2, 3)); // 5

  const calc = new Calculator();
  calc.add(10);
  console.log(calc.value); // 10
  ```

- **Importing a default export**: You can give any name to receive the default export.

  ```javascript
  // app.js
  import greet from './greet.js';

  console.log(greet('Alice')); // Hello, Alice!
  ```

  Or

  ```javascript
  // app.js
  import user from './user.js';

  console.log(user.name); // Alice
  ```

- **Renaming imports**: You can rename exported items on import to avoid naming conflicts.

  ```javascript
  // app.js
  import { add as sum, PI as piValue } from './math.js';

  console.log(piValue); // 3.14
  console.log(sum(2, 3)); // 5
  ```

- **Importing everything**: You can use the `* as` syntax to import all of a module's exports as a single object.

  ```javascript
  // app.js
  import * as math from './math.js';

  console.log(math.PI); // 3.14
  console.log(math.add(2, 3)); // 5
  ```

#### 3. **Benefits of using modules**

- **Code organization**: Splitting code into modules makes it easier to organize and manage, improving maintainability.
- **Reusability**: Modularity lets code be reused across files and projects, avoiding duplicated work.
- **Dependency management**: Clearly defining dependencies between modules reduces coupling and makes code more reliable.
- **Load optimization**: Modern build and bundling tools (such as Webpack and Rollup) can optimize module loading to improve application performance.

#### 4. **Summary**

ES6 module syntax, through the `import` and `export` keywords, provides a powerful and flexible way to organize and manage JavaScript code. Understanding and using these modular features makes code more modular and clearer, and easier to maintain and extend.

## References

- [MDN ES Modules](https://developer.mozilla.org/en-us/docs/Web/JavaScript/Guide/Modules)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [knowledge](/knowledge.md))
