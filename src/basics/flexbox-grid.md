## 2.3.3 Flexbox 与 Grid 布局

在现代网页布局中，Flexbox 和 Grid 布局是两个非常强大且广泛使用的工具。它们使得创建复杂布局变得更加简单和灵活。

### 2.3.3.1 Flexbox 布局

Flexbox（弹性盒布局）是一种一维布局模型，用于在主轴和交叉轴上对元素进行对齐和分布。适用于需要在一行或一列上进行布局的场景。

#### **1. 启用 Flexbox**

要使用 Flexbox 布局，需要在容器上设置 `display: flex` 或 `display: inline-flex`。

```css
.container {
    display: flex;
}
```

#### **2. 主轴和交叉轴**

- **主轴（Main Axis）**：Flexbox 布局的主方向，默认是水平（`row`）。
- **交叉轴（Cross Axis）**：与主轴垂直的方向，默认是垂直（`column`）。

#### **3. Flexbox 属性**

- **容器属性**：
  - `flex-direction`：定义主轴方向（`row`、`row-reverse`、`column`、`column-reverse`）。
  - `flex-wrap`：控制项目是否换行（`nowrap`、`wrap`、`wrap-reverse`）。
  - `flex-flow`：`flex-direction` 和 `flex-wrap` 的简写。
  - `justify-content`：定义主轴上的对齐方式（`flex-start`、`flex-end`、`center`、`space-between`、`space-around`、`space-evenly`）。
  - `align-items`：定义交叉轴上的对齐方式（`flex-start`、`flex-end`、`center`、`baseline`、`stretch`）。
  - `align-content`：对齐多行项目（`flex-start`、`flex-end`、`center`、`space-between`、`space-around`、`stretch`）。
  - `align-self`：单个项目在交叉轴上的对齐方式（`auto`、`flex-start`、`flex-end`、`center`、`baseline`、`stretch`）。

- **项目属性**：
  - `flex-grow`：定义项目的放大比例。
  - `flex-shrink`：定义项目的缩小比例。
  - `flex-basis`：定义项目的初始大小。
  - `flex`：`flex-grow`、`flex-shrink` 和 `flex-basis` 的简写。
  - `align-self`：覆盖容器的 `align-items` 对齐方式。

#### **4. 示例**

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

在这个示例中，`.container` 容器中的项目会在主轴上均匀分布，并在交叉轴上居中对齐。

### 2.3.3.2 Grid 布局

Grid 布局是一种二维布局模型，允许在行和列上创建复杂的布局。适用于需要在两个维度上进行布局的场景。

#### **1. 启用 Grid 布局**

要使用 Grid 布局，需要在容器上设置 `display: grid`。

```css
.container {
    display: grid;
}
```

#### **2. Grid 布局属性**

- **容器属性**：
  - `grid-template-rows`：定义行的大小（如 `100px 200px`）。
  - `grid-template-columns`：定义列的大小（如 `1fr 2fr`）。
  - `grid-template-areas`：定义区域名称，用于布局的区域。
  - `grid-column-gap` 和 `grid-row-gap`：定义列间距和行间距。
  - `grid-gap`：`grid-column-gap` 和 `grid-row-gap` 的简写。
  - `justify-items`：定义项目在列内的对齐方式（`start`、`end`、`center`、`stretch`）。
  - `align-items`：定义项目在行内的对齐方式（`start`、`end`、`center`、`stretch`）。
  - `justify-content`：定义网格容器的主轴对齐方式（`start`、`end`、`center`、`space-between`、`space-around`、`space-evenly`）。
  - `align-content`：定义网格容器的交叉轴对齐方式（`start`、`end`、`center`、`space-between`、`space-around`、`stretch`）。

- **项目属性**：
  - `grid-column`：定义项目在列上的跨度。
  - `grid-row`：定义项目在行上的跨度。
  - `grid-area`：定义项目的区域（`grid-template-areas` 中定义的区域名）。
  - `justify-self`：定义项目在列内的对齐方式（`start`、`end`、`center`、`stretch`）。
  - `align-self`：定义项目在行内的对齐方式（`start`、`end`、`center`、`stretch`）。

#### **3. 示例**

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

在这个示例中，`.grid-container` 使用三列的网格布局，每个网格项都具有相等的宽度和间距。

### 2.3 总结

Flexbox 和 Grid 布局为前端开发提供了强大且灵活的布局选项。Flexbox 适用于一维布局（行或列），而 Grid 布局适用于二维布局（行和列）。掌握这两种布局方式将使你能够创建复杂且响应式的网页设计。
