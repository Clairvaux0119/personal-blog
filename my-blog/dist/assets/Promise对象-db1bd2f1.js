const r=`---\r
title: Promise对象\r
date: 2025-10-01\r
tags: ["javascript", "Promise", "ES6"]\r
excerpt: "ES6 Promise对象"\r
---\r
\r
## Promise对象\r
\r
### 基本概念\r
\r
Promise是异步编程的一种解决方案，比传统的解决方案（回调函数和事件）更合理也更强大。它由社区最早提出和实现，ES6将其写进了语言标准，统一了用法，原生提供了\`Promise\`对象。\r
\r
\`Promise\`简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise是一个对象，通过它可以获取异步操作的消息。Promise提供统一的API，各种异步操作都可以用同样的方法进行处理。\r
\r
利用\`Promise\`对象，可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，\`Promise\`对象提供统一的接口，使得控制异步操作更加容易。\r
\r
### 基本用法\r
\r
ES6规定，\`Promise\`对象是一个构造函数，用来生成\`Promise\`实例。\r
\r
\`\`\`javascript\r
const promise = new Promise((resolve, reject) => {\r
    // 异步操作\r
    if (/* 操作成功 */) {\r
        resolve(value); // 状态变为 fulfilled\r
    } else {\r
        reject(error);  // 状态变为 rejected\r
    }\r
});\r
\`\`\`\r
\r
\`Promise\`构造函数接受一个函数作为参数，该函数的两个参数分别是\`resolve\`和\`reject\`。它们是两个函数，有JavaScript引擎提供，不用自己部署。\r
\r
### Promise状态\r
\r
#### 特点\r
\r
Promise异步操作有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。除了异步操作的结果，任何其他操作都无法改变这个状态。\r
\r
Promise对象只有：从pending变为fulfilled和从pending变为rejected的状态改变。只要处于fulfilled和rejected，状态就不会再变了即resolved（已定型）。\r
\r
\`\`\`javascript\r
const p1 = new Promise(function (resolve, reject) {\r
    resolve('success1');\r
    resolve('success2');\r
});\r
const p2 = new Promise(function (resolve, reject) {\r
    resolve('success3');\r
    reject('reject');\r
});\r
\r
p1.then(value => {\r
    console.log(value);\r
});\r
p2.then(value => {\r
    console.log(value);\r
});\r
\`\`\`\r
\r
\`p1\`中第一次\`resolve\`将状态更改为fulfilled，第二次\`resolve\`会被忽略。同样的\`p2\`中\`resolve\`将状态更改为fulfilled之后，\`reject\`便不能再将状态更改为\`rejected\`。\r
\r
控制台输出\r
\r
\`\`\`console\r
success1\r
success3\r
\`\`\`\r
\r
对于Promise来说只有第一次\`resolve\`/\`reject\`有效，后续的状态改变会被静默忽略。\r
\r
#### 缺点\r
\r
+ 无法取消Promise，一旦新建它就会立即执行，无法中途取消。\r
\r
+ 如果不设置回调函数，\`Promise\`内部抛出的错误，不会反应到外部。\r
\r
+ 当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。\r
\r
### \`then\`方法\r
\r
\`then\`方法接收两个函数作为参数，第一个参数是\`Promise\`执行成功时的回调，第二个参数是\`Promise\`执行失败时的回调，两个函数只会有一个被调用。\r
\r
#### \`then\`方法的特点\r
\r
在JavaScript事件队列的当前运行完成之前，回调函数永远不会被调用。\r
\r
\`\`\`javascript\r
const p = new Promise(function(resolve,reject){\r
  resolve('success');\r
});\r
\r
p.then(value => {\r
  console.log(value);\r
});\r
\r
console.log('first');\r
\`\`\`\r
\r
执行流程\r
\r
1. 同步执行：Promise执行器函数立即执行\r
2. 微任务队列：\`.then()\`回调被放入微任务队列\r
3. 继续同步代码：执行\`console.log('first')\`\r
4. 事件循环：当调用栈清空后，从微任务队列取出\`.then()\`回调执行\r
\r
控制台输出\r
\r
\`\`\`console\r
first\r
success\r
\`\`\`\r
\r
通过\`.then\`形式添加的回调函数，不论什么时候，都会被调用。可以通过\`.then\`添加多个回调函数，它们会按照插入顺序并且独立运行。\r
\r
Promise链式调用\r
\r
\`\`\`javascript\r
const p = new Promise(function (resolve, reject) {\r
    resolve(1);\r
}).then(value => {\r
    console.log(value);\r
    return value * 2;\r
}).then(value => {\r
    console.log(value);\r
}).then(value => {\r
    console.log(value);\r
    return Promise.resolve('resolve');\r
}).then(value => {\r
    console.log(value);\r
    return Promise.reject('reject');\r
}).then(value => {\r
    console.log('resolve:' + value);\r
}, error => {\r
    console.log('reject:' + error);\r
});\r
\`\`\`\r
\r
执行过程\r
\r
\`\`\`ascii\r
第一个then：接受数据1，返回2\r
                ↓\r
第二个then：接受数据2，控制台打印2，没有return隐式返回undefined\r
                ↓\r
第三个then：接受数据undefined，控制台打印undefined，返回解决的Promise\r
                ↓\r
第四个then：接受数据resolve，控制台打印resolve，返回拒绝的Promise\r
                ↓\r
第五个then：接受数据reject，跳过成功回调，执行错误回调，控制台打印reject:reject\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
1\r
2\r
undefined\r
resolve\r
reject:reject\r
\`\`\`\r
\r
### Promise加载图片示例\r
\r
\`\`\`html\r
<div id="box">等待加载…</div>\r
<script>\r
    let box = document.getElementById("box");\r
\r
    function loadImageAsync(url) {\r
        const promise = new Promise(function (resolve, reject) {\r
            // 异步处理\r
            const image = new Image();\r
\r
            image.addEventListener("load", function () {\r
                resolve(image);\r
            });\r
\r
            image.addEventListener("error", function () {\r
                reject(new Error(\`无法加载图片: \${url}\`));\r
            });\r
\r
            image.src = url;\r
        });\r
\r
        return promise;\r
    }\r
\r
    const promise = loadImageAsync("./image/异步加载测试图片.png");\r
\r
    promise.then(data => {\r
        // 成功\r
        box.innerHTML = "";\r
        box.appendChild(data);\r
    }, error => {\r
        // 失败\r
        box.innerHTML = "图片加载失败";\r
        console.log(error);\r
    })\r
<\/script>\r
\`\`\`\r
\r
### Promise Ajax实操\r
\r
Ajax（Asynchronous JavaScript and XML）是一种创建快速动态网页的技术，它允许网页在不重新加载整个页面的情况下，与服务器交换数据并更新部分网页内容。\r
\r
Promise封装Ajax，让网络请求的异步操作变得更加简单。\r
\r
\`\`\`javascript\r
// XHR（XML Http Request）对象\r
const getJSON = function (url) {\r
    const promise = new Promise(function(resolve, reject) {\r
        // 异步操作：网络请求代码\r
        const handler = function () {\r
            if(this.readyState !== 4) {\r
                return;\r
            }\r
\r
            if (this.status === 200) {\r
                resolve(this.response)\r
            } else {\r
                reject(new Error(this.statusText))\r
            }\r
        }\r
\r
        const client = new XMLHttpRequest();\r
\r
        client.open("GET", url);\r
        client.onreadystatechange = handler;\r
        client.responseType = "json";\r
        client.setRequestHeader("Accept", "application/json");\r
        client.send();\r
    });\r
\r
    return promise;\r
}\r
\r
getJSON("http://127.0.0.1:5500/learn.-gite.io/post.html?id=md-Promise%E5%AF%B9%E8%B1%A1")\r
.then(data => {\r
    console.log(\`请求成功：\${data}\`);\r
}).catch(error => {\r
    console.log(\`请求失败：\${error}\`);\r
});\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
请求成功：null\r
\`\`\`\r
`;export{r as default};
