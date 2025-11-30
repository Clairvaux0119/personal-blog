const n=`---\r
title: 对象扩展\r
date: 2025-09-25\r
tags: ["javascript", "对象", "ES6"]\r
excerpt: "ES6对象扩展与新增方法"\r
---\r
\r
## 对象扩展\r
\r
### 属性的简洁表示法\r
\r
ES6允许在大括号里面直接写入变量和函数作为对象的属性和方法。这样的书写更加简洁。\r
\r
\`\`\`javascript\r
let name = "Bob"\r
const user = {\r
    name,\r
    age: 20\r
}\r
\`\`\`\r
\r
除了属性简写，方法也可以简写\r
\r
\`\`\`javascript\r
const object = {\r
    method() {\r
        return "Hello!"\r
    }\r
}\r
\`\`\`\r
\r
等同于\r
\r
\`\`\`javascript\r
const object = {\r
    method: function () {\r
        return "Hello!"\r
    }\r
}\r
\`\`\`\r
\r
### 属性名表达式\r
\r
ES6允许字面量定义对象时，用表达式作为对象的属性名，即把表达式放在方括号内。\r
\r
\`\`\`javascript\r
const obj = {\r
    ["he" + "llo"]() {\r
        return "Hi"\r
    }\r
}\r
console.log(obj.hello())\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
Hi\r
\`\`\`\r
\r
也可以用变量作为表达式\r
\r
\`\`\`javascript\r
let names = "user1"\r
const user = {\r
    [names]: "Bob",\r
    age: 20\r
}\r
\r
console.log(user)\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
{user1: 'Bob', age: 20}\r
\`\`\`\r
\r
要注意的是，属性的简洁表示法和属性名表达式不能同时使用，否则会报错。\r
\r
\`\`\`javascript\r
const hello= "Hello"\r
const object1= {\r
    [hello]\r
}\r
console.log(object1)\r
\r
const object2 = {\r
    [hello + "2"]: "world"\r
}\r
console.log(object2)\r
\`\`\`\r
\r
对于\`object1\`，控制台打印错误信息\r
\r
\`\`\`console\r
Uncaught SyntaxError SyntaxError: Unexpected token '['\r
\`\`\`\r
\r
对于\`object2\`，控制台输出\r
\r
\`\`\`console\r
{Hello2: 'world'}\r
\`\`\`\r
\r
### 对象的扩展运算符\r
\r
ES2018将扩展运算符（\`...\`）引入到对象中，它用于取出参数对象所有可遍历属性然后拷贝到当前对象。\r
\r
基本用法\r
\r
\`\`\`javascript\r
let user = {\r
    name: "Bob",\r
    age: 20\r
}\r
let someone = { ...user }\r
console.log(someone)\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
{name: 'Bob', age: 20}\r
\`\`\`\r
\r
使用扩展运算符，可以简便地实现对象合并。\r
\r
\`\`\`javascript\r
let name = { name: "Bob" }\r
let age = { age: 20 }\r
let user = { ...name, ...age }\r
\r
console.log(user)\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
{name: 'Bob', age: 20}\r
\`\`\`\r
\r
#### 注意事项\r
\r
自定义的属性和扩展运算符对象里面属性的相同的时候：**自定义的属性在拓展运算符后面，则拓展运算符对象内部同名的属性将被覆盖掉。**\r
\r
\`\`\`javascript\r
let user = {\r
    name: "Bob",\r
    age: 20\r
}\r
let someone = { ...user, name: "Mike" }\r
\r
console.log(someone)\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
{name: 'Mike', age: 20}\r
\`\`\`\r
\r
自定义的属性在扩展运算符前面，则变成设置新对象默认属性值。\r
\r
\`\`\`javascript\r
let user = {\r
    name: "Bob",\r
    age: 20\r
}\r
let someone = { name: "Mike", age: 18, ...user}\r
\r
console.log(someone)\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
{name: 'Bob', age: 20}\r
\`\`\`\r
\r
### 对象新增方法\r
\r
#### \`Object.assign()\`\r
\r
\`Object.assign()\`用于将源对象的所有可枚举属性复制到目标对象中。\r
\r
语法\r
\r
\`\`\`javascript\r
Object.assign(target, source1, source2, ..., sourceN)\r
\`\`\`\r
\r
基本用法\r
\r
\`\`\`javascript\r
let target = { a: 1 }\r
let object2 = { b: 2 }\r
let object3 = { c: 3 }\r
Object.assign(target, object2, object3) \r
\`\`\`\r
\r
其中第一个参数是目标对象，后面的参数是源对象。此时\`target\`的值为\r
\r
\`\`\`javascript\r
{a: 1, b: 2, c: 3}\r
\`\`\`\r
\r
如果目标对象和源对象有同名属性，或者多个源对象有同名属性，则后面的属性会覆盖前面的属性。\r
\r
\`\`\`javascript\r
let target = { a: 1 }\r
let object2 = { b: 2 }\r
let object3 = { c: 3 }\r
let object4 = { c: 4 }\r
Object.assign(target, object2, object3, object4) \r
\`\`\`\r
\r
\`object3\`和\`object4\`对象有同名属性\`c\`，那么后面\`object4\`的属性会覆盖\`object3\`的属性，此时\`taget\`的值为\r
\r
\`\`\`javascript\r
{a: 1, b: 2, c: 4}\r
\`\`\`\r
\r
如果该函数只有一个参数，当参数为对象时，直接返回该对象；当参数不是对象时，会先将参数转为对象然后返回。\r
\r
当参数不是对象时\r
\r
\`\`\`javascript\r
Object.assign(3)\r
\`\`\`\r
\r
会返回\r
\r
\`\`\`console\r
Number {3}\r
\`\`\`\r
\r
数字3被包装成了一个\`Number\`对象，这种情况通常无意义，不建议使用。\r
\r
当参数为\`null\`或\`undefined\`时，因为\`null\`和\`undefined\`不能转化为对象，所以会报错。\r
\r
\`\`\`javascript\r
Object.assign(null)\r
Object.assign(undefined)\r
\`\`\`\r
\r
控制台打印错误信息\r
\r
\`\`\`console\r
Uncaught TypeError TypeError: Cannot convert undefined or null to object\r
\`\`\`\r
\r
当参数不止一个时，\`null\`和\`undefined\`不放第一个，即不为目标对象时，会跳过\`null\`和\`undefined\`，不报错。\r
\r
\`\`\`javascript\r
Object.assign(1, undefined)\r
Object.assign({ a: 1 }, null)\r
Object.assign(undefined, { a: 1 })\r
\`\`\`\r
\r
在控制台分别输出上述代码的值为\r
\r
\`\`\`console\r
Number {1}\r
{a: 1}\r
Uncaught TypeError TypeError: Cannot convert undefined or null to object\r
\`\`\`\r
\r
要注意的是，\`assign\`的属性拷贝是浅拷贝。\r
\r
**浅拷贝**是创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值；如果属性是引用类型，拷贝的就是内存地址。\r
\r
#### Object.is()\r
\r
用来比较两个值是否严格相等，与（\`===\`）基本类似。\r
\r
语法\r
\r
\`\`\`javascript\r
Object.is(value1, value2)\r
\`\`\`\r
\r
基本用法\r
\r
\`\`\`javascript\r
Object.is("q", "q")\r
Object.is(1, 1)\r
Object.is([1], [1])\r
Object.is({ q: 1 }, { q: 1 })\r
\`\`\`\r
\r
几个表达式的值分别为\r
\r
\`\`\`javascript\r
true\r
true\r
false\r
false\r
\`\`\`\r
\r
\`Object.is([1], [1])\`的值为\`false\`的原因是这个表达式等同于下面\r
\r
\`\`\`javascript\r
const arr1 = [1]\r
const arr2 = [1]\r
Object.is(arr1, arr2) \r
\`\`\`\r
\r
每次使用数组字面量\`[]\`都会创建一个**新的数组对象**，即使内容相同，它们也是不同的对象引用。\r
\r
而\`Object.is({ q: 1 }, { q: 1 })\`的值为\`false\`的原因与数组字面量\`[]\`类似，上述表达式等同于下面\r
\r
\`\`\`javascript\r
const obj1 = { q: 1 }\r
const obj2 = { q: 1 }\r
Object.is(obj1, obj2)\r
\`\`\`\r
\r
每次使用对象字面量\`{}\`都会创建一个**新的对象**，即使属性相同，它们也是不同的对象引用。\r
\r
与（\`===\`）的区别\r
\r
\`Object.is(+0, -0)\`和\`Object.is(NaN, NaN)\`的值均为\`true\`，而\`+0 === -0\`和\`NaN === NaN\`的值均为\`false\`。\r
`;export{n as default};
