const r=`---\r
title: Vue引入路由配置\r
date: 2025-10-26\r
tags: ["javascript", "Vue", "vue-router"]\r
excerpt: "Vue官方的客户端路由解决方案vue-router"\r
---\r
\r
## Vue引入路由配置\r
\r
Vue 通过\`vue-router\`进行客户端路由管理，实现单页应用（SPA）的页面导航。\r
\r
Vue Router是Vue.js官方的路由管理器，与Vue.js核心深度集成，让构建单页面应用变得简单高效。\r
\r
>官方文档：<https://router.vuejs.org/zh/>\r
\r
### 在Vue中项目中配置路由\r
\r
#### 创建vue3项目\r
\r
\`\`\`bash\r
npm create vue@latest\r
\`\`\`\r
\r
创建项目时可以选择是否包含Router，这里选择手动配置以更好地理解路由原理。\r
\r
#### 创建页面组件\r
\r
在\`src/views\`目录下创建页面组件。\r
\r
##### \`Home.vue\`-首页\r
\r
\`\`\`vue\r
<template>\r
    <main class="home">\r
        <h1>欢迎来到首页</h1>\r
        <p>这里是网站的主页面</p>\r
    </main>\r
</template>\r
\r
<script setup>\r
// 这里是首页组件逻辑\r
<\/script>\r
\r
<style scoped>\r
.home {\r
    text-align: center;\r
    padding: 2rem;\r
}\r
</style>\r
\`\`\`\r
\r
##### \`Blog.vue\`-博客页面\r
\r
\`\`\`vue\r
<template>\r
    <div class="blog">\r
        <h1>个人博客</h1>\r
        <p>分享技术学习文章</p>\r
    </div>\r
</template>\r
\r
<script setup>\r
// 博客页面逻辑\r
<\/script>\r
\`\`\`\r
\r
##### \`About.vue\`-关于页面\r
\r
\`\`\`vue\r
<template>\r
    <div class="about">\r
        <h1>关于网站</h1>\r
        <p>这里是关于网站的一些信息</p>\r
    </div>\r
</template>\r
\r
<script setup>\r
// 关于页面逻辑\r
<\/script>\r
\`\`\`\r
\r
#### 安装路由依赖\r
\r
\`\`\`bash\r
npm install --save vue-router\r
\`\`\`\r
\r
#### 创建路由配置文件\r
\r
在\`src/router\`目录下创建路由配置文件\`index.js\`\r
\r
\`\`\`javascript\r
// 引入Vue Router\r
import { createRouter, createWebHashHistory } from "vue-router"\r
\r
// 引入页面组件\r
import Home from "@/view/Home.vue"\r
import Blog from "@/view/Blog.vue"\r
import About from "@/view/About.vue"\r
\r
// 定义路由规则\r
const routes = [\r
    {\r
        path: '/',         // 访问路径\r
        name: 'Home',      // 路由名称\r
        component: Home    // 对应的组件\r
    },\r
    {\r
        path: '/blog',\r
        name: 'Blog',\r
        component: Blog\r
    },\r
    {\r
        path: '/about',\r
        name: 'About',\r
        component: About\r
    }\r
]\r
\r
// 创建路由实例\r
const router = createRouter({\r
    // 使用Hash模式\r
    history: createWebHashHistory(),\r
    routes  // 简写，等同于routes: routes\r
})\r
\r
// 导出路由实例\r
export default router\r
\`\`\`\r
\r
#### 在主应用中注册路由\r
\r
在\`main.js\`中注册路由：\r
\r
\`\`\`javascript\r
import './assets/main.css'\r
\r
import { createApp } from 'vue'\r
import App from './App.vue'\r
import router from './router'\r
\r
const app = createApp(App)\r
app.use(router)\r
app.mount('#app')\r
\`\`\`\r
\r
#### 在\`App.vue\`中使用路由\r
\r
Vue3使用\`<router-link to=""></router-link>\`来创建导航链接，使用\`<router-view />\`来显示对应的页面组件。\r
\r
\`\`\`vue\r
<template>\r
  <nav class="navigation">\r
    <RouterLink to="/">首页</RouterLink>\r
    <RouterLink to="/post">博客</RouterLink>\r
    <RouterLink to="/about">关于</RouterLink>\r
  </nav>\r
\r
  <RouterView />\r
</template>\r
\r
<script setup>\r
// 组件逻辑\r
<\/script>\r
\r
<style scoped>\r
/* 自定义样式 */\r
</style>\r
\`\`\`\r
\r
> **\`router-link\`属性**\r
>\`to\`: 指定目标路由路径\r
>\`active-class\`: 自定义激活状态的class名\r
>\`exact-active-class\`: 精确匹配时的class名\r
\r
### 路由模式详解\r
\r
#### Hash模式（\`creatWebHashHistory\`）\r
\r
\`\`\`javascript\r
history: creatWebHashHistory()\r
\`\`\`\r
\r
URL格式：<https://example.com/#/home>\r
\r
特点是使用URL的Hash（#）来模拟完整的URL。优点有兼容性好，支持所有浏览器；不需要服务器配置；不会在刷新页面时返回404错误。但Hash模式的SEO（Search Engine Optimization，搜索引擎优化）支持相对较差。更加适用于开发阶段或者静态站点托管。\r
\r
#### History模式（\`createWebHistory\`）\r
\r
\`\`\`javascript\r
history: creatWebHistory()\r
\`\`\`\r
\r
URL格式：<https://example.com/home>\r
\r
特点是使用HTML5 History API实现“真正”的URL。更加符合传统的URL习惯，对SEO的支持也更好。但其需要服务器配置支持，束鑫页面也有可能导致404错误。更加适用于生产环境或者SEO重要的情况。\r
`;export{r as default};
