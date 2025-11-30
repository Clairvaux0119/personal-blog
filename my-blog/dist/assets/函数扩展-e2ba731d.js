const n=`---\r
title: 函数扩展\r
date: 2025-09-27\r
tags: ["javascript", "函数", "ES6"]\r
excerpt: "ES6函数扩展"\r
---\r
\r
## 函数扩展\r
\r
### 函数参数的扩展\r
\r
#### 默认参数\r
\r
基本用法\r
\r
\`\`\`javascript\r
function fn(name, age = 17) {\r
    console.log(name + "," + age)\r
}\r
\r
fn("Amy", 18)\r
fn("Amy", "")\r
fn("Amy")\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
Amy,18\r
Amy,\r
Amy,17\r
\`\`\`\r
\r
**注意**&nbsp;&nbsp;&nbsp;&nbsp;使用函数默认参数时，不允许有同名参数。\r
\r
在普通模式下使用同名参数\r
\r
\`\`\`javascript\r
function fn(name, name) {\r
    console.log(name)\r
}\r
\r
fn("Bob", "Mike")\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
Mike\r
\`\`\`\r
\r
前面的参数会被后面的同名参数覆盖掉。\r
\r
如果使用严格模式\r
\r
\`\`\`javascript\r
"use strict"\r
function fn(name, name) { \r
    console.log(name)\r
}\r
\`\`\`\r
\r
此时会打印错误信息\r
\r
\`\`\`console\r
Uncaught SyntaxError SyntaxError: Duplicate parameter name not allowed in this context\r
\`\`\`\r
\r
使用函数默认参数时会自动启用严格模式\r
\r
\`\`\`javascript\r
function fn(name,name,age=17){\r
 console.log(name + "," + age)\r
}\r
\`\`\`\r
\r
此时控制台会打印错误信息\r
\r
\`\`\`console\r
Uncaught SyntaxError SyntaxError: Duplicate parameter name not allowed in this context\r
\`\`\`\r
\r
只有在未传递参数，或者参数为\`undefined\`时，才会使用默认参数，\`null\`值被认为是有效的值传递。\r
\r
\`\`\`javascript\r
function fn(name, age = 17) {\r
    console.log(name + "," + age)\r
}\r
\r
fn("Amy", null)\r
fn("Amy", undefined)\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
Amy,null\r
Amy,17\r
\`\`\`\r
\r
函数参数默认值存在**暂时性死区**（Temporal Dead Zone, TDZ），在函数参数默认值表达式中，还未初始化赋值的参数值无法作为其他参数的默认值。\r
\r
\`\`\`javascript\r
function f(x, y = x) {\r
    console.log(x, y)\r
}\r
\r
f(1)\r
\`\`\`\r
\r
执行过程\r
\r
\`\`\`text\r
调用f(1)，参数开始初始化------→x被赋值为1------→y的默认值表达式y = x执行，此时x已经初始化完成------→y获得值1\r
\`\`\`\r
\r
那么结果正常，函数输出结果\r
\r
\`\`\`console\r
1 1\r
\`\`\`\r
\r
如果调用函数的时候没有进行初始化\r
\r
\`\`\`javascript\r
function f(x = y) {\r
    console.log(x)\r
}\r
\r
f()\r
\`\`\`\r
\r
执行过程\r
\r
\`\`\`text\r
调用f(1)，参数开始初始化------→x默认值表达式x = y执行------→在表达式中尝试访问y，但此时y还没被初始化-----→-y处于暂时性死区，无法访问\r
\`\`\`\r
\r
打印错误信息\r
\r
\`\`\`console\r
Uncaught ReferenceError ReferenceError: y is not defined\r
\`\`\`\r
\r
#### 不定参数\r
\r
不定参数（Rest Parameters）语法允许我们将一个不定数量的参数表示为一个**数组**(可以使用数组的方法)。\r
用来表示不确定参数个数，形如，\`...\` + 变量名，由\`...\`加上一个具名参数标识符组成。具名参数只能放在参数组的最后，并且有且只有一个不定参数。\r
\r
基本用法\r
\r
\`\`\`javascript\r
function f(...values) {\r
    console.log(values.length)\r
}\r
\r
f(1, 2)\r
f(1, 2, 3, 4)\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
2\r
4\r
\`\`\`\r
\r
### 箭头函数\r
\r
ES6允许使用户箭头（\`=>\`）定义函数，箭头函数提供了一种更加简洁的函数书写方式。\r
\r
箭头函数的基本语法\r
\r
\`\`\`javascript\r
参数 => 函数体\r
\`\`\`\r
\r
使用赋值的形式（函数表达式）声明函数\r
\r
\`\`\`javascript\r
const add = function (x, y) {\r
    return x + y\r
}\r
\`\`\`\r
\r
等同于\r
\r
\`\`\`javascript\r
const add = (x, y) => x + y\r
\`\`\`\r
\r
调用函数\r
\r
\`\`\`javascript\r
add(1, 2)\r
\`\`\`\r
\r
返回值为\r
\r
\`\`\`text\r
3\r
\`\`\`\r
\r
当箭头函数函数体有多行语句时，用\`{}\`包裹起来，表示代码块，当只有一行语句，并且需要返回结果时，可以省略\`{}\`, 结果会自动返回。\r
\r
\`\`\`javascript\r
const getCircleArea = r => {\r
    const PI = 3.14\r
    return PI * r * r\r
}\r
\`\`\`\r
\r
当箭头函数要返回对象的时候，为了区分于代码块，要用\`()\`将对象包裹起来\r
\r
错误写法\r
\r
\`\`\`javascript\r
const getUser = (name, id) => {\r
    id: id,\r
    name: name\r
}\r
\`\`\`\r
\r
箭头函数将\`{}\`识别成了函数体而不是对象，所以报错\r
\r
\`\`\`console\r
Uncaught SyntaxError SyntaxError: Unexpected token ':'\r
\`\`\`\r
\r
正确写法\r
\r
\`\`\`javascript\r
const getUser = (name, id) => ({\r
    id: id,\r
    name: name\r
})\r
\`\`\`\r
\r
箭头函数没有\`this\`、\`arguments\`和\`new.target\`绑定。\r
\r
对于普通函数来说，内部的\`this\`指向函数运行时所在的对象，而箭头函数内部的\`this\`就是定义时上层作用域中的\`this\`。\r
\r
普通函数\r
\r
\`\`\`javascript\r
window.name = "Mike"\r
const user = {\r
    name: "Bob",\r
    age: 20,\r
    getName() {\r
        console.log(this.name)\r
    }\r
}\r
\r
user.getName()\r
\`\`\`\r
\r
控制台打印的是\`user\`内部的属性\`name\`\r
\r
\`\`\`console\r
Bob\r
\`\`\`\r
\r
箭头函数\r
\r
\`\`\`javascript\r
window.name = "Mike"\r
const user = {\r
    name: "Bob",\r
    age: 20,\r
    getName: () => {\r
        console.log(this.name)\r
    }\r
}\r
\r
user.getName()\r
\`\`\`\r
\r
这个箭头函数定义在全局作用域中（因为对象字面量不创建新的作用域），所以它的\`this\`指向全局对象（浏览器中全局对象是\`window\`）。\r
\r
所以上面箭头函数输出结果为\r
\r
\`\`\`console\r
Mike\r
\`\`\`\r
\r
对于普通函数来说\`arguments\`参数是一个类数组对象，包含了所有传入函数的参数。箭头函数没有这个属性。如果想要实现类似的功能可以使用Rest参数（\`...\`）进行替代。\r
\r
\`\`\`javascript\r
const example = (...args) => {\r
    console.log("所有参数:", args)\r
    console.log("参数个数:", args.length)\r
    console.log("第一个参数:", args[0])\r
}\r
\r
example(1, 2, 3, 4)\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
所有参数: [1, 2, 3, 4]\r
参数个数: 4\r
第一个参数: 1\r
\`\`\`\r
`;export{n as default};
