### 4.2 变量、数据类型与运算符

在 JavaScript 中，理解变量、数据类型和运算符是编写高效代码的基础。本节将详细介绍这些核心概念。

#### 1. 变量声明

JavaScript 中的变量用于存储数据。可以使用以下三种方式声明变量：

- **var**：最早的变量声明方式，具有函数作用域或全局作用域，可能会导致变量提升（hoisting）问题。
- **let**：块级作用域变量声明方式，避免了 var 的作用域问题。
- **const**：块级作用域常量声明方式，声明后不能重新赋值。

**示例**

```javascript
var oldVar = 'I am old';
let newLet = 'I am new';
const PI = 3.14;
```

#### 2. 数据类型

JavaScript 的数据类型分为原始类型（primitive types）和引用类型（reference types）。

##### **2.1 原始类型**

- **undefined**：表示未定义的值。通常用于声明变量但未初始化的情况。
- **null**：表示“无”或“空”的值，通常用来表示变量的空值。
- **boolean**：布尔值，`true` 或 `false`。
- **number**：表示数字，包括整数和浮点数。JavaScript 不区分整数和浮点数。
- **bigint**：表示任意精度的整数，用于处理超出 `Number` 范围的整数。
- **string**：表示字符串，用于存储文本数据。
- **symbol**：表示唯一的标识符，用于对象的属性键。

**示例**

```javascript
let x; // undefined
let y = null; // null
let isTrue = true; // boolean
let num = 42; // number
let bigNum = 1234567890123456789012345678901234567890n; // bigint
let name = "Alice"; // string
let uniqueSymbol = Symbol('description'); // symbol
```

##### **2.2 引用类型**

- **Object**：JavaScript 中的对象可以包含多个键值对，通常用于存储相关数据。
- **Array**：数组是特殊类型的对象，用于存储有序的集合。
- **Function**：函数也是对象，可以被调用。
- **Date**、**RegExp** 等：内置的复杂数据类型。

**示例**

```javascript
let person = {
    name: "Alice",
    age: 30
}; // object

let numbers = [1, 2, 3, 4, 5]; // array

function greet(name) {
    return `Hello, ${name}`;
} // function

let today = new Date(); // Date
let pattern = /ab+c/; // RegExp
```

#### 3. 运算符

JavaScript 提供了多种运算符，用于执行不同类型的操作。

##### **3.1 算术运算符**

- **`+`**：加法
- **`-`**：减法
- **`*`**：乘法
- **`/`**：除法
- **`%`**：取余
- **`**`**：幂运算（ES6）

**示例**

```javascript
let sum = 5 + 3; // 8
let difference = 10 - 2; // 8
let product = 4 * 3; // 12
let quotient = 12 / 4; // 3
let remainder = 10 % 3; // 1
let power = 2 ** 3; // 8
```

##### **3.2 比较运算符**

- **`==`**：相等（类型转换）
- **`===`**：严格相等（不进行类型转换）
- **`!=`**：不相等（类型转换）
- **`!==`**：严格不相等（不进行类型转换）
- **`>`**：大于
- **`<`**：小于
- **`>=`**：大于等于
- **`<=`**：小于等于

**示例**

```javascript
let isEqual = (5 == '5'); // true
let isStrictEqual = (5 === '5'); // false
let isGreater = (10 > 5); // true
let isLessOrEqual = (10 <= 10); // true
```

##### **3.3 逻辑运算符**

- **`&&`**：逻辑与
- **`||`**：逻辑或
- **`!`**：逻辑非

**示例**

```javascript
let andResult = (true && false); // false
let orResult = (true || false); // true
let notResult = !true; // false
```

##### **3.4 赋值运算符**

- **`=`**：赋值
- **`+=`**：加法赋值
- **`-=`**：减法赋值
- **`*=`**：乘法赋值
- **`/=`**：除法赋值
- **`%=`**：取余赋值

**示例**

```javascript
let x = 10;
x += 5; // 15
x -= 3; // 12
x *= 2; // 24
x /= 4; // 6
x %= 5; // 1
```

#### 4. 总结

本节介绍了 JavaScript 的变量声明方式、数据类型和常见运算符。理解这些基础知识对于编写高效、可靠的 JavaScript 代码至关重要。掌握变量、数据类型和运算符的使用，可以帮助你更好地处理数据和实现各种功能。