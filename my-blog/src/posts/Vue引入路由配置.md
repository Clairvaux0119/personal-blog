---
title: Vue引入路由配置
date: 2025-10-26
tags: ["Vue", "vue-router", "路由"]
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
import Home from "@/views/Home.vue"
import Blog from "@/views/Blog.vue"
import About from "@/views/About.vue"

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
    // 使用Hash模式
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

### 路由模式详解

#### Hash模式（`creatWebHashHistory`）

```javascript
history: creatWebHashHistory()
```

URL格式：<https://example.com/#/home>

特点是使用URL的Hash（#）来模拟完整的URL（原理是a标签的锚点连接）。优点有兼容性好，支持所有浏览器；不需要服务器配置；不会在刷新页面时返回404错误。但Hash模式的SEO（Search Engine Optimization，搜索引擎优化）支持相对较差。更加适用于开发阶段或者静态站点托管。

#### History模式（`createWebHistory`）

```javascript
history: creatWebHistory()
```

URL格式：<https://example.com/home>

特点是使用HTML5 History API实现“真正”的URL（原理是HTML5 pushState()）。更加符合传统的URL习惯，对SEO的支持也更好。但其需要服务器配置支持，刷新页面也有可能导致404错误。更加适用于生产环境或者SEO重要的情况。
