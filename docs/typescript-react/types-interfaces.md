### Basic Types and Interfaces

In TypeScript, basic types and interfaces are important tools for defining and validating data structures. Types and interfaces constrain data structures, letting TypeScript catch some inconsistencies at compile time.

#### Basic Types

TypeScript provides a variety of basic types to represent different data types. These basic types can be used to define variables, function parameters, return values, and more.

1. **`number`**: Represents all numbers (including integers and floating-point values).

   ```typescript
   let age: number = 25;
   let price: number = 19.99;
   ```

2. **`string`**: Represents all string values.

   ```typescript
   let name: string = "Alice";
   let greeting: string = `Hello, ${name}!`;
   ```

3. **`boolean`**: Represents boolean values `true` or `false`.

   ```typescript
   let isActive: boolean = true;
   let isFinished: boolean = false;
   ```

4. **`array`**: Represents arrays, which can be arrays of a specific type.

   ```typescript
   let numbers: number[] = [1, 2, 3];
   let names: string[] = ["Alice", "Bob"];
   ```

   Another way to represent arrays is using generics:

   ```typescript
   let numbers: Array<number> = [1, 2, 3];
   ```

5. **`tuple`**: Represents an array of a fixed length and types.

   ```typescript
   let person: [string, number] = ["Alice", 30];
   ```

6. **`enum`**: Represents a set of named constant values.

   ```typescript
   enum Direction {
     Up = 1,
     Down,
     Left,
     Right
   }
   
   let move: Direction = Direction.Up;
   ```

7. **`any`**: Represents any type, with no type checking. Usually used when the type is unknown, but should be avoided as much as possible, since it bypasses TypeScript's type checking.

   ```typescript
   let data: any = 42;
   data = "Hello";
   data = [1, 2, 3];
   ```

8. **`void`**: Represents no value, typically used when a function has no return value.

   ```typescript
   function logMessage(message: string): void {
     console.log(message);
   }
   ```

9. **`null` and `undefined`**: Represent no value and an undefined value, respectively.

   ```typescript
   let n: null = null;
   let u: undefined = undefined;
   ```

10. **`never`**: Represents a value that never occurs, such as a function that always throws an exception or unreachable code.

    ```typescript
    function throwError(message: string): never {
      throw new Error(message);
    }
    
    function infiniteLoop(): never {
      while (true) {}
    }
    ```

#### Interfaces

Interfaces (`interface`) define the structure of objects, including their properties and methods. Interfaces are very important in TypeScript; they let you define structural types and enforce type checking.

1. **Basic Interface**

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

2. **Optional Properties**

   Properties in an interface can be optional, meaning they may or may not be present.

   ```typescript
   interface Person {
     name: string;
     age?: number; // optional property
   }
   
   let person1: Person = { name: "Alice" };
   let person2: Person = { name: "Bob", age: 25 };
   ```

3. **Read-only Properties**

   Interfaces can specify read-only properties, which can only be assigned at object creation and cannot be modified afterward.

   ```typescript
   interface Person {
     readonly id: number;
     name: string;
   }
   
   let person: Person = { id: 1, name: "Alice" };
   // person.id = 2; // Error: id is a read-only property
   ```

4. **Function Types**

   Interfaces can describe function types, i.e., define the structure of a function.

   ```typescript
   interface Greeter {
     (message: string): void;
   }
   
   let greeter: Greeter = (message: string) => {
     console.log(message);
   };
   ```

5. **Indexable Types**

   Interfaces can define index signatures to access the types of object properties.

   ```typescript
   interface StringArray {
     [index: number]: string;
   }
   
   let names: StringArray = ["Alice", "Bob"];
   ```

6. **Extending Interfaces**

   Interfaces can inherit from other interfaces, extending existing interfaces.

   ```typescript
   interface Person {
     name: string;
   }
   
   interface Employee extends Person {
     employeeId: number;
   }
   
   let employee: Employee = { name: "Alice", employeeId: 1234 };
   ```

7. **Interfaces and Classes**

   Interfaces can define the structure of classes; classes can implement one or more interfaces.

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
   person.greet(); // outputs "Hello, Alice"
   ```

### Summary

Basic types constrain simple data, while interfaces describe object structures. Once these boundaries are explicit in a project, type checking surfaces inconsistent data earlier.

## References

- [TypeScript](https://www.typescriptlang.org/docs/)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [knowledge](/knowledge.md))
- [README](README.md)
