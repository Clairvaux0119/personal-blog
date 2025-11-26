const n=`---\r
title: 事件处理程序\r
date: 2025-09-10\r
tags: ["javascript", "事件处理程序"]\r
excerpt: "利用事件处理程序为页面添加事件"\r
---\r
\r
## 事件处理程序\r
\r
HTML事件可以是浏览器行为，也可以是用户行为。\r
\r
以下是HTML事件的实例：\r
\r
1. HTML页面完成加载\r
2. HTML \`input\`字段改变时\r
3. HTML按钮被点击\r
\r
在事件触发时，可以用JavaScript执行一些代码。\r
\r
HTML元素中可以添加事件属性，使用JavaScript代码来添加HTML元素。\r
\r
事件处理程序分为：\r
\r
1. 内联事件处理器 (HTML属性)\r
2. 脚本事件处理器（DOM0级事件处理）\r
3. DOM2级事件处理\r
\r
下面是一些常见的HTML事件。\r
\r
|事件|描述|\r
|---|---|\r
|onchange|HTML元素改变|\r
|onclick|用户点击HTML元素|\r
|onmouseover|鼠标指针移动到指定的元素上时发生|\r
|onmouseout|用户从一个HTML元素上移开鼠标时发生|\r
|onkeydown|用户按下键盘按键|\r
|onload|浏览器已完成页面的加载|\r
\r
### 内联事件处理器 (HTML属性)\r
\r
内联事件处理器是直接在HTML标签中定义事件，它的语法是\`on<event>="JavaScript code"\`，示例如下\r
\r
\`\`\`html\r
<button onclick="clickHandle()">按钮</button>\r
\r
<script>\r
    function clickHandle() {\r
        console.log("点击了按钮");\r
    }\r
<\/script>\r
\`\`\`\r
\r
点击按钮后控制台输出。\r
\r
\`\`\`console\r
点击了按钮\r
\`\`\`\r
\r
>缺点是直接在HTML标签中定义，混合HTML与JS，难以维护，只能绑定一个处理函数。\r
\r
### 脚本事件处理器（DOM0级事件处理）\r
\r
在JavaScript中，将函数赋值给DOM元素的\`on<event>\`属性。\r
\r
\`\`\`html\r
<button id="btn">按钮</button>\r
\r
<script>\r
    let btn = document.getElementById("btn");\r
\r
    btn.onclick = function() {\r
        console.log("点击了按钮");\r
    }\r
<\/script>\r
\`\`\`\r
\r
点击按钮后控制台输出\r
\r
\`\`\`console\r
点击了按钮\r
\`\`\`\r
\r
相对于内联事件处理器DMO0级处理事件将HTML元素与JS分离，更方便维护。\r
\r
主要缺点有：\r
\r
1. 无法添加多个处理器：每个事件类型只能绑定一个处理函数。后续的赋值会覆盖之前的。\r
\r
    \`\`\`javascript\r
    btn.onclick = function1;\r
    btn.onclick = function2; // function1 被覆盖了，只有 function2 会执行\r
    \`\`\`\r
\r
2. 事件流控制有限：默认只在**冒泡阶段**触发，无法选择在捕获阶段触发。\r
\r
3. 删除事件：通过将事件属性设置为\`null\`来删除。\r
\r
    \`\`\`javascript\r
    btn.onclick = null; // 删除点击事件处理函数\r
    \`\`\`\r
\r
### DOM2级事件\r
\r
使用\`addEventListener()\`方法。\r
\r
\`\`\`html\r
<button id="btn">按钮</button>\r
\r
<script>\r
    let btn = document.getElementById("btn");\r
\r
    btn.addEventListener("click", function(){\r
        console.log("点击了按钮1");\r
    })\r
    btn.addEventListener("click", function(){\r
        console.log("点击了按钮2");\r
    })\r
<\/script>\r
\`\`\`\r
\r
点击按钮后控制台输出\r
\r
\`\`\`console\r
点击了按钮1\r
点击了按钮2\r
\`\`\`\r
\r
使用DOM2级事件处理的优点：\r
\r
1. 可以为同一元素的同一事件类型添加多个监听器。\r
\r
2. 可以控制事件在捕获或冒泡阶段触发（通过第三个参数）。\r
\r
3. 可以使用\`removeEventListener()\`精确移除监听器。\r
`;export{n as default};
