### Classes and Generics

In TypeScript, classes and generics are two very important advanced features. They let you write more flexible, reusable code. Here is a closer look at both.

---

## Classes

Classes are one of the core concepts of object-oriented programming (OOP). They are used to create objects with specific properties and methods. TypeScript classes offer more features and flexibility than JavaScript classes, because they bring in the type system.

### 1. Basic Class Definition

A simple class definition includes a constructor and methods:

```typescript
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): void {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}

const person = new Person("Alice", 30);
person.greet(); // Output: Hello, my name is Alice and I am 30 years old.
```

### 2. Access Modifiers

TypeScript provides three access modifiers, `public`, `private`, and `protected`, to control the access level of a class's properties and methods:

- **`public`**: public, accessible anywhere (the default).
- **`private`**: private, accessible only inside the class.
- **`protected`**: protected, accessible in the class and its subclasses.

```typescript
class Person {
  public name: string;
  private age: number;
  protected gender: string;

  constructor(name: string, age: number, gender: string) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }

  public greet(): void {
    console.log(`Hello, my name is ${this.name}.`);
  }

  private showAge(): void {
    console.log(`I am ${this.age} years old.`);
  }

  protected showGender(): void {
    console.log(`I am a ${this.gender}.`);
  }
}

class Employee extends Person {
  constructor(name: string, age: number, gender: string) {
    super(name, age, gender);
  }

  public displayInfo(): void {
    this.greet();
    this.showGender(); // Can access protected properties and methods
    // this.showAge(); // Error: private properties cannot be accessed in a subclass
  }
}
```

### 3. Static Properties and Methods

Static properties and methods belong to the class itself, not to instances of the class:

```typescript
class MathUtils {
  static PI: number = 3.14;

  static areaOfCircle(radius: number): number {
    return MathUtils.PI * radius * radius;
  }
}

console.log(MathUtils.PI); // Output: 3.14
console.log(MathUtils.areaOfCircle(5)); // Output: 78.5
```

### 4. Abstract Classes

An abstract class cannot be instantiated; it can only be extended. They are typically used to define common properties and methods:

```typescript
abstract class Animal {
  abstract makeSound(): void;

  move(): void {
    console.log("Moving...");
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Woof!");
  }
}

const dog = new Dog();
dog.makeSound(); // Output: Woof!
dog.move(); // Output: Moving...
```

---

## Generics

Generics let you write flexible, reusable code. They allow you to define functions, classes, or interfaces without specifying a concrete type, and only fix the type when you actually use them.

### 1. Generic Functions

A generic function lets you specify a type in the function's definition and provide the concrete type at call time:

```typescript
function identity<T>(arg: T): T {
  return arg;
}

let result1 = identity<string>("Hello"); // Result is "Hello"
let result2 = identity<number>(123); // Result is 123
```

### 2. Generic Interfaces

A generic interface defines some general methods and properties, and lets you specify the concrete type when you implement it:

```typescript
interface GenericIdentity<T> {
  (arg: T): T;
}

const myIdentity: GenericIdentity<number> = (arg: number): number => {
  return arg;
};

console.log(myIdentity(42)); // Output: 42
```

### 3. Generic Classes

A generic class lets you use a generic parameter inside a class, and specify the concrete type when you instantiate it:

```typescript
class Box<T> {
  private content: T;

  constructor(content: T) {
    this.content = content;
  }

  getContent(): T {
    return this.content;
  }
}

const stringBox = new Box<string>("Hello");
console.log(stringBox.getContent()); // Output: Hello

const numberBox = new Box<number>(123);
console.log(numberBox.getContent()); // Output: 123
```

### 4. Generic Constraints

You can constrain a generic parameter to ensure it has a specific property or method:

```typescript
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): void {
  console.log(arg.length);
}

logLength({ length: 10, value: "Hello" }); // Output: 10
logLength([1, 2, 3]); // Output: 3
```

### 5. Multiple Generic Parameters

You can use multiple generic parameters in a single function, class, or interface:

```typescript
class Pair<K, V> {
  constructor(public key: K, public value: V) {}

  display(): void {
    console.log(`Key: ${this.key}, Value: ${this.value}`);
  }
}

const pair = new Pair<string, number>("age", 30);
pair.display(); // Output: Key: age, Value: 30
```

### 6. Generic Defaults

You can specify a default type for a generic parameter:

```typescript
function createArray<T = string>(length: number, value: T): T[] {
  return new Array(length).fill(value);
}

const stringArray = createArray(3, "Hello");
const numberArray = createArray(3, 42); // T is inferred as number; the default type only applies when inference fails
```

---

## Summary

Classes and generics are powerful features in TypeScript. They let you write structured, maintainable, and type-safe code. Classes provide the features of object-oriented programming, while generics boost code reuse and flexibility. These features are a good fit for expressing object structures, constraining reusable logic, and organizing larger type models.

## References

- [TypeScript](https://www.typescriptlang.org/docs/)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [knowledge](/knowledge.md))
