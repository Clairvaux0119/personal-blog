---
title: Promise对象
date: 2025-10-01
tags: ["javascript", "Promise", "ES6"]
excerpt: "ES6 Promise对象"
---

## Promise对象

### 基本概念

Promise是异步编程的一种解决方案，比传统的解决方案（回调函数和事件）更合理也更强大。它由社区最早提出和实现，ES6将其写进了语言标准，统一了用法，原生提供了`Promise`对象。

`Promise`简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise是一个对象，通过它可以获取异步操作的消息。Promise提供统一的API，各种异步操作都可以用同样的方法进行处理。

利用`Promise`对象，可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，`Promise`对象提供统一的接口，使得控制异步操作更加容易。

### 基本用法

ES6规定，`Promise`对象是一个构造函数，用来生成`Promise`实例。

```javascript
const promise = new Promise((resolve, reject) => {
    // 异步操作
    if (/* 操作成功 */) {
        resolve(value) // 状态变为 fulfilled
    } else {
        reject(error)  // 状态变为 rejected
    }
})
```

`Promise`构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`。它们是两个函数，有JavaScript引擎提供，不用自己部署。

### Promise状态

#### 特点

Promise异步操作有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。除了异步操作的结果，任何其他操作都无法改变这个状态。

Promise对象只有：从pending变为fulfilled和从pending变为rejected的状态改变。只要处于fulfilled和rejected，状态就不会再变了即resolved（已定型）。

```javascript
const p1 = new Promise(function (resolve, reject) {
    resolve('success1')
    resolve('success2')
})
const p2 = new Promise(function (resolve, reject) {
    resolve('success3')
    reject('reject')
})

p1.then(value => {
    console.log(value)
})
p2.then(value => {
    console.log(value)
})
```

`p1`中第一次`resolve`将状态更改为fulfilled，第二次`resolve`会被忽略。同样的`p2`中`resolve`将状态更改为fulfilled之后，`reject`便不能再将状态更改为`rejected`。

控制台输出

```console
success1
success3
```

对于Promise来说只有第一次`resolve`/`reject`有效，后续的状态改变会被静默忽略。

#### 缺点

+ 无法取消Promise，一旦新建它就会立即执行，无法中途取消。

+ 如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部。

+ 当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

### `then`方法

`then`方法接收两个函数作为参数，第一个参数是`Promise`执行成功时的回调，第二个参数是`Promise`执行失败时的回调，两个函数只会有一个被调用。

#### `then`方法的特点

在JavaScript事件队列的当前运行完成之前，回调函数永远不会被调用。

```javascript
const p = new Promise(function(resolve,reject){
  resolve('success')
})

p.then(value => {
  console.log(value)
})

console.log('first')
```

执行流程

1. 同步执行：Promise执行器函数立即执行
2. 微任务队列：`.then()`回调被放入微任务队列
3. 继续同步代码：执行`console.log('first')`
4. 事件循环：当调用栈清空后，从微任务队列取出`.then()`回调执行

控制台输出

```console
first
success
```

通过`.then`形式添加的回调函数，不论什么时候，都会被调用。可以通过`.then`添加多个回调函数，它们会按照插入顺序并且独立运行。

Promise链式调用

```javascript
const p = new Promise(function (resolve, reject) {
    resolve(1)
}).then(value => {
    console.log(value)
    return value * 2
}).then(value => {
    console.log(value)
}).then(value => {
    console.log(value)
    return Promise.resolve('resolve')
}).then(value => {
    console.log(value)
    return Promise.reject('reject')
}).then(value => {
    console.log('resolve:' + value)
}, error => {
    console.log('reject:' + error)
})
```

执行过程

```ascii
第一个then：接受数据1，返回2
                ↓
第二个then：接受数据2，控制台打印2，没有return隐式返回undefined
                ↓
第三个then：接受数据undefined，控制台打印undefined，返回解决的Promise
                ↓
第四个then：接受数据resolve，控制台打印resolve，返回拒绝的Promise
                ↓
第五个then：接受数据reject，跳过成功回调，执行错误回调，控制台打印reject:reject
```

控制台输出

```console
1
2
undefined
resolve
reject:reject
```

### Promise加载图片示例

```html
<div id="box">等待加载…</div>
<script>
    let box = document.getElementById("box")

    function loadImageAsync(url) {
        const promise = new Promise(function (resolve, reject) {
            // 异步处理
            const image = new Image()

            image.addEventListener("load", function () {
                resolve(image)
            })

            image.addEventListener("error", function () {
                reject(new Error(`无法加载图片: ${url}`))
            })

            image.src = url
        })

        return promise
    }

    const promise = loadImageAsync("./image/异步加载测试图片.png")

    promise.then(data => {
        // 成功
        box.innerHTML = ""
        box.appendChild(data)
    }, error => {
        // 失败
        box.innerHTML = "图片加载失败"
        console.log(error)
    })
</script>
```

### Promise Ajax实操

Ajax（Asynchronous JavaScript and XML）是一种创建快速动态网页的技术，它允许网页在不重新加载整个页面的情况下，与服务器交换数据并更新部分网页内容。

Promise封装Ajax，让网络请求的异步操作变得更加简单。

```javascript
// XHR（XML Http Request）对象
const getJSON = function (url) {
    const promise = new Promise(function(resolve, reject) {
        // 异步操作：网络请求代码
        const handler = function () {
            if(this.readyState !== 4) {
                return
            }

            if (this.status === 200) {
                resolve(this.response)
            } else {
                reject(new Error(this.statusText))
            }
        }

        const client = new XMLHttpRequest()

        client.open("GET", url)
        client.onreadystatechange = handler
        client.responseType = "json"
        client.setRequestHeader("Accept", "application/json")
        client.send()
    })

    return promise
}

getJSON("http://127.0.0.1:5500/learn.-gite.io/post.html?id=md-Promise%E5%AF%B9%E8%B1%A1")
.then(data => {
    console.log(`请求成功：${data}`)
}).catch(error => {
    console.log(`请求失败：${error}`)
})
```

控制台输出

```console
请求成功：null
```
