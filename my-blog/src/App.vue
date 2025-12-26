<template>
  <div>
    <BlogHeader />
    <main class="main">
      <div v-if="false" style="background: yellow; padding: 10px; margin: 10px; border: 2px solid red;">
        <h3>调试信息：</h3>
        <p>当前路由路径: "{{ $route.path }}"</p>
        <p>路由名称: "{{ $route.name }}"</p>
        <p>RouterView 是否加载: {{ !!$route.matched.length }}</p>
        <p>匹配的路由组件: {{ $route.matched[0]?.components?.default?.name || '未知' }}</p>
      </div>
      <RouterView />
    </main>
    <BlogFooter />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import BlogHeader from './components/Header.vue'
import BlogFooter from './components/Footer.vue'

const $route = useRoute()
</script>

<style scoped></style>
