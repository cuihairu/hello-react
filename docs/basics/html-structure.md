## 2.1 HTML Structure and Semantic Tags

HTML (HyperText Markup Language) is the standard markup language for building web pages. Understanding the basics of HTML structure and semantic tags is essential for writing clear, maintainable code. HTML provides tags for defining page content, each with its own specific function and meaning.

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

#### 1. `<!DOCTYPE html>`

- Declares the document type, telling the browser this is an HTML5 document.

#### 2. `<html>`

- The root element, containing the entire HTML document.

#### 3. `<head>`

- Holds the document's metadata, such as character encoding, viewport settings, the title, and links to stylesheets.

#### 4. `<body>`

- Holds the actual page content: headings, paragraphs, images, and other elements.

### 2.1.2 Common HTML Tags

#### 1. Structural tags

- **`<header>`**: Defines the header area of a page, typically containing navigation, a logo, or a title.
- **`<nav>`**: Defines the area for navigation links.
- **`<main>`**: Defines the main content area of the document.
- **`<section>`**: Defines a section or area within the document.
- **`<article>`**: Defines a standalone content block.
- **`<footer>`**: Defines the footer area of a page.

#### 2. Text content tags

- **`<h1> - <h6>`**: Defines headings, with `<h1>` the largest and `<h6>` the smallest.
- **`<p>`**: Defines a paragraph.
- **`<span>`**: Defines an inline element, typically used for styling text.
- **`<strong>`**: Defines important text, typically rendered in bold.
- **`<em>`**: Defines emphasized text, typically rendered in italics.

#### 3. Lists and links

- **`<ul>`**: Defines an unordered list.
- **`<ol>`**: Defines an ordered list.
- **`<li>`**: Defines a list item.
- **`<a>`**: Defines a hyperlink for linking to other pages or resources.

#### 4. Media elements

- **`<img>`**: Defines an image.
- **`<audio>`**: Defines audio content.
- **`<video>`**: Defines video content.

#### 5. Forms and inputs

- **`<form>`**: Defines a form for collecting user input.
- **`<input>`**: Defines an input field.
- **`<label>`**: Defines a label for an input field.
- **`<textarea>`**: Defines a multi-line text input field.
- **`<button>`**: Defines a button.

### 2.1.3 Semantic Tags

Semantic tags define not only the structure of content but also its meaning. That makes pages easier to understand and maintain, and it helps with search engine optimization (SEO).

#### 1. Benefits of semantic tags

- **Improved readability**: Code is easier to understand and maintain.
- **SEO**: Search engines can better parse and index page content.
- **Accessibility**: Helps screen readers and other assistive technology understand page content.

#### 2. Common semantic tags

- **`<header>`**: Defines the header area of a page, typically containing the site logo, navigation menu, and other introductory content.
- **`<nav>`**: Defines the navigation link area, helping users move around the site.
- **`<main>`**: Contains the main content area of the page, making the document's core content easy to identify.
- **`<section>`**: Defines a section or area within the document, used to group content.
- **`<article>`**: Defines a standalone content block, such as a news article or blog post.
- **`<aside>`**: Defines content related to the main content but not directly part of it, such as a sidebar.
- **`<footer>`**: Defines the footer area of a page, typically containing copyright info, contact details, and other supplementary content.

### 2.2 Summary

HTML document structure and semantic tags make a page's hierarchy clearer and help assistive technology and search engines understand the content.

## References

- [MDN Introduction to HTML](https://developer.mozilla.org/en-us/docs/Learn/HTML/Introduction_to_HTML)
- [MDN HTML](https://developer.mozilla.org/en-us/docs/Web/HTML)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [knowledge](/knowledge.md))
