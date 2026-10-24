## 2.3.3 Flexbox and Grid Layout

In modern web layout, Flexbox and Grid are two very powerful and widely used tools. They make building complex layouts simpler and more flexible.

### 2.3.3.1 Flexbox Layout

Flexbox (the flexible box layout) is a one-dimensional layout model for aligning and distributing elements along the main axis and the cross axis. It suits layouts that flow along a single row or column.

#### 1. Enabling Flexbox

To use Flexbox, set `display: flex` or `display: inline-flex` on the container.

```css
.container {
    display: flex;
}
```

#### 2. Main Axis and Cross Axis

- **Main Axis**: The primary direction of the Flexbox layout; defaults to horizontal (`row`).
- **Cross Axis**: The direction perpendicular to the main axis; defaults to vertical (`column`).

#### 3. Flexbox Properties

- **Container properties**:
  - `flex-direction`: Defines the direction of the main axis (`row`, `row-reverse`, `column`, `column-reverse`).
  - `flex-wrap`: Controls whether items wrap onto multiple lines (`nowrap`, `wrap`, `wrap-reverse`).
  - `flex-flow`: Shorthand for `flex-direction` and `flex-wrap`.
  - `justify-content`: Defines alignment along the main axis (`flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `space-evenly`).
  - `align-items`: Defines alignment along the cross axis (`flex-start`, `flex-end`, `center`, `baseline`, `stretch`).
  - `align-content`: Aligns multiple lines of items (`flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `stretch`).
  - `align-self`: Alignment of a single item along the cross axis (`auto`, `flex-start`, `flex-end`, `center`, `baseline`, `stretch`).

- **Item properties**:
  - `flex-grow`: Defines the flex growth ratio of an item.
  - `flex-shrink`: Defines the flex shrink ratio of an item.
  - `flex-basis`: Defines the initial size of an item.
  - `flex`: Shorthand for `flex-grow`, `flex-shrink`, and `flex-basis`.
  - `align-self`: Overrides the container's `align-items` for this item.

#### 4. Example

```html
<div class="container">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
</div>
```

```css
.container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100vh;
}

.item {
    background-color: lightblue;
    padding: 10px;
    margin: 5px;
}
```

In this example, the items in `.container` are evenly distributed along the main axis and centered along the cross axis.

### 2.3.3.2 Grid Layout

Grid is a two-dimensional layout model that lets you create complex layouts across rows and columns. It suits layouts that need control in both dimensions.

#### 1. Enabling Grid

To use Grid, set `display: grid` on the container.

```css
.container {
    display: grid;
}
```

#### 2. Grid Properties

- **Container properties**:
  - `grid-template-rows`: Defines the size of rows (e.g. `100px 200px`).
  - `grid-template-columns`: Defines the size of columns (e.g. `1fr 2fr`).
  - `grid-template-areas`: Defines named regions used for the layout.
  - `grid-column-gap` and `grid-row-gap`: Define the column gap and row gap.
  - `grid-gap`: Shorthand for `grid-column-gap` and `grid-row-gap`.
  - `justify-items`: Defines alignment of items within their column (`start`, `end`, `center`, `stretch`).
  - `align-items`: Defines alignment of items within their row (`start`, `end`, `center`, `stretch`).
  - `justify-content`: Defines the main-axis alignment of the grid container (`start`, `end`, `center`, `space-between`, `space-around`, `space-evenly`).
  - `align-content`: Defines the cross-axis alignment of the grid container (`start`, `end`, `center`, `space-between`, `space-around`, `stretch`).

- **Item properties**:
  - `grid-column`: Defines the column span of an item.
  - `grid-row`: Defines the row span of an item.
  - `grid-area`: Defines the item's region (a region name declared in `grid-template-areas`).
  - `justify-self`: Defines the item's alignment within its column (`start`, `end`, `center`, `stretch`).
  - `align-self`: Defines the item's alignment within its row (`start`, `end`, `center`, `stretch`).

#### 3. Example

```html
<div class="grid-container">
    <div class="grid-item">1</div>
    <div class="grid-item">2</div>
    <div class="grid-item">3</div>
    <div class="grid-item">4</div>
</div>
```

```css
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
}

.grid-item {
    background-color: lightgreen;
    padding: 10px;
}
```

In this example, `.grid-container` uses a three-column grid, and each grid item has equal width and spacing.

### 2.3 Summary

Flexbox and Grid give frontend development powerful, flexible layout options. Flexbox works best for one-dimensional layouts (a row or a column), while Grid handles two-dimensional layouts (rows and columns). Used together, they cover a lot of complex responsive layout needs.

## References

- [MDN Flexible Box Layout](https://developer.mozilla.org/en-us/docs/Web/CSS/CSS_flexible_box_layout)
- [MDN Grid Layout](https://developer.mozilla.org/en-us/docs/Web/CSS/CSS_grid_layout)

<!-- BACKLINKS-AUTO -->
## Related Pages

- [knowledge](/knowledge.md))
