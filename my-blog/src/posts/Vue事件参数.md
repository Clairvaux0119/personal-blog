---
title: Vue事件处理
date: 2025-11-17
tags: ["Vue", "事件处理"]
excerpt: "Vue事件处理"
---

## Vue事件参数
事件参数可以获取`event`对象和通过事件传递数据。

### 获取`event`对象

```vue
<template>
    <h2>获取event对象</h2>
    <p>count: {{ count }}</p>
    <button @click="addCount">add</button>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)

const addCount = (event) => {
    console.log(event)
    count.value ++
}
</script>
```

此时控制台打印出的`event`对象如图

![Vue事件参数1](/personal-blog/Vue事件参数1.png)

可以看到的是，Vue中的event对象就是原生JS中的`event`对象。`event`只是函数执行过程中产生的临时参数，并不能在模板中直接通过`.event`的形式直接获取到。

### 传递参数

```vue
<template>
    <h2>传递参数</h2>
    <p @click="getUserName(item.name)" v-for="item of users" :key="item.id">{{ item.name }}</p>
</template>

<script setup>
import { ref } from 'vue'

const users = ref([
    {
        id: 1,
        name: "Alice"
    },
    {
        id: 2,
        name: "Bob"
    },
    {
        id: 3,
        name: "Cathy"
    }
])

const getUserName = (name) => {
    console.log(name)
}
</script>
```

此时点击页面上显示出的名字，会在控制台打印相对应的名字。

### 传递参数过程中获取`event`

```vue
<template>
    <h2>传递参数过程中获取event</h2>
    <p @click="getUserName(item.name, $event)" v-for="item of users" :key="item.id">{{ item.name }}</p>
</template>

<script setup>
import { ref } from 'vue'

const users = ref([
    {
        id: 1,
        name: "Alice"
    },
    {
        id: 2,
        name: "Bob"
    },
    {
        id: 3,
        name: "Cathy"
    }
])

const getUserName = (name, event) => {
    console.log(name)
    console.log(event)
}
</script>
```

### Vue事件修饰符

Vue提供了一套事件修饰符，可以直接在模板中处理常见的DOM事件细节，而无需在方法中编写样板代码。使得方法可以更注重于业务逻辑，也使模板的意图更加清晰。

|修饰符|作用|对应的原生JS写法|
|--|--|--|
|`.stop`|阻止事件冒泡|`event.stopPropagation()`|
|`.prevent`|阻止默认行为|`event.preventDefault()`|
|`.once`|事件只触发一次|在方法内移除监听器|
|`.self`|仅当`event.target`是元素自身时触发|`if (event.target !== event.currentTarget) return`|

示例

```vue
<template>
    <h2>Vue事件修饰符</h2>
    <!-- 阻止单击事件继续传播（阻止冒泡） -->
    <button @click.stop="doThis">event.stop</button>

    <!-- 提交事件不再重载页面（阻止默认行为） -->
    <form @submit.prevent="onSubmit">event.prevent</form>

    <!-- 修饰符可以串联 -->
    <a @click.stop.prevent="doThat">event.stop.prevent</a>

    <!-- 点击事件最多触发一次 -->
    <button @click.once="doThisOnce">event.once</button>
</template>

<script setup>
    const doThis = () => {
        // 自定义内容
    }

    const onSubmit = () => {
        // 自定义内容
    }

    const doThat = () => {
        // 自定义内容
    }

    const doThisOnce = () => {
        // 自定义内容
    }
</script>
```

**串联顺序的影响**：修饰符的书写顺序会产生效果。例如，`@click.prevent.self`会阻止元素自身及其子元素的默认点击行为，而`@click.self.prevent`则只阻止元素自身的默认行为。

#### 键盘事件与事件修饰符

在处理键盘事件（`@keyup`, `@keydown`）时，Vue允许使用按键修饰符来监听特定按键。

```vue
<template>
  <!-- 只有在key是Enter时调用submit方法 -->
  <input @keyup.enter="submit" />

  <!-- 处理组合键 -->
  <input @keyup.ctrl.enter="onCtrlEnter" />
</template>

<script setup>
    const submit = () => {
        // 自定义内容
    }

    const onCtrlEnter = () => {
        // 自定义内容
    }
</script>
```
