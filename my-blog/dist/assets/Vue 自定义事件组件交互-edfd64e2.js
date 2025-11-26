const n=`---\r
title: Vue 自定义事件组件交互\r
date: 2025-10-17\r
tags: ["javascript", "Vue", "组件"]\r
excerpt: "Vue 自定义事件组件交互"\r
---\r
\r
## 自定义事件组件交互\r
\r
\`prop\`可以将数据从父组件传递到子组件，要在组件中反向传递数据可以利用自定义事件实现\`$emit\`。\r
\r
在单文件组件中自定义一个事件\`onEvent\`\r
\r
\`\`\`vue\r
<template>\r
    <h3>自定义事件传递数据</h3>\r
    <button @click="sendClickHandle">点击传递</button>\r
</template>\r
\r
<script setup>\r
import { ref } from 'vue';\r
\r
const emit = defineEmits(['onEvent']);\r
const message = ref("我是MyComponent数据");\r
\r
function sendClickHandle() {\r
    // 参数1：字符串（事件名，理论上是随意的，但需要具有意义）\r
    // 参数2：要传递的数据\r
    emit("onEvent", message.value);\r
}\r
<\/script>\r
\`\`\`\r
\r
在\`App.vue\`中使用该事件\r
\r
\`\`\`vue\r
<template>\r
  <MyComponent @on-event="getDataHandle"/>\r
</template>\r
\r
<script setup>\r
import MyComponent from "./components/自定义事件组件交互.vue";\r
\r
function getDataHandle(data){\r
  console.log(data);\r
}\r
<\/script>\r
\`\`\`\r
\r
点击按钮后，控制台打印内容\r
\r
\`\`\`console\r
我是MyComponent数据\r
\`\`\`\r
`;export{n as default};
