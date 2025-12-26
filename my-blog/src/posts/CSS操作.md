---
title: CSS操作
date: 2025-09-09
tags: ["javascript", "CSS操作"]
excerpt: "CSS操作动态设置样式常用方法"
---

## CSS操作

### `HTML`元素的`style`属性

操作CSS样式最简单的方法，就是使用网页元素节点的`setAttrbute`方法直接操作网页元素的`style`属性。

```html
<div class="box" id="box"></div>
    
<script>
    let box = document.getElementById("box")

    box.setAttribute(
        "style", 
        "width:200px;height:200px;background:red"
    )

</script>

```

网页输出结果

![CSS操作](./../images/CSS操作.png)

查看网页源码

```html
<div class="box" id="box" style="width:200px;height:200px;background:red"></div>
```

使用`setAttribute`方法存在的问题有

1. 会覆盖原有样式

    假设元素已有样式

    ```html
    <div id="box" style="color: white; font-size: 16px;">内容</div>
    ```

    使用setAttribute后

    ```javascript
    let box = document.getElementById("box")

    box.setAttribute(
        "style", 
        "width:200px;height:200px;background:red"
    )
    ```

    结果：原有样式被完全覆盖

    ```html
    <div id="box" style="width:200px;height:200px;background:red;">内容</div>
    ```

2. 不利于维护

   + 样式字符串难以阅读和修改
   + 无法利用CSS的维护优势

3. 性能较差

   每次设置都会触发重绘和回流

### 元素节点的`style`属性

我们可以利用元素节点的`style`属性直接修改元素的CSS样式。

```html
<div class="box" id="box"></div>
    
<script>
    let box = document.getElementById("box")

    box.style.width = "300px"
    box.style.height = "300px"
    box.style.backgroundColor = "red"
</script>
```

被编辑元素的CSS样式

```html
<div class="box" id="box" style="width: 300px; height: 300px; background-color: red;"></div>
```

如果直接利用元素节点的`style`属性修改CSS样式需要使用驼峰命名法，比如`background-color`需要写为`backgroundColor`。

### `cssText`属性

`cssText`是元素`style`对象的一个属性，它允许通过字符串形式一次性设置多个CSS样式，相当于直接操作元素的`style`属性内容。

它的语法特点是使用分号分隔多个CSS声明，格式与普通CSS写法基本相同，不需要使用驼峰命名法（比如可以直接使用`background-color`）。

```html
<div class="box" id="box"></div>

<script>
    let box = document.getElementById("box");

    box.style.cssText = "width:200px;height:200px;background:red;";
</script>
```

被编辑元素的CSS样式

```html
<div class="box" id="box" style="width: 200px; height: 200px; background: red;"></div>
```

1. 使用`cssText`设置元素CSS样式的优点

    一次性设置多个样式，减少代码行数。性能较好，只需要一次DOM操作。语法简单，类似于编写普通CSS

2. 缺点

   会覆盖所有现有内联样式。不利于部分更新，只能全部替换。可读性较差，特别是样式较多时
