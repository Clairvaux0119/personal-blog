const n=`---\r
title: Element对象\r
date: 2025-09-08\r
tags: ["javascript", "Element对象"]\r
excerpt: "Element对象、方法"\r
---\r
\r
## Element对象\r
\r
### Element对象属性\r
\r
#### Element.id\r
\r
\`Element.id\`属性返回指定元素的\`id\`属性，该属性可读写。\r
\r
\`\`\`html\r
<p id="foo"></p>\r
\r
<script>\r
let p = document.querySelector('p')\r
\r
console.log(p.id)        \r
<\/script>\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
foo\r
\`\`\`\r
\r
#### Element.className\r
\r
\`ElementName\`属性用来读写当前元素节点的\`class\`属性。它的值是一个字符串，每个\`class\`之间用空格分割。\r
\r
\`\`\`javascript\r
<div class="one two three" id="myDiv"></div>\r
\r
<script>\r
    let div = document.getElementById("myDiv")\r
\r
    console.log(div.className)\r
    div.className = "num"\r
    console.log(div.className)       \r
<\/script>\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
one two three\r
num\r
\`\`\`\r
\r
#### Element.classList\r
\r
\`classList\`对象拥有下列方法\r
\r
>\`add()\`: 增加一个class。\r
>\`remove()\`: 移除一个class。\r
>\`contains()\`: 检查当前元素是否包含某个class。\r
>\`toggle()\`: 将某个class移入和移出当前元素。\r
\r
\`\`\`html\r
<div id="myDiv">Hello</div>\r
\r
<script>\r
    let div = document.getElementById("myDiv")\r
\r
    div.classList.add("myClass")\r
    div.classList.add("foo", "bar")\r
    console.log(div.className)\r
    div.classList.remove("myClass")\r
    console.log(div.className)\r
    div.classList.toggle("myClass")  // 如果myClass不存在就加入，否则移除\r
    console.log(div.className)\r
    console.log(div.classList.contains("myClass"))\r
<\/script>\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
myClass foo bar\r
foo bar\r
foo bar myClass\r
true\r
\`\`\`\r
\r
#### Element.innerHTML\r
\r
\`Element.innerHTML\`属性返回一个字符串，等同于该元素包含的所有HTML代码。该属性可读写，常用来设置某个节点的内容。它能改写所有元素节点的内容，包括\`<HTML>\`和\`<body>\`元素。\r
\r
\`\`\`html\r
<p id="text">Hello</p>\r
\r
<script>\r
    let para = document.getElementById("text")\r
    \r
    console.log(para.innerHTML)\r
    console.log(para.innerHTML = "Hello World")\r
<\/script>\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
Hello\r
Hello World\r
\`\`\`\r
\r
不给\`innerHTML\`赋值直接调用会直接输出元素原本包含的内容，给\`innerHTML\`赋值后会修改原本元素的内容后输出。\r
\r
#### Element.innerText\r
\r
\`Element.innerText\`和\`Element.innerHTML\`类似，不同的是\`Element.innerText\`无法识别元素，会直接渲染成字符串。\r
\r
### Element获取元素位置\r
\r
|属性|描述|\r
|:---|:---:|\r
|clientHeight|获取元素高度包括\`padding\`部分，但是不包括\`border\`、\`margin\`|\r
|clientWidth|获取元素宽度包括\`padding\`部分，但是不包括\`border\`、\`margin\`|\r
|scrollHeight|元素总高度，它包括\`padding\`，但是不包括\`border\`、\`margin\`包括溢出的不可见内容|\r
|scrollWidth|元素总宽度，它包括\`padding\`，但是不包括\`border\`、\`margin\`包括溢出的不可见内容|\r
|scrollLeft|元素的水平滚动条向右滚动的像素数量|\r
|scrollTop|元素的水平滚动条向下滚动的像素数量|\r
|offsetHeight|元素的CSS垂直高度（单位像素），包括元素本身的高度、\`padding\`和\`border\`|\r
|offsetWidth|元素的CSS水平高度（单位像素），包括元素本身的高度、\`padding\`和\`border\`|\r
|offsetLeft|到定位父级左边界的间距|\r
|offsetTop|到定位父级上边界的间距|\r
\r
#### Element.clientHeight, Element.cilentWidth\r
\r
\`Element.clientHeight\`属性返回一个整数值，表示元素节点的CSS高度（单位像素），只对**块级元素**生效，对于行内元素返回\`0\`。如果块级元素没有设置CSS高度值，则返回实际高度。\r
\r
除了元素本身的高度，它还包括\`padding\`部分，但是不包括\`border\`、\`margin\`。如果有水平滚动条，还要减去水平滚动条的高度。注意，这个值始终是整数，如果是小数会被**四舍五入**。\r
\r
\`Element.cilentWidth\`属性返回元素节点的CSS宽度，同样只对块级元素有效，也是只包括元素本身的宽度和\`padding\`，如果有垂直滚动条，还要减去垂直滚动条的宽度。\r
\r
\`\`\`html\r
<head>\r
    <meta charset="UTF-8">\r
    <meta http-equiv="X-UA-Compatible" content="IE=edge">\r
    <meta name="viewport" content="width=device-width, initial-scale=1.0">\r
    <title>Document</title>\r
    <style>\r
        .box {\r
            width: 200px;\r
            height: 200px;\r
            border: 5px solid red; \r
            padding: 10px;\r
            margin: 20px;\r
            background: green;\r
        }\r
    </style>\r
</head>\r
\r
<body>\r
    <div class="box" id="box"></div>\r
\r
    <script>\r
        let box = document.getElementById("box")\r
        \r
        console.log("高度为：" + box.clientHeight + "px")\r
        console.log("宽度为：" + box.clientWidth + "px")\r
    <\/script>\r
</body>\r
\`\`\`\r
\r
网页输出\r
\r
![容器示意](../images/Element对象获取元素容器图.png)\r
\r
控制台输出\r
\r
\`\`\`console\r
高度为：220px\r
宽度为：220px\r
\`\`\`\r
\r
\`document.documentElement\`的\`clientHeight\`属性，返回当前视口的高度（即浏览器窗口的高度）。\`document.body\`的高度则是网页的\`body\`元素高度。\r
\r
\`\`\`javascript\r
console.log("视口高度为：" + document.documentElement.clientHeight + "px")\r
console.log("网页高度为：" + document.body.clientHeight)\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
视口高度为：738px\r
网页高度为：230px\r
\`\`\`\r
\r
视口高度（Viewport Height）和网页高度（Document Height）是前端开发中两个重要但容易混淆的概念。\r
\r
核心概念对比\r
\r
|特性|视口高度 (Viewport Height)|网页高度 (Document Height)|\r
|---|---|---|\r
|定义|浏览器可见区域的高度|整个网页内容的总高度|\r
|JavaScript|window.innerHeight|document.documentElement.scrollHeight|\r
|CSS|vh 单位|无对应单位|\r
|是否变化|固定（调整浏览器窗口时变化）|动态（内容变化时改变）|\r
|滚动相关|不包含滚动条|包含所有内容|\r
\r
可视化理解\r
\r
\`\`\`ascii\r
视口高度 vs 网页高度示意图:\r
\r
+---------------------------------------------------+\r
|                浏览器窗口                         |\r
|                                                   |\r
|  +---------------------------------------------+  |\r
|  |              视口 (Viewport)                |  |\r
|  |                                             |  |\r
|  |    可见的网页内容                            |  |\r
|  |                                             |  |\r
|  +---------------------------------------------+  |\r
|                                                   |\r
|  +---------------------------------------------+  |\r
|  |           不可见的内容（需要滚动）           |  | ← 网页高度\r
|  |                                             |  |\r
|  |                                             |  |\r
|  +---------------------------------------------+  |\r
|                                                   |\r
+---------------------------------------------------+\r
↑\r
视口高度\r
\`\`\`\r
\r
#### Element.scrollHeight, Element.scrollWidth\r
\r
\`Element.scrollHeight\`、\`Element.scrollWidth\`属性与\`Element.clientHeight\`、\`Element.clientWidth\`用法类似。区别是它们所度量的**内容范围**不同。\r
\r
||Element.scrollHeight 和 Element.scrollWidth|Element.clientHeight 和 Element.clientWidth|\r
|---|---|---|\r
|度量内容|元素整个内容的完整高度和宽度，包括当前不可见的、需要滚动才能看到的部分。|元素内部可视区域的高度和宽度，即能看到的内容范围。|\r
|包含内边距 (padding)|是|是|\r
|包含滚动条|不包含滚动条的宽度/高度。|不包含。它会减去滚动条的宽度/高度。|\r
|通俗理解|如果你把元素的所有内容（包括被隐藏的部分）平铺开来，它所占据的总空间大小。|元素的“橱窗”或“视口”的大小，即当前能看见多少内容。|\r
\r
#### Element.scrollLeft, Element.scrollTop\r
\r
\`Element.scrollLeft\`属性表示当前元素的水平滚动条向右侧滚动的像素数量，\`Element.scrollTop\`属性表示当前元素的垂直滚动条向下滚动的像素数量。对于那些没有滚动条的网页元素，这两个属性总是等于0。\r
\r
如果要查看整张网页的水平和垂直的滚动距离，要从\`document.documentElement\`元素上读取。\r
\r
\`\`\`javascript\r
document.documentElement.scrollLeft\r
document.documentElement.scrollTop\r
\`\`\`\r
\r
#### Element.offsetHeight, Element.offsetWidth\r
\r
\`Element.offsetHeight\`属性返回一个整数，表示元素的CSS垂直高度（单位像素），包括元素本身的高度、\`padding\`和\`border\`，以及水平滚动条的高度（如果存在滚动条）。\r
\r
而\`Element.offsetWidth\`属性则表示元素的CSS水平宽度（单位像素），其他均与\`Element.offsetHeight\`一致。\r
\r
这两个属性都是**只读**属性，只比\`Element.clientHeight\`和\`Element.clientWidth\`多了边框的高度或宽度。如果元素的CSS设为不可见（比如\`display: none\`，则返回\`0\`。\r
\r
\`\`\`html\r
<head>\r
    <meta charset="UTF-8">\r
    <meta http-equiv="X-UA-Compatible" content="IE=edge">\r
    <meta name="viewport" content="width=device-width, initial-scale=1.0">\r
    <title>Document</title>\r
    <style>\r
        .box {\r
            width: 200px;\r
            height: 200px;\r
            border: 5px solid red; \r
            padding: 10px;\r
            margin: 20px;\r
            background: green;\r
        }\r
    </style>\r
</head>\r
\r
<body>\r
    <div class="box" id="box"></div>\r
\r
    <script>\r
        let box = document.getElementById("box")\r
        \r
        console.log("高度为：" + box.offsetHeight + "px")\r
        console.log("宽度为：" + box.offsetWidth + "px")\r
    <\/script>\r
</body>\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
高度为：230px\r
宽度为：230px\r
\`\`\`\r
\r
#### Element.offsetLeft, Element.offsetTop\r
\r
\`Element.offsetLeft\`返回当前元素左上角相对于\`Element.offsetParent\`节点的水平位移，\`Element.offsetTop\`则返回垂直位移，单位为像素。通常，这两个值是指相对于有定位的父节点的位移（如果父节点没有定位就去找有定位的祖先节点直到文档最顶层节点）。\r
\r
如果一个祖先元素设置了\`position\`属性，且其值不是\`static\`（默认值），那么它就成为了一个“有定位的父节点”。有效的\`position\`值包括：\`relative\`、\`absolute\`、\`fixed\`、\`sticky\`。\r
\r
\`\`\`html\r
<head>\r
    <meta charset="UTF-8">\r
    <meta http-equiv="X-UA-Compatible" content="IE=edge">\r
    <meta name="viewport" content="width=device-width, initial-scale=1.0">\r
    <title>Document</title>\r
    <style>\r
        .root {\r
            width: 500px;\r
            height: 500px;\r
            background-color: gray;\r
            margin: 50px;\r
            position: relative;\r
        }\r
\r
        .box {\r
            width: 200px;\r
            height: 200px;\r
            background-color: red;\r
            margin: 100px;\r
        }\r
    </style>\r
</head>\r
\r
<body>\r
    <div class="root">\r
        <div class="box" id="box"></div>\r
    </div>\r
    \r
    <script>\r
        let box = document.getElementById("box")\r
\r
        console.log("元素距离左端的距离：", box.offsetLeft)\r
        console.log("元素距离顶端的距离：", box.offsetTop)\r
    <\/script>\r
\r
</body>\r
\`\`\`\r
\r
网页输出结果\r
\r
![嵌套的两个div](../images/Element对象获取元素容器图2.png)\r
\r
控制台输出结果\r
\r
\`\`\`console\r
元素距离左端的距离： 100\r
元素距离顶端的距离： 0\r
\`\`\`\r
`;export{n as default};
