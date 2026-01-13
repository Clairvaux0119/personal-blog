<template>
    <div id="posts-container">

        <!-- 调试信息 -->
        <div v-if="false" style="background: #f0f0f0; padding: 10px; margin-bottom: 20px; border: 1px solid #ccc;">
            <h3>调试信息:</h3>
            <p>loading: {{ loading }}</p>
            <p>error: {{ error }}</p>
            <p>post: {{ post }}</p>
            <p>post 是否存在: {{ !!post }}</p>
            <p>postToHTML 长度: {{ postToHTML.length }}</p>
            <p>当前路由ID: {{ route.params.id }}</p>
            <p>文章列表长度: {{ allPosts.length }}</p>
            <p>文章列表: {{allPosts.map(p => p.id)}}</p>
        </div>

        <!-- 加载状态 -->
        <div v-if="loading" class="loading">加载中...</div>

        <!-- 错误状态 -->
        <div v-else-if="error" class="error">
            <h2>加载失败</h2>
            {{ error }}
            <button @click="retry">重试</button>
        </div>

        <!-- 文章内容 -->
        <div v-else-if="post" class="post-detail">
            <header class="post-header">
                <article class="post-card">
                    <h1>{{ post.title }}</h1>
                    <div class="post-meta">
                        <div class="post-date">{{ post.date }}</div>
                        <span> &bull; </span>
                        <div v-if="post.tags && post.tags.length" class="post-tags">
                            <span v-for="tag in post.tags" :key="tag" class="tag">
                                {{ tag }}
                            </span>
                        </div>
                    </div>
                </article>
            </header>

            <!-- 正文 -->
            <div class="post-content" v-html="postToHTML"></div>
        </div>

        <!-- 空状态 -->
        <div v-if="!loading && !error && !post" class="no-posts">
            暂无文章
        </div>
    </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from "vue"
import { useBlogStore } from "@/stores/post"
import { useRoute } from "vue-router"
import { useMarkdownUtils } from "../composables/useMarkdownUtils"
import { storeToRefs } from "pinia"

const route = useRoute()
const blogStore = useBlogStore()
const { convertMarkdownToHTML, highlightCodeBlocks } = useMarkdownUtils()

// 从store解构
const { loading, error, posts } = storeToRefs(blogStore)
const { loadPostsMeta, fetchPostContent, getPostById } = blogStore

const post = ref(null)
const postToHTML = ref('')
const contentLoading = ref(false)

// 计算当前文章（仅元数据）
const currentPost = computed(() => {
    const postId = route.params.id
    if (!postId || posts.value.length === 0) {
        return null
    }
    return getPostById(postId)
})

const fetchPostDetail = async () => {
    const postId = route.params.id
    console.log("文章id: ", postId)
    if (!postId) {
        return null
    }

    try {
        // 如果文章列表为空，先加载所有文章
        if (posts.value.length === 0) {
            console.log("文章列表为空，等待文章元数据加载...")
            await loadPostsMeta()
        }

        // 设置文章数据
        post.value = currentPost.value

        if (!post.value) {
            console.log('未找到文章: ', postId)
            console.log('可用文章ID:', posts.value.map(p => p.id))
            return
        }

        console.log('文章原始数据: ', post.value)

        if (!post.value.content) {
            console.log('文章内容为空，开始加载...')
            contentLoading.value = true

            try {
                const result = await fetchPostContent(postId)

                if (result && result.length > 0) {
                    const content = result[0].content
                    if (content) {
                        console.log("首次加载文章内容成功")
                    } else {
                        console.log("获取到的内容为空")
                    }
                } else {
                    console.log('fetchPostContent获取到的内容为空')
                }
            } catch (err) {
                console.log("文章内容加载失败", err)
            } finally {
                contentLoading.value = false
            }
        } else {
            console.log("使用已缓存的内容")
        }

        // 等待DOM更新后高亮代码
        // 转换Markdown
        postToHTML.value = convertMarkdownToHTML(post.value.content)
        console.log('Markdown转换完成')
        console.log('开始转换和高亮代码块')
        await nextTick()

        // 执行高亮
        if (highlightCodeBlocks && typeof highlightCodeBlocks === 'function') {
            highlightCodeBlocks()
            console.log('代码块高亮函数已调用')
        } else {
            console.warn('highlightCodeBlocks 不可用，跳过代码高亮')
        }
        console.log('转换后: ', postToHTML)
    } catch (err) {
        console.error('获取文章详情失败', err)
    }
}

