## 2.3 CSS 盒模型与布局

CSS 盒模型是所有网页布局的基础概念。了解盒模型及其布局特性是实现精确页面设计的关键。

### 2.3.1 CSS 盒模型

CSS 盒模型定义了网页元素如何占据空间以及如何与其他元素相互作用。每个元素都被认为是一个矩形盒子，这些盒子由以下部分组成：

1. **内容区（Content Area）**：显示元素的实际内容，如文本或图像。宽度和高度属性定义了内容区的大小。

2. **内边距（Padding）**：内容区与边框之间的空间。可以设置不同方向的内边距（上、右、下、左），用来增加内容区的内边距。

3. **边框（Border）**：围绕内边距和内容区的边缘线条。可以设置边框的宽度、样式（如实线、虚线）和颜色。

4. **外边距（Margin）**：元素与其他元素之间的空间。外边距用于设置元素之间的距离。

- **盒模型示意图**:

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

- **示例**:

    ```css
    .box {
        width: 200px;
        height: 100px;
        padding: 10px;
        border: 5px solid black;
        margin: 20px;
    }
    ```

    以上代码定义了一个 `.box` 类，元素的总宽度和高度会包括内边距、边框和外边距。

### 2.3.2 盒模型的盒子尺寸

在 CSS 中，元素的尺寸可以通过不同的盒模型计算方式来控制：

1. **`content-box`**（默认值）：元素的宽度和高度只包括内容区域。内边距、边框和外边距不会被计算在内。

    ```css
    .box {
        box-sizing: content-box;
        width: 200px; /* 内容区域的宽度 */
        padding: 10px;
        border: 5px solid black;
    }
    ```

2. **`border-box`**：元素的宽度和高度包括内容区域、内边距和边框。这样，设置元素的宽度和高度时会更直观，因为它们包括了所有的内边距和边框。

    ```css
    .box {
        box-sizing: border-box;
        width: 200px; /* 包含内容区域、内边距和边框的宽度 */
        padding: 10px;
        border: 5px solid black;
    }
    ```

### 2.3.3 CSS 布局模型

CSS 提供了多种布局模型来控制元素的位置和排版。常见的布局模型包括：

1. **标准流（Normal Flow）**：元素按照文档的正常顺序排列。块级元素会从上到下排列，行内元素会从左到右排列。

    ```css
    .container {
        width: 100%;
    }

    .block {
        width: 100%;
        background-color: lightgray;
    }
    ```

2. **浮动布局（Float）**：元素可以漂浮到其容器的左侧或右侧，使其他元素环绕在其周围。浮动布局常用于创建多列布局。

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

3. **定位（Position）**：通过 `position` 属性控制元素的定位方式。常用的定位类型包括：

    - **`static`**：默认值，元素按照正常文档流排列。
    - **`relative`**：相对定位，元素相对于其正常位置进行偏移。
    - **`absolute`**：绝对定位，元素相对于最近的定位祖先元素进行定位。
    - **`fixed`**：固定定位，元素相对于视口进行定位，不随滚动条滚动。
    - **`sticky`**：粘性定位，元素在一定范围内相对定位，超过范围后固定在视口中。

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

4. **Flexbox 布局（Flexible Box Layout）**：用于创建灵活的布局系统。通过 `display: flex` 启用 Flexbox 布局，使容器的子元素能够在主轴和交叉轴上灵活排列。

    ```css
    .container {
        display: flex;
        justify-content: space-between; /* 主轴上的对齐方式 */
        align-items: center; /* 交叉轴上的对齐方式 */
    }

    .item {
        flex: 1; /* 使每个项占据可用空间 */
        margin: 5px;
    }
    ```

5. **Grid 布局（CSS Grid Layout）**：用于创建二维网格布局。通过 `display: grid` 启用 Grid 布局，使容器能够划分成网格区域，并控制子元素在网格中的位置和尺寸。

    ```css
    .grid-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr); /* 创建 3 列的网格 */
        gap: 10px; /* 网格项之间的间距 */
    }

    .grid-item {
        background-color: lightgray;
        padding: 10px;
    }
    ```

### 2.3.4 响应式设计

响应式设计确保网页在不同屏幕尺寸和设备上都能良好显示。常用的技术包括：

1. **媒体查询（Media Queries）**：用于根据设备的特性（如屏幕宽度）应用不同的样式。

    ```css
    @media (max-width: 600px) {
        .container {
            flex-direction: column; /* 小屏幕上垂直排列 */
        }
    }
    ```

2. **流式布局（Fluid Layout）**：使用百分比宽度和高度使元素能够根据屏幕尺寸自动调整大小。

    ```css
    .container {
        width: 80%; /* 设定容器宽度为视口宽度的 80% */
    }
    ```

3. **视口单位（Viewport Units）**：使用 `vw`（视口宽度）、`vh`（视口高度）单位来定义元素的大小，使其根据视口尺寸调整。

    ```css
    .full-height {
        height: 100vh; /* 设定高度为视口的 100% */
    }
    ```

### 2.3 总结

掌握 CSS 盒模型及布局模型是前端开发的基础，可以帮助你创建灵活且美观的网页布局。理解盒模型的组成部分和布局技巧将大大提升你在实际开发中的效率和精确度。
