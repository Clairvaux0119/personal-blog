const n=`---\r
title: 字符串扩展\r
date: 2025-09-23\r
tags: ["javascript", "字符串", "ES6"]\r
excerpt: "ES6字符串扩展与新增方法"\r
---\r
\r
## 字符串扩展\r
\r
### 字符串Unicode表示法\r
\r
ES6加强了对Unicode的支持，允许采用\`\\uxxxx\`形式表示一个字符，其中\`xxxx\`表示字符的Unicode码点。\r
\r
#### Unicode\r
\r
统一码（Unicode），也叫万国码、单一码，是计算机科学领域里的一项业界标准，包括字符集、编码方案等。Unicode是为了解决传统的字符编码方案的局限而产生的，它为每种语言中的每个字符设定了统一并且唯一的二进制编码，以满足跨语言、跨平台进行文本转换、处理的要求。\r
\r
\`\`\`javascript\r
console.log("\\u0061")\r
\`\`\`\r
\r
输出\r
\r
\`\`\`console\r
a\r
\`\`\`\r
\r
### 字符串遍历器接口\r
\r
\`for...of\`遍历\r
\r
\`\`\`javascript\r
for (const i of "hello") {\r
    console.log(i)\r
}\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
h\r
e\r
l\r
l\r
o\r
\`\`\`\r
\r
### 模板字符串\r
\r
模板字符串（template string）是增强版的字符串，用反引号（\`)标识。它可以当做普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。\r
\r
如果要实现动态创建一个\`<a>\`标签，\`<a>\`标签href属性也是动态的。\r
\r
首先创建变量\`href\`用来存储动态的\`href\`属性。\r
\r
\`\`\`javascript\r
let href = "https://zhidao.baidu.com/"\r
let text = "百度知道"\r
\`\`\`\r
\r
用传统的方式实现\r
\r
\`\`\`javascript\r
let h1 = "<a herf='"+ href +"'>"+ text + "</a>"\r
\`\`\`\r
\r
使用模板字符串\r
\r
\`\`\`javascript\r
let h2 = \`<a herf="\${href}">\${text}</a>\`\r
\`\`\`\r
\r
### 字符串新增方法\r
\r
#### \`includes()\`, \`startsWith()\`, \`endsWith()\`\r
\r
传统上，JavaScript只有\`indexOf()\`方法，可以用来确定一个字符串是否包含在另一个字符串中。\r
\r
ES6又提供了三种新方法\`includes()\`, \`startsWith()\`, \`endsWith()\`。\r
\r
+ \`includes()\`：返回布尔值，表示是否找到了字符串。\r
+ \`startsWith()\`：返回布尔值，表示参数字符串是否在原字符串的头部。\r
+ \`endsWith()\`：返回布尔值，表示参数字符串是否在原字符串的尾部。\r
\r
\`\`\`javascript\r
let string = "Hello World!"\r
\r
console.log(string.includes("o"))\r
console.log(string.startsWith("H"))\r
console.log(string.endsWith("!"))\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
true\r
true\r
true\r
\`\`\`\r
\r
这三个方法都支持第二个参数，表示开始搜索的位置。（\`includes()\`和\`startsWith()\`是正序，\`endsWith()\`是逆序）\r
\r
\`\`\`javascript\r
let string = "Hello World!"\r
\r
console.log(string.includes("W", 6))\r
console.log(string.startsWith("Hello", 5))\r
console.log(string.endsWith("llo", 5))\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
true\r
false\r
true\r
\`\`\`\r
\r
#### \`repeat()\`\r
\r
\`repeat()\`方法返回一个新字符串，表示将原字符串重复\`n\`次。\r
\r
\`\`\`javascript\r
console.log("a".repeat(3))\r
console.log("hello".repeat(2))\r
console.log("a".repeat(0))\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
aaa\r
hellohello\r
\r
\`\`\`\r
\r
#### \`padStart()\`, \`padEnd()\`\r
\r
ES2017引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。\`padStart()\`用于头部补全， \`padEnd()\`用于尾部补全。\r
\r
格式\r
\r
\`\`\`javascript\r
"字符串".padStart(指定长度, "填充内容")\r
"字符串".padEnd(指定长度, "填充内容")\r
\`\`\`\r
\r
比如\r
\r
\`\`\`javascript\r
console.log("x".padStart(5, "ab"))\r
console.log("x".padStart(4, "ab"))\r
console.log("x".padEnd(4, "ab"))\r
console.log("x".padEnd(5, "ab"))\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
ababx\r
abax\r
xaba\r
xabab\r
\`\`\`\r
\r
#### \`trimStart()\`, \`trimEnd()\`\r
\r
ES2019对字符串实例新增了\`trimEnd()\`和\`trimStart()\`方法。它们的行为和\`trim()\`方法一致。\`trimStart()\`方法是去除字符串前端的空格，\`trimEnd()\`方法是去除字符串后端的空格。它们返回的都是新字符串，不会修改原字符串。方法去除的不仅是空格，还包括制表符（\`\\t\`、\`\\v\`）、换行符（\`\\n\`）和回车符（\`\\r\`）。\r
\r
\`\`\`javascript\r
let string = "  hello  "\r
\r
console.log(string.trim())\r
console.log(string.trimStart())\r
console.log(string.trimEnd())\r
\`\`\`\r
\r
控制台输出（方便查看空格用引号包裹结果）\r
\r
\`\`\`console\r
"hello"\r
"hello  "\r
"  hello"\r
\`\`\`\r
\r
#### \`at()\`\r
\r
\`at()\`方法接受一个整数（从0开始计数）作为参数，返回参数指定位置的字符，支持负索引（即倒数的位置）。\r
\r
\`\`\`javascript\r
let string = "hello"\r
\r
console.log(string.at(0))\r
console.log(string.at(-1))\r
console.log(string.at(1))\r
console.log(string.at(5))\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
h\r
o\r
e\r
undefined\r
\`\`\`\r
\r
**注意**&nbsp;&nbsp;&nbsp;&nbsp;如果参数位置超出了字符串范围，\`at()\`返回\`undefined\`。\r
`;export{n as default};
