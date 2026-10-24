### Type Inference and Type Guards

In TypeScript, type inference and type guards are two important concepts for improving code safety and maintainability. They help developers control code behavior more precisely on top of static type checking.

---

## Type Inference

Type inference is the process by which TypeScript automatically deduces the types of variables, parameters, return values, and more. TypeScript's type inference reduces the need to explicitly specify types, making code more concise while still keeping it type-safe.

### 1. Basic Type Inference

TypeScript can infer a variable's type from its assignment:

```typescript
let num = 42; // inferred as number
let str = "Hello"; // inferred as string
```

If a variable is defined without an explicit type, TypeScript infers the type from its initial value.

### 2. Function Return Type Inference

TypeScript infers a function's return type from the value returned in its body:

```typescript
function add(a: number, b: number) {
  return a + b; // inferred as number
}

let sum = add(10, 20); // sum is inferred as number
```

### 3. Object Property Inference

TypeScript also infers types from object literal properties:

```typescript
let person = {
  name: "Alice",
  age: 30
}; // inferred as { name: string; age: number }
```

### 4. Array Inference

TypeScript can infer an array's element type from its initial values:

```typescript
let numbers = [1, 2, 3]; // inferred as number[]
let strings = ["a", "b", "c"]; // inferred as string[]
```

### 5. Generic Inference

When using generics, TypeScript infers the concrete generic type from the actual type arguments:

```typescript
function identity<T>(arg: T): T {
  return arg;
}

let result = identity("Hello"); // T is inferred as string
```

## Type Guards

Type guards check a variable's type at runtime and narrow its type based on the result. This helps TypeScript infer types more accurately, preventing type errors.

### 1. Checking Primitive Types with `typeof`

You can use the `typeof` operator to check a variable's primitive type:

```typescript
function printLength(value: string | number) {
  if (typeof value === "string") {
    console.log(value.length); // TypeScript knows value is a string here
  } else {
    console.log(value.toFixed(2)); // TypeScript knows value is a number here
  }
}
```

### 2. Checking Class Instances with `instanceof`

The `instanceof` operator checks whether an object is an instance of a class:

```typescript
class Dog {
  bark() {}
}

class Cat {
  meow() {}
}

function makeNoise(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark(); // TypeScript knows animal is a Dog here
  } else {
    animal.meow(); // TypeScript knows animal is a Cat here
  }
}
```

### 3. Custom Type Guards

You can create custom type guard functions using the `is` keyword to check for a specific type:

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
    animal.bark(); // TypeScript knows animal is a Dog here
  } else {
    animal.meow(); // TypeScript knows animal is a Cat here
  }
}
```

### 4. Using the `in` Operator

The `in` operator can check whether an object contains a property:

```typescript
interface Bird {
  fly(): void;
}

interface Fish {
  swim(): void;
}

function move(animal: Bird | Fish) {
  if ("fly" in animal) {
    animal.fly(); // TypeScript knows animal is a Bird here
  } else {
    animal.swim(); // TypeScript knows animal is a Fish here
  }
}
```

### 5. Using Type Assertions

In some cases, you may need type assertions to tell TypeScript a variable's exact type:

```typescript
function processValue(value: string | number) {
  (value as string).toUpperCase(); // assert that value is a string
}
```

### Summary

- **Type inference**: TypeScript can automatically infer types from variable initial values, function return values, and more, reducing the need for explicit type annotations.
- **Type guards**: Check a variable's type at runtime and narrow its type based on the result, improving type safety and code accuracy.


## References

- [TypeScript](https://www.typescriptlang.org/docs/)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
