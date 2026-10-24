###  Control Flow and Loops

Control flow and loops are the basic concepts programmers use to control the path code takes. In JavaScript, control flow decides the order in which code runs, while loops run a block of code repeatedly. Understanding these structures helps you write more complex and efficient programs.

#### 1. Control Flow

Control flow statements direct execution based on conditions. They mainly consist of conditional and branching structures.

##### 1.1 Conditional Statements

- **if statement**: Runs a block of code based on a condition.
  
  ```javascript
  let age = 20;
  if (age >= 18) {
      console.log('You are an adult.');
  }
  ```

- **if-else statement**: Runs a different block when the condition is not met.
  
  ```javascript
  let age = 16;
  if (age >= 18) {
      console.log('You are an adult.');
  } else {
      console.log('You are a minor.');
  }
  ```

- **if-else if-else statement**: Handles multiple conditions.
  
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

- **switch statement**: Handles multiple possible values.
  
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

##### 1.2 Conditional Operator (Ternary Operator)

- **Conditional operator**: A compact conditional check that can replace a simple if-else statement.
  
  ```javascript
  let age = 18;
  let canVote = (age >= 18) ? 'Yes' : 'No';
  console.log(canVote); // Output: Yes
  ```

#### 2. Loops

Loops run a block of code repeatedly until some condition is met. JavaScript offers several loop structures for different scenarios.

##### 2.1 for Loop

- **for**: The most commonly used loop, suited to cases where the number of iterations is known.
  
  ```javascript
  for (let i = 0; i < 5; i++) {
      console.log(i);
  }
  ```

##### 2.2 while Loop

- **while**: Runs the loop body while the condition is `true`. Suited to cases where the number of iterations is unknown.
  
  ```javascript
  let i = 0;
  while (i < 5) {
      console.log(i);
      i++;
  }
  ```

##### 2.3 do-while Loop

- **do-while**: Works like `while`, but runs the loop body at least once because the condition is checked after the body executes.
  
  ```javascript
  let i = 0;
  do {
      console.log(i);
      i++;
  } while (i < 5);
  ```

##### 2.4 for...in Loop

- **for...in**: Iterates over the enumerable properties of an object.
  
  ```javascript
  let person = { name: 'Alice', age: 25 };
  for (let key in person) {
      console.log(key + ': ' + person[key]);
  }
  ```

##### 2.5 for...of Loop

- **for...of**: Iterates over the values of an array or other iterable.
  
  ```javascript
  let numbers = [1, 2, 3, 4, 5];
  for (let number of numbers) {
      console.log(number);
  }
  ```

#### 3. Loop Control Statements

Inside loops you sometimes need to exit early or skip an iteration. JavaScript provides `break` and `continue` for this.

- **break**: Immediately terminates a loop or switch statement.
  
  ```javascript
  for (let i = 0; i < 5; i++) {
      if (i === 3) break; // Terminate loop when i is 3
      console.log(i);
  }
  ```

- **continue**: Skips the rest of the current iteration and moves on to the next one.
  
  ```javascript
  for (let i = 0; i < 5; i++) {
      if (i % 2 === 0) continue; // Skip even numbers
      console.log(i);
  }
  ```

#### 4. Summary

Control flow statements pick an execution path based on conditions, while loops repeat a block of code — combined, they express fairly complex data-processing logic.

## References

- [MDN Control flow and error handling](https://developer.mozilla.org/en-us/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
- [MDN Loops and iteration](https://developer.mozilla.org/en-us/docs/Web/JavaScript/Guide/Loops_and_iteration)

## Related Pages

- [css-box-model-layout](css-box-model-layout.md)
- [js-es6-basics](js-es6-basics.md)
