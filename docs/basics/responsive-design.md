## 2.3.4 Responsive Design and Media Queries

Responsive design is an important part of modern web design — it lets pages display well across devices and screen sizes. Media queries are one of the core tools for responsive design, applying different CSS styles based on device characteristics such as screen width, height, and resolution.

### 2.3.4.1 Principles of Responsive Design

Responsive design aims to optimize the user experience in the following ways:

1. **Fluid layouts**: Use percentage widths instead of fixed pixel widths so the layout adjusts automatically to screen size.
2. **Flexible media**: Ensure media elements such as images and videos adapt to the width of their container.
3. **Media queries**: Apply different CSS rules for different device characteristics to get finer control over layout.

### 2.3.4.2 Media Query Syntax

Media queries let you define style rules that only apply when specific conditions are met. The basic syntax is:

```css
@media [media type] and ([feature] [operator] [value]) {
    /* CSS rules */
}
```

- **Media type**: Can be `all` (all devices), `print` (printing devices), `screen` (screen devices), and so on.
- **Feature**: Describes a device characteristic such as `width`, `height`, or `orientation`.
- **Operator**: Common operators are `min-` and `max-`, used to set minimum and maximum values.

#### 1. Basic Example

```css
/* Applied on devices with a screen width of 600px or less */
@media screen and (max-width: 600px) {
    .container {
        padding: 10px;
    }
}
```

In this example, when the screen width is 600px or less, the padding of `.container` is set to 10px.

#### 2. Multiple Media Queries

You can use several media queries to cover different device characteristics:

```css
/* For small devices (such as phones) */
@media screen and (max-width: 600px) {
    .header {
        font-size: 14px;
    }
}

/* For medium devices (such as tablets) */
@media screen and (min-width: 601px) and (max-width: 900px) {
    .header {
        font-size: 18px;
    }
}

/* For large devices (such as desktop monitors) */
@media screen and (min-width: 901px) {
    .header {
        font-size: 22px;
    }
}
```

In this example, the font size of `.header` adjusts based on screen width.

### 2.3.4.3 Media Features and Operators

Common media features and operators include:

- **`width` and `height`**: Define the viewport width and height.
- **`min-width` and `max-width`**: Set the minimum and maximum viewport width.
- **`min-height` and `max-height`**: Set the minimum and maximum viewport height.
- **`orientation`**: Detect the device orientation (`portrait` is vertical, `landscape` is horizontal).
- **`resolution`**: Defines the device resolution (for example, in `dpi` or `dpcm`).

#### Example: Adjusting styles by device resolution

```css
/* For high-resolution devices */
@media screen and (min-resolution: 192dpi) {
    .high-res-image {
        background-image: url('high-res-image.png');
    }
}
```

In this example, `.high-res-image` gets a high-resolution background image only on devices with a resolution of 192 dpi or more.

### 2.3.4.4 Best Practices for Responsive Design

1. **Mobile first**: Start designing from small screens and add styles progressively for larger ones.
2. **Flexible layouts**: Use percentages, `flexbox`, and `grid` to build fluid layouts.
3. **Image optimization**: Use responsive image techniques (such as the `srcset` and `sizes` attributes) to load images suited to the device resolution.
4. **Testing**: Test the design on various devices and browsers to make sure it behaves well in different environments.

### 2.3 Summary

Responsive design and media queries are essential tools for building pages that adapt to different devices and screen sizes. Media queries need to be paired with real breakpoints and content layout adjustments; I check overflow, wrapping, and tap target areas on narrow screens first.

## References

- [MDN Responsive Design and Media Queries](https://developer.mozilla.org/en-us/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [MDN @media](https://developer.mozilla.org/en-us/docs/Web/CSS/@media)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [knowledge](/knowledge.md))
