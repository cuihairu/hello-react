# HTML 与 CSS 基础

在前端开发中，HTML 和 CSS 是构建网页和应用的基础技术。HTML 提供了网页的结构和内容，而 CSS 用于设计和布局。理解 HTML 和 CSS 的基本概念是成为优秀前端开发者的第一步。本章将介绍 HTML 和 CSS 的基础知识，帮助您建立扎实的前端基础。

## 2.1 HTML 的结构与语义化标签

HTML（HyperText Markup Language）是用于创建网页的标记语言。它通过标签来定义网页的结构和内容。

### 2.1.1 HTML 文档结构

一个基本的 HTML 文档结构如下：

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

### 2.1.2 常用 HTML 标签

- **`<div>`**: 用于定义一个块级元素。
- **`<span>`**: 用于定义一个内联元素。
- **`<h1> - <h6>`**: 定义标题，`<h1>` 是最大标题，`<h6>` 是最小标题。
- **`<p>`**: 定义段落。
- **`<a>`**: 定义超链接。
- **`<img>`**: 定义图像。
- **`<ul>`** 和 **`<ol>`**: 定义无序列表和有序列表。
- **`<table>`**: 定义表格。
- **`<form>`**: 定义表单。

### 2.1.3 语义化标签

语义化标签可以提高网页的可读性和 SEO 优化。例如：

- **`<header>`**: 定义网页头部区域。
- **`<nav>`**: 定义导航菜单。
- **`<main>`**: 定义文档的主要内容区域。
- **`<section>`**: 定义文档中的节或区域。
- **`<article>`**: 定义独立的内容区块。
- **`<footer>`**: 定义网页底部区域。

## 2.2 CSS 的基本语法与选择器

CSS（Cascading Style Sheets）是用于控制网页样式和布局的语言。CSS 通过选择器来应用样式到 HTML 元素。

### 2.2.1 CSS 语法

CSS 规则的基本语法如下：

```css
selector {
    property: value;
}
```

- **selector**: 选择器，用于指定要应用样式的 HTML 元素。
- **property**: 属性，定义要设置的样式。
- **value**: 值，定义属性的具体样式。

### 2.2.2 常用 CSS 属性

- **`color`**: 文字颜色。
- **`background-color`**: 背景颜色。
- **`font-size`**: 字体大小。
- **`font-family`**: 字体系列。
- **`margin`**: 外边距。
- **`padding`**: 内边距。
- **`border`**: 边框。
- **`width`** 和 **`height`**: 宽度和高度。
- **`display`**: 显示类型（如 `block`, `inline`, `flex`）。

### 2.2.3 CSS 选择器

- **类型选择器**: 选择特定类型的元素。例如，`p` 选择所有段落元素。
- **类选择器**: 选择具有特定类的元素。例如，`.my-class` 选择所有类为 `my-class` 的元素。
- **ID 选择器**: 选择具有特定 ID 的元素。例如，`#my-id` 选择 ID 为 `my-id` 的元素。
- **属性选择器**: 根据元素属性选择元素。例如，`[type="text"]` 选择所有 `type` 属性为 `text` 的输入框。
- **伪类选择器**: 选择某种状态的元素。例如，`:hover` 选择鼠标悬停的元素。

### 2.2.4 CSS 盒模型与布局

CSS 盒模型描述了元素的布局和大小，包括内容区域、内边距、边框和外边距。

- **内容区域**: 元素的实际内容。
- **内边距（padding）**: 内容与边框之间的空间。
- **边框（border）**: 环绕在内边距和外边距之间的线。
- **外边距（margin）**: 元素与其他元素之间的空间。

#### 2.2.5 Flexbox 与 Grid 布局

- **Flexbox**: 用于创建一维布局，适合处理水平和垂直对齐。
- **Grid**: 用于创建二维布局，能够处理复杂的网格布局。

### 2.3 响应式设计与媒体查询

响应式设计是为了使网页在不同设备和屏幕尺寸下都能良好显示。媒体查询用于根据设备的不同特性（如屏幕宽度）应用不同的样式。

#### 2.3.1 媒体查询示例

```css
/* 默认样式 */
body {
    font-size: 16px;
}

/* 针对屏幕宽度小于 600px 的设备 */
@media (max-width: 600px) {
    body {
        font-size: 14px;
    }
}
```

在上述示例中，媒体查询调整了屏幕宽度小于 600px 的设备上的字体大小。

### 3. 总结

掌握 HTML 和 CSS 的基础知识是前端开发的第一步。HTML 提供了网页的结构，而 CSS 控制了网页的外观和布局。了解 HTML 标签、CSS 语法、选择器、布局模型和响应式设计，将帮助您创建功能强大且视觉吸引人的网页。

