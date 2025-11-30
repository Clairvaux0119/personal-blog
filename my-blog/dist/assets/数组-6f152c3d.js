const r=`---\r
title: 数组\r
date: 2025-09-02\r
tags: ["javascript", "数组"]\r
excerpt: "学习使用数组和数组方法"\r
---\r
\r
## 数组\r
\r
数组 (array) 是按照次序排列的一组值。每个值的位置都有编号（从0开始），整个数组用方括号表示。\r
\r
\`\`\`javascript\r
let arr = ['It', 'is', 'an', 'apple']\r
\`\`\`\r
\r
两端方括号\`[]\`是数组的标志。\`It\`是0号位置，\`is\`是1号位置，\`an\`是2号位置，\`apple\`是3号位置。\r
\r
除了在定义时赋值，数组也可以先定义后赋值。\r
\r
\`\`\`javascript\r
let arr = []\r
\r
arr[0] = 'It'\r
arr[1] = 'is'\r
arr[2] = 'an'\r
arr[3] = 'apple'\r
\`\`\`\r
\r
任何类型的数据，都可以放入数组中。\r
\r
\`\`\`javascript\r
let arr = [100, [1, 2, 3], false, 'char']\r
\`\`\`\r
\r
下标未赋值的话。\r
\r
\`\`\`javascript\r
let arr = ['It', 'is', 'an', 'apple']\r
console.log(arr)\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
['It', 'is', 'an', 'apple']\r
\`\`\`\r
\r
如果数组下标大于数组长度。\r
\r
\`\`\`javascript\r
let arr = ['It', 'is', 'an', 'apple']\r
console.log(arr[5])\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
undefined\r
\`\`\`\r
\r
如果数组内部嵌套其他数组，这个数组即为N维数组，\`N = 数组嵌套层数\`。\r
\r
\`\`\`javascript\r
let arr = [[1, 2], [3, 4]]\r
console.log(arr[0][1])\r
console.log(arr[1][0])\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
2\r
3\r
\`\`\`\r
\r
### length属性\r
\r
数组的length属性返回的是数组的成员数量。\r
\r
\`\`\`javascript\r
let arr = ['It', 'is', 'an', 'apple']\r
console.log(arr.length)\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
4\r
\`\`\`\r
\r
## 数组的遍历\r
\r
数组的遍历可以考虑使用for循环或while循环。\r
\r
\`\`\`javascript\r
let arr = ['It', 'is', 'an', 'apple']\r
        \r
// for循环\r
console.log('for循环:')\r
for (let i = 0; i < arr.length; i++) {\r
    console.log(arr[i])\r
}\r
\r
// while循环\r
console.log('while循环:')\r
let i = 0\r
while (i < arr.length) {\r
    console.log(arr[i])\r
    i++\r
}\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
for循环:\r
It\r
is\r
an\r
apple\r
while循环:\r
It\r
is\r
an\r
apple\r
\`\`\`\r
\r
也可以使用for...in遍历数组。\r
\r
\`\`\`javascript\r
let arr = ['It', 'is', 'an', 'apple']\r
\r
for(let i in arr) {\r
            console.log(arr[i])\r
        }\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
It\r
is\r
an\r
apple\r
\`\`\`\r
\r
## 数组方法\r
\r
### 数组静态方法 Array.isArray()\r
\r
\`Array.isArray()\`方法返回一个布尔值，表示参数是否为数组。他可以弥补\`typeof\`运算符的不足。\r
\r
\`\`\`javascript\r
let arr = ['It', 'is', 'an', 'apple']\r
\r
console.log(typeof(arr))\r
console.log(typeof(arr))\r
\r
if (Array.isArray(arr)) {\r
    console.log('Array')\r
} else {\r
    console.log('Not Array')\r
}\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
object\r
Array\r
\`\`\`\r
\r
### push()/pop()\r
\r
\`push()\`方法用于在数组的**末端**添加一个或多个元素，并返回添加新元素后的**数组长度**。注意，该方法会改变原数组。\r
\r
\`\`\`javascript\r
let arr = []\r
console.log(arr.push('Hello'))\r
console.log(arr.push('World'))\r
console.log(arr.push('!'))\r
console.log(arr.push(true))\r
console.log(arr)\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
1\r
2\r
3\r
4\r
['Hello', 'World', '!', true]\r
\`\`\`\r
\r
\`pop()\`方法用于删除数组的最后一个元素，并返回该元素。注意，该方法会改变原数组。\r
\r
\`\`\`javascript\r
console.log(arr.pop())\r
console.log(arr)\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
true\r
['Hello', 'World', '!']\r
\`\`\`\r
\r
### shift()/unshift\r
\r
\`shift()\`方法用于删除数组的**第一个**元素，并返回该元素。注意，该方法会改变原数组。\r
\r
\`\`\`javascript\r
let arr = ['Hello', 'World', '!']\r
\r
console.log(arr)\r
console.log(arr.shift())\r
console.log(arr)\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
['Hello', 'World', '!']\r
Hello\r
['World', '!']\r
\`\`\`\r
\r
利用\`shift()\`方法可以遍历并清空一个数组。\r
\r
\`\`\`javascript\r
let list = [1, 2, 3, 4, 5]\r
let item\r
\r
console.log(list)\r
\r
while (item = list.shift()) {\r
    console.log(item)\r
}\r
\r
console.log(list)\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
[1, 2, 3, 4, 5]\r
1\r
2\r
3\r
4\r
5\r
[]\r
\`\`\`\r
\r
**注意** 如果数组中的元素包含0, \`false\`, \`null\`, \`undefined\`等，并不能完整的遍历整个数组。\r
\r
\`\`\`javascript\r
let list = [0, 1, 2, 3, 4, 5]\r
let item\r
\r
console.log(list)\r
\r
while (item = list.shift()) {\r
    console.log(item)\r
}\r
\r
console.log(list)\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
[0, 1, 2, 3, 4, 5]\r
0\r
[1, 2, 3, 4, 5]\r
\`\`\`\r
\r
尝试改成\r
\r
\`\`\`javascript\r
let list = [0, 1, 2, 3, 4, 5]\r
let item\r
\r
console.log(list)\r
\r
while (list.length) {\r
            ietm = list.shift()\r
            console.log(ietm)\r
        }\r
\r
console.log(list)\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
[0, 1, 2, 3, 4, 5]\r
0\r
1\r
2\r
3\r
4\r
5\r
[]\r
\`\`\`\r
\r
\`unshift()\`方法用于在数组的第一个位置添加元素，并返回添加新元素后的**数组长度**。注意，该方法会改变原数组。\r
\r
\`\`\`javascript\r
let arr = ['Hello', 'World', '!']\r
        \r
console.log(arr)\r
console.log(arr.unshift('Please'))\r
console.log(arr)\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
['Hello', 'World', '!']\r
4\r
['Please', 'Hello', 'World', '!']\r
\`\`\`\r
\r
\`unshift()\`方法可以接受多个参数，这些参数都会添加到目标数组头部。\r
\r
\`\`\`javascript\r
let arr = ['Hello', 'World', '!']\r
        \r
console.log(arr)\r
console.log(arr.unshift('Please', 'say'))\r
console.log(arr)\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
['Hello', 'World', '!']\r
5\r
['Please', 'say', 'Hello', 'World', '!']\r
\`\`\`\r
\r
### join()\r
\r
\`join()\`用于以指定参数作为分隔符，将所有数组成员连接为一个**字符串**返回。如果不提供参数，默认用逗号分隔。\r
\r
\`\`\`javascript\r
let arr = [1, 2, 3, 4]\r
        \r
console.log(arr.join(' '))\r
console.log(arr.join('|'))\r
console.log(arr.join())\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
1 2 3 4\r
1|2|3|4\r
1,2,3,4\r
\`\`\`\r
\r
如果数组成员是\`undefined\`或\`null\`或空位，会被转成空字符串。\r
\r
\`\`\`javascript\r
let arr1 = ['a', undefined, null, 'b']\r
let arr2 = ['a', , 'b']\r
\r
console.log(arr1.join('#')) \r
console.log(arr2.join('-'))\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
a###b\r
a--b\r
\`\`\`\r
\r
数组的\`join()\`和字符串的\`spilt()\`可以实现数组与字符串的互换。\r
\r
\`\`\`javascript\r
let arr = ['a', 'b', 'c']\r
let myArr = arr.join('')\r
\r
console.log(myArr)\r
console.log(myArr.split(''))\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
abc\r
['a', 'b', 'c']\r
\`\`\`\r
\r
### concat()\r
\r
\`concat()\`方法用于多个数组的合并。它将新数组的成员添加到原数组成员的尾部，然后返回一个新数组，**原数组不变**。\r
\r
\`\`\`javascript\r
let arr1 = ['Hello']\r
let arr2 = ['World']\r
\r
console.log(arr1.concat(arr2))\r
console.log(arr1)\r
console.log(arr2)\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
['Hello', 'World']\r
['Hello']\r
['World']\r
\`\`\`\r
\r
除了数组作为参数，\`concat()\`也接受其他类型的值作为参数，添加目标数组尾部。\r
\r
\`\`\`javascript\r
let arr = [1, 2, 3]\r
\r
console.log(arr.concat(4, 5, '6'))\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
[1, 2, 3, 4, 5, '6']\r
\`\`\`\r
\r
>**应用场景**\r
>\r
>上拉加载，合并数据\r
\r
对于下面的代码\r
\r
\`\`\`javascript\r
let arr = [1, 2, 3]\r
\r
console.log(arr.concat(4, 5, 6, [7, 8, 9]))\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
[1, 2, 3, 4, 5, 6, 7, 8, 9]\r
\`\`\`\r
\r
>**\`concat()\` 处理规则**\r
>\r
>对于基本类型值（数字、字符串等）：直接添加到新数组。  \r
>对于数组：展开数组，将其元素逐个添加到新数组。\r
\r
\`concat()\`方法的特点：\r
\r
+ **不修改原数组**：返回新数组，原数组保持不变\r
\r
+ **浅层展开**：只展开一层的数组，不会递归展开嵌套数组。\r
\r
+ **支持多个参数**：可以同时传入多个值或数组。\r
\r
+ **类型保持**：保持原始元素的类型。\r
\r
ES6中的扩展运算符可以实现类似效果。\r
\r
\`\`\`javascript\r
let arr1 = ['Hello']\r
let arr2 = ['World']\r
\r
console.log(arr1.concat(arr2))\r
console.log([...arr1, ...arr2])\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
['Hello', 'World']\r
['Hello', 'World']\r
\`\`\`\r
\r
### reverse()\r
\r
\`reverse()\`方法用于颠倒排列数组元素，返回改变后的数组。注意，该方法将改变原数组。\r
\r
\`\`\`javascript\r
let arr = ['a', 'b', 'c']\r
\r
console.log(arr)\r
console.log(arr.reverse())\r
console.log(arr)\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
['a', 'b', 'c']\r
['c', 'b', 'a']\r
['c', 'b', 'a']\r
\`\`\`\r
\r
如果要实现一个字符串的反转排列\r
\r
\`\`\`javascript\r
let str = 'hello'\r
console.log(str.split('').reverse().join(''))\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
olleh\r
\`\`\`\r
\r
### indexOf()\r
\r
\`indexOf()\`方法返回给定元素在数组中**第一次**出现的位置，如果没有出现则返回-1。\r
\r
\`\`\`javascript\r
let arr = ['a', 'b', 'c', 'b']\r
\r
console.log(arr.indexOf('b'))\r
console.log(arr.indexOf('d'))\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
1\r
-1\r
\`\`\`\r
\r
\`indexOf()\`方法还可以接受第二个参数，表示搜索开始位置（包括该位置）。\r
\r
\`\`\`javascript\r
console.log(arr.indexOf('b', 1))\r
console.log(arr.indexOf('b', 2))\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
1\r
-1\r
\`\`\`\r
`;export{r as default};
