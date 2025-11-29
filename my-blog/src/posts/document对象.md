---
title: document对象
date: 2025-09-07
tags: ["javascript", "document对象"]
excerpt: "document对象、方法"
---

## document对象

### 获取元素方法

document对象通过获取元素与HTML元素交互。

#### document.getElementByTagName()

`document.getElementByTagName()`方法搜索HTML标签名，返回符合条件的元素。它的返回值是一个类似数组对象（`HTMLCollection`实例），可以实时反映HTML文档的变化。如果没有任何匹配的元素，就返回一个空集

```html
<p>paragraph1</p>
<p>paragraph2</p>

<script>
    let paras = document.getElementsByTagName('p')

    console.log(paras)
    console.log(paras[0])
    console.log(paras[1])
</script>
```

通过`document.getElementByTagName()`方法搜索HTML元素p，并将其存储到类数组对象`paras`中，输出结果如下

```console
HTMLCollection(2)
0: p
1: p
length: 2
<p>​paragraph1​</p>​
<p>​paragraph2​</p>​
```

如果传入`*`，就可以返回文档中所有HTML元素

```javascript
let allElements = document.getElementsByTagName('*')
```

#### document.getElementsByClassName()

`document.getElementsByClassName()`方法返回一个类似数组的对象（`HTMLCollection`实例），包括了所有`class`名字符合指定条件的元素，元素的变化实时反映在返回结果中

```html
<h1 class="names">
    title
</h1>

<p class="names">paragraph1</p>
<p>paragraph2</p>

<div class="names"></div>

<script>
    let elements = document.getElementsByClassName("names")

    console.log(elements)
</script>
```

上述代码会返回所有`class`名字为names的HTML元素。

```console
HTMLCollection(3) [h1.names, p.names, div.names]
0: h1.names
1: p.names
2: div.names
length: 3
```

由于`class`是保留字，所以JavaScript一律使用`className`表示CSS的`class`。

参数可以是多个`class`，它们之间使用空格间隔。

```javascript
let elements = document.getElementsByClassName("names foo bar")
```

#### document.getElementsByName()

`document.getElementsByName()`方法用于选择拥有`name`属性的HTML元素（比如`<form>`、`<radio>`、`<img>`等），返回一个类似数组的对象（NodeList实例），因为`name`属性相同的元素可能不止一个。

```javascript
NodeList [form]
0: form
length: 1
```

#### document.getElementById()

`document.getElementById()`方法返回指定`id`属性的元素节点。如果没有发现匹配的节点，则返回`null`。

```html
<p id="name"></p>

<script>
    console.log(document.getElementById("name"))
</script>
```

输出结果

```console
<p id="name"></p>
```

注意，该方法的参数是大小写敏感的。比如，如果某个节点的`id`属性是`main`，那么`document.getElementById("Main")`将返回`null`。

#### document.querySelector()

`document.querySelector()`方法接受一个CSS选择器作为参数，返回匹配该选择器的元素节点。如果有多个节点满足匹配条件，则返回第一个匹配的节点。如果没有发现匹配的节点，则返回`null`。

```html
<div class="nav">nav1</div>
<div class="nav">nav2</div>

<script>
    let nav= document.querySelector(".nav")
    console.log(nav)
</script>
```

输出结果

```console
<div class="nav">nav1</div>
```

#### document.querySelectorAll()

`document.querySelectorAll()`方法与`document.querySelector()`用法类似，区别是返回一个`NodeList`对象，包含所有匹配给定选择器的节点。

```html
<div class="nav">nav1</div>
<div class="nav">nav2</div>

<script>
    let nav= document.querySelectorAll(".nav")
    console.log(nav)
</script>
```

输出结果

```console
NodeList(2) [div.nav, div.nav]
0: div.nav
1: div.nav
length: 2
```

### 创建元素方法

#### document.createElement()

`document.createElement()`方法用来生成元素节点，并返回该节点。

```javascript
let console = document.createElement('p')

console.log(text)
```

输出结果

```console
<p></p>
```

#### document.createTextNode()

`document.createTextNode()`方法用来生成文本节点（`Text`实例），并返回该节点。它的参数是文本节点的内容。

```javascript
let text = document.createElement('p')
let content = document.createTextNode("我是文本")

text.appendChild(content)
console.log(text)
```

输出结果

```console
<p>我是文本</p>
```

在上述代码中使用了`appendChild()`方法用来将生成的文本节点`content`插入到`p`节点中。对于`node.appendChild(childNode)`方法，它的核心功能是
将一个节点（通常是一个元素）添加为指定父节点的**最后**一个子节点。
参数`childNode`是要插入的节点对象。

关键特性与行为

1. 移动而非复制： 如果 `childNode` 是文档中已存在的节点，`appendChild()` 会将其从原位置移动到新的父节点下。
2. 追加操作： 新节点总是被插入到父节点所有现有子节点的**末尾**。
3. 返回值： 返回被追加的节点（即`childNode`）。通常可以忽略这个返回值。
4. 一次一个： 一次只能追加**一个**节点。`appendChild()`只接受Node对象，不接受字符串文本。如果要插入多个节点或字符串，更好的现代选择是使用`append()`方法。

#### document.createAttribute()

`document.createAttribute()`方法生成一个新的属性节点（`Attr`实例），并返回它。

```javascript
let text = document.createElement('p')
let content = document.createTextNode("我是文本")
let id = document.createAttribute("id")

id.value = "root"
text.appendChild(content)
text.setAttributeNode(id)
console.log(text)
```

输出结果

```console
<p id="root">我是文本</p>
```

**注意**&nbsp;&nbsp;&nbsp;&nbsp;`document.createAttribute()`和`element.setAttributeNode()`是非常古老且不常用的方法。现代、简洁且通用的做法是直接使用`setAttribute()`方法或直接操作DOM属性。

上面的代码可以改为

```javascript
let text = document.createElement('p')
let content = document.createTextNode("我是文本")

text.appendChild(content)
text.setAttribute('id', 'root')
console.log(text)
```

输出结果

```console
<p id="root">我是文本</p>
```

结果相同但代码更加简洁。
