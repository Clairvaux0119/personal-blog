const n=`---\r
title: 事件代理\r
date: 2025-09-15\r
tags: ["javascript", "事件"]\r
excerpt: "事件代理（事件委托）"\r
---\r
\r
## 事件代理\r
\r
由于事件会在冒泡阶段向上传播到父节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件。这种方法叫做事件的代理（delegation）。\r
\r
对于下面的代码\r
\r
\`\`\`html\r
<ul id="list">\r
    <li>列表1</li>\r
    <li>列表2</li>\r
</ul>\r
<script>\r
    let list = document.getElementById("list");\r
\r
    list.addEventListener("click", function () {\r
        console.log("点击了");\r
    })\r
<\/script>\r
\`\`\`\r
\r
当点击\`<ul>\`的两个子元素\`<li>\`的时候控制台都会输出\r
\r
\`\`\`console\r
点击了\r
\`\`\`\r
\r
如果\`<ul>\`元素内部还有\`<p>\`元素，我们想实现点击\`<li>\`元素时返回其中的内容，点击\`<p>\`元素时不返回内容，可以\r
\r
\`\`\`html\r
<ul id="list">\r
    <li>列表1</li>\r
    <li>列表2</li>\r
    <p>我是文本</p>\r
</ul>\r
<script>\r
    let list = document.getElementById("list");\r
\r
    list.addEventListener("click", function (event) {\r
        if (event.target.tagName.toLowerCase() === "li") {\r
            console.log(event.target.innerHTML);\r
        }\r
    });\r
<\/script>\r
\`\`\`\r
\r
依次点击前两个\`<li>\`元素，控制台输出\r
\r
\`\`\`console\r
列表1\r
列表2\r
\`\`\`\r
\r
点击\`<p>\`元素控制台没有输出。\r
`;export{n as default};
