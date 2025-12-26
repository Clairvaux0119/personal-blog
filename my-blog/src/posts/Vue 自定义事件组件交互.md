---
title: Vue 自定义事件组件交互
date: 2025-10-17
tags: ["Vue", "组件"]
excerpt: "Vue 自定义事件组件交互"
---

## 自定义事件组件交互

`prop`可以将数据从父组件传递到子组件，要在组件中反向传递数据可以利用自定义事件实现`$emit`。

在单文件组件中自定义一个事件`onEvent`

```vue
<template>
    <h3>自定义事件传递数据</h3>
    <button @click="sendClickHandle">点击传递</button>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['onEvent'])
const message = ref("我是MyComponent数据")

function sendClickHandle() {
    // 参数1：字符串（事件名，理论上是随意的，但需要具有意义）
    // 参数2：要传递的数据
    emit("onEvent", message.value)
}
</script>
```

在`App.vue`中使用该事件

```vue
<template>
  <MyComponent @on-event="getDataHandle"/>
</template>

<script setup>
import MyComponent from "./components/自定义事件组件交互.vue"

function getDataHandle(data){
  console.log(data)
}
</script>
```

点击按钮后，控制台打印内容

```console
我是MyComponent数据
```
