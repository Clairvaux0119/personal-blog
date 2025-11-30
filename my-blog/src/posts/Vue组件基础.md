---
title: Vue组件基础
date: 2025-10-14
tags: ["Vue", "组件"]
excerpt: "Vue组件基础"
---

## 组件基础

### 单文件组件

Vue单文件组件（即`*.vue`文件，缩写为SFC）是一种特殊的文件格式，它允许将Vue组件的模板、逻辑与样式封装在单个文件中。

创建一个单文件组件`单文件组件.vue`

```vue
<template>
    <h3>单文件组件</h3>
</template>

<script setup>
const name = "MyComponents"
</script>

<style scoped>
h3 {
    color: red
}
</style>
```

### 加载组件

在`App.vue`中

```vue
<template>
  <MyComponent />
</template>

<script setup>
import MyComponent from "./components/单文件组件.vue"
</script>
```

### 组件的组织

通常一个应用会以一棵嵌套的组件树的形式来组织。
