<template>
    <div>
        <section class="hero">
            <div class="container">
                <h2>欢迎来到我的博客</h2>
                <p>在这里分享编程学习和思考</p>
            </div>
        </section>

        <section class="recent-posts">
            <div class="container">
                <h3>最新文章</h3>
                <!-- 文章卡片 -->
                <PostCard :posts="recentPosts" :pageFlag="false"/>
            </div>
        </section>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import PostCard from '../components/PostCard.vue'
import { useBlogStore } from '@/stores/post'

const blogStore = useBlogStore()
const { loadPostsMeta } = blogStore
const recentPosts = computed(() => blogStore.getRecentPosts(3))

onMounted(async () => {
    if(blogStore.posts.length === 0) {
        await loadPostsMeta()
    }
})
</script>

<style scoped>
.hero {
    text-align: center;
    padding: 4rem 0;

    /* 设置背景为线性渐变,渐变角度为 135 度（从左上到右下方向） */
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    color: white;
}

.hero h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.hero p {
    font-size: 1.2rem;
    opacity: 0.9;
}
</style>