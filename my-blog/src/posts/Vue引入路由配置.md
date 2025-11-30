---
title: Vue引入路由配置
date: 2025-10-26
tags: ["javascript", "Vue", "vue-router"]
excerpt: "Vue官方的客户端路由解决方案vue-router"
---

## Vue引入路由配置

Vue 通过`vue-router`进行客户端路由管理，实现单页应用（SPA）的页面导航。

Vue Router是Vue.js官方的路由管理器，与Vue.js核心深度集成，让构建单页面应用变得简单高效。

>官方文档：<https://router.vuejs.org/zh/>

### 在Vue中项目中配置路由

#### 创建vue3项目

```bash
npm create vue@latest
```

创建项目时可以选择是否包含Router，这里选择手动配置以更好地理解路由原理。

#### 创建页面组件

在`src/views`目录下创建页面组件。

##### `Home.vue`-首页

```vue
<template>
    <main class="home">
        <h1>欢迎来到首页</h1>
        <p>这里是网站的主页面</p>
    </main>
</template>

<script setup>
// 这里是首页组件逻辑
</script>

<style scoped>
.home {
    text-align: center;
    padding: 2rem;
}
</style>
```

##### `Blog.vue`-博客页面

```vue
<template>
    <div class="blog">
        <h1>个人博客</h1>
        <p>分享技术学习文章</p>
    </div>
</template>

<script setup>
// 博客页面逻辑
</script>
```

##### `About.vue`-关于页面

```vue
<template>
    <div class="about">
        <h1>关于网站</h1>
        <p>这里是关于网站的一些信息</p>
    </div>
</template>

<script setup>
// 关于页面逻辑
</script>
```

#### 安装路由依赖

```bash
npm install --save vue-router
```

#### 创建路由配置文件

在`src/router`目录下创建路由配置文件`index.js`

```javascript
// 引入Vue Router
import { createRouter, createWebHashHistory } from "vue-router"

// 引入页面组件
import Home from "@/view/Home.vue"
import Blog from "@/view/Blog.vue"
import About from "@/view/About.vue"

// 定义路由规则
const routes = [
    {
        path: '/',         // 访问路径
        name: 'Home',      // 路由名称
        component: Home    // 对应的组件
    },
    {
        path: '/blog',
        name: 'Blog',
        component: Blog
    },
    {
        path: '/about',
        name: 'About',
        component: About
    }
]

// 创建路由实例
const router = createRouter({
    // 使用哈希模式
    history: createWebHashHistory(),
    routes  // 简写，等同于routes: routes
})

// 导出路由实例
export default router
```

#### 在主应用中注册路由

在`main.js`中注册路由：

```javascript
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
```

#### 在`App.vue`中使用路由

Vue3使用`<router-link to=""></router-link>`来创建导航链接，使用`<router-view />`来显示对应的页面组件。

```vue
<template>
  <nav class="navigation">
    <RouterLink to="/">首页</RouterLink>
    <RouterLink to="/post">博客</RouterLink>
    <RouterLink to="/about">关于</RouterLink>
  </nav>

  <RouterView />
</template>

<script setup>
// 组件逻辑
</script>

<style scoped>
/* 自定义样式 */
</style>
```

> **`router-link`属性**
>`to`: 指定目标路由路径
>`active-class`: 自定义激活状态的class名
>`exact-active-class`: 精确匹配时的class名
