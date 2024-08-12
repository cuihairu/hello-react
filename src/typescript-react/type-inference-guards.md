### 类型推断与类型守卫

在 TypeScript 中，类型推断和类型守卫是提高代码安全性和可维护性的两个重要概念。它们帮助开发者在静态类型检查的基础上更精确地控制代码的行为。

---

## **类型推断**

类型推断是 TypeScript 自动推断变量、参数、返回值等的类型的过程。TypeScript 的类型推断可以减少显式指定类型的需要，使得代码更简洁，但仍然保持类型安全。

### **1. 基本类型推断**

TypeScript 可以根据赋值来推断变量的类型：

```typescript
let num = 42; // 推断为 number
let str = "Hello"; // 推断为 string
```

如果在定义变量时没有显式指定类型，TypeScript 会根据变量的初始值进行推断。

### **2. 函数返回值推断**

TypeScript 会根据函数体的返回值推断函数的返回类型：

```typescript
function add(a: number, b: number) {
  return a + b; // 推断为 number
}

let sum = add(10, 20); // sum 的类型推断为 number
```

### **3. 对象属性推断**

TypeScript 也会根据对象字面量的属性推断类型：

```typescript
let person = {
  name: "Alice",
  age: 30
}; // 推断为 { name: string; age: number }
```

### **4. 数组推断**

TypeScript 可以根据数组的初始值推断数组的元素类型：

```typescript
let numbers = [1, 2, 3]; // 推断为 number[]
let strings = ["a", "b", "c"]; // 推断为 string[]
```

### **5. 泛型推断**

在使用泛型时，TypeScript 会根据实际使用的类型参数推断泛型的具体类型：

```typescript
function identity<T>(arg: T): T {
  return arg;
}

let result = identity("Hello"); // 推断 T 为 string
```

## **类型守卫**

类型守卫用于在运行时检查变量的类型，并根据检查结果进一步缩小变量的类型范围。这样可以帮助 TypeScript 更准确地推断类型，从而防止类型错误。

### **1. 使用 `typeof` 检查基本类型**

可以使用 `typeof` 操作符来检查变量的基本类型：

```typescript
function printLength(value: string | number) {
  if (typeof value === "string") {
    console.log(value.length); // 在此处 TypeScript 知道 value 是 string
  } else {
    console.log(value.toFixed(2)); // 在此处 TypeScript 知道 value 是 number
  }
}
```

### **2. 使用 `instanceof` 检查类实例**

`instanceof` 操作符用于检查一个对象是否是某个类的实例：

```typescript
class Dog {
  bark() {}
}

class Cat {
  meow() {}
}

function makeNoise(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark(); // 在此处 TypeScript 知道 animal 是 Dog
  } else {
    animal.meow(); // 在此处 TypeScript 知道 animal 是 Cat
  }
}
```

### **3. 自定义类型守卫**

可以创建自定义类型守卫函数，使用 `is` 关键字来检查特定类型：

```typescript
interface Dog {
  bark: () => void;
}

interface Cat {
  meow: () => void;
}

function isDog(animal: Dog | Cat): animal is Dog {
  return (animal as Dog).bark !== undefined;
}

function makeNoise(animal: Dog | Cat) {
  if (isDog(animal)) {
    animal.bark(); // 在此处 TypeScript 知道 animal 是 Dog
  } else {
    animal.meow(); // 在此处 TypeScript 知道 animal 是 Cat
  }
}
```

### **4. 使用 `in` 操作符**

`in` 操作符可以用来检查对象是否包含某个属性：

```typescript
interface Bird {
  fly(): void;
}

interface Fish {
  swim(): void;
}

function move(animal: Bird | Fish) {
  if ("fly" in animal) {
    animal.fly(); // 在此处 TypeScript 知道 animal 是 Bird
  } else {
    animal.swim(); // 在此处 TypeScript 知道 animal 是 Fish
  }
}
```

### **5. 使用类型断言**

在一些情况下，可能需要使用类型断言来告诉 TypeScript 变量的确切类型：

```typescript
function processValue(value: string | number) {
  (value as string).toUpperCase(); // 断言 value 是 string
}
```

### **总结**

- **类型推断**：TypeScript 能够根据变量的初始值、函数的返回值等自动推断类型，从而减少显式指定类型的需要。
- **类型守卫**：在运行时检查变量的类型，并根据检查结果缩小变量的类型范围，以提高类型安全性和代码的准确性。

