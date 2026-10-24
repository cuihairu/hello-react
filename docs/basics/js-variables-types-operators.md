### 4.2 Variables, Data Types, and Operators

In JavaScript, understanding variables, data types, and operators is the foundation for writing efficient code. Here I record these core concepts and how they're used in code.

#### 1. Variable Declaration

Variables in JavaScript store data. There are three ways to declare them:

- **var**: The original declaration style; has function or global scope and can cause hoisting issues.
- **let**: A block-scoped declaration that avoids var's scoping problems.
- **const**: A block-scoped constant declaration; cannot be reassigned after initialization.

**Example**

```javascript
var oldVar = 'I am old';
let newLet = 'I am new';
const PI = 3.14;
```

#### 2. Data Types

JavaScript data types fall into primitive types and reference types.

##### 2.1 Primitive Types

- **undefined**: An undefined value; typically what you get when a variable is declared but not initialized.
- **null**: Represents "none" or "empty"; commonly used to mark a variable as intentionally empty.
- **boolean**: A boolean value, `true` or `false`.
- **number**: Represents numbers, both integers and floats. JavaScript doesn't distinguish between them.
- **bigint**: An arbitrary-precision integer for values beyond the `Number` range.
- **string**: Represents strings, used to store text data.
- **symbol**: A unique identifier, used as object property keys.

**Example**

```javascript
let x; // undefined
let y = null; // null
let isTrue = true; // boolean
let num = 42; // number
let bigNum = 1234567890123456789012345678901234567890n; // bigint
let name = "Alice"; // string
let uniqueSymbol = Symbol('description'); // symbol
```

##### 2.2 Reference Types

- **Object**: A JavaScript object holding multiple key-value pairs; commonly used to group related data.
- **Array**: Arrays are special objects for storing ordered collections.
- **Function**: Functions are also objects, and they can be called.
- **Date**, **RegExp**, etc.: Built-in complex data types.

**Example**

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

#### 3. Operators

JavaScript provides a variety of operators for different kinds of operations.

##### 3.1 Arithmetic Operators

- **`+`**: Addition
- **`-`**: Subtraction
- **`*`**: Multiplication
- **`/`**: Division
- **`%`**: Remainder
- **`**`**: Exponentiation (ES2016)

**Example**

```javascript
let sum = 5 + 3; // 8
let difference = 10 - 2; // 8
let product = 4 * 3; // 12
let quotient = 12 / 4; // 3
let remainder = 10 % 3; // 1
let power = 2 ** 3; // 8
```

##### 3.2 Comparison Operators

- **`==`**: Equal (with type coercion)
- **`===`**: Strictly equal (no type coercion)
- **`!=`**: Not equal (with type coercion)
- **`!==`**: Strictly not equal (no type coercion)
- **`>`**: Greater than
- **`<`**: Less than
- **`>=`**: Greater than or equal
- **`<=`**: Less than or equal

**Example**

```javascript
let isEqual = (5 == '5'); // true
let isStrictEqual = (5 === '5'); // false
let isGreater = (10 > 5); // true
let isLessOrEqual = (10 <= 10); // true
```

##### 3.3 Logical Operators

- **`&&`**: Logical AND
- **`||`**: Logical OR
- **`!`**: Logical NOT

**Example**

```javascript
let andResult = (true && false); // false
let orResult = (true || false); // true
let notResult = !true; // false
```

##### 3.4 Assignment Operators

- **`=`**: Assignment
- **`+=`**: Addition assignment
- **`-=`**: Subtraction assignment
- **`*=`**: Multiplication assignment
- **`/=`**: Division assignment
- **`%=`**: Remainder assignment

**Example**

```javascript
let x = 10;
x += 5; // 15
x -= 3; // 12
x *= 2; // 24
x /= 4; // 6
x %= 5; // 1
```

#### 4. Summary

This covers JavaScript's variable declarations, data types, and common operators, and the role they play in data-processing logic.

## References

- [MDN Grammar and types](https://developer.mozilla.org/en-us/docs/Web/JavaScript/Guide/Grammar_and_types)
- [MDN Arrow functions](https://developer.mozilla.org/en-us/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [knowledge](/knowledge.md))
