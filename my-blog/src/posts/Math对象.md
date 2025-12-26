---
title: Math对象
date: 2025-09-04
tags: ["javascript", "Math对象"]
excerpt: "Math对象相关方法"
---

## Math对象

`Math`是JavaScript的原生对象，提供各种数学功能。

### Math.abs()

`Math.abs()`方法返回参数值的绝对值

```javascript
console.log(Math.abs(1))
console.log(Math.abs(-1))
```

输出结果

```console
1
1
```

### Math.ceil()

`Math.ceil()`方法可以对给定参数进行上舍入，它返回的是大于或等于函数参数的值，如果参数是一个整数则该值不变。

```javascript
console.log(Math.ceil(3.6))
console.log(Math.ceil(2))
console.log(Math.ceil(-1.5))
```

输出结果

```bash
4
2
-1
```

### Math.max(), Math.min()

`Math.max()`方法返回参数之中最大的那个值，`Math.min()`方法返回最小的那个值。如果参数为空，`Math.max()`返回`-infinity`，`Math.min()`返回`infinity`。

```javascript
console.log(Math.max(2, -1, 5))
console.log(Math.min(2, -1, 5))
console.log(Math.max())
console.log(Math.min())
```

输出结果

```console
5
-1
-Infinity
Infinity
```

### Math.floor(), Math.ceil()

`Math.floor()`方法返回小于参数值的最大整数。

```javascript
console.log(Math.floor(3.2))
console.log(Math.floor(-3.2))
```

输出结果

```console
3
-4
```

`Math.ceil()`方法返回大于参数值的最小整数。

```javascript
console.log(Math.ceil(3.2))
console.log(Math.ceil(-3.2))
```

输出结果

```console
4
-3
```

### Math.random()

`Math.random()`返回0到1之间的一个伪随机数，可能等于0，但是一定小于1。即`0 <= Math.random() < 1`。

```javascript
console.log(Math.random())
```

输出结果 (随机的)

```console
0.3011892514710025
```

如果要生成任意范围的随机数。

```javascript
function getRandomArbitrary(min, max) {
    return Math.random()*(max - min) + min
}

console.log(getRandomArbitrary(5, 10))
```

输出结果

```console
7.858985108327509
```
