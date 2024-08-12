##  CSS 预处理器：LESS 与 SASS

CSS 预处理器是扩展 CSS 的工具，它们引入了变量、混合宏、嵌套规则等功能，使 CSS 编写更加灵活和模块化。LESS 和 SASS 是最常用的两种 CSS 预处理器，它们提供了丰富的功能来优化和组织样式代码。

### 3.1.1 LESS

LESS 是一种动态样式表语言，通过引入变量、嵌套规则和混合宏等功能，增强了 CSS 的表达能力。LESS 文件的扩展名为 `.less`，它可以被编译成标准的 CSS 文件。

#### **1. 变量**

LESS 允许定义变量，以便在样式表中重复使用相同的值。例如，定义颜色变量可以让你更方便地进行全局样式调整。

```less
// 定义变量
@primary-color: #4CAF50;
@font-size: 16px;

// 使用变量
.header {
    color: @primary-color;
    font-size: @font-size;
}
```

#### **2. 嵌套规则**

LESS 支持嵌套规则，使得 CSS 结构更符合 HTML 结构。嵌套规则提高了 CSS 的可读性和组织性。

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

#### **3. 混合宏**

LESS 的混合宏（mixins）允许你定义可重用的样式块，可以接受参数以生成不同的样式。

```less
// 定义混合宏
.border-radius(@radius: 5px) {
    border-radius: @radius;
}

// 使用混合宏
.box {
    .border-radius(10px);
}
```

### 3.1.2 SASS

SASS（Syntactically Awesome Style Sheets）是一种功能强大的 CSS 预处理器，它有两种语法：缩进式（.sass）和 SCSS（.scss）。SCSS 语法更接近 CSS 语法，并且被广泛使用。

#### **1. 变量**

SASS 允许你定义变量，以便在样式表中重复使用。变量以 `$` 符号开头。

```scss
// 定义变量
$primary-color: #4CAF50;
$font-size: 16px;

// 使用变量
.header {
    color: $primary-color;
    font-size: $font-size;
}
```

#### **2. 嵌套规则**

SASS 支持嵌套规则，与 LESS 类似，通过将选择器嵌套在其他选择器中，使 CSS 更加层次化和可读。

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

#### **3. 混合宏**

SASS 的混合宏（mixins）允许你定义可重用的样式块，并接受参数进行定制。

```scss
// 定义混合宏
@mixin border-radius($radius: 5px) {
    border-radius: $radius;
}

// 使用混合宏
.box {
    @include border-radius(10px);
}
```

#### **4. 继承**

SASS 支持继承功能，使一个选择器可以继承另一个选择器的样式，从而避免重复代码。

```scss
// 定义基础样式
.button {
    background-color: #4CAF50;
    color: white;
}

// 继承基础样式
.primary-button {
    @extend .button;
    font-size: 16px;
}
```

### 3.1.3 LESS 与 SASS 的对比

- **语法**：LESS 使用 `.less` 扩展名，支持简洁的语法；SASS 使用 `.scss` 扩展名，语法接近 CSS，更容易上手。
- **功能**：两者都支持变量、嵌套规则和混合宏，但 SASS 提供更多的功能，如继承和嵌套的深度控制。
- **社区支持**：SASS 拥有更大的社区和生态系统，支持更多的插件和工具。

### 3.1.4 选择预处理器

- **LESS**：适合简单的样式表和快速上手，尤其是在项目中需要使用 LESS 的时候。
- **SASS**：适合复杂的样式表和大型项目，提供了更多的功能和更强大的生态支持。

### 3.1.5 安装与配置

#### **1. 安装 LESS**

```bash
npm install -g less
```

#### **2. 安装 SASS**

```bash
npm install -g sass
```

#### **3. 编译 LESS 和 SASS**

- 编译 LESS：
    ```bash
    lessc styles.less styles.css
    ```

- 编译 SASS：
    ```bash
    sass styles.scss styles.css
    ```

### 3.1.6 总结

LESS 和 SASS 是强大的 CSS 预处理器，通过提供变量、混合宏、嵌套规则等功能，使 CSS 编写更加高效和模块化。根据项目的需求和团队的熟悉程度选择合适的预处理器，可以大大提高样式开发的效率和维护性。