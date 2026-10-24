###  Key ES6+ Features

ECMAScript 6 (ES6), also known as ECMAScript 2015, was a major version of the JavaScript language that introduced many new features and syntax improvements. Since then, ECMAScript has kept releasing new versions, each one (ES7, ES8, ES9, ES10, ES11, and so on) adding a handful of new features. Below are some of the main features of ES6 and later versions:

#### 1. let and const

- **let**: A block-scoped variable declaration that replaces `var` and avoids hoisting surprises and scope confusion.
  
  ```javascript
  let x = 10;
  if (true) {
      let x = 20; // block scope
      console.log(x); // 20
  }
  console.log(x); // 10
  ```

- **const**: Declares a constant that cannot be reassigned after initialization, and is block-scoped.
  
  ```javascript
  const PI = 3.14;
  // PI = 3.14159; // throws an error
  ```

#### 2. Arrow functions

- **Arrow functions**: A shorthand for function expressions that also doesn't bind `this`.
  
  ```javascript
  const add = (a, b) => a + b;
  console.log(add(2, 3)); // 5
  ```

- **No `this` of their own**: An arrow function's `this` is inherited from the enclosing scope.
  
  ```javascript
  function Counter() {
      this.num = 0;
      setInterval(() => {
          this.num++; // `this` refers to the Counter instance
          console.log(this.num);
      }, 1000);
  }
  ```

#### 3. Destructuring assignment

- **Array destructuring**: Extract values from an array and assign them to variables.
  
  ```javascript
  const [a, b] = [1, 2];
  console.log(a); // 1
  console.log(b); // 2
  ```

- **Object destructuring**: Extract properties from an object and assign them to variables.
  
  ```javascript
  const person = { name: 'Alice', age: 25 };
  const { name, age } = person;
  console.log(name); // Alice
  console.log(age); // 25
  ```

#### 4. Template strings

- **Template strings**: Strings wrapped in backticks `` ` `` that support interpolation and multiple lines.
  
  ```javascript
  const name = 'Alice';
  const greeting = `Hello, ${name}!`;
  console.log(greeting); // Hello, Alice!

  const multiLine = `This is a
  multi-line
  string.`;
  console.log(multiLine);
  ```

#### 5. Default parameters

- **Default parameters**: Provide default values for function parameters.
  
  ```javascript
  function greet(name = 'Guest') {
      console.log(`Hello, ${name}!`);
  }
  greet(); // Hello, Guest!
  greet('Alice'); // Hello, Alice!
  ```

#### 6. Spread operator

- **Array spread**: Expand an array into individual elements.
  
  ```javascript
  const numbers = [1, 2, 3];
  const moreNumbers = [0, ...numbers, 4];
  console.log(moreNumbers); // [0, 1, 2, 3, 4]
  ```

- **Object spread**: Copy an object's properties into another object.
  
  ```javascript
  const obj1 = { a: 1, b: 2 };
  const obj2 = { ...obj1, c: 3 };
  console.log(obj2); // { a: 1, b: 2, c: 3 }
  ```

#### 7. Classes and inheritance

- **Classes**: Syntactic sugar over the prototype chain that simplifies object creation and inheritance.
  
  ```javascript
  class Person {
      constructor(name, age) {
          this.name = name;
          this.age = age;
      }

      greet() {
          console.log(`Hello, my name is ${this.name}.`);
      }
  }

  class Student extends Person {
      constructor(name, age, grade) {
          super(name, age);
          this.grade = grade;
      }

      study() {
          console.log(`${this.name} is studying.`);
      }
  }

  const alice = new Student('Alice', 20, 'A');
  alice.greet(); // Hello, my name is Alice.
  alice.study(); // Alice is studying.
  ```

#### 8. Promise

- **Promise**: Represents the result of an asynchronous operation and supports chaining.
  
  ```javascript
  const fetchData = () => {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              resolve('Data fetched');
          }, 1000);
      });
  };

  fetchData().then(data => {
      console.log(data); // Data fetched
  }).catch(error => {
      console.log(error);
  });
  ```

#### 9. async/await

- **async/await**: Simplifies asynchronous code so it reads more like synchronous code.
  
  ```javascript
  const fetchData = async () => {
      return 'Data fetched';
  };

  const fetchAndLogData = async () => {
      try {
          const data = await fetchData();
          console.log(data); // Data fetched
      } catch (error) {
          console.log(error);
      }
  };

  fetchAndLogData();
  ```

#### 10. Map and Set

- **Map**: A key-value collection where keys can be of any type.
  
  ```javascript
  const map = new Map();
  map.set('name', 'Alice');
  map.set('age', 25);
  console.log(map.get('name')); // Alice
  ```

- **Set**: A collection of unique values.
  
  ```javascript
  const set = new Set([1, 2, 3, 2]);
  set.add(4);
  console.log(set.has(3)); // true
  console.log(set.size); // 4
  ```

#### 11. Modules

- **import/export**: Module syntax for importing and exporting functionality between modules.
  
  ```javascript
  // math.js
  export const add = (a, b) => a + b;
  export const subtract = (a, b) => a - b;
  ```

  ```javascript
  // main.js
  import { add, subtract } from './math.js';
  console.log(add(2, 3)); // 5
  console.log(subtract(5, 2)); // 3
  ```

#### 12. Symbol

- **Symbol**: Represents a unique identifier, mainly used to guarantee the uniqueness of object property keys.
  
  ```javascript
  const uniqueSymbol = Symbol('description');
  const obj = {
      [uniqueSymbol]: 'value'
  };
  console.log(obj[uniqueSymbol]); // value
  ```

#### 13. Reflect

- **Reflect**: Provides reflection methods for operating on objects — similar to the `Object` methods but more consistent.

  ```javascript
  const obj = { a: 1 };
  Reflect.set(obj, 'b', 2);
  console.log(obj.b); // 2
  ```

#### 14. Proxy

- **Proxy**: Creates a proxy for an object that can intercept and customize fundamental operations on it.

  ```javascript
  const handler = {
      get: (target, prop, receiver) => {
          console.log(`Getting ${prop}`);
          return Reflect.get(target, prop, receiver);
      }
  };

  const target = { message: 'Hello' };
  const proxy = new Proxy(target, handler);
  console.log(proxy.message); // Getting message \n Hello
  ```

#### 15. Summary

ES6 and later versions introduced a large set of features that significantly improved JavaScript's expressiveness and developer experience — new syntax, data structures, asynchronous handling, module support, and more. They broaden what the language can express, but in practice you still need to weigh the target environment and your team's coding conventions before adopting them.

## References

- [ECMAScript specification](https://tc39.es/ecma262/)
- [MDN JavaScript Guide](https://developer.mozilla.org/en-us/docs/Web/JavaScript/Guide)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [knowledge](/knowledge.md))
