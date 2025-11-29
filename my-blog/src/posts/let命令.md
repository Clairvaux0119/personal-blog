---
title: let命令
date: 2025-09-19
tags: ["javascript", "let", "ES6"]
excerpt: "`ES6`新增命令`let`"
---

## let命令

`ES6`新增了`let`命令，用来声明变量。它的用法类似于`var`，但是所声明的变量，只在`let`命令所在的代码块内有效。

### let块级作用域

`let`命令是块级作用域，`var`命令是函数作用域。

`let`声明的变量只在声明它的代码块内可用。`var`声明的变量在整个函数内部可用（如果在函数内声明）。`var`声明的变量如果在函数外声明，会成为全局变量

```javascript
{
    let name = "Bob"
    var age = 18
}

console.log(name)
console.log(age)

function user() {
    console.log("let定义的name变量：", name)
    console.log("var定义的age变量：", age)
}

user()
console.log("函数中let定义的name变量：", username)
console.log("函数中var定义的name变量：", password)
```

运行代码后

对于前面两个打印控制台输出

```console
let定义的name变量： 
var定义的age变量： 18
```

对于后面两个控制台提示

```console
Uncaught ReferenceError ReferenceError: username is not defined
Uncaught ReferenceError ReferenceError: password is not defined
```

### `let`命令的实际应用

#### `for`循环计数器

在`for`循环计数器中，使用`let`命令更加适合。

```javascript
for (let i = 0; i < 10; i++) {
        // 一些操作
    }

    console.log(i)
```

控制台输出

```console
Uncaught ReferenceError ReferenceError: i is not defined
```

如果使用`var`命令

```javascript
var a = []

for (var i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i)
    }
}

a[6]()
```

我们期待的是输出6，但控制台实际输出

```console
10
```

`var`循环执行完成后

|`i`|`10`|
|---|---|
|`a[0]`|`function() { console.log(i) }`|
|`a[1]`|`function() { console.log(i) }`|
|...|...|
|`a[6]`|`function() { console.log(i) }`|
|...|...|
|`a[9]`|`function() { console.log(i) }`|

所有函数共享同一个`i`，循环结束后`i`的值为10。所以无论`a[n]()`中`n`取0~9中哪个值，控制台打印的值都是`i`（10）。

如果使用`let`命令

```javascript
var a = []

for (let i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    };
}

a[6]()
```

控制台输出

```console
6
```

`let`循环执行完成后

|`i`|`10`|
|---|---|
|`a[0]`|`function() { console.log(0) }`|
|`a[1]`|`function() { console.log(1) }`|
|...|...|
|`a[6]`|`function() { console.log(6) }`|
|...|...|
|`a[9]`|`function() { console.log(9) }`|

由于`let`是块级作用域，每次循环都会创建一个新的变量`i`，每个函数捕获的都是当前循环的`i`值，而不是共享引用。所以`a[6]()`输出的值是6。

#### `let`不存在变量提升

`var`命令会发生“变量提升”现象，即变量可以在声明之前使用，值为`undefined`。为了纠正这种情况，`let`命令所声明的变量一定要在声明后使用，否则会报错。

```javascript
// var定义变量
console.log("var:", foo)
var foo = 2

// let定义变量
console.log("let:", bar)
let bar = 4
```

控制台输出

```console
var: undefined
Uncaught ReferenceError ReferenceError: Cannot access 'bar' before initialization
```

#### `let`不允许重复声明

`let`不允许在相同作用域内重复声明同一个变量。

```javascript
let i = 10
let i = 20

console.log(i)
```

控制台输出

```console
Uncaught SyntaxError SyntaxError: Identifier 'i' has already been declared
```

如果使用`var`命令声明

```javascript
var i = 10
var i = 20

console.log(i)
```

控制台输出

```console
20
```

利用`var`命令后面声明的变量会覆盖掉前面声明的变量。
