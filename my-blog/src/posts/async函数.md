---
title: async函数
date: 2025-10-05
tags: ["javascript", "async", "ES6"]
excerpt: "ES6 async函数"
---

## async函数

```javascript
function print () {
    setTimeout(() => {
        console.log("定时器")
    }, 10)
    console.log("Hello")
}

print()
```

对于上面代码，期望的结果是控制台先输出定时器，然后输出Hello。但控制台实际上的输出结果为

```console
Hello
定时器
```

原因是`setTimeout()`定时器是异步操作，程序执行到定时器时不管有没有拿到结果都会继续往下执行，当打印完`Hello`后才拿到定时器的结果`定时器`。

想要按照同步操作的顺序先打印`定时器`，后打印`Hello`可以利用async函数解决。

ES2017标准引入了async函数，使得异步操作更加方便。async函数可以将异步操作变为同步操作。

### 基本语法

```javascript
async function name([param[, param[, ... param]]]) { statements }
```

其中

+ name: 函数名称。
+ param: 要传递给函数的参数的名称。
+ statements: 函数体语句。

### 返回值

`async`函数返回一个`Promise`对象，可以使用`then`方法添加回调函数。

```javascript
async function helloAsync() {
    return "helloAsync"
}

console.log(helloAsync())

helloAsync().then(v => {
    console.log(v)
})
```

控制台输出

```console
Promise {[[PromiseState]]: 'fulfilled', [[PromiseResult]]: 'helloAsync'}
helloAsync
```

### await

await操作符用于等待一个`Promise`对象, 它只能在异步函数`async function`内部使用。

#### 语法

```javascript
[return_value] = await expression
```

expression: 一个`Promise`对象或者任何要等待的值。

#### 返回值

返回Promise对象的处理结果。如果等待的不是Promise对象，则返回该值本身。

如果一个Promise被传递给一个await操作符，await将等待Promise正常处理完成并返回其处理结果。

### 示例代码

```javascript
function timeout(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log("定时器")
            resolve()
        }, ms)
    })
}

async function asyncPrint (ms, value) {
    await timeout(ms)
    console.log(value)
}

asyncPrint(10, "hello")
```

控制台输出

```console
定时器
hello
```
