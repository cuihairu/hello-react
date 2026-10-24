## 2.2 CSS Basic Syntax and Selectors

CSS (Cascading Style Sheets) is used to control the styling and layout of HTML elements. Rules and selectors form the basis of style matching.

### 2.2.1 CSS Basic Syntax

CSS basic syntax includes selectors and declaration blocks. A declaration block consists of a group of declarations, and each declaration includes a property and its corresponding value.

#### 1. Selectors

Selectors specify which HTML elements CSS styles will be applied to. Common selectors include:

- **Type Selector**: Selects all elements of the specified type.
  
    ```css
    p {
        color: blue;
    }
    ```

    The code above sets the text color of all `<p>` elements to blue.

- **Class Selector**: Selects all elements that have the specified class. Class selectors start with a `.`.

    ```css
    .highlight {
        background-color: yellow;
    }
    ```

    The code above sets the background color of all elements with the `highlight` class to yellow.

- **ID Selector**: Selects the single element that has the specified ID. ID selectors start with a `#`.

    ```css
    #header {
        font-size: 24px;
    }
    ```

    The code above sets the font size of the element with the ID `header` to 24 pixels.

- **Attribute Selector**: Selects elements that have a specific attribute.

    ```css
    [type="text"] {
        border: 1px solid #ccc;
    }
    ```

    The code above adds a border to all input fields whose `type` attribute value is `text`.

- **Universal Selector**: Selects all elements.

    ```css
    * {
        margin: 0;
        padding: 0;
    }
    ```

    The code above sets the margin and padding of all elements to 0.

- **Descendant Selector**: Selects descendant elements of a given element.

    ```css
    div p {
        color: red;
    }
    ```

    The code above sets the text color of all `<p>` elements inside a `<div>` element to red.

- **Child Selector**: Selects direct child elements of a given element.

    ```css
    ul > li {
        list-style-type: none;
    }
    ```

    The code above sets the list style of all direct `<li>` children of `<ul>` elements to none.

- **Adjacent Sibling Selector**: Selects the sibling element that immediately follows a given element.

    ```css
    h2 + p {
        margin-top: 0;
    }
    ```

    The code above sets the top margin of all `<p>` elements that immediately follow an `<h2>` element to 0.

- **General Sibling Selector**: Selects all sibling elements that follow a given element.

    ```css
    h2 ~ p {
        color: green;
    }
    ```

    The code above sets the text color of all `<p>` elements that follow an `<h2>` element to green.

#### 2.2.2 CSS Declaration Blocks

A CSS declaration block consists of declarations wrapped in a pair of curly braces `{}`. Each declaration is made up of a property and its corresponding value, with the property and value separated by a colon `:`, and each declaration ending with a semicolon `;`.

- **Basic Syntax**:

    ```css
    selector {
        property: value;
    }
    ```

- **Example**:

    ```css
    .container {
        width: 100%;
        margin: 0 auto;
    }

    p {
        color: darkgray;
        font-size: 16px;
    }
    ```

    The code above sets the width of `.container` class elements to 100% and centers them horizontally, sets the text color of all `<p>` elements to dark gray, and sets the font size to 16 pixels.

#### 2.2.3 CSS Comments

CSS supports single-line and multi-line comments. Comments are used to add notes in CSS code and are not parsed by the browser.

- **Single-line Comment**:

    ```css
    /* This is a single-line comment */
    ```

- **Multi-line Comment**:

    ```css
    /*
     This is a multi-line comment
     that can span multiple lines
    */
    ```

### 2.2.4 CSS Inheritance and Specificity

#### 1. Inheritance

Some CSS properties (such as `color` and `font-family`) are inherited by child elements. If you want certain properties not to be inherited, you can use the `inherit`, `initial`, or `unset` keywords to control this.

- **Example**:

    ```css
    .parent {
        color: blue;
    }

    .child {
        color: inherit; /* child element inherits the parent's color */
    }
    ```

#### 2. Specificity

CSS specificity determines which rule is applied when multiple style rules target the same element. The specificity rules are as follows:

1. **Inline Styles**: Styles defined directly in an element's `style` attribute have the highest specificity.
2. **ID Selectors**: Second-highest specificity.
3. **Class, Attribute, and Pseudo-class Selectors**: Lower specificity than ID selectors but higher than type selectors.
4. **Type Selectors**: Lowest specificity.

- **Example**:

    ```css
    #header {
        color: red; /* ID selector has high specificity */
    }

    .title {
        color: blue; /* class selector has lower specificity than ID selector */
    }

    h1 {
        color: green; /* type selector has the lowest specificity */
    }
    ```

    If an `<h1>` element matches all three of these selectors, its color will be set to red because the ID selector has the highest specificity.

### 2.2 Summary

Selectors and declarations together determine an element's appearance and layout; when troubleshooting style conflicts, I check the matching scope and cascade specificity first.

## References

- [MDN CSS Selectors](https://developer.mozilla.org/en-us/docs/Web/CSS/CSS_selectors)
- [MDN Attribute Selectors](https://developer.mozilla.org/en-us/docs/Web/CSS/Attribute_selectors)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [knowledge](/knowledge.md))