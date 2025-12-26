<template>
    <head>
        <title>所有文章 - 我的博客</title>
        <meta name="description" content="查看所有博客文章">
    </head>

    <div class="container">
        <section>
            <h1>所有文章</h1>
            <div id="all-posts" class="posts-grid">
                <!-- 文章动态加载 -->
                <PostCard :pageFlag="true" />
            </div>
        </section>
    </div>
</template>

<script setup>
import PostCard from '@/components/PostCard.vue'
</script>

<style scoped></style>