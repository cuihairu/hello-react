###  控制流与循环

控制流和循环是编程中用于控制代码执行路径的基本概念。在 JavaScript 中，控制流用于决定代码的执行顺序，而循环用于重复执行某些代码块。理解这些控制结构可以帮助你编写更复杂和高效的程序。

#### 1. 控制流

控制流语句用于根据条件控制代码的执行路径。主要包括条件判断和分支结构。

##### **1.1 条件判断**

- **if 语句**：根据条件执行代码块。
  
  ```javascript
  let age = 20;
  if (age >= 18) {
      console.log('You are an adult.');
  }
  ```

- **if-else 语句**：在条件不满足时执行另一个代码块。
  
  ```javascript
  let age = 16;
  if (age >= 18) {
      console.log('You are an adult.');
  } else {
      console.log('You are a minor.');
  }
  ```

- **if-else if-else 语句**：用于处理多个条件。
  
  ```javascript
  let score = 85;
  if (score >= 90) {
      console.log('Grade: A');
  } else if (score >= 80) {
      console.log('Grade: B');
  } else if (score >= 70) {
      console.log('Grade: C');
  } else {
      console.log('Grade: D');
  }
  ```

- **switch 语句**：用于处理多个可能的值。
  
  ```javascript
  let day = 2;
  switch (day) {
      case 1:
          console.log('Monday');
          break;
      case 2:
          console.log('Tuesday');
          break;
      case 3:
          console.log('Wednesday');
          break;
      default:
          console.log('Invalid day');
  }
  ```

##### **1.2 条件操作符（三元运算符）**

- **条件操作符**：简化的条件判断，可以用来替代简单的 if-else 语句。
  
  ```javascript
  let age = 18;
  let canVote = (age >= 18) ? 'Yes' : 'No';
  console.log(canVote); // Output: Yes
  ```

#### 2. 循环

循环用于重复执行代码块，直到满足某个条件。JavaScript 提供了多种循环结构来处理不同的场景。

##### **2.1 for 循环**

- **for**：最常用的循环结构，适用于已知循环次数的情况。
  
  ```javascript
  for (let i = 0; i < 5; i++) {
      console.log(i);
  }
  ```

##### **2.2 while 循环**

- **while**：在条件为 `true` 时执行循环体。适用于循环次数未知的情况。
  
  ```javascript
  let i = 0;
  while (i < 5) {
      console.log(i);
      i++;
  }
  ```

##### **2.3 do-while 循环**

- **do-while**：类似于 `while` 循环，但会至少执行一次循环体，因为条件判断在循环体执行之后进行。
  
  ```javascript
  let i = 0;
  do {
      console.log(i);
      i++;
  } while (i < 5);
  ```

##### **2.4 for...in 循环**

- **for...in**：用于遍历对象的可枚举属性。
  
  ```javascript
  let person = { name: 'Alice', age: 25 };
  for (let key in person) {
      console.log(key + ': ' + person[key]);
  }
  ```

##### **2.5 for...of 循环**

- **for...of**：用于遍历数组或其他可迭代对象的值。
  
  ```javascript
  let numbers = [1, 2, 3, 4, 5];
  for (let number of numbers) {
      console.log(number);
  }
  ```

#### 3. 控制流控制语句

在循环中，有时需要提前退出循环或跳过某次迭代。JavaScript 提供了 `break` 和 `continue` 语句来实现这些控制。

- **break**：立即终止循环或 switch 语句。
  
  ```javascript
  for (let i = 0; i < 5; i++) {
      if (i === 3) break; // Terminate loop when i is 3
      console.log(i);
  }
  ```

- **continue**：跳过当前循环的剩余代码，进入下一次迭代。
  
  ```javascript
  for (let i = 0; i < 5; i++) {
      if (i % 2 === 0) continue; // Skip even numbers
      console.log(i);
  }
  ```

#### 4. 总结

本节介绍了 JavaScript 中的控制流和循环结构。控制流语句用于根据条件执行不同的代码路径，而循环结构用于重复执行代码块。掌握这些基本控制结构是编写高效 JavaScript 代码的关键。通过合理使用这些语句，你可以实现复杂的逻辑处理和数据操作。