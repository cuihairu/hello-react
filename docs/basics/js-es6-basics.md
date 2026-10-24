
## JavaScript and ES6+ Basics

JavaScript is the core language of frontend development, and ES6 (ECMAScript 2015) introduced many powerful new features that make writing modern JavaScript more efficient and concise. I've collected the fundamentals of JavaScript and the main ES6 features here as a reference for project code.

### 4.1 A Brief History and Evolution of JavaScript

#### 1. The Origins of JavaScript

JavaScript was created by Brendan Eich in 1995. It was originally called Mocha, then renamed LiveScript, and eventually became JavaScript. It first appeared in the Netscape browser, enabling dynamic, interactive web pages.

#### 2. The Evolution of JavaScript

JavaScript has gone through several updates and improvements, defined mainly by the ECMA International (ECMAScript) standards organization. The main versions include:

- **ECMAScript 3** (1999): Introduced regular expressions, try/catch exception handling, and other features.
- **ECMAScript 5** (2009): Added strict mode, JSON support, and Array methods.
- **ECMAScript 6** (2015): Introduced let/const, arrow functions, classes, template strings, and destructuring, among other important features.
- **ECMAScript 7** (2016) and later: Kept adding new features such as async/await, Optional Chaining, and Nullish Coalescing.

### 4.2 Variables, Data Types, and Operators

#### 1. Variable Declaration

JavaScript supports three ways to declare variables:

- **var**: The traditional declaration, with function scope; it can cause hoisting issues.
- **let**: Block-scoped; solves var's scoping problems.
- **const**: Block-scoped, used to declare constants that cannot be reassigned after declaration.

**Example**

```javascript
var name = 'Alice';
let age = 25;
const PI = 3.14;
```

#### 2. Data Types

JavaScript data types fall into primitive types and reference types:

- **Primitive types**: undefined, null, boolean, number, bigint, string, and symbol.
- **Reference types**: objects (Object), arrays (Array), functions (Function), dates (Date), regular expressions (RegExp), and so on.

**Example**

```javascript
let num = 42; // number
let str = "Hello"; // string
let isTrue = true; // boolean
let obj = { name: "Alice", age: 25 }; // object
let arr = [1, 2, 3]; // array
let func = function() { return "Hello"; }; // function
```

#### 3. Operators

JavaScript provides a variety of operators, including:

- **Arithmetic operators**: `+`, `-`, `*`, `/`, `%`
- **Comparison operators**: `==`, `===`, `!=`, `!==`, `>`, `<`, `>=`, `<=`
- **Logical operators**: `&&`, `||`, `!`
- **Assignment operators**: `=`, `+=`, `-=`, `*=`, `/=`

**Example**

```javascript
let x = 10;
let y = 5;
let sum = x + y; // 15
let isEqual = (x === y); // false
let result = (x > y) && (y > 0); // true
```

### 4.3 Control Flow and Loops

#### 1. Conditional Statements

JavaScript offers several conditional statements to control the flow of execution:

- **if statement**

**Example**

```javascript
if (age >= 18) {
    console.log("Adult");
} else {
    console.log("Minor");
}
```

- **switch statement**

**Example**

```javascript
switch (day) {
    case 1:
        console.log("Monday");
        break;
    case 2:
        console.log("Tuesday");
        break;
    default:
        console.log("Other day");
}
```

#### 2. Loop Statements

JavaScript supports several loop structures:

- **for loop**

**Example**

```javascript
for (let i = 0; i < 5; i++) {
    console.log(i);
}
```

- **while loop**

**Example**

```javascript
let i = 0;
while (i < 5) {
    console.log(i);
    i++;
}
```

- **do...while loop**

**Example**

```javascript
let i = 0;
do {
    console.log(i);
    i++;
} while (i < 5);
```

### 4.4 Key ES6 Features

#### 1. let and const

- **let**: Declares a block-scoped variable.
- **const**: Declares a block-scoped constant that cannot be reassigned after declaration.

**Example**

```javascript
let name = "Alice";
name = "Bob"; // Reassignment is allowed

const PI = 3.14;
PI = 3.14159; // Error, PI is a constant
```

#### 2. Arrow Functions

Arrow functions provide a more concise way to declare functions and don't bind `this`.

**Example**

```javascript
const add = (a, b) => a + b;
const greet = name => `Hello, ${name}`;
```

#### 3. Template Strings

Template strings are wrapped in backticks (`` ` ``), can embed expressions, and support multi-line strings.

**Example**

```javascript
let name = "Alice";
let greeting = `Hello, ${name}!`;
```

#### 4. Destructuring Assignment

Destructuring lets you extract values from arrays or objects and assign them to variables.

**Example**

```javascript
// Array destructuring
const [x, y] = [1, 2];

// Object destructuring
const { name, age } = { name: "Alice", age: 25 };
```

#### 5. Classes and Objects

ES6 introduced the concept of classes for creating objects and inheritance.

**Example**

```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(`Hello, my name is ${this.name}`);
    }
}

const alice = new Person("Alice", 25);
alice.greet(); // Hello, my name is Alice
```

#### 6. Promise and Asynchronous Programming

Promise objects handle asynchronous operations, providing `then` and `catch` methods for success and failure cases. The `async` and `await` keywords introduced in ES8 offer a more concise way to write asynchronous code.

**Example**

```javascript
// Promise example
const fetchData = new Promise((resolve, reject) => {
    // Async operation
    setTimeout(() => resolve("Data fetched"), 1000);
});

fetchData.then(data => console.log(data)).catch(error => console.error(error));

// async/await example
async function fetchDataAsync() {
    try {
        let response = await fetch('https://api.example.com/data');
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

fetchDataAsync();
```

### 4.5 Summary

This covers variable declaration, data types, operators, control flow, loops, and ES6 features; for related TypeScript typing practice see "TypeScript Basics".

## References

- [MDN JavaScript Guide](https://developer.mozilla.org/en-us/docs/Web/JavaScript/Guide)
- [MDN let](https://developer.mozilla.org/en-us/docs/Web/JavaScript/Reference/Statements/let)
- [MDN const](https://developer.mozilla.org/en-us/docs/Web/JavaScript/Reference/Statements/const)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [js-control-flow-loops](js-control-flow-loops.md)
- [README](README.md)
