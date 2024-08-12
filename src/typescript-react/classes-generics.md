### 类与泛型

在 TypeScript 中，类和泛型是两种非常重要的高级功能，它们允许你创建更加灵活和可复用的代码。以下是对类和泛型的详细介绍。

---

## **类**

类是面向对象编程（OOP）的核心概念之一，用于创建具有特定属性和方法的对象。TypeScript 的类提供了更多的功能和灵活性，相比于 JavaScript 的类，TypeScript 类引入了类型系统。

### **1. 基本类定义**

一个简单的类定义包括构造函数和方法：

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
person.greet(); // 输出: Hello, my name is Alice and I am 30 years old.
```

### **2. 访问修饰符**

TypeScript 提供了 `public`、`private` 和 `protected` 三种访问修饰符来控制类的属性和方法的访问级别：

- **`public`**：公共的，可以被任何地方访问（默认值）。
- **`private`**：私有的，只能在类内部访问。
- **`protected`**：受保护的，可以在类和其子类中访问。

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
    this.showGender(); // 可以访问 protected 属性和方法
    // this.showAge(); // 错误：私有属性不能在子类中访问
  }
}
```

### **3. 静态属性与方法**

静态属性和方法属于类本身，而不是类的实例：

```typescript
class MathUtils {
  static PI: number = 3.14;

  static areaOfCircle(radius: number): number {
    return MathUtils.PI * radius * radius;
  }
}

console.log(MathUtils.PI); // 输出: 3.14
console.log(MathUtils.areaOfCircle(5)); // 输出: 78.5
```

### **4. 抽象类**

抽象类不能被实例化，只能被继承。它们通常用于定义通用的属性和方法：

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
dog.makeSound(); // 输出: Woof!
dog.move(); // 输出: Moving...
```

---

## **泛型**

泛型（Generics）使得你可以编写灵活和可复用的代码。它允许在定义函数、类或接口时不指定具体的类型，而在使用时再指定类型。

### **1. 泛型函数**

泛型函数允许在函数定义时指定类型，并在调用函数时提供具体的类型：

```typescript
function identity<T>(arg: T): T {
  return arg;
}

let result1 = identity<string>("Hello"); // 结果为 "Hello"
let result2 = identity<number>(123); // 结果为 123
```

### **2. 泛型接口**

泛型接口定义了一些通用的方法和属性，并可以在实现接口时指定具体的类型：

```typescript
interface GenericIdentity<T> {
  (arg: T): T;
}

const myIdentity: GenericIdentity<number> = (arg: number): number => {
  return arg;
};

console.log(myIdentity(42)); // 输出: 42
```

### **3. 泛型类**

泛型类允许在类中使用泛型参数，并在实例化时指定具体的类型：

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
console.log(stringBox.getContent()); // 输出: Hello

const numberBox = new Box<number>(123);
console.log(numberBox.getContent()); // 输出: 123
```

### **4. 泛型约束**

你可以对泛型参数进行约束，以确保它们具有特定的属性或方法：

```typescript
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): void {
  console.log(arg.length);
}

logLength({ length: 10, value: "Hello" }); // 输出: 10
logLength([1, 2, 3]); // 输出: 3
```

### **5. 多个泛型参数**

你可以在一个函数、类或接口中使用多个泛型参数：

```typescript
class Pair<K, V> {
  constructor(public key: K, public value: V) {}

  display(): void {
    console.log(`Key: ${this.key}, Value: ${this.value}`);
  }
}

const pair = new Pair<string, number>("age", 30);
pair.display(); // 输出: Key: age, Value: 30
```

### **6. 泛型默认值**

你可以为泛型参数指定默认类型：

```typescript
function createArray<T = string>(length: number, value: T): T[] {
  return new Array(length).fill(value);
}

const stringArray = createArray(3, "Hello");
const numberArray = createArray(3, 42); // T 默认是 string
```

---

## **总结**

类和泛型是 TypeScript 中强大的功能，它们允许你编写结构化的、可维护的和类型安全的代码。类提供了面向对象编程的特性，而泛型则增强了代码的复用性和灵活性。理解这些功能将帮助你在 TypeScript 中更有效地创建复杂的应用程序。