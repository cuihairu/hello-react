
## 第4章：JavaScript 与 ES6+ 基础

JavaScript 是前端开发的核心语言，ES6（ECMAScript 2015）引入了许多强大的新特性，使得编写现代 JavaScript 代码更加高效和简洁。本章将深入探讨 JavaScript 的基本概念以及 ES6 的主要特性。

### 4.1 JavaScript 简史与发展

#### **1. JavaScript 的起源**

JavaScript 由 Brendan Eich 于 1995 年创建，最初被称为 Mocha，后来改名为 LiveScript，最终成为 JavaScript。它最早用于 Netscape 浏览器中，使网页能够进行动态交互。

#### **2. JavaScript 的演变**

JavaScript 经过了多次更新和改进，主要由 ECMA 国际（ECMAScript）标准组织定义。主要版本包括：

- **ECMAScript 3**（1999）：引入了正则表达式、try/catch 异常处理等特性。
- **ECMAScript 5**（2009）：增加了严格模式、JSON 支持、Array 方法等。
- **ECMAScript 6**（2015）：引入了 let/const、箭头函数、类、模板字符串、解构赋值等重要特性。
- **ECMAScript 7**（2016）及以后：不断引入新特性，如 async/await、Optional Chaining、Nullish Coalescing 等。

### 4.2 变量、数据类型与运算符

#### **1. 变量声明**

JavaScript 支持三种变量声明方式：

- **var**：传统的变量声明方式，有函数作用域，可能会引起变量提升（hoisting）问题。
- **let**：块级作用域，解决了 var 的作用域问题。
- **const**：块级作用域，用于声明常量，声明后不能重新赋值。

**示例**

```javascript
var name = 'Alice';
let age = 25;
const PI = 3.14;
```

#### **2. 数据类型**

JavaScript 的数据类型分为原始类型和引用类型：

- **原始类型**：包括 undefined、null、boolean、number、bigint、string、symbol。
- **引用类型**：包括对象（Object）、数组（Array）、函数（Function）、日期（Date）、正则表达式（RegExp）等。

**示例**

```javascript
let num = 42; // number
let str = "Hello"; // string
let isTrue = true; // boolean
let obj = { name: "Alice", age: 25 }; // object
let arr = [1, 2, 3]; // array
let func = function() { return "Hello"; }; // function
```

#### **3. 运算符**

JavaScript 提供了各种运算符，包括：

- **算术运算符**：`+`, `-`, `*`, `/`, `%`
- **比较运算符**：`==`, `===`, `!=`, `!==`, `>`, `<`, `>=`, `<=`
- **逻辑运算符**：`&&`, `||`, `!`
- **赋值运算符**：`=`, `+=`, `-=`, `*=`, `/=`

**示例**

```javascript
let x = 10;
let y = 5;
let sum = x + y; // 15
let isEqual = (x === y); // false
let result = (x > y) && (y > 0); // true
```

### 4.3 控制流与循环

#### **1. 条件语句**

JavaScript 提供了多种条件语句来控制代码的执行流：

- **if 语句**

**示例**

```javascript
if (age >= 18) {
    console.log("Adult");
} else {
    console.log("Minor");
}
```

- **switch 语句**

**示例**

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

#### **2. 循环语句**

JavaScript 支持多种循环结构：

- **for 循环**

**示例**

```javascript
for (let i = 0; i < 5; i++) {
    console.log(i);
}
```

- **while 循环**

**示例**

```javascript
let i = 0;
while (i < 5) {
    console.log(i);
    i++;
}
```

- **do...while 循环**

**示例**

```javascript
let i = 0;
do {
    console.log(i);
    i++;
} while (i < 5);
```

### 4.4 ES6 的主要特性

#### **1. let 和 const**

- **let**：用于声明块级作用域的变量。
- **const**：用于声明块级作用域的常量，声明后不能重新赋值。

**示例**

```javascript
let name = "Alice";
name = "Bob"; // 允许重新赋值

const PI = 3.14;
PI = 3.14159; // 错误，PI 是常量
```

#### **2. 箭头函数**

箭头函数提供了更简洁的函数声明方式，并且不绑定 `this`。

**示例**

```javascript
const add = (a, b) => a + b;
const greet = name => `Hello, ${name}`;
```

#### **3. 模板字符串**

模板字符串使用反引号（`` ` ``）包围，可以嵌入表达式，并支持多行字符串。

**示例**

```javascript
let name = "Alice";
let greeting = `Hello, ${name}!`;
```

#### **4. 解构赋值**

解构赋值允许从数组或对象中提取值，并将其赋给变量。

**示例**

```javascript
// 数组解构
const [x, y] = [1, 2];

// 对象解构
const { name, age } = { name: "Alice", age: 25 };
```

#### **5. 类和对象**

ES6 引入了类的概念，用于创建对象和继承。

**示例**

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

#### **6. Promise 和异步编程**

Promise 对象用于处理异步操作，并提供了 `then` 和 `catch` 方法来处理成功和失败的情况。ES8 引入的 `async` 和 `await` 提供了更简洁的异步编程方式。

**示例**

```javascript
// Promise 示例
const fetchData = new Promise((resolve, reject) => {
    // 异步操作
    setTimeout(() => resolve("Data fetched"), 1000);
});

fetchData.then(data => console.log(data)).catch(error => console.error(error));

// async/await 示例
async function fetchData() {
    try {
        let response = await fetch('https://api.example.com/data');
        let data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}
```

### 4.5 总结

本章涵盖了 JavaScript 的基础知识，包括变量声明、数据类型、运算符、控制流与循环，以及 ES6 的主要特性。理解这些基础知识是掌握 JavaScript 和现代前端开发的关键。接下来，将深入探讨《第5章：TypeScript 基础》，以扩展你的编程技能。