---
title: Vue事件处理
date: 2025-10-12
tags: ["Vue", "事件处理"]
excerpt: "Vue事件处理"
---

## 事件处理

事件处理器的值可以是

1. **内联事件处理器**：事件被触发时执行内联的JavaScript语句（与`onclick`类似），通常用于简单场景。
2. **方法事件处理器**：一个指向组件上定义的方法属性名或是路径。

### 监听事件

可以使用`v-on`指令（通常缩写为`@`符号）来监听DOM事件，并在触发事件时执行对应的JavaScript。用法为`v-on:click="methodName"`或者简写为`@click="methodName"`。

```vue
<template>
  <button @click="counter += 1">点击: counter = {{ counter }}</button>
</template>


<script setup>
import { ref } from 'vue'

let counter = ref(1)
</script>
```

### 事件处理方法

然而许多事件处理逻辑会更加复杂，直接把JavaScript代码写在`v-on`指令中是不可行的。`v-on`指令可以接收一个需要调用的方法名称，来实现复杂的事件处理。

```vue
<template>
  <button @click="clickHandle">按钮</button>
</template>

<script setup>
const clickHandle = () => {
  console.log("你好")
}
</script>
```

点击按钮后控制台打印“你好”。

```vue
<template>
  <button @click="clickHandle">按钮</button>
  <p>{{ message }}</p>
</template>

<script setup>
import { ref } from 'vue'

const message = ref("消息通知")

const clickHandle = event => {
  message.value = "消息被撤回了"
  event.target.innerHTML = "点击之后"
}
</script>
```

上述代码点击按钮前会在页面渲染

```text
消息通知
```

点击按钮后，按钮文本改为“点击之后”，页面渲染

```text
消息被撤回了
```

上述代码中的`event`是原生的DOM event。

### 内联处理器中的方法

内联处理器中的方法可以直接称为“事件传递参数”。

```vue
<template>
  <button @click="say('hi')">say hi</button>
  <button @click="say('hello')">say hello</button>
</template>

<script setup>
const say = message => {
  console.log(message)
}
</script>
```

依次点击两个按钮，控制台分别打印`hi`、`hello`。
