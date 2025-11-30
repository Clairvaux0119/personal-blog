const r=`---\r
title: CSS操作\r
date: 2025-09-09\r
tags: ["javascript", "CSS操作"]\r
excerpt: "CSS操作动态设置样式常用方法"\r
---\r
\r
## CSS操作\r
\r
### \`HTML\`元素的\`style\`属性\r
\r
操作CSS样式最简单的方法，就是使用网页元素节点的\`setAttrbute\`方法直接操作网页元素的\`style\`属性。\r
\r
\`\`\`html\r
<div class="box" id="box"></div>\r
    \r
<script>\r
    let box = document.getElementById("box")\r
\r
    box.setAttribute(\r
        "style", \r
        "width:200px;height:200px;background:red"\r
    )\r
\r
<\/script>\r
\r
\`\`\`\r
\r
网页输出结果\r
\r
![CSS操作](./../images/CSS操作.png)\r
\r
查看网页源码\r
\r
\`\`\`html\r
<div class="box" id="box" style="width:200px;height:200px;background:red"></div>\r
\`\`\`\r
\r
使用\`setAttribute\`方法存在的问题有\r
\r
1. 会覆盖原有样式\r
\r
    假设元素已有样式\r
\r
    \`\`\`html\r
    <div id="box" style="color: white; font-size: 16px;">内容</div>\r
    \`\`\`\r
\r
    使用setAttribute后\r
\r
    \`\`\`javascript\r
    let box = document.getElementById("box")\r
\r
    box.setAttribute(\r
        "style", \r
        "width:200px;height:200px;background:red"\r
    )\r
    \`\`\`\r
\r
    结果：原有样式被完全覆盖\r
\r
    \`\`\`html\r
    <div id="box" style="width:200px;height:200px;background:red;">内容</div>\r
    \`\`\`\r
\r
2. 不利于维护\r
\r
   + 样式字符串难以阅读和修改\r
   + 无法利用CSS的维护优势\r
\r
3. 性能较差\r
\r
   每次设置都会触发重绘和回流\r
\r
### 元素节点的\`style\`属性\r
\r
我们可以利用元素节点的\`style\`属性直接修改元素的CSS样式。\r
\r
\`\`\`html\r
<div class="box" id="box"></div>\r
    \r
<script>\r
    let box = document.getElementById("box")\r
\r
    box.style.width = "300px"\r
    box.style.height = "300px"\r
    box.style.backgroundColor = "red"\r
<\/script>\r
\`\`\`\r
\r
被编辑元素的CSS样式\r
\r
\`\`\`html\r
<div class="box" id="box" style="width: 300px; height: 300px; background-color: red;"></div>\r
\`\`\`\r
\r
如果直接利用元素节点的\`style\`属性修改CSS样式需要使用驼峰命名法，比如\`background-color\`需要写为\`backgroundColor\`。\r
\r
### \`cssText\`属性\r
\r
\`cssText\`是元素\`style\`对象的一个属性，它允许通过字符串形式一次性设置多个CSS样式，相当于直接操作元素的\`style\`属性内容。\r
\r
它的语法特点是使用分号分隔多个CSS声明，格式与普通CSS写法基本相同，不需要使用驼峰命名法（比如可以直接使用\`background-color\`）。\r
\r
\`\`\`html\r
<div class="box" id="box"></div>\r
\r
<script>\r
    let box = document.getElementById("box");\r
\r
    box.style.cssText = "width:200px;height:200px;background:red;";\r
<\/script>\r
\`\`\`\r
\r
被编辑元素的CSS样式\r
\r
\`\`\`html\r
<div class="box" id="box" style="width: 200px; height: 200px; background: red;"></div>\r
\`\`\`\r
\r
1. 使用\`cssText\`设置元素CSS样式的优点\r
\r
    一次性设置多个样式，减少代码行数。性能较好，只需要一次DOM操作。语法简单，类似于编写普通CSS\r
\r
2. 缺点\r
\r
   会覆盖所有现有内联样式。不利于部分更新，只能全部替换。可读性较差，特别是样式较多时\r
`;export{r as default};
