const n=`---\r
title: Set数据结构\r
date: 2025-09-29\r
tags: ["javascript", "Set", "ES6"]\r
excerpt: "ES6 Set数据结构及方法"\r
---\r
\r
## Set数据结构\r
\r
ES6提供了新的数据结构Set，它类似于数组。Set对象允许你存储任何类型的**唯一值**，无论是原始值或者是对象引用。\r
\r
\`Set\`本身是一个构造函数，用来生成Set数据结构。\r
\r
\`\`\`javascript\r
const s = new Set();\r
let arr = [10, 20, 20, 30, 40, 40, "number", true];\r
\r
arr.forEach(x => s.add(x));\r
console.log(s);\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
Set(6) {size: 6, 10, 20, 30, 40, number, true}\r
\`\`\`\r
\r
可以看到，通过\`add()\`方法向Set数据结构加入成员的结果并不会添加重复的值。\r
\r
\`Set\`函数也可以接受一个数组作为参数\r
\r
\`\`\`javascript\r
const set = new Set([1, 2, 2, 3, 4]);\r
\r
console.log(set);\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
Set(4) {size: 4, 1, 2, 3, 4}\r
\`\`\`\r
\r
这种方式可以快速去除数组（字符串也可以）中的重复对象。\r
\r
### Set中的特殊值\r
\r
\`Set\`对象存储的值总是唯一的，所以需要判断两个值是否恒等。有几个特殊值需要特殊对待。\r
\r
|值比较|严格相等\`===\`|\`Set\`处理|\r
|---|---|---|\r
|+0 === -0|true|不重复|\r
|undefined === undefined|true|不重复|\r
|NaN === NaN|false|不重复（特殊处理）|\r
|{…} === {…}|false|重复添加（不同引用）|\r
|null === null|true|不重复|\r
\r
### 类型转换\r
\r
#### Array\r
\r
Array转Set\r
\r
\`\`\`javascript\r
let mySet = new Set(["value1", "value2", "value3"]);\r
\`\`\`\r
\r
Set转Array\r
\r
\`\`\`javascript\r
let myArray = [...mySet];\r
\`\`\`\r
\r
#### String\r
\r
String转Set\r
\r
\`\`\`javascript\r
let mySet = new Set('hello');\r
\`\`\`\r
\r
\`mySet\`的值为\r
\r
\`\`\`console\r
Set(4) {size: 4, h, e, l, o}\r
\`\`\`\r
\r
Set转String\r
\r
\`Set\`中\`toString\`方法是不能将\`Set\`转换成\`String\`，可以先将\`Set\`转换成\`Array\`，再使用\`jion()\`将\`Array\`转成\`String\`。\r
\r
\`\`\`javascript\r
let myString = [...mySet].join("");\r
\`\`\`\r
\r
\`mySet\`的值为\r
\r
\`\`\`console\r
helo\r
\`\`\`\r
\r
### Set 对象作用\r
\r
#### 数组去重\r
\r
\`\`\`javascript\r
let mySet = new Set([1, 2, 3, 4, 4]);\r
[...mySet]; // [1, 2, 3, 4]\r
\`\`\`\r
\r
#### 并集\r
\r
\`\`\`javascript\r
let a = new Set([1, 2, 3]);\r
let b = new Set([4, 3, 2]);\r
let union = new Set([...a, ...b]); // {1, 2, 3, 4}\r
\`\`\`\r
\r
#### 交集\r
\r
\`\`\`javascript\r
let a = new Set([1, 2, 3]);\r
let b = new Set([4, 3, 2]);\r
let intersect = new Set([...a].filter(x => b.has(x))); // {2, 3}\r
\`\`\`\r
\r
#### 差集\r
\r
\`\`\`javascript\r
let a = new Set([1, 2, 3]);\r
let b = new Set([4, 3, 2]);\r
let difference = new Set([...a].filter(x => !b.has(x))); // {1}\r
\`\`\`\r
\r
### size属性\r
\r
\`Set\`的size属性返回\`Set\`实例的成员总数。\r
\r
\`\`\`javascript\r
let mySet = new Set([1, 2, 2, 3, 4, 4]);\r
\r
console.log(mySet.size);\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
4\r
\`\`\`\r
\r
### Set数据结构方法\r
\r
### \`add()\`\r
\r
可以使用\`add()\`方法向Set数据结构添加值。\r
\r
\`\`\`javascript\r
let mySet = new Set();\r
\r
mySet.add(1);\r
console.log(mySet);\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
Set(1) {size: 1, 1}\r
\`\`\`\r
\r
### \`delete()\`\r
\r
\`delete()\`方法作用是删除某个值，返回一个布尔值表示是否删除。\r
\r
\`\`\`javascript\r
let mySet = new Set([1, 2, 3, 4]);\r
\r
console.log("删除前：", mySet);\r
\r
let flag = mySet.delete(3);\r
console.log("是否删除？", flag);\r
console.log("删除后：", mySet);\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
删除前： Set(4) {size: 4, 1, 2, 3, 4}\r
是否删除？ true\r
删除后： Set(3) {size: 3, 1, 2, 4}\r
\`\`\`\r
\r
### \`has()\`\r
\r
\`has()\`方法返回一个布尔值，表示该值是否为\`Set\`的成员。\r
\r
\`\`\`javascript\r
let mySet = new Set([1, 2, 3, 4]);\r
\r
let flag1 = mySet.has(1);\r
let flag2 = mySet.has(5);\r
\r
console.log("是否包含1？", flag1);\r
console.log("是否包含5？", flag2);\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
是否包含1？ true\r
是否包含5？ false\r
\`\`\`\r
\r
### \`clear()\`\r
\r
\`clear()\`方法清除Set中的所有数据，没有返回值。\r
\r
\`\`\`javascript\r
let mySet = new Set([1, 2, 3, 4]);\r
        \r
console.log("clear前：", mySet);\r
mySet.clear();\r
console.log("clear后：", mySet);\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
clear前： Set(4) {size: 4, 1, 2, 3, 4}\r
clear后： Set(0) {size: 0}\r
\`\`\`\r
`;export{n as default};
