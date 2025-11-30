const n=`---\r
title: Event事件对象\r
date: 2025-09-13\r
tags: ["javascript", "事件"]\r
excerpt: "Event事件对象"\r
---\r
\r
## Event事件对象\r
\r
事件发生之后，会产生一个事件对象，作为参数传给监听函数。\r
\r
### Event对象属性\r
\r
#### \`Event.target\`\r
\r
\`\`\`html\r
<button id="btn">按钮</button>\r
\r
<script>\r
    let btn = document.getElementById("btn")\r
\r
    btn.addEventListener("click", function(enent){\r
        console.log(event)\r
    })\r
<\/script>\r
\`\`\`\r
\r
点击按钮后控制台输出\r
\r
\`\`\`console\r
PointerEvent {isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0, …}\r
\`\`\`\r
\r
\`Event.target\`属性返回事件当前所在的节点。\r
\r
\`\`\`html\r
<button id="btn">按钮</button>\r
\r
<script>\r
    let btn = document.getElementById("btn")\r
\r
    btn.addEventListener("click", function(event){\r
        console.log(event.target)\r
    })\r
<\/script>\r
\`\`\`\r
\r
点击按钮后控制台输出\r
\r
\`\`\`console\r
<button id="btn">按钮</button>\r
\`\`\`\r
\r
#### \`Event.type\`\r
\r
\`Event.type\`属性返回一个字符串，表示事件类型。事件的类型是在生成事件的时候。该属性**只读**。\r
\r
\`\`\`html\r
<button id="btn">按钮</button>\r
\r
<script>\r
    let btn = document.getElementById("btn")\r
\r
    btn.addEventListener("click", function(event){\r
        console.log(event.type)\r
    })\r
<\/script>\r
\`\`\`\r
\r
点击按钮后控制台输出\r
\r
\`\`\`console\r
click\r
\`\`\`\r
\r
### Event对象方法\r
\r
Event对象提供了多个重要方法用于控制事件的行为和传播。\r
\r
|方法|作用范围|影响|使用场景|\r
|---|---|---|---|\r
|preventDefault()|当前元素|阻止默认行为|表单验证、链接处理|\r
|stopPropagation()|传播过程|阻止向父元素传播|事件隔离、避免冲突|\r
|stopImmediatePropagation()|当前元素|阻止其他监听器|优先级控制、插件管理|\r
\r
#### \`Event.preventDefault()\`\r
\r
\`Event.preventDefault()\`方法作用是取消浏览器对当前事件的默认行为。比如点击链接后，浏览器默认会跳转到另一个页面，使用这个方法之后，就不会跳转了。\r
\r
\`\`\`html\r
<a href="https://baike.baidu.com/">百度百科</a>\r
<script>\r
    document.querySelector('a').addEventListener('click', function (event) {\r
        event.preventDefault()\r
        console.log('链接点击被阻止，不会跳转')\r
    })\r
<\/script>\r
\`\`\`\r
\r
点击链接后控制台输出\r
\r
\`\`\`console\r
链接点击被阻止，不会跳转\r
\`\`\`\r
\r
此外，\`Event.preventDefault\`方法还可以阻止默认表单和右键菜单。\r
\r
#### \`Event.stopPropagation()\`\r
\r
\`Event.stopPropagation()\`方法阻止事件在DOM中继续传播，防止再触发定义在别的节点上的监听函数，但是不包括在当前节点上其他的事件监听函数。\r
\r
\`\`\`html\r
<head>\r
    <style>\r
        .root{\r
            width: 200px;\r
            height: 200px;\r
            background-color: gray;\r
        }\r
\r
        .box{\r
            width: 100px;\r
            height: 100px;\r
            background-color: red;\r
        }\r
    </style>\r
</head>\r
\r
<body>\r
    <div class="root" id="root">\r
        <div class="box" id="box"></div>\r
    </div>\r
    <script>\r
        document.getElementById("root").addEventListener("click", \r
        function() {\r
            console.log("root")\r
        })\r
\r
        document.getElementById("box").addEventListener("click", \r
        function() {\r
            console.log("box")\r
        })\r
    <\/script>\r
</body>\r
\`\`\`\r
\r
网页输出\r
\r
<!-- markdownlint-disable no-inline-html -->\r
<style>\r
    .root{\r
        width: 200px;\r
        height: 200px;\r
        background-color: gray;\r
    }\r
\r
    .box{\r
        width: 100px;\r
        height: 100px;\r
        background-color: red;\r
    }\r
</style>\r
\r
<div class="root" id="root">\r
    <div class="box" id="box"></div>\r
</div>\r
<!-- markdownlint-restore -->\r
\r
点击灰色部分控制台输出\r
\r
\`\`\`console\r
root\r
\`\`\`\r
\r
点击红色部分控制台输出\r
\r
\`\`\`console\r
box\r
root\r
\`\`\`\r
\r
可以看到，当点击红色部分时发生了事件冒泡。**事件冒泡（Event Bubbling）**是DOM事件流中的一个重要机制，指的是事件从最具体的元素（目标元素）开始，然后向上传播到较为不具体的元素（文档根节点）的过程。\r
\r
如果要阻止上述代码的事件冒泡，可以修改\`box\`部分的代码为\r
\r
\`\`\`javascript\r
document.getElementById("box").addEventListener("click", \r
    function(event) {\r
        event.stopPropagation()\r
        console.log("box")\r
    })\r
\`\`\`\r
\r
此时点击红色部分控制台输出\r
\r
\`\`\`console\r
box\r
\`\`\`\r
\r
#### \`Event.stopImmediatePropagation()\`\r
\r
\`Event.stopImmediatePropagation()\`的作用是阻止事件传播并阻止同一元素上的其他事件监听器执行。\r
\r
\`\`\`html\r
<button id="myButton">点击</button>\r
\r
<script>\r
    const button = document.getElementById('myButton')\r
    \r
    // 第一个监听器\r
    button.addEventListener('click', function(event) {\r
        console.log('监听器1 - 开始')\r
        event.stopImmediatePropagation() // 关键代码\r
        console.log('监听器1 - 结束')\r
    })\r
    \r
    // 第二个监听器\r
    button.addEventListener('click', function() {\r
        console.log('监听器2 - 这个不会执行')\r
    })\r
    \r
    // 第三个监听器\r
    button.addEventListener('click', function() {\r
        console.log('监听器3 - 这个也不会执行')\r
    })\r
    \r
    // 父元素的监听器（也不会执行）\r
    document.body.addEventListener('click', function() {\r
        console.log('body - 这个也不会执行')\r
    })\r
<\/script>\r
\`\`\`\r
\r
当按下按钮后，控制台输出\r
\r
\`\`\`console\r
监听器1 - 开始\r
监听器1 - 结束\r
\`\`\`\r
`;export{n as default};
