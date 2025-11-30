const r=`---\r
title: 数组扩展\r
date: 2025-09-24\r
tags: ["javascript", "数组", "ES6"]\r
excerpt: "ES6数组扩展与新增方法"\r
---\r
\r
## 数组扩展\r
\r
### 扩展运算符\r
\r
扩展运算符（spread）的形式是三个点（\`...\`）。作用是将一个数组转为用逗号分隔的参数序列。\r
\r
\`\`\`javascript\r
console.log(...[1, 2, 3])\r
console.log(1, ...[2, 3, 4], 5)\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
1 2 3\r
1 2 3 4 5\r
\`\`\`\r
\r
如果要扩展的数组包含空位，使用扩展运算符会输出\`undefined\`。\r
\r
\`\`\`javascript\r
console.log(...[1, , 3])\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
1 undefined 3\r
\`\`\`\r
\r
#### 替代\`apply()\`方法\r
\r
由于扩展运算符可以展开数组，所以不再需要\`apply()\`方法将数组转为函数的参数了。\r
\r
\`apply()\`方法语法\r
\r
\`\`\`javascript\r
function.apply(thisArg, [argsArray])\r
\`\`\`\r
\r
其中\`thisArg\`是函数运行时使用的\`this\`值，\`argsArray\`是一个数组或类数组对象，包含传递给函数的参数。\r
\r
实现求数组中的最大值\r
\r
\`\`\`javascript\r
const num = [10, 20, 30, 40]\r
\r
console.log(Math.max.apply(null, num))\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
40\r
\`\`\`\r
\r
使用扩展运算符\r
\r
\`\`\`javascript\r
console.log(Math.max(...num))\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
40\r
\`\`\`\r
\r
#### 合并数组\r
\r
扩展运算符提供了数组合并的新写法。\r
\r
\`\`\`javascript\r
let arr1 = ['Hello']\r
let arr2 = ['World']\r
\r
// ES5的合并数组\r
console.log(arr1.concat(arr2))\r
\r
// ES6的合并数组\r
console.log([...arr1, ...arr2])\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
['Hello', 'World']\r
['Hello', 'World']\r
\`\`\`\r
\r
### 数组新增方法\r
\r
#### \`Array.from()\`\r
\r
\`Array.from()\`可以将类数组对象或可迭代对象转化为数组。\r
\r
参数为数组的话\r
\r
\`\`\`javascript\r
console.log(Array.from([1, 2]))\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
[1, 2]\r
\`\`\`\r
\r
常见的类数组有三类：arguments、元素集合、类似数组的对象。它们都只能使用数组的读取方式和length属性，不能使用数组方法。\r
\r
##### arguments\r
\r
arguments是一个类数组对象，在函数内部自动可用，它包含了函数被调用时传入的所有参数。\r
\r
\`\`\`javascript\r
function example() {\r
    console.log(arguments)\r
}\r
\r
example(1, 2, 3, "hello")\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
Arguments(4) [1, 2, 3, 'hello', callee: ƒ, Symbol(Symbol.iterator): ƒ]\r
0: 1\r
1: 2\r
2: 3\r
3: 'hello'\r
...\r
\`\`\`\r
\r
使用\`Array.from()\`方法\r
\r
\`\`\`javascript\r
function example() {\r
    console.log(Array.from(arguments))\r
}\r
\r
example(1, 2, 3, "hello")\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
[1, 2, 3, 'hello']\r
\`\`\`\r
\r
转成数组后就可以使用数组的各种方法对其进行操作。\r
\r
##### 元素集合\r
\r
元素集合是指DOM操作中返回的类数组对象，它们表示一组DOM元素，但不是真正的数组。\r
\r
常见的元素集合有\r
\r
1. HTMLCollection 由以下方法返回：\r
\r
   + \`document.getElementsByClassName()\`\r
   + \`document.getElementsByTagName()\`\r
   + \`element.children\`\r
\r
2. NodeList 由以下方法返回：\r
\r
   + \`document.querySelectorAll()\`\r
   + \`element.childNodes\`\r
\r
\`\`\`html\r
<h3>标题</h3>\r
<h3>标题</h3>\r
<h3>标题</h3>\r
<script>\r
    let titles = document.querySelectorAll("h3")\r
\r
    console.log(titles)\r
<\/script>\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
NodeList(3) [h3, h3, h3]\r
\`\`\`\r
\r
使用\`Array.from()\`方法\r
\r
\`\`\`javascript\r
let titles = document.querySelectorAll("h3")\r
\r
console.log(Array.from(titles))\r
\`\`\`\r
\r
控制台输出一个数组\r
\r
\`\`\`console\r
[h3, h3, h3]\r
\`\`\`\r
\r
##### 自定义的类数组对象\r
\r
类数组对象是指具有**数字索引**和\`length\`属性，但不是真正数组的对象。它们看起来像数组，但不能直接使用数组方法。\r
\r
下面自定义一个类数组对象\r
\r
\`\`\`javascript\r
let user = {\r
    "0": "Bob",\r
    "1": 20,\r
    "2": "男",\r
    length: 3\r
}\r
\`\`\`\r
\r
使用数字索引访问属性\r
\r
\`\`\`javascript\r
console.log(user[0])\r
console.log(user.length)\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
Bob\r
3\r
\`\`\`\r
\r
可以看到与数组类似，可以使用\`Array.from()\`方法将其转换成真正的数组。\r
\r
\`\`\`javascript\r
console.log(Array.from(user))\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
['Bob', 20, '男']\r
\`\`\`\r
\r
#### \`Array.of()\`\r
\r
\`Array.of()\`方法用于将一组值装换成数组。\r
\r
对于\r
\r
\`\`\`javascript\r
Array.of(1, 2, 3)\r
\`\`\`\r
\r
在控制台上打印\r
\r
\`\`\`console\r
[1, 2, 3]\r
\`\`\`\r
`;export{r as default};
