# CSS Deep Dive Notes

CSS (Cascading Style Sheets) is the language used to describe the appearance of HTML documents. It controls not only text, colors, and layout, but also more advanced styles and effects. A deep understanding of CSS helps create more refined and flexible web designs.

### 3.1 CSS Preprocessors: LESS and SASS

CSS preprocessors are tools that extend CSS, providing features like variables, nesting rules, and mixins that make CSS writing more efficient and modular. LESS and SASS are two common CSS preprocessors.

#### 3.1.1 LESS

LESS is a dynamic stylesheet language that adds features such as CSS variables, mixins, and functions. It can be compiled into standard CSS.

- **Variables**: Define reusable values.

    ```less
    @primary-color: #4CAF50;
    
    .button {
        color: @primary-color;
    }
    ```

- **Nesting Rules**: Nest CSS rules inside other rules.

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

- **Mixins**: Define reusable CSS code blocks.

    ```less
    .border-radius(@radius: 5px) {
        border-radius: @radius;
    }
    
    .box {
        .border-radius(10px);
    }
    ```

#### 3.1.2 SASS

SASS (Syntactically Awesome Style Sheets) is a powerful CSS preprocessor with two syntaxes: indentation-based (`.sass`) and SCSS (`.scss`). SCSS syntax is closer to CSS and is widely used.

- **Variables**: Define reusable values.

    ```scss
    $primary-color: #4CAF50;
    
    .button {
        color: $primary-color;
    }
    ```

- **Nesting Rules**: Nest CSS rules inside other rules.

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

- **Mixins**: Define reusable CSS code blocks.

    ```scss
    @mixin border-radius($radius: 5px) {
        border-radius: $radius;
    }
    
    .box {
        @include border-radius(10px);
    }
    ```

- **Inheritance**: Let one selector inherit the styles of another selector.

    ```scss
    .button {
        background-color: #4CAF50;
        color: white;
    }
    
    .primary-button {
        @extend .button;
        font-size: 16px;
    }
    ```

### 3.2 Variables and Nesting Rules

#### 3.2.1 Variables

CSS variables (Custom Properties) are variables that can be defined and reused in CSS.

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

#### 3.2.2 Nesting Rules

CSS nesting rules can be achieved through preprocessors (such as LESS and SASS). Standard CSS has also natively supported nesting since 2023 (CSS Nesting, implemented in all major browsers), though preprocessor nesting and compile-time capabilities remain widely used in engineering.

### 3.3 Mixins and Inheritance

#### 3.3.1 Mixins

A mixin is a set of reusable CSS rules. Mixins can accept parameters and be included in other rules where needed.

```scss
@mixin border-radius($radius: 5px) {
    border-radius: $radius;
}

.box {
    @include border-radius(10px);
}
```

#### 3.3.2 Inheritance

Inheritance allows one selector to inherit the styles of another selector, thus avoiding duplicated code.

```scss
.button {
    background-color: #4CAF50;
    color: white;
}

.primary-button {
    @extend .button;
    font-size: 16px;
}
```

### 3.4 Nesting Rules and Modularity

#### 3.4.1 Nesting Rules

Nesting rules make CSS more modular and readable by nesting selectors inside other selectors, showcasing the hierarchy.

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

#### 3.4.2 Modularity

CSS modularity splits styles into smaller, reusable modules, making maintenance and management easier. Preprocessors and CSS-in-JS libraries (such as styled-components) help achieve modular design.

### 3.5 Using SASS/LESS to Optimize Project Styles

- **Organize files**: Split styles into multiple files and use `@import` or `@use` statements to manage them.
- **Reuse code**: Use mixins and inheritance to reduce duplicated styles.
- **Dynamic styles**: Use variables and functions to generate dynamic styles.

#### 3.5.1 File Organization

```scss
// styles.scss
@import 'variables';
@import 'mixins';
@import 'base';
@import 'components';
@import 'layouts';
```

### 3.6 Summary

This section collects advanced CSS topics: preprocessors, variables, mixins, inheritance, nesting rules, and modularity; in projects I pay closer attention to how these patterns affect the final styles and maintenance cost.

## References

- [MDN CSS](https://developer.mozilla.org/en-us/docs/Web/CSS)
- [MDN CSS Getting Started](https://developer.mozilla.org/en-us/docs/Learn/CSS/First_steps)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [css-preprocessors](css-preprocessors.md)
- [README](README.md)