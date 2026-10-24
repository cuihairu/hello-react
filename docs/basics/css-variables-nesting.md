##  Variables and Nesting Rules

CSS variables and nesting rules are core features of CSS preprocessors; they make CSS writing more flexible, structured, and maintainable. Although standard CSS supports variables (CSS Custom Properties), preprocessors such as LESS and SASS provide richer features to enhance stylesheet maintainability.

### 3.2.1 Variables

#### 1. CSS Variables (Custom Properties)

CSS Custom Properties are the standard implementation of CSS variables, allowing you to define and use variables in CSS. CSS variables can change dynamically and are suitable for style adjustments at the CSS level.

**Defining and Using CSS Variables**

```css
:root {
    --main-bg-color: #4CAF50;
    --main-text-color: white;
}

.container {
    background-color: var(--main-bg-color);
    color: var(--main-text-color);
}
```

- The `:root` pseudo-class selector is used to define global variables.
- `var(--main-bg-color)` is used to reference a variable's value.

**Pros:**
- Dynamic changes: CSS variables can be modified dynamically at runtime via JavaScript.
- Cascading: CSS variables support cascading and inheritance, so child elements can override a parent's variable values.

#### 2. LESS Variables

LESS is a CSS preprocessor that supports defining variables to store frequently used values. LESS variables start with the `@` symbol.

**Defining and Using LESS Variables**

```less
@primary-color: #4CAF50;
@font-size: 16px;

.header {
    color: @primary-color;
    font-size: @font-size;
}
```

- The variables `@primary-color` and `@font-size` store color and font size values.
- The variables are used with the `color` and `font-size` properties.

#### 3. SASS Variables

SASS is another CSS preprocessor that supports variable definition similar to LESS. SASS variables start with the `$` symbol.

**Defining and Using SASS Variables**

```scss
$primary-color: #4CAF50;
$font-size: 16px;

.header {
    color: $primary-color;
    font-size: $font-size;
}
```

- The variables `$primary-color` and `$font-size` store color and font size values.
- The variables are used with the `color` and `font-size` properties.

**Pros:**
- In SASS, variables can be used in nested contexts, providing greater flexibility.

### 3.2.2 Nesting Rules

#### 1. CSS Nesting

Modern standard CSS now natively supports nesting rules (CSS Nesting, supported by all major browsers since 2023), and this can also be achieved through CSS preprocessors. Nesting rules make CSS code align more closely with the HTML structure, improving code readability and maintainability.

**Native CSS Nesting Example**:

```css
.nav {
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    li {
        display: inline;
        margin-right: 10px;
    }
}
```

#### 2. LESS Nesting Rules

LESS supports nesting rules, making the stylesheet structure align more closely with the HTML structure.

**Example**

```less
.nav {
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    
    li {
        display: inline;
        margin-right: 10px;
    }
}
```

- The `ul` and `li` rules under `.nav` are nested inside `.nav`, demonstrating the hierarchical relationship.

#### 3. SASS Nesting Rules

SASS also supports nesting rules; the syntax is similar to LESS, but it supports more complex nesting and selectors.

**Example**

```scss
.nav {
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    
    li {
        display: inline;
        margin-right: 10px;
    }
}
```

- The `ul` and `li` rules under `.nav` are nested inside `.nav`, demonstrating the hierarchical relationship.

**Pros:**
- Clear structure: Nesting rules align styles with the HTML structure, making code more hierarchical.
- Code reuse: Nesting can avoid duplicated selectors and reduce redundant code.

### 3.2.3 Best Practices for Using Variables and Nesting Rules

- **Variable naming**: Use meaningful names to define variables, ensuring their purpose is clear.
- **Nesting depth**: Avoid excessive nesting; it's generally recommended to keep nesting to no more than 3 levels to maintain code readability.
- **Modularity**: Split styles into multiple files and manage them via importing or including, improving code organization and maintainability.

### 3.2.4 Summary

CSS variables and nesting rules are important tools for improving stylesheet management and maintenance. CSS variables support dynamic style adjustments, while preprocessors such as LESS and SASS provide rich features to enhance the expressiveness and organization of CSS. These techniques can be used to write more efficient and maintainable CSS code.

## References

- [MDN CSS Custom Properties (Variables)](https://developer.mozilla.org/en-us/docs/Web/CSS/Using_CSS_custom_properties)
- [MDN CSS Variables](https://developer.mozilla.org/en-us/docs/Web/CSS/CSS_cascading_variables)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [knowledge](/knowledge.md))