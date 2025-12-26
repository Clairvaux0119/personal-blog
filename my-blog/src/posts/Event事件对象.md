---
title: Event事件对象
date: 2025-09-13
tags: ["javascript", "事件"]
excerpt: "Event事件对象"
---

## Event事件对象

事件发生之后，会产生一个事件对象，作为参数传给监听函数。

### Event对象属性

#### `Event.target`

```html
<button id="btn">按钮</button>

<script>
    let btn = document.getElementById("btn")

    btn.addEventListener("click", function(enent){
        console.log(event)
    })
</script>
```

点击按钮后控制台输出

```console
PointerEvent {isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0, …}
```

`Event.target`属性返回事件当前所在的节点。

```html
<button id="btn">按钮</button>

<script>
    let btn = document.getElementById("btn")

    btn.addEventListener("click", function(event){
        console.log(event.target)
    })
</script>
```

点击按钮后控制台输出

```console
<button id="btn">按钮</button>
```

#### `Event.type`

`Event.type`属性返回一个字符串，表示事件类型。事件的类型是在生成事件的时候。该属性**只读**。

```html
<button id="btn">按钮</button>

<script>
    let btn = document.getElementById("btn")

    btn.addEventListener("click", function(event){
        console.log(event.type)
    })
</script>
```

点击按钮后控制台输出

```console
click
```

### Event对象方法

Event对象提供了多个重要方法用于控制事件的行为和传播。

|方法|作用范围|影响|使用场景|
|---|---|---|---|
|preventDefault()|当前元素|阻止默认行为|表单验证、链接处理|
|stopPropagation()|传播过程|阻止向父元素传播|事件隔离、避免冲突|
|stopImmediatePropagation()|当前元素|阻止其他监听器|优先级控制、插件管理|

#### `Event.preventDefault()`

`Event.preventDefault()`方法作用是取消浏览器对当前事件的默认行为。比如点击链接后，浏览器默认会跳转到另一个页面，使用这个方法之后，就不会跳转了。

```html
<a href="https://baike.baidu.com/">百度百科</a>
<script>
    document.querySelector('a').addEventListener('click', function (event) {
        event.preventDefault()
        console.log('链接点击被阻止，不会跳转')
    })
</script>
```

点击链接后控制台输出

```console
链接点击被阻止，不会跳转
```

此外，`Event.preventDefault`方法还可以阻止默认表单和右键菜单。

#### `Event.stopPropagation()`

`Event.stopPropagation()`方法阻止事件在DOM中继续传播，防止再触发定义在别的节点上的监听函数，但是不包括在当前节点上其他的事件监听函数。

```html
<head>
    <style>
        .root{
            width: 200px;
            height: 200px;
            background-color: gray;
        }

        .box{
            width: 100px;
            height: 100px;
            background-color: red;
        }
    </style>
</head>

<body>
    <div class="root" id="root">
        <div class="box" id="box"></div>
    </div>
    <script>
        document.getElementById("root").addEventListener("click", 
        function() {
            console.log("root")
        })

        document.getElementById("box").addEventListener("click", 
        function() {
            console.log("box")
        })
    </script>
</body>
```

网页输出

<!-- markdownlint-disable no-inline-html -->
<style>
    .root{
        width: 200px;
        height: 200px;
        background-color: gray;
    }

    .box{
        width: 100px;
        height: 100px;
        background-color: red;
    }
</style>

<div class="root" id="root">
    <div class="box" id="box"></div>
</div>
<!-- markdownlint-restore -->

点击灰色部分控制台输出

```console
root
```

点击红色部分控制台输出

```console
box
root
```

可以看到，当点击红色部分时发生了事件冒泡。**事件冒泡（Event Bubbling）**是DOM事件流中的一个重要机制，指的是事件从最具体的元素（目标元素）开始，然后向上传播到较为不具体的元素（文档根节点）的过程。

如果要阻止上述代码的事件冒泡，可以修改`box`部分的代码为

```javascript
document.getElementById("box").addEventListener("click", 
    function(event) {
        event.stopPropagation()
        console.log("box")
    })
```

此时点击红色部分控制台输出

```console
box
```

#### `Event.stopImmediatePropagation()`

`Event.stopImmediatePropagation()`的作用是阻止事件传播并阻止同一元素上的其他事件监听器执行。

```html
<button id="myButton">点击</button>

<script>
    const button = document.getElementById('myButton')
    
    // 第一个监听器
    button.addEventListener('click', function(event) {
        console.log('监听器1 - 开始')
        event.stopImmediatePropagation() // 关键代码
        console.log('监听器1 - 结束')
    })
    
    // 第二个监听器
    button.addEventListener('click', function() {
        console.log('监听器2 - 这个不会执行')
    })
    
    // 第三个监听器
    button.addEventListener('click', function() {
        console.log('监听器3 - 这个也不会执行')
    })
    
    // 父元素的监听器（也不会执行）
    document.body.addEventListener('click', function() {
        console.log('body - 这个也不会执行')
    })
</script>
```

当按下按钮后，控制台输出

```console
监听器1 - 开始
监听器1 - 结束
```
