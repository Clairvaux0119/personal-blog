const n=`---\r
title: Date对象\r
date: 2025-09-05\r
tags: ["javascript", "Date对象"]\r
excerpt: "Date对象相关方法"\r
---\r
\r
## Date对象\r
\r
\`Date\`对象是JavaScript原生的时间库。它以1970年1月1日作为时间的零点，可以表示时间范围是前后各1亿天（单位为毫秒）。\r
\r
### Date.now()\r
\r
\`Date.now()\`方法返回当前时间距离时间零点（1970年1月1日 00:00:00 UTC）的毫秒数，相当于Unix时间戳乘以1000。\r
\r
\`\`\`javascript\r
console.log(Date.now())\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
1757324499950\r
\`\`\`\r
\r
>**时间戳**\r
>\r
>时间戳是指格林尼治时间1970年1月1日 00:00:00 起至现在的总秒数，不包闰秒。\r
\r
### Date.get*()\r
\r
\`Date\`对象提供了一系列\`get*\`方法，用来获取对象某个方面的值。\r
\r
>**实例方法get类**\r
>\r
>getTime(): 返回实例对象距离1970-01-01 00:00:00 UTC的毫秒数\r
>getDate(): 返回实例对象对应每个月的几号（从1开始）\r
>getDay(): 返回星期几，星期日为0，星期一为1，以此类推\r
>getYear(): 返回距离1900年的年数\r
>getFullYear(): 返回四位的年数\r
>getMonth(): 返回月份（0表示1月，11表示12月）\r
>getHours(): 返回小时（0-23）\r
>getMilliseconds(): 返回毫秒（0-999）\r
>getMinutes(): 返回分钟（0-59）\r
>getSeconds(): 返回秒（0-59）\r
\r
\`\`\`javascript\r
let d = new Date('January 6, 2025')\r
\r
console.log(d.getDate())\r
console.log(d.getMonth())\r
console.log(d.getYear())\r
console.log(d.getFullYear())\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
6\r
0\r
125\r
2025\r
\`\`\`\r
`;export{n as default};
