##  变量与嵌套规则

CSS 变量和嵌套规则是 CSS 预处理器中的核心功能，它们使得 CSS 编写更加灵活、结构化和可维护。尽管标准 CSS 支持变量（CSS Custom Properties），但预处理器如 LESS 和 SASS 提供了更丰富的功能来增强样式表的可维护性。

### 3.2.1 变量

#### **1. CSS 变量（Custom Properties）**

CSS 自定义属性（Custom Properties）是 CSS 变量的标准实现，允许在 CSS 中定义和使用变量。CSS 变量可以动态改变，适用于 CSS 级别的样式调整。

**定义和使用 CSS 变量**

```css
:root {
    --main-bg-color: #4CAF50;
    --main-text-color: white;
}

.container {
    background-color: var(--main-bg-color);
    color: var(--main-text-color);
}
```

- `:root` 伪类选择器用于定义全局变量。
- `var(--main-bg-color)` 用于引用变量的值。

**优点：**
- 动态变化：CSS 变量可以在运行时通过 JavaScript 动态修改。
- 层叠性：CSS 变量支持层叠和继承，可以在子元素中覆盖父元素的变量值。

#### **2. LESS 变量**

LESS 是一种 CSS 预处理器，支持定义变量来存储常用的值。LESS 变量以 `@` 符号开头。

**定义和使用 LESS 变量**

```less
@primary-color: #4CAF50;
@font-size: 16px;

.header {
    color: @primary-color;
    font-size: @font-size;
}
```

- 变量 `@primary-color` 和 `@font-size` 存储了颜色和字体大小值。
- 变量被用于 `color` 和 `font-size` 属性。

#### **3. SASS 变量**

SASS 是另一种 CSS 预处理器，支持类似 LESS 的变量定义。SASS 变量以 `$` 符号开头。

**定义和使用 SASS 变量**

```scss
$primary-color: #4CAF50;
$font-size: 16px;

.header {
    color: $primary-color;
    font-size: $font-size;
}
```

- 变量 `$primary-color` 和 `$font-size` 存储了颜色和字体大小值。
- 变量被用于 `color` 和 `font-size` 属性。

**优点：**
- 在 SASS 中，变量可以嵌套使用，提供更大的灵活性。

### 3.2.2 嵌套规则

#### **1. CSS 嵌套**

标准 CSS 不支持嵌套规则，但可以通过 CSS 预处理器来实现。嵌套规则使得 CSS 代码更加符合 HTML 结构，提升了代码的可读性和维护性。

#### **2. LESS 嵌套规则**

LESS 支持嵌套规则，使样式表结构更符合 HTML 结构。

**示例**

```less
.nav {
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    
    li {
        display: inline;
        margin-right: 10px;
    }
}
```

- `.nav` 下的 `ul` 和 `li` 规则被嵌套在 `.nav` 内部，展示了层级关系。

#### **3. SASS 嵌套规则**

SASS 也支持嵌套规则，语法类似于 LESS，但支持更复杂的嵌套和选择器。

**示例**

```scss
.nav {
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    
    li {
        display: inline;
        margin-right: 10px;
    }
}
```

- `.nav` 下的 `ul` 和 `li` 规则被嵌套在 `.nav` 内部，展现了层级关系。

**优点：**
- 结构清晰：嵌套规则使样式与 HTML 结构一致，代码更具层次感。
- 代码重用：可以通过嵌套的方式避免重复的选择器，减少冗余代码。

### 3.2.3 使用变量和嵌套规则的最佳实践

- **变量命名**：使用有意义的名称来定义变量，确保其用途清晰明了。
- **嵌套深度**：避免过深的嵌套，通常建议嵌套不超过 3 层，以保持代码的可读性。
- **模块化**：将样式分成多个文件，通过引入或导入的方式管理，提升代码的组织性和可维护性。

### 3.2.4 总结

CSS 变量和嵌套规则是提升样式表管理和维护的重要工具。CSS 变量支持动态样式调整，而预处理器如 LESS 和 SASS 提供了丰富的功能来增强 CSS 的表达能力和组织性。掌握这些技术，将帮助你编写更高效、易于维护的 CSS 代码。
