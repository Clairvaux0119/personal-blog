---
title: Vue状态管理（Pinia）
date: 2025-11-2
tags: ["Vue", "状态管理", "Pinia"]
excerpt: "Vue.js官方的状态管理库Pinia，处理集中式状态管理"
---

## Vue状态管理（Pinia）

Pinia是Vue.js官方推荐的下一代**状态管理库**，作为Vuex的现代化替代方案。它提供了更简洁、类型安全的集中式状态管理解决方案，让组件间的数据共享和状态维护更加高效可靠。

>相较于Vuex，Pinia的主要优势包括：
>
>+ **更简洁的API**：减少了样板代码，学习成本更低
>+ **完整的TypeScript支持**：提供出色的类型推断
>+ **模块化设计**：无需嵌套模块，每个store都是独立的
>+ **组合式API友好**：完美配合Vue3的组合式API

### 创建第一个store

在`src/stores`目录下创建文件`counter.js`

```javascript
// counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
    // state用于存储所有组件的状态
    state: () => ({
        counter: 0,
        name: 'Vue Pinia demo'
    })
})
```

### 安装和配置Pinia

在创建项目时可以选择是否包含Pinia，这里选择手动配置以更好地理解路由原理。

>**官方文档**：<https://pinia.vuejs.org/zh/introduction.html>

#### 安装Pinia

```bash
npm install --save pinia
```

#### 创建Pinia实例并注册

在`main.js`中注册Pinia

```javascript
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.mount('#app')
```

### 在组件中读取和使用状态

#### 基本使用方式

```vue
<template>
    <div class="counter">
        <!-- 直接修改状态 -->
        <h2>基础使用方式</h2>
        <h3>{{ counterStore.name }}</h3>
        <p>当前计数：{{ counterStore.counter }}</p>
        <button @click="counterStore.counter++">增加</button>
    </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()

// 直接访问状态
console.log("=====基本使用方式直接访问状态=====")
console.log(counterStore.counter)
console.log(counterStore.name)
</script>
```

#### 使用storeToRefs保持响应式

```vue
<template>
    <!-- 使用storeToRefs保持响应式 -->
    <div class="counter">
        <!-- 直接修改状态 -->
        <h2>使用storeToRefs响应式使用</h2>
        <h3>{{ name }}</h3>
        <p>当前计数：{{ counter }}</p>
        <button @click="increment">增加</button>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()

// 使用storeToRefs解构出响应式引用
const { counter, name } = storeToRefs(counterStore)

const increment = () => {
    counter.value++
}

// 直接访问状态
console.log("=====使用响应式直接访问状态=====")
console.log(counter.value)
console.log(name.value)
</script>
```
