const n=`---\r
title: const命令\r
date: 2025-09-19\r
tags: ["javascript", "const", "ES6"]\r
excerpt: "\`ES6\`新增命令\`const\`"\r
---\r
\r
## const命令\r
\r
\`const\`声明一个只读的常量，常量的值不能改变。\r
\r
\`\`\`javascript\r
const PI = 3.1415\r
\r
console.log(PI)\r
PI = 3\r
console.log(PI)\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
3.1415\r
Uncaught TypeError TypeError: Assignment to constant variable.\r
\`\`\`\r
\r
声明常量\`PI\`之后就不能对其再进行赋值操作。\r
\r
由于\`const\`声明的变量不能改变值，那么\`const\`一旦声明变量，就必须立即初始化，不能初始化之后再赋值。\r
\r
\`\`\`javascript\r
const foo\r
\r
foo = 10\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
Uncaught SyntaxError SyntaxError: Missing initializer in const declaration\r
\`\`\`\r
\r
\`const\`的作用域与\`let\`命令相同：只在声明所在的块级作用域内有效。\r
\r
\`\`\`javascript\r
{\r
    const foo = 10\r
}\r
\r
console.log(foo)\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
Uncaught ReferenceError ReferenceError: foo is not defined\r
\`\`\`\r
\r
\`const\`命令声明的变量与\`let\`命令声明的变量一样不进行提升。\r
\r
\`\`\`javascript\r
console.log(foo)\r
\r
const foo = 10\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
Uncaught ReferenceError ReferenceError: Cannot access 'foo' before initialization\r
\`\`\`\r
\r
\`const\`声明的常量不可以重复声明。\r
\r
\`\`\`javascript\r
var message = "hello"\r
let age = 18\r
\r
const message = "bye"\r
const age = 20\r
\`\`\`\r
\r
控制台打印错误信息\r
\r
\`\`\`console\r
Uncaught SyntaxError SyntaxError: Identifier 'message' has already been declared\r
\r
Uncaught SyntaxError SyntaxError: Identifier 'age' has already been declared\r
\`\`\`\r
`;export{n as default};
