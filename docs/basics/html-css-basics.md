# HTML and CSS Basics

In frontend development, HTML and CSS are the foundational technologies for building web pages and applications. HTML provides the structure and content of a page, while CSS handles design and layout. HTML is responsible for document structure and CSS for appearance and layout; here I record how the two commonly work together in page development.

## 2.1 HTML Structure and Semantic Tags

HTML (HyperText Markup Language) is the markup language used to create web pages. It defines page structure and content through tags.

### 2.1.1 HTML Document Structure

A basic HTML document looks like this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document Title</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Main Heading</h1>
    </header>
    <nav>
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
    </nav>
    <main>
        <section>
            <h2>Section Title</h2>
            <p>This is a paragraph of text.</p>
        </section>
    </main>
    <footer>
        <p>&copy; 2024 Your Company</p>
    </footer>
</body>
</html>
```

### 2.1.2 Common HTML Tags

- **`<div>`**: Defines a block-level element.
- **`<span>`**: Defines an inline element.
- **`<h1> - <h6>`**: Defines headings; `<h1>` is the largest and `<h6>` the smallest.
- **`<p>`**: Defines a paragraph.
- **`<a>`**: Defines a hyperlink.
- **`<img>`**: Defines an image.
- **`<ul>`** and **`<ol>`**: Define unordered and ordered lists.
- **`<table>`**: Defines a table.
- **`<form>`**: Defines a form.

### 2.1.3 Semantic Tags

Semantic tags improve readability and SEO. For example:

- **`<header>`**: Defines the header area of a page.
- **`<nav>`**: Defines a navigation menu.
- **`<main>`**: Defines the main content area of the document.
- **`<section>`**: Defines a section or area within the document.
- **`<article>`**: Defines a standalone content block.
- **`<footer>`**: Defines the footer area of a page.

## 2.2 Basic CSS Syntax and Selectors

CSS (Cascading Style Sheets) is the language used to control web styling and layout. CSS applies styles to HTML elements through selectors.

### 2.2.1 CSS Syntax

The basic syntax of a CSS rule is:

```css
selector {
    property: value;
}
```

- **selector**: The selector, which specifies the HTML element(s) the style should apply to.
- **property**: The property, defining which style to set.
- **value**: The value, defining the specific style for the property.

### 2.2.2 Common CSS Properties

- **`color`**: Text color.
- **`background-color`**: Background color.
- **`font-size`**: Font size.
- **`font-family`**: Font family.
- **`margin`**: Outer margin.
- **`padding`**: Inner padding.
- **`border`**: Border.
- **`width`** and **`height`**: Width and height.
- **`display`**: Display type (e.g. `block`, `inline`, `flex`).

### 2.2.3 CSS Selectors

- **Type selectors**: Select elements of a specific type. For example, `p` selects all paragraph elements.
- **Class selectors**: Select elements with a specific class. For example, `.my-class` selects all elements whose class is `my-class`.
- **ID selectors**: Select an element with a specific ID. For example, `#my-id` selects the element whose ID is `my-id`.
- **Attribute selectors**: Select elements based on their attributes. For example, `[type="text"]` selects all inputs whose `type` attribute is `text`.
- **Pseudo-class selectors**: Select elements in a particular state. For example, `:hover` selects the element the mouse is hovering over.

### 2.2.4 The CSS Box Model and Layout

The CSS box model describes an element's layout and size: content area, padding, border, and margin.

- **Content area**: The element's actual content.
- **Padding**: The space between the content and the border.
- **Border**: The line surrounding the padding, between the padding and the margin.
- **Margin**: The space between the element and other elements.

#### 2.2.5 Flexbox and Grid Layout

- **Flexbox**: For creating one-dimensional layouts, ideal for horizontal and vertical alignment.
- **Grid**: For creating two-dimensional layouts, able to handle complex grid arrangements.

### 2.3 Responsive Design and Media Queries

Responsive design makes sure a page displays well on different devices and screen sizes. Media queries apply different styles based on device characteristics such as screen width.

#### 2.3.1 Media Query Example

```css
/* Default styles */
body {
    font-size: 16px;
}

/* For devices with a screen width under 600px */
@media (max-width: 600px) {
    body {
        font-size: 14px;
    }
}
```

In the example above, the media query adjusts the font size on devices with a screen width under 600px.

### 3. Summary

HTML provides page structure and CSS controls appearance and layout. Semantic tags, selectors, layout models, and responsive rules together determine how a page renders across different environments.

## References

- [MDN Getting started with the Web](https://developer.mozilla.org/en-us/docs/Learn/Getting_started_with_the_web)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [html-elements](html-elements.md)
- [README](README.md)
