import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')  // 正确导入 Home 组件
  },
  {
    path: '/blog',
    name: 'Blog', 
    component: () => import('@/views/Blog.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  },
  // 添加文章详情页路由
  {
    path: '/post/:id',
    name: 'PostDetail',
    component: () => import('@/views/PostDetail.vue')
  }
];

// 创建路由器
const router = createRouter({
  history: createWebHashHistory('/personal-blog/'),
  routes
});

export default router