##  Mixins and Inheritance

Mixins and inheritance are two powerful features in CSS preprocessors (such as LESS and SASS), used to improve style reusability and code organization. They help developers create reusable style blocks and avoid code duplication.

### 3.3.1 Mixins

#### 1. What Are Mixins

A mixin is a reusable style block that can generate different styles through parameterization. They allow you to define a set of styles and then reference those styles wherever needed, reducing code duplication and improving maintainability.

#### 2. Mixins in LESS

In LESS, mixins can take parameters to generate different styles. Mixins are defined using `.mixinName` and invoked using `.mixinName()`.

**Defining and Using LESS Mixins**

```less
// Define mixin
.border-radius(@radius: 5px) {
    border-radius: @radius;
}

// Use mixin
.box {
    .border-radius(10px);
}
```

- **Definition**: `.border-radius` is a mixin that takes a parameter `@radius` and applies it to the `border-radius` property.
- **Usage**: The `.box` class references this mixin via `.border-radius(10px)` and passes a specific parameter value.

**Pros:**
- **Reusability**: The same styles can be reused across multiple selectors.
- **Parameterization**: Supports parameter passing for more flexible style generation.

#### 3. Mixins in SASS

In SASS, mixins can also take parameters and are defined and invoked using the `@mixin` and `@include` keywords.

**Defining and Using SASS Mixins**

```scss
// Define mixin
@mixin border-radius($radius: 5px) {
    border-radius: $radius;
}

// Use mixin
.box {
    @include border-radius(10px);
}
```

- **Definition**: `@mixin border-radius` defines a mixin that takes a parameter `$radius`.
- **Usage**: `@include border-radius(10px)` references this mixin inside the `.box` class and passes the parameter.

**Pros:**
- **Reusability**: The `@include` keyword allows styles to be reused across multiple locations.
- **Parameterization**: Supports parameter passing for flexibility and configurability.

### 3.3.2 Inheritance

#### 1. What Is Inheritance

Inheritance is a feature of CSS preprocessors that lets one selector inherit the styles of another. Inheritance reduces duplicated code and maintains consistency when styles change.

#### 2. Inheritance in LESS

In LESS, you can use the `:extend` pseudo-class to implement inheritance.

**Defining and Using LESS Inheritance**

```less
// Define base styles
.button {
    background-color: #4CAF50;
    color: white;
}

// Inherit base styles
.primary-button {
    &:extend(.button);
    font-size: 16px;
}
```

- **Definition**: `.button` is the base style.
- **Inheritance**: `.primary-button` inherits the styles of `.button` via `&:extend(.button)` and adds the `font-size` property.

**Pros:**
- **Reduced duplication**: Base styles can be reused, avoiding repeated CSS property declarations.
- **Consistency**: Style changes to the base selector automatically propagate to all selectors that inherit from it.

#### 3. Inheritance in SASS

In SASS, inheritance is implemented via the `@extend` keyword.

**Defining and Using SASS Inheritance**

```scss
// Define base styles
.button {
    background-color: #4CAF50;
    color: white;
}

// Inherit base styles
.primary-button {
    @extend .button;
    font-size: 16px;
}
```

- **Definition**: `.button` is the base style.
- **Inheritance**: `.primary-button` inherits the styles of `.button` via `@extend .button` and adds the `font-size` property.

**Pros:**
- **Reduced duplication**: Inheriting base styles reduces duplicated CSS code.
- **Consistency**: All selectors that inherit from the base styles are updated automatically, keeping styles consistent.

### 3.3.3 Comparing Mixins and Inheritance

- **Mixins**:
  - **Function**: Allows defining reusable style blocks with parameters.
  - **Usage**: Best for parameterized style blocks and complex style combinations.
  - **Pros**: Highly flexible and suitable for dynamic style generation.

- **Inheritance**:
  - **Function**: Allows a selector to inherit styles from another selector.
  - **Usage**: Best for reusing base styles and maintaining style consistency.
  - **Pros**: Reduces duplicated code and ensures style consistency.

### 3.3.4 Best Practices for Using Mixins and Inheritance

- **Choose the right tool**: Select mixins or inheritance based on project needs to maximize code reuse and maintainability.
- **Modular design**: Split styles into multiple modules and combine or reuse them via mixins and inheritance.
- **Avoid overuse**: Avoid overusing nesting and inheritance to keep styles clear and maintainable.

### 3.3.5 Summary

Mixins and inheritance are important features in CSS preprocessors; by improving style reusability and organization, they help developers write more efficient and maintainable CSS. These two features can be used to reduce code duplication and improve development efficiency.

## References

- [Sass Docs · Style Rules](https://sass-lang.com/documentation/style-rules)
- [Less Features](https://lesscss.org/features/)

## Related Pages

- [css-box-model-layout](css-box-model-layout.md)
- [css-preprocessors](css-preprocessors.md)