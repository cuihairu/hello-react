## 2.3 CSS Box Model and Layout

The CSS box model is the foundation of all webpage layout. Understanding the box model and its layout properties is key to achieving precise page design.

### 2.3.1 CSS Box Model

The CSS box model defines how elements occupy space and how they interact with each other. Every element is considered a rectangular box, composed of the following parts:

1. **Content Area**: Displays the element's actual content, such as text or images. The width and height properties define the size of the content area.

2. **Padding**: The space between the content area and the border. You can set different padding values in each direction (top, right, bottom, left) to increase the inner spacing of the content area.

3. **Border**: Edge lines surrounding the padding and content area. You can set the border's width, style (solid, dashed, etc.), and color.

4. **Margin**: The space between an element and other elements. Margin is used to set the distance between elements.

- **Box model diagram**:

    ```
    +-------------------------+
    |     Margin              |
    | +---------------------+ |
    | |     Border          | |
    | | +---------------+ | |
    | | |   Padding     | | |
    | | | +-----------+ | | |
    | | | |  Content  | | | |
    | | | +-----------+ | | |
    | | +---------------+ | |
    | +---------------------+ |
    +-------------------------+
    ```

- **Example**:

    ```css
    .box {
        width: 200px;
        height: 100px;
        padding: 10px;
        border: 5px solid black;
        margin: 20px;
    }
    ```

    The code above defines a `.box` class. Under the default `content-box`, `width`/`height` describe only the content area; the actual space an element occupies on the page also includes padding and border, while margin does not count toward the element's own size and only determines the gap to adjacent elements. Setting `box-sizing` to `border-box` makes `width`/`height` include the content area, padding, and border.

### 2.3.2 Box Model Box Sizing

In CSS, an element's size can be controlled through different box-sizing calculation methods:

1. **`content-box`** (default): The element's width and height include only the content area. Padding, border, and margin are not included.

    ```css
    .box {
        box-sizing: content-box;
        width: 200px; /* width of the content area */
        padding: 10px;
        border: 5px solid black;
    }
    ```

2. **`border-box`**: The element's width and height include the content area, padding, and border. This makes setting the element's width and height more intuitive, since they encompass all padding and border.

    ```css
    .box {
        box-sizing: border-box;
        width: 200px; /* width including content area, padding, and border */
        padding: 10px;
        border: 5px solid black;
    }
    ```

### 2.3.3 CSS Layout Models

CSS provides several layout models to control element positioning and flow. Common layout models include:

1. **Normal Flow**: Elements are arranged in the document's normal order. Block-level elements are arranged from top to bottom, and inline elements from left to right.

    ```css
    .container {
        width: 100%;
    }

    .block {
        width: 100%;
        background-color: lightgray;
    }
    ```

2. **Float Layout**: Elements can float to the left or right side of their container, causing other elements to wrap around them. Float layout is commonly used to create multi-column layouts.

    ```css
    .left {
        float: left;
        width: 50%;
        background-color: lightblue;
    }

    .right {
        float: right;
        width: 50%;
        background-color: lightcoral;
    }
    ```

3. **Position**: The `position` property controls how an element is positioned. Common position types include:

    - **`static`**: Default value; the element flows in the normal document order.
    - **`relative`**: Relative positioning; the element is offset from its normal position.
    - **`absolute`**: Absolute positioning; the element is positioned relative to its nearest positioned ancestor.
    - **`fixed`**: Fixed positioning; the element is positioned relative to the viewport and does not scroll with the scrollbar.
    - **`sticky`**: Sticky positioning; the element is relatively positioned within a range and becomes fixed in the viewport once that range is exceeded.

    ```css
    .relative {
        position: relative;
        top: 10px;
        left: 10px;
    }

    .absolute {
        position: absolute;
        top: 20px;
        right: 20px;
    }
    ```

4. **Flexbox Layout**: Used to create flexible layout systems. Flexbox is enabled with `display: flex`, allowing child elements of the container to be arranged flexibly along the main axis and cross axis.

    ```css
    .container {
        display: flex;
        justify-content: space-between; /* alignment on the main axis */
        align-items: center; /* alignment on the cross axis */
    }

    .item {
        flex: 1; /* let each item take up available space */
        margin: 5px;
    }
    ```

5. **Grid Layout (CSS Grid Layout)**: Used to create two-dimensional grid layouts. Grid layout is enabled with `display: grid`, allowing the container to be divided into grid areas and controlling the position and size of child elements within the grid.

    ```css
    .grid-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr); /* create a 3-column grid */
        gap: 10px; /* gap between grid items */
    }

    .grid-item {
        background-color: lightgray;
        padding: 10px;
    }
    ```

### 2.3.4 Responsive Design

Responsive design ensures that webpages display well across different screen sizes and devices. Common techniques include:

1. **Media Queries**: Used to apply different styles based on device characteristics, such as screen width.

    ```css
    @media (max-width: 600px) {
        .container {
            flex-direction: column; /* stack vertically on small screens */
        }
    }
    ```

2. **Fluid Layout**: Uses percentage-based widths and heights so that elements can automatically resize according to the screen size.

    ```css
    .container {
        width: 80%; /* set the container width to 80% of the viewport width */
    }
    ```

3. **Viewport Units**: Uses `vw` (viewport width) and `vh` (viewport height) units to define element sizes, which scale according to the viewport size.

    ```css
    .full-height {
        height: 100vh; /* set the height to 100% of the viewport */
    }
    ```

### 2.3 Summary

The CSS box model and layout models determine element size and arrangement; when debugging in practice, I first check the box-sizing calculation and the container's layout rules.

## References

- [MDN CSS Box Model](https://developer.mozilla.org/en-us/docs/Web/CSS/CSS_box_model)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [README](README.md)
- [css-mixins-inheritance](css-mixins-inheritance.md)
- [css-nesting-modular](css-nesting-modular.md)
- [css-preprocessors](css-preprocessors.md)
- [css-sass-less-optimization](css-sass-less-optimization.md)
- [html-elements](html-elements.md)
- [js-control-flow-loops](js-control-flow-loops.md)
- [knowledge](/knowledge.md))