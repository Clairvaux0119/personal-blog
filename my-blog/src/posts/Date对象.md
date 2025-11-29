---
title: Date对象
date: 2025-09-05
tags: ["javascript", "Date对象"]
excerpt: "Date对象相关方法"
---

## Date对象

`Date`对象是JavaScript原生的时间库。它以1970年1月1日作为时间的零点，可以表示时间范围是前后各1亿天（单位为毫秒）。

### Date.now()

`Date.now()`方法返回当前时间距离时间零点（1970年1月1日 00:00:00 UTC）的毫秒数，相当于Unix时间戳乘以1000。

```javascript
console.log(Date.now())
```

输出结果

```console
1757324499950
```

>**时间戳**
>
>时间戳是指格林尼治时间1970年1月1日 00:00:00 起至现在的总秒数，不包闰秒。

### Date.get*()

`Date`对象提供了一系列`get*`方法，用来获取对象某个方面的值。

>**实例方法get类**
>
>getTime(): 返回实例对象距离1970-01-01 00:00:00 UTC的毫秒数
>getDate(): 返回实例对象对应每个月的几号（从1开始）
>getDay(): 返回星期几，星期日为0，星期一为1，以此类推
>getYear(): 返回距离1900年的年数
>getFullYear(): 返回四位的年数
>getMonth(): 返回月份（0表示1月，11表示12月）
>getHours(): 返回小时（0-23）
>getMilliseconds(): 返回毫秒（0-999）
>getMinutes(): 返回分钟（0-59）
>getSeconds(): 返回秒（0-59）

```javascript
let d = new Date('January 6, 2025')

console.log(d.getDate())
console.log(d.getMonth())
console.log(d.getYear())
console.log(d.getFullYear())
```

输出结果

```console
6
0
125
2025
```
