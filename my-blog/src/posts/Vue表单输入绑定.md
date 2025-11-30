---
title: Vue表单输入绑定
date: 2025-10-12
tags: ["Vue", "表单"]
excerpt: "Vue表单输入绑定"
---

## 表单输入绑定

可以使用`v-model`指令在表单`<input>`、`<textarea>`及`<select>`元素上创建**双向数据绑定**。它会根据控件类型自动选取正确的方法来更新元素。
`v-model`本质上是一种语法糖，它负责监听用户的输入事件来更新数据 ，并在某种极端场景下进行一些特殊处理。

```vue
<template>
  <input type="text" v-model="username">
  <p>{{ username }}</p>
  <button @click="getUserName">获取用户名</button>
</template>

<script setup>
import { ref } from 'vue'

const username = ref("")

const getUserName = () => {
  console.log(username.value)
}
</script>
```

### 修饰符

#### `.lazy`

在默认情况下，`v-model`在每次`input`事件触发后将输入框的值域数据进行同步。可以添加`lazy`修饰符，从而转为在`change`事件之后进行同步。

```vue
<template>
  <input type="text" v-model.lazy="username">
  <p>{{ username }}</p>
</template>

<script setup>
import { ref } from 'vue'

const username = ref("")
</script>
```

在输入框输入完成回车或者失去焦点后，`<p>`中才会更新文本。

#### `.trim`

可以通过给`v-model`添加`trim`修饰符实现自动过滤用户输入的首尾空白字符。

```vue
<template>
  <input type="text" v-model.trim="password">
  <p>{{ password }}</p>
</template>

<script setup>
import { ref } from 'vue'

const password = ref("")
</script>
```
