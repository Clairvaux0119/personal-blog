<template>
    <div id="posts-container">
        <!-- 加载状态 -->
        <div v-if="loading" class="loading">加载中...</div>

        <!-- 错误状态 -->
        <div v-else-if="error" class="error">{{ error }}</div>

        <!-- 文章列表 -->
        <div v-else class="posts-grid">
            <article v-for="post in displayedPosts" :key="post.id" class="post-card">
                <h3 class="post-title">
                    <RouterLink :to="`/post/${post.id}`" class="post-link">
                        {{ post.title }}
                    </RouterLink>
                </h3>
                <div class="post-meta">
                    <div class="post-date">{{ post.date }}</div>
                    <span> &bull; </span>
                    <div v-if="post.tags && post.tags.length" class="post-tags">
                        <span v-for="tag in post.tags" :key="tag" class="tag">
                            {{ tag }}
                        </span>
                    </div>
                </div>
                <div class="excerpt">{{ post.excerpt }}</div>
                <RouterLink :to="`/post/${post.id}`" class="read-more">
                    阅读全文 &rarr;
                </RouterLink>
            </article>
        </div>

        <!-- 空状态 -->
        <div v-if="!loading && !error && displayedPosts.length === 0" class="no-posts">
            暂无文章
        </div>

        <!-- 分页控制 -->
        <div v-if="!loading && !error && pageFlag && displayedPosts.length > 0">
            <div class="pagination">
                <!-- 上一页按钮 -->
                <button @click="prevPage" :disabled="!hasPrevPage">&larr;上一页</button>

                <!-- 页码 -->
                <div>{{ currentPage }}</div>

                <!-- 下一页按钮 -->
                <button @click="nextPage" :disabled="!hasNextPage">下一页&rarr;</button>
            </div>

            <!-- 跳转页面 -->
            <div class="goToPage">
                <input type="number" placeholder="请输入页码" v-model="pageNam">
                <button @click="getInputPageNam">跳转</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useBlogStore } from '@/stores/post'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
    posts: {
        type: Array,
        default: null
    },
    pageFlag: {
        type: Boolean,
        default: null
    }
})
const blogStore = useBlogStore()

// 解构赋值
const { getCurrentPosts, currentPage, posts, loading, error, hasPrevPage, hasNextPage } = storeToRefs(blogStore)
const displayedPosts = computed(() => {
    return props.posts || getCurrentPosts.value
})

// 解构actions
const { loadPostsMeta, prevPage, nextPage, goToPage } = blogStore

const pageNam = ref()

const getInputPageNam = () => {
    return goToPage(pageNam.value)
}

// 确保组件挂载时加载数据
onMounted(() => {
    // 如果没有通过props传入posts，且store中没有数据，且不在加载中
    if (!props.posts && posts.value.length === 0 && !loading.value) {
        loadPostsMeta()
    }
})
</script>

<style scoped>
.posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
}

.post-tags {
    display: flex;
    gap: 0.5rem;
    /* 标签之间的间距 */
    flex-wrap: wrap;
}

.post-card {
    background-color: white;
    border-radius: 10px;
    padding: 1.5rem;
    align-items: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.post-date {
    white-space: nowrap;    /* 禁止日期换行 */
}

.post-card:hover {
    transform: translateY(-5px);
    /* 将元素向上移动5像素 */
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.post-title {
    color: var(--primary-color);
    margin-bottom: 0.5rem;
    text-decoration: none;
}

.post-meta {
    display: flex;
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    gap: 0.5rem;
}

.post-excerpt {
    color: #555;
    line-height: 1.6;
    margin-bottom: 1rem;
}

.read-more {
    display: inline-block;
    color: var(--accent-color);
    text-decoration: none;
    font-weight: 500;
}

/* 页码 */

.pagination {
    text-align: center;
}

.pagination>* {
    display: inline-block;
    margin: 1rem;
}

.goToPage {
    text-align: center;
}
</style>