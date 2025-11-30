const n=`---\r
title: 函数\r
date: 2025-09-04\r
tags: ["javascript", "函数"]\r
excerpt: "学习使用javascript函数"\r
---\r
\r
## 函数\r
\r
函数是一段可以反复调用的代码块。\r
\r
### 函数的声明\r
\r
\`function\`命令：\`function\`命令声明的代码块就是一个函数。\`function\`命令后面的是函数名，函数名后面是一对大括号，里面是传入函数的形参。函数体放在大括号里面。\r
\r
伪代码\r
\r
\`\`\`javascript\r
function 函数名(形参) {\r
    函数体   \r
}\r
\`\`\`\r
\r
### 函数名的提升\r
\r
JavaScript引擎将函数名视同变量名，所以采用\`function\`命令声明函数时，整个函数会像变量声明一样，被提升到代码头部。\r
\r
\`\`\`javascript\r
add()\r
\r
function add() {\r
\r
}\r
\`\`\`\r
\r
### 函数参数\r
\r
函数运行的时候，有时需要提供外部数据，不同的外部数据会得到不同的结果，这种外部数据就叫参数。\r
\r
\`\`\`javascript\r
function square(x) {\r
    console.log(x * x)\r
}\r
\r
square(2)\r
square(3)\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
4\r
9\r
\`\`\`\r
\r
### 函数返回值\r
\r
JavaScript函数提供两个接口实现与外界的交互，其中参数作为入口，接收外界信息；返回值作为出口，把运算结果反馈给外界。\r
\r
\`\`\`javascript\r
function getName(name) {\r
    return name\r
}\r
\r
let myName = getName('chanxiang')\r
console.log(myName)\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
chanxiang\r
\`\`\`\r
\r
>**温馨提示**\r
>\r
>函数体里面\`return\`后面不能再添加任何代码，后续代码不会执行。\r
`;export{n as default};
