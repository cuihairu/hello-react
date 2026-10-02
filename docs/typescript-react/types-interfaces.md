### 基本类型与接口

在 TypeScript 中，基本类型和接口是用于定义和检查数据结构的重要工具。理解这些概念能够帮助你更好地利用 TypeScript 的类型系统，从而编写更安全和可靠的代码。

#### 基本类型

TypeScript 提供了多种基本类型来表示不同的数据类型。这些基本类型可以用来定义变量、函数参数、返回值等。

1. **`number`**：表示所有数字（包括整数和浮点数）。

   ```typescript
   let age: number = 25;
   let price: number = 19.99;
   ```

2. **`string`**：表示所有字符串值。

   ```typescript
   let name: string = "Alice";
   let greeting: string = `Hello, ${name}!`;
   ```

3. **`boolean`**：表示布尔值 `true` 或 `false`。

   ```typescript
   let isActive: boolean = true;
   let isFinished: boolean = false;
   ```

4. **`array`**：表示数组，可以是特定类型的数组。

   ```typescript
   let numbers: number[] = [1, 2, 3];
   let names: string[] = ["Alice", "Bob"];
   ```

   另一种表示数组的方式是使用泛型：

   ```typescript
   let numbers: Array<number> = [1, 2, 3];
   ```

5. **`tuple`**：表示一个固定长度和类型的数组。

   ```typescript
   let person: [string, number] = ["Alice", 30];
   ```

6. **`enum`**：表示一组命名的常数值。

   ```typescript
   enum Direction {
     Up = 1,
     Down,
     Left,
     Right
   }
   
   let move: Direction = Direction.Up;
   ```

7. **`any`**：表示任何类型，不进行类型检查。通常在不确定类型的情况下使用，但应尽量避免过多使用，因为它绕过了 TypeScript 的类型检查。

   ```typescript
   let data: any = 42;
   data = "Hello";
   data = [1, 2, 3];
   ```

8. **`void`**：表示没有值，通常用于函数没有返回值的情况。

   ```typescript
   function logMessage(message: string): void {
     console.log(message);
   }
   ```

9. **`null` 和 `undefined`**：分别表示没有值和未定义的值。

   ```typescript
   let n: null = null;
   let u: undefined = undefined;
   ```

10. **`never`**：表示从不会发生的值，比如总是抛出异常的函数或无法完成的代码。

    ```typescript
    function throwError(message: string): never {
      throw new Error(message);
    }
    
    function infiniteLoop(): never {
      while (true) {}
    }
    ```

#### 接口

接口（`interface`）用于定义对象的结构，包括对象的属性和方法。接口在 TypeScript 中非常重要，它们允许你定义结构化类型并实现类型检查。

1. **基本接口**

   ```typescript
   interface Person {
     name: string;
     age: number;
   }
   
   let person: Person = {
     name: "Alice",
     age: 30
   };
   ```

2. **可选属性**

   接口中的属性可以是可选的，这意味着这些属性可以存在也可以不存在。

   ```typescript
   interface Person {
     name: string;
     age?: number; // 可选属性
   }
   
   let person1: Person = { name: "Alice" };
   let person2: Person = { name: "Bob", age: 25 };
   ```

3. **只读属性**

   接口可以指定只读属性，这些属性只能在对象创建时赋值，之后不能被修改。

   ```typescript
   interface Person {
     readonly id: number;
     name: string;
   }
   
   let person: Person = { id: 1, name: "Alice" };
   // person.id = 2; // 错误：id 是只读属性
   ```

4. **函数类型**

   接口可以描述函数类型，即接口定义一个函数的结构。

   ```typescript
   interface Greeter {
     (message: string): void;
   }
   
   let greeter: Greeter = (message: string) => {
     console.log(message);
   };
   ```

5. **可索引类型**

   接口可以定义索引签名，用于访问对象属性的类型。

   ```typescript
   interface StringArray {
     [index: number]: string;
   }
   
   let names: StringArray = ["Alice", "Bob"];
   ```

6. **扩展接口**

   接口可以继承其他接口，从而扩展现有的接口。

   ```typescript
   interface Person {
     name: string;
   }
   
   interface Employee extends Person {
     employeeId: number;
   }
   
   let employee: Employee = { name: "Alice", employeeId: 1234 };
   ```

7. **接口与类**

   接口可以用于定义类的结构，类可以实现一个或多个接口。

   ```typescript
   interface Greeter {
     greet(): void;
   }
   
   class Person implements Greeter {
     constructor(public name: string) {}
     
     greet(): void {
       console.log(`Hello, ${this.name}`);
     }
   }
   
   let person = new Person("Alice");
   person.greet(); // 输出 "Hello, Alice"
   ```

### 总结

基本类型和接口是 TypeScript 中最核心的概念之一。基本类型用于定义和检查简单数据的类型，而接口则用于定义对象的结构和约束类型。掌握这些基础知识可以帮助你更有效地使用 TypeScript 编写类型安全的代码。