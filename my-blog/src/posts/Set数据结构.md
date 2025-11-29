---
title: Set数据结构
date: 2025-09-29
tags: ["javascript", "Set", "ES6"]
excerpt: "ES6 Set数据结构及方法"
---

## Set数据结构

ES6提供了新的数据结构Set，它类似于数组。Set对象允许你存储任何类型的**唯一值**，无论是原始值或者是对象引用。

`Set`本身是一个构造函数，用来生成Set数据结构。

```javascript
const s = new Set()
let arr = [10, 20, 20, 30, 40, 40, "number", true]

arr.forEach(x => s.add(x))
console.log(s)
```

控制台输出

```console
Set(6) {size: 6, 10, 20, 30, 40, number, true}
```

可以看到，通过`add()`方法向Set数据结构加入成员的结果并不会添加重复的值。

`Set`函数也可以接受一个数组作为参数

```javascript
const set = new Set([1, 2, 2, 3, 4])

console.log(set)
```

控制台输出

```console
Set(4) {size: 4, 1, 2, 3, 4}
```

这种方式可以快速去除数组（字符串也可以）中的重复对象。

### Set中的特殊值

`Set`对象存储的值总是唯一的，所以需要判断两个值是否恒等。有几个特殊值需要特殊对待。

|值比较|严格相等`===`|`Set`处理|
|---|---|---|
|+0 === -0|true|不重复|
|undefined === undefined|true|不重复|
|NaN === NaN|false|不重复（特殊处理）|
|{…} === {…}|false|重复添加（不同引用）|
|null === null|true|不重复|

### 类型转换

#### Array

Array转Set

```javascript
let mySet = new Set(["value1", "value2", "value3"])
```

Set转Array

```javascript
let myArray = [...mySet]
```

#### String

String转Set

```javascript
let mySet = new Set('hello')
```

`mySet`的值为

```console
Set(4) {size: 4, h, e, l, o}
```

Set转String

`Set`中`toString`方法是不能将`Set`转换成`String`，可以先将`Set`转换成`Array`，再使用`jion()`将`Array`转成`String`。

```javascript
let myString = [...mySet].join("")
```

`mySet`的值为

```console
helo
```

### Set 对象作用

#### 数组去重

```javascript
let mySet = new Set([1, 2, 3, 4, 4])
[...mySet] // [1, 2, 3, 4]
```

#### 并集

```javascript
let a = new Set([1, 2, 3])
let b = new Set([4, 3, 2])
let union = new Set([...a, ...b]) // {1, 2, 3, 4}
```

#### 交集

```javascript
let a = new Set([1, 2, 3])
let b = new Set([4, 3, 2])
let intersect = new Set([...a].filter(x => b.has(x))) // {2, 3}
```

#### 差集

```javascript
let a = new Set([1, 2, 3])
let b = new Set([4, 3, 2])
let difference = new Set([...a].filter(x => !b.has(x))) // {1}
```

### size属性

`Set`的size属性返回`Set`实例的成员总数。

```javascript
let mySet = new Set([1, 2, 2, 3, 4, 4])

console.log(mySet.size)
```

控制台输出

```console
4
```

### Set数据结构方法

### `add()`

可以使用`add()`方法向Set数据结构添加值。

```javascript
let mySet = new Set()

mySet.add(1)
console.log(mySet)
```

控制台输出

```console
Set(1) {size: 1, 1}
```

### `delete()`

`delete()`方法作用是删除某个值，返回一个布尔值表示是否删除。

```javascript
let mySet = new Set([1, 2, 3, 4])

console.log("删除前：", mySet)

let flag = mySet.delete(3)
console.log("是否删除？", flag)
console.log("删除后：", mySet)
```

控制台输出

```console
删除前： Set(4) {size: 4, 1, 2, 3, 4}
是否删除？ true
删除后： Set(3) {size: 3, 1, 2, 4}
```

### `has()`

`has()`方法返回一个布尔值，表示该值是否为`Set`的成员。

```javascript
let mySet = new Set([1, 2, 3, 4])

let flag1 = mySet.has(1)
let flag2 = mySet.has(5)

console.log("是否包含1？", flag1)
console.log("是否包含5？", flag2)
```

控制台输出

```console
是否包含1？ true
是否包含5？ false
```

### `clear()`

`clear()`方法清除Set中的所有数据，没有返回值。

```javascript
let mySet = new Set([1, 2, 3, 4])
        
console.log("clear前：", mySet)
mySet.clear()
console.log("clear后：", mySet)
```

控制台输出

```console
clear前： Set(4) {size: 4, 1, 2, 3, 4}
clear后： Set(0) {size: 0}
```
