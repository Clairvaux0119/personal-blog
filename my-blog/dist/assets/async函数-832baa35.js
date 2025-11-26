const n=`---\r
title: async函数\r
date: 2025-10-05\r
tags: ["javascript", "async", "ES6"]\r
excerpt: "ES6 async函数"\r
---\r
\r
## async函数\r
\r
\`\`\`javascript\r
function print () {\r
    setTimeout(() => {\r
        console.log("定时器");\r
    }, 10);\r
    console.log("Hello");\r
}\r
\r
print();\r
\`\`\`\r
\r
对于上面代码，期望的结果是控制台先输出定时器，然后输出Hello。但控制台实际上的输出结果为\r
\r
\`\`\`console\r
Hello\r
定时器\r
\`\`\`\r
\r
原因是\`setTimeout()\`定时器是异步操作，程序执行到定时器时不管有没有拿到结果都会继续往下执行，当打印完\`Hello\`后才拿到定时器的结果\`定时器\`。\r
\r
想要按照同步操作的顺序先打印\`定时器\`，后打印\`Hello\`可以利用async函数解决。\r
\r
ES2017标准引入了async函数，使得异步操作更加方便。async函数可以将异步操作变为同步操作。\r
\r
### 基本语法\r
\r
\`\`\`javascript\r
async function name([param[, param[, ... param]]]) { statements }\r
\`\`\`\r
\r
其中\r
\r
+ name: 函数名称。\r
+ param: 要传递给函数的参数的名称。\r
+ statements: 函数体语句。\r
\r
### 返回值\r
\r
\`async\`函数返回一个\`Promise\`对象，可以使用\`then\`方法添加回调函数。\r
\r
\`\`\`javascript\r
async function helloAsync() {\r
    return "helloAsync";\r
}\r
\r
console.log(helloAsync())\r
\r
helloAsync().then(v => {\r
    console.log(v);\r
})\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
Promise {[[PromiseState]]: 'fulfilled', [[PromiseResult]]: 'helloAsync'}\r
helloAsync\r
\`\`\`\r
\r
### await\r
\r
await操作符用于等待一个\`Promise\`对象, 它只能在异步函数\`async function\`内部使用。\r
\r
#### 语法\r
\r
\`\`\`javascript\r
[return_value] = await expression;\r
\`\`\`\r
\r
expression: 一个\`Promise\`对象或者任何要等待的值。\r
\r
#### 返回值\r
\r
返回Promise对象的处理结果。如果等待的不是Promise对象，则返回该值本身。\r
\r
如果一个Promise被传递给一个await操作符，await将等待Promise正常处理完成并返回其处理结果。\r
\r
### 示例代码\r
\r
\`\`\`javascript\r
function timeout(ms) {\r
    return new Promise(function (resolve, reject) {\r
        setTimeout(() => {\r
            console.log("定时器");\r
            resolve();\r
        }, ms);\r
    });\r
}\r
\r
async function asyncPrint (ms, value) {\r
    await timeout(ms);\r
    console.log(value);\r
}\r
\r
asyncPrint(10, "hello");\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
定时器\r
hello\r
\`\`\`\r
`;export{n as default};
