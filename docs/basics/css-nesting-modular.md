## 3.4 Nesting Rules and Modularity

Nesting rules and modularity are important features in CSS preprocessors (such as LESS and SASS). They make CSS code more structured and easier to manage, helping developers organize styles according to the HTML structure and improving code readability and maintainability.

### 3.4.1 Nesting Rules

#### 1. What Are Nesting Rules

Nesting rules allow you to define the styles of one selector inside another, mirroring the hierarchical relationship of the HTML structure. This approach makes CSS more modular and the code structure clearer.

#### 2. Nesting Rules in LESS

LESS supports nesting rules, reflecting the hierarchical relationship of the HTML structure by nesting styles inside a parent selector.

**Example**

```less
// LESS nesting rules example
.nav {
    background-color: #333;
    
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
        
        li {
            display: inline;
            margin-right: 10px;
            
            a {
                color: white;
                text-decoration: none;
                
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
}
```

- `.nav` is the parent selector.
- `ul`, `li`, and `a` are selectors nested under `.nav`, reflecting the hierarchy of the HTML structure.
- `&:hover` is the pseudo-class state of the `a` element.

#### 3. Nesting Rules in SASS

SASS uses similar nesting syntax, organizing styles by nesting them inside a parent selector.

**Example**

```scss
// SASS nesting rules example
.nav {
    background-color: #333;
    
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
        
        li {
            display: inline;
            margin-right: 10px;
            
            a {
                color: white;
                text-decoration: none;
                
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
}
```

- `ul`, `li`, and `a` are all defined inside `.nav`, demonstrating the nesting hierarchy.
- `&:hover` represents the hover state of the `a` element.

**Pros:**
- **Structured**: Nesting rules make CSS more structured and the code hierarchy clearer.
- **Readability**: The code mirrors the HTML structure, improving the readability and maintainability of styles.

#### 4. Best Practices for Nesting Rules

- **Control nesting depth**: Avoid excessive nesting; it's generally recommended to keep nesting to no more than 3 levels to maintain code readability.
- **Maintain consistency**: Ensure the nesting structure of styles matches the HTML structure to improve maintainability.

### 3.4.2 Modularity

#### 1. What Is Modularity

Modularity is a technique that decomposes styles into multiple independent modules or components. This approach makes styles more organized, reduces code duplication, and improves reusability.

#### 2. Modularity in LESS

LESS allows multiple LESS files to be merged into a main stylesheet via `@import` statements, achieving modularity.

**Example**

```less
// main.less
@import "variables.less";
@import "mixins.less";
@import "components/button.less";

.nav {
    background-color: @nav-bg-color;
}

// components/button.less
.button {
    .border-radius(5px);
    padding: 10px 20px;
    background-color: @button-bg-color;
}
```

- `@import` statements are used to import `variables.less`, `mixins.less`, and `components/button.less` into the main file `main.less`.
- Component styles are split across different files, improving code modularity.

#### 3. Modularity in SASS

SASS uses `@import` or `@use` statements to bring in multiple SCSS files, achieving modularity.

**Example**

```scss
// main.scss
@use 'variables';
@use 'mixins';
@use 'components/button';

.nav {
    background-color: variables.$nav-bg-color;
}

// components/button.scss
.button {
    @include mixins.border-radius(5px);
    padding: 10px 20px;
    background-color: variables.$button-bg-color;
}
```

- `@use` statements are used to import `variables.scss`, `mixins.scss`, and `components/button.scss`.
- Component styles are organized into independent files, achieving modularity.

**Pros:**
- **Code organization**: Splitting styles into multiple files or modules keeps code clean and maintainable.
- **Reusability**: Through modularity, styles can be reused across multiple projects or files.

#### 4. Best Practices for Modularity

- **File structure**: Split styles into different files based on feature or component to keep the file structure clear.
- **Naming conventions**: Use consistent naming conventions to manage files and selectors, improving style readability and consistency.
- **Avoid global pollution**: Try to avoid defining styles in global styles; use modular styles to improve code isolation.

### 3.4.3 Summary

Nesting rules bring styles closer to the structure, while modularity helps isolate and reuse styles; when nesting gets too deep, the cost of maintaining selectors also rises.

## References

- [Sass Docs · Style Rules](https://sass-lang.com/documentation/style-rules)

## Related Pages

- [css-box-model-layout](css-box-model-layout.md)
- [css-preprocessors](css-preprocessors.md)