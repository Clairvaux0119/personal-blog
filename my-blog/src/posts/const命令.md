---
title: const命令
date: 2025-09-19
tags: ["javascript", "const", "ES6"]
excerpt: "`ES6`新增命令`const`"
---

## const命令

`const`声明一个只读的常量，常量的值不能改变。

```javascript
const PI = 3.1415

console.log(PI)
PI = 3
console.log(PI)
```

控制台输出

```console
3.1415
Uncaught TypeError TypeError: Assignment to constant variable.
```

声明常量`PI`之后就不能对其再进行赋值操作。

由于`const`声明的变量不能改变值，那么`const`一旦声明变量，就必须立即初始化，不能初始化之后再赋值。

```javascript
const foo

foo = 10
```

控制台输出

```console
Uncaught SyntaxError SyntaxError: Missing initializer in const declaration
```

`const`的作用域与`let`命令相同：只在声明所在的块级作用域内有效。

```javascript
{
    const foo = 10
}

console.log(foo)
```

控制台输出

```console
Uncaught ReferenceError ReferenceError: foo is not defined
```

`const`命令声明的变量与`let`命令声明的变量一样不进行提升。

```javascript
console.log(foo)

const foo = 10
```

控制台输出

```console
Uncaught ReferenceError ReferenceError: Cannot access 'foo' before initialization
```

`const`声明的常量不可以重复声明。

```javascript
var message = "hello"
let age = 18

const message = "bye"
const age = 20
```

控制台打印错误信息

```console
Uncaught SyntaxError SyntaxError: Identifier 'message' has already been declared

Uncaught SyntaxError SyntaxError: Identifier 'age' has already been declared
```
