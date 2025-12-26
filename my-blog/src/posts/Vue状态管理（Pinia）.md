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

### Vue状态管理核心

Pinia最常用的核心概念包括`state`、`getter`、`action`。

#### `state`-数据的源头

`state`的作用是定义和存储响应式数据，它的特点是必须返回是对象的函数。

```javascript
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
    // 必须是函数，返回对象
    state: () => ({
        // 基础类型
        counter: 0,
        name: '计数器',

        // 对象类型
        user: {
            id: 1,
            name: 'Bob'
        },

        // 数组类型
        items: ['苹果', '香蕉', '西瓜'],

        // 布尔类型
        flag: true
    })
})
```

在组件中使用

```vue
<template>
    <h2>Pinia常用核心概念</h2>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter'

const store = useCounterStore()

console.log("=====Pinia常用核心概念=====")
console.log(store.counter)
console.log(store.user.name)
console.log(store.items[0])
</script>
```

控制台打印

```bash
=====Pinia常用核心概念=====
0
Bob
苹果
```

#### `getter`-派生和计算属性

```javascript
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
    state: () => ({
        counter: 0,
        name: '计数器',

        items: [
            { id: 1, name: '苹果' },
            { id: 2, name: '香蕉' },
            { id: 3, name: '西瓜' }
        ]

    }),
    getters:
    {
        // 基本getter
        doubleCounter: state => {
            return state.counter * 2
        },

        // 使用this访问其他getter
        getDoubleCounter() {
            return `当前计数：${this.doubleCounter}`
        },

        // 带参数的getter（返回函数）
        getItemById: state => {
            return id => {
                return state.items.find(item => item.id === id)
            }
        }
        /* 或者简写成
        getItemById: state => id => state.items.find(item => item.id === id)
        */
    }
})
```

#### `action`-处理所有逻辑

Pinia中的`action`融合了Vuex的`mutation`和`action`，既可以处理同步逻辑，也可以处理异步操作。`action`可以直接修改`state`，无需像Vuex那样通过`commit`提交`mutation`。
