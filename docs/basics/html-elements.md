## 2.1.2 Common HTML Elements and Attributes

HTML provides many tags for defining all kinds of page content and structure. Knowing these common elements and attributes helps you create and organize page content more efficiently.

### 2.1.2.1 Structural Elements

#### 1. `<div>`

- **Purpose**: Defines a block-level element, usually used as a container or for layout.
- **Example**:

    ```html
    <div class="container">
        <p>This is a block-level element.</p>
    </div>
    ```

#### 2. `<span>`

- **Purpose**: Defines an inline element, usually used to style text or inline content.
- **Example**:

    ```html
    <p>This is <span style="color: red;">red</span> text.</p>
    ```

### 2.1.2.2 Text Content Elements

#### 1. `<h1> - <h6>`

- **Purpose**: Defines headings, from `<h1>` to `<h6>`, with `<h1>` the largest and `<h6>` the smallest.
- **Example**:

    ```html
    <h1>Main Heading</h1>
    <h2>Subheading</h2>
    ```

#### 2. `<p>`

- **Purpose**: Defines a paragraph.
- **Example**:

    ```html
    <p>This is a paragraph.</p>
    ```

#### 3. `<strong>`

- **Purpose**: Defines important text, typically displayed in bold.
- **Example**:

    ```html
    <p><strong>Important:</strong> Please take note of this notice.</p>
    ```

#### 4. `<em>`

- **Purpose**: Defines emphasized text, typically displayed in italics.
- **Example**:

    ```html
    <p>This is <em>emphasized</em> text.</p>
    ```

### 2.1.2.3 Lists and Links

#### 1. `<ul>` and `<ol>`

- **Purpose**: Define an unordered list (`<ul>`) and an ordered list (`<ol>`).
- **Example**:

    ```html
    <ul>
        <li>Item 1</li>
        <li>Item 2</li>
    </ul>

    <ol>
        <li>First item</li>
        <li>Second item</li>
    </ol>
    ```

#### 2. `<li>`

- **Purpose**: Defines a list item, typically as a child of `<ul>` or `<ol>`.
- **Example**:

    ```html
    <ul>
        <li>First item</li>
        <li>Second item</li>
    </ul>
    ```

#### 3. `<a>`

- **Purpose**: Defines a hyperlink, used to link to other pages or resources.
- **Attributes**:
  - **`href`**: Specifies the target URL of the link.
  - **`target`**: Specifies how the link opens (for example, `_blank` opens it in a new tab).
- **Example**:

    ```html
    <a href="https://example.com" target="_blank">Visit the Example website</a>
    ```

### 2.1.2.4 Media Elements

#### 1. `<img>`

- **Purpose**: Defines an image.
- **Attributes**:
  - **`src`**: The URL of the image file.
  - **`alt`**: Alternative text for the image, used by screen readers.
- **Example**:

    ```html
    <img src="image.jpg" alt="Descriptive text for the image">
    ```

#### 2. `<audio>`

- **Purpose**: Defines audio content.
- **Attributes**:
  - **`src`**: The URL of the audio file.
  - **`controls`**: Shows audio controls (play, pause, etc.).
- **Example**:

    ```html
    <audio src="audio.mp3" controls>
        Your browser does not support the audio element.
    </audio>
    ```

#### 3. `<video>`

- **Purpose**: Defines video content.
- **Attributes**:
  - **`src`**: The URL of the video file.
  - **`controls`**: Shows video controls (play, pause, etc.).
  - **`width`** and **`height`**: Define the width and height of the video.
- **Example**:

    ```html
    <video src="video.mp4" controls width="600" height="400">
        Your browser does not support the video element.
    </video>
    ```

### 2.1.2.5 Forms and Inputs

#### 1. `<form>`

- **Purpose**: Defines a form for collecting user input.
- **Attributes**:
  - **`action`**: The target URL the form submits to.
  - **`method`**: The submission method (for example, `GET` or `POST`).
- **Example**:

    ```html
    <form action="/submit" method="post">
        <!-- Form content -->
    </form>
    ```

#### 2. `<input>`

- **Purpose**: Defines an input field.
- **Attributes**:
  - **`type`**: The type of the input field (for example, `text`, `password`, `email`).
  - **`name`**: The name of the input field, used to identify it.
  - **`value`**: The default value of the input field.
- **Example**:

    ```html
    <input type="text" name="username" placeholder="Enter your username">
    ```

#### 3. `<label>`

- **Purpose**: Defines a label for an input field.
- **Attributes**:
  - **`for`**: Binds to the `id` of a form control.
- **Example**:

    ```html
    <label for="email">Email:</label>
    <input type="email" id="email" name="email">
    ```

#### 4. `<textarea>`

- **Purpose**: Defines a multi-line text input field.
- **Attributes**:
  - **`rows`**: The number of rows in the text area.
  - **`cols`**: The number of columns in the text area.
- **Example**:

    ```html
    <textarea rows="4" cols="50" name="message">Enter your message</textarea>
    ```

#### 5. `<button>`

- **Purpose**: Defines a button.
- **Attributes**:
  - **`type`**: The button type (for example, `button`, `submit`, `reset`).
  - **`name`**: The name of the button.
- **Example**:

    ```html
    <button type="submit">Submit</button>
    ```

### 2.1.2.6 Common Attributes

#### 1. `id`

- **Purpose**: Assigns a unique identifier to an element, used for JavaScript manipulation and CSS styling.
- **Example**:

    ```html
    <div id="main-content">Main content area</div>
    ```

#### 2. `class`

- **Purpose**: Assigns one or more class names to an element, used for CSS styling and JavaScript manipulation.
- **Example**:

    ```html
    <p class="highlight">Highlighted text</p>
    ```

#### 3. `style`

- **Purpose**: Applies inline CSS styles directly to an element.
- **Example**:

    ```html
    <div style="color: blue; font-size: 20px;">Inline styles</div>
    ```

#### 4. `title`

- **Purpose**: Provides extra tooltip information, usually shown on hover.
- **Example**:

    ```html
    <a href="#" title="Click here to learn more">More information</a>
    ```

### 2.2 Summary

Semantic tags and appropriate attributes make document structure clearer and help assistive technology understand page content better.

## References

- [MDN HTML elements](https://developer.mozilla.org/en-us/docs/Web/HTML/Element)

## Related Pages

- [css-box-model-layout](css-box-model-layout.md)
- [html-css-basics](html-css-basics.md)
