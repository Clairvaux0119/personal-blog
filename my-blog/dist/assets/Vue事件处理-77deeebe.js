const n=`---\r
title: Vue事件处理\r
date: 2025-10-12\r
tags: ["javascript", "Vue", "事件处理"]\r
excerpt: "Vue事件处理"\r
---\r
\r
## 事件处理\r
\r
### 监听事件\r
\r
可以使用\`v-on\`指令（通常缩写为\`@\`符号）来监听DOM事件，并在触发事件时执行一些JavaScript。用法为\`v-on:click="methodName"\`或者简写为\`@click="methodName"\`。\r
\r
\`\`\`vue\r
<template>\r
  <button @click="counter += 1">点击: counter = {{ counter }}</button>\r
</template>\r
\r
\r
<script setup>\r
import { ref } from 'vue'\r
\r
let counter = ref(1)\r
<\/script>\r
\`\`\`\r
\r
### 事件处理方法\r
\r
然而许多事件处理逻辑会更加复杂，直接把JavaScript代码写在\`v-on\`指令中是不可行的。\`v-on\`指令可以接收一个需要调用的方法名称，来实现复杂的事件处理。\r
\r
\`\`\`vue\r
<template>\r
  <button @click="clickHandle">按钮</button>\r
</template>\r
\r
<script setup>\r
const clickHandle = () => {\r
  console.log("你好")\r
}\r
<\/script>\r
\`\`\`\r
\r
点击按钮后控制台打印“你好”。\r
\r
\`\`\`vue\r
<template>\r
  <button @click="clickHandle">按钮</button>\r
  <p>{{ message }}</p>\r
</template>\r
\r
<script setup>\r
import { ref } from 'vue'\r
\r
const message = ref("消息通知")\r
\r
const clickHandle = event => {\r
  message.value = "消息被撤回了"\r
  event.target.innerHTML = "点击之后"\r
}\r
<\/script>\r
\`\`\`\r
\r
上述代码点击按钮前会在页面渲染\r
\r
\`\`\`text\r
消息通知\r
\`\`\`\r
\r
点击按钮后，按钮文本改为“点击之后”，页面渲染\r
\r
\`\`\`text\r
消息被撤回了\r
\`\`\`\r
\r
上述代码中的\`event\`是原生的DOM event。\r
\r
### 内联处理器中的方法\r
\r
内联处理器中的方法可以直接称为“事件传递参数”。\r
\r
\`\`\`vue\r
<template>\r
  <button @click="say('hi')">say hi</button>\r
  <button @click="say('hello')">say hello</button>\r
</template>\r
\r
<script setup>\r
const say = message => {\r
  console.log(message)\r
}\r
<\/script>\r
\`\`\`\r
\r
依次点击两个按钮，控制台分别打印\`hi\`、\`hello\`。\r
`;export{n as default};