// 重试加载
const retry = async () => {
    try {
        await loadPostsMeta()
        await fetchPostDetail()
    } catch (err) {
        console.error('重试失败:', err)
    }
}

// 监听路由参数变化
watch(() => route.params.id, (newId) => {
    console.log('路由ID变化:', newId)
    if (newId) {
        fetchPostDetail()
    }
})

onMounted(() => {
    fetchPostDetail()
})
</script>

<style>
.loading,
.error,
.no-posts {
    text-align: center;
    padding: 3rem;
    color: #666;
    font-size: 1.1rem;
}

/* 文章头部样式 */
.post-header {
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 0.3em;
    max-width: 1200px;
    margin: 1.5em auto 0.8em;
}

.post-meta {
    display: flex;
    gap: 0.4rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    color: #666;
}

.post-tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

/* 文章基础样式 */
.post-content {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    line-height: 1.7;
    color: #2d3748;
    max-width: 1000px;
    margin: 0 auto;
    padding: 10px;
    --h1-color: #1a202c;
    --h2-color: #2d3748;
    --h3-color: #4a5568;
    --h4-color: #718096;
    --h5-color: #a0aec0;
}

/* 标题样式 */
.post-content h1 {
    font-size: 2.2em;
    color: var(--h1-color);
    margin: 1.5em 0 0.8em 0;
}

.post-content h2 {
    font-size: 1.8em;
    color: var(--h2-color);
    margin: 1.2em 0 0.6em 0;
}

.post-content h3 {
    font-size: 1.4em;
    color: var(--h3-color);
    margin: 1em 0 0.5em 0;
}

.post-content h4 {
    font-size: 1.2em;
    color: var(--h4-color);
    margin: 0.8em 0 0.4em 0;
}

.post-content h5 {
    font-size: 1.1em;
    color: var(--h5-color);
    margin: 0.6em 0 0.3em 0;
}

/* 代码块样式 */
.post-content code {
    font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
    font-size: 0.9em;
}

.post-content pre {
    border-radius: 8px;
    overflow: auto;
}

/* 行内代码块 */
.post-content :not(pre)>code {
    background: #f7fafc;
    padding: 0.2em 0.4em;
    border-radius: 4px;
    border: 1px solid #e2e8f0;
    color: #e53e3e;
}

/* 引用块 */
.post-content blockquote {
    background: #f8fafc;
    border-left: 4px solid #4299e1;
    padding: 1em 1.5em;
    margin: 1.2em 0;
    color: #4a5568;
    border-radius: 0 4px 4px 0;
}

/* 表格样式 */
.post-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.2em 0;
}

.post-content th {
    background: #f7fafc;
    font-weight: 600;
    text-align: left;
}

.post-content th,
.post-content td {
    padding: 0.75em;
    border: 1px solid #e2e8f0;
}

.post-content tr:nth-child(even) {
    background: #f8fafc;
}

/* meimaid图表 */
.post-content .language-mermaid {
    display: flex;
    justify-content: center;
}

.post-content .language-mermaid svg {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

/* dot 图表 */
.post-content .language-dot {
    display: flex;
    justify-content: center;
    margin-top: 1em;
    margin-bottom: 1em;
}

.post-content .language-dot svg {
    background-color: white;
    padding: 1em;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

/* 其他样式 */
.post-content ul,
.post-content ol {
    margin: 1em 0;
    padding-left: 2em;
}

.post-content li {
    margin: 0.5em 0;
}


.post-content a {
    color: #4299e1;
    text-decoration: none;
}

.post-content a:hover {
    text-decoration: underline;
}

/* 图片样式 */
.post-content img {
    display: flex;
    justify-content: center;
    max-width: 800px;
    height: auto;
    border-radius: 8px;
    margin: 1em auto;
}
</style>