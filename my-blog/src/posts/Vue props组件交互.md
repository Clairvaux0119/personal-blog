---
title: Vue props组件交互
date: 2025-10-16
tags: ["Vue", "props", "组件"]
excerpt: "Vue props组件交互"
---

## Props组件交互

组件与组件之间是需要存在交互的，如果没有关系的话组件的意义就很小了。`props`属性是可以在组件上注册的一些自定义attribute。

在`App.vue`中定义响应式数据`title`, `age`, `name`作为子组件的自定义attribute

```vue
<template>
  <MyComponent :title="title"/>
</template>

<script setup>
import { ref } from "vue"
import MyComponent from "./components/Props组件交互.vue"

const title = ref("我是一个标题")
const age = ref(20)
const name = ['Mike', 'Bob', 'Alice']
</script>
```

在`Props组件交互.vue`组件中添加属性`title`, `age`, `name`

```vue
<template>
    <h3>prop传递数据</h3>
    <p>{{ title }}</p>
    <p>{{ age }}</p>
    <ul>
        <li v-for="item in name" :key="name">
            {{ item }}
        </li>
    </ul>
</template>

<script setup>
const name = "Mycomponent"
const props = defineProps({
    title: {
        type: String,
        default: ""
    },
    age: {
        type: Number,
        default: 0
    },
    name: {
        type: Array,

        // 数组和对象必须使用函数进行返回
        default: function () {
            return []
        }
    }
})
</script>
```

通过上述代码可以将父组件中的数据传递到子组件中使用。

### Prop类型

`prop`传递参数是没有类型限制的。

```vue
<script setup>
const props = defineProps({
    title: String,
    likes: Number,
    isPublished: Boolean,
    commentIds: Array,
    author: Object,
    callback: Function
})
</script>
```

>**温馨提示**
>
>数据类型为数组或对象的时候，默认值需要返回**工厂模式**（即不直接使用`new`关键字创建对象，而是通过一个工厂方法来创建对象）。
