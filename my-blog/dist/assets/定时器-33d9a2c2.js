const n=`---\r
title: 定时器\r
date: 2025-09-16\r
tags: ["javascript", "定时器"]\r
excerpt: "定时器相关内容"\r
---\r
\r
## 定时器\r
\r
JavaScript提供定时执行代码的功能，叫做定时器（timer），主要由\`setTimeout()\`和\`setInterval()\`这两个函数来完成。它们向任务队列添加定时任务。\r
\r
### \`setTimeout()\`\r
\r
\`setTimeout()\`函数用来指定某个函数或某段代码在多少毫秒之后执行。它返回一个整数，表示定时器的编号，以后可以用来取消这个定时器。\r
\r
\`\`\`javascript\r
let timerId = setTimeout(func|code, delay)\r
\`\`\`\r
\r
\`setTimeout()\`函数接受两个参数，第一个参数\`func|code\`是将要推迟执行的函数名或者一段代码，第二个参数\`delay\`是推迟执行的毫秒数。\r
\r
对于下面的代码\r
\r
\`\`\`javascript\r
setTimeout(function () {\r
    console.log("大家好")\r
}, 3000)\r
\`\`\`\r
\r
代码运行3000ms后才会在控制台输出\r
\r
\`\`\`console\r
大家好\r
\`\`\`\r
\r
>**温馨提示**\r
>\r
>还有一个需要注意的地方，如果回调函数是对象的方法，那么\`setTimeout()\`使得方法内部的\`this\`关键字指向全局环境，而不是定义时所在的那个对象。\r
\r
即，对于下面的代码\r
\r
\`\`\`javascript\r
var name = "Bob"\r
let user = {\r
    name: "Mike",\r
    getName: function () {\r
        console.log(this.name)\r
    }\r
}\r
\r
user.getName()\r
\`\`\`\r
\r
\`this\`指向的是当前调用者\`user\`，此时控制台输出\r
\r
\`\`\`console\r
Mike\r
\`\`\`\r
\r
而当我们给输出的方法加入定时器后\r
\r
\`\`\`javascript\r
var name = "Bob"\r
let user = {\r
    name: "Mike",\r
    getName: function () {\r
        console.log(this.name)\r
    }\r
}\r
\r
user.getName()\r
\`\`\`\r
\r
此时，定时器中的\`this\`指向的是全局环境，浏览器中指\`window\`，控制台输出的\`this.name\`也就是\`window.name\`，即\r
\r
\`\`\`console\r
Bob\r
\`\`\`\r
\r
如果想要解决这个问题，可以\r
\r
\`\`\`javascript\r
var name = "Bob"\r
let user = {\r
    name: "Mike",\r
    getName: function () {\r
        let that = this\r
        console.log(that.name)\r
    }\r
}\r
\r
user.getName()\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
Mike\r
\`\`\`\r
\r
定时器可以取消\r
\r
\`\`\`javascript\r
let timer = setTimeout(function () {\r
    console.log("大家好")\r
}, 3000)\r
\r
// 取消定时器\r
clearTimeout(timer)\r
\`\`\`\r
\r
执行代码后无论过多久控制台都不会打印定时器\`timer\`中的内容。\r
\r
### \`setInterval()\`\r
\r
\`setInterval()\`函数的用法与\`setTimeout()\`完全一致，区别在于\`setInerval()\`是指定某个人物每间隔一段时间就执行一次，也就是无限次的定时执行。\r
\r
\`\`\`javascript\r
let timer = setInterval(function () {\r
    console.log("大家好")\r
}, 1000)\r
\`\`\`\r
\r
上述代码执行后控制台每隔一秒会打印一次\r
\r
\`\`\`console\r
大家好\r
\`\`\`\r
\r
通过\`setInterval()\`方法可以实现简单的网页动画效果。\r
\r
\`\`\`html\r
<style>\r
    #cartoon {\r
        width: 100px;\r
        height: 100px;\r
        background-color: red;\r
        opacity: 1;\r
    }\r
</style>\r
\r
<script>\r
    let div = document.getElementById("cartoon")\r
    let opacity = 1\r
    let flag = 1\r
\r
    function fadeIn() {\r
        let fadeIn = setInterval(function () {\r
            if (opacity > 0 && flag === 1) {\r
                opacity -= 0.05\r
                div.style.opacity = opacity\r
            } else {\r
                flag = 0\r
                clearInterval(fade1)\r
                fadeOut()\r
            }\r
        }, 60)\r
    }\r
\r
    function fadeOut() {\r
        let fadeOut = setInterval(function () {\r
            if (opacity <= 1 && flag === 0) {\r
                opacity += 0.05\r
                div.style.opacity = opacity\r
            } else {\r
                flag = 1\r
                clearInterval(fade2)\r
                fadeIn()\r
            }\r
        }, 60)\r
    }\r
\r
    fadeIn()\r
<\/script>\r
\`\`\`\r
\r
网页输出一个红色的方块不停淡入淡出的动画。\r
`;export{n as default};
