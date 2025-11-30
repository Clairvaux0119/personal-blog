const n=`---\r
title: Math对象\r
date: 2025-09-04\r
tags: ["javascript", "Math对象"]\r
excerpt: "Math对象相关方法"\r
---\r
\r
## Math对象\r
\r
\`Math\`是JavaScript的原生对象，提供各种数学功能。\r
\r
### Math.abs()\r
\r
\`Math.abs()\`方法返回参数值的绝对值\r
\r
\`\`\`javascript\r
console.log(Math.abs(1))\r
console.log(Math.abs(-1))\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
1\r
1\r
\`\`\`\r
\r
### Math.max(), Math.min()\r
\r
\`Math.max()\`方法返回参数之中最大的那个值，\`Math.min()\`方法返回最小的那个值。如果参数为空，\`Math.max()\`返回\`-infinity\`，\`Math.min()\`返回\`infinity\`。\r
\r
\`\`\`javascript\r
console.log(Math.max(2, -1, 5))\r
console.log(Math.min(2, -1, 5))\r
console.log(Math.max())\r
console.log(Math.min())\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
5\r
-1\r
-Infinity\r
Infinity\r
\`\`\`\r
\r
### Math.floor(), Math.ceil()\r
\r
\`Math.floor()\`方法返回小于参数值的最大整数。\r
\r
\`\`\`javascript\r
console.log(Math.floor(3.2))\r
console.log(Math.floor(-3.2))\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
3\r
-4\r
\`\`\`\r
\r
\`Math.ceil()\`方法返回大于参数值的最小整数。\r
\r
\`\`\`javascript\r
console.log(Math.ceil(3.2))\r
console.log(Math.ceil(-3.2))\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
4\r
-3\r
\`\`\`\r
\r
### Math.random()\r
\r
\`Math.random()\`返回0到1之间的一个伪随机数，可能等于0，但是一定小于1。即\`0 <= Math.random() < 1\`。\r
\r
\`\`\`javascript\r
console.log(Math.random())\r
\`\`\`\r
\r
输出结果 (随机的)\r
\r
\`\`\`console\r
0.3011892514710025\r
\`\`\`\r
\r
如果要生成任意范围的随机数。\r
\r
\`\`\`javascript\r
function getRandomArbitrary(min, max) {\r
    return Math.random()*(max - min) + min\r
}\r
\r
console.log(getRandomArbitrary(5, 10))\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
7.858985108327509\r
\`\`\`\r
`;export{n as default};
