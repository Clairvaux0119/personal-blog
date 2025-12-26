import { extractDate, extractExcerpt, extractTags, extractTitle, generateFixedId, parseFrontMatter } from "@/utils/markdown"
import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useBlogStore = defineStore('blog', () => {
    // ----------------state----------------
    // 文章数据
    const posts = ref([])
    const loading = ref(false)
    const error = ref(null)
    const currentPage = ref(1)
    const pageSize = ref(18)

    // ----------------getters----------------
    const getPostById = id => {
        const post = posts.value.find(post => post.id === id)

        return post
    }

    const getRecentPosts = (limit = 3) => {
        return posts.value.slice(0, limit)
    }

    // 总页数
    const totalPages = computed(() => {
        return Math.max(1, Math.ceil(posts.value.length / pageSize.value))
    })

    // 是否有上一页
    const hasPrevPage = computed(() => {
        return currentPage.value > 1
    })

    // 是否有下一页
    const hasNextPage = computed(() => {
        return currentPage.value < totalPages.value
    })

    // 获取当前页的文章
    const getCurrentPosts = computed(() => {
        if (posts.value.length === 0) {
            return []
        }

        const start = (currentPage.value - 1) * pageSize.value
        const end = Math.min(start + pageSize.value, posts.value.length)


        // 边界检查
        if (start >= posts.value.length) {
            console.warn("当前已是最后一页")
            const lastPage = Math.ceil(posts.value.length / pageSize.value)
            const lastStart = (lastPage - 1) * pageSize.value
            const lastEnd = lastStart + pageSize.value
            return posts.value.slice(lastStart, lastEnd)
        }

        return posts.value.slice(start, end)
    })

    // ----------------actions----------------
    // 动态导入Markdown文件元数据
    const loadPostsMeta = async () => {
        loading.value = true
        error.value = null

        try {
            console.log("开始加载博客文件列表元数据")

            // 使用glob获取.md文件
            const modules = import.meta.glob('@/posts/*.md', {
                query: '?raw',  // 直接返回文件内容的字符串
                import: 'default',  // 访问时直接获取字符串而不是模块，不需要.default
                eager: false  // 懒加载
            })

            const mdPostsMeta = []

            for (const path in modules) {
                try {
                    // 获取Markdown原始内容
                    const rawContent = await modules[path]()

                    // 解析Front Meta
                    const { metadata } = parseFrontMatter(rawContent)

                    // 生成文章唯一id
                    const postId = generateFixedId(path)

                    // 提取元数据
                    mdPostsMeta.push({
                        id: postId,
                        title: extractTitle(rawContent) || metadata.title,
                        date: extractDate(rawContent) || metadata.date,
                        tags: extractTags(rawContent) || metadata.tags,
                        excerpt: extractExcerpt(rawContent) || metadata.excerpt,
                        content: null,
                        loadContent: () => modules[path]()
                    })
                } catch (err) {
                    console.warn(`文件元数据读取失败: ${path}`, err)
                }
            }

            posts.value = mdPostsMeta.sort((a, b) => new Date(b.date) - new Date(a.date))
            console.log(`成功加载${posts.value.length}篇文章`)
        } catch (err) {
            console.error("加载Markdown文章失败", err)
        } finally {
            loading.value = false
        }
    }

    // 获取文章详细内容
    const fetchPostContent = async postId => {
        const post = getPostById(postId)

        if (!post) {
            console.log(`文章未找到：${postId}`)
            return []
        }

        if (post.content) {
            console.log(`使用缓存内容：${postId}`)
            return [{
                content: post.content
            }]
        }

        if (!post.loadContent) {
            console.log(`文章${postId}没有对应的模块加载函数`)
            return []
        }

        // 执行加载函数，获取文章原始内容
        try {
            console.log(`动态加载文章内容：${postId}`)
            const rawContent = await post.loadContent()
            const { content } = parseFrontMatter(rawContent)

            post.content = content
        } catch (err) {
            console.warn('文章详情加载失败', err)
            return []
        }

        console.log('文章详情加载成功')
        return [{
            content: post.content
        }]
    }

    // 分页控制功能
    // 上一页
    const prevPage = () => {
        if (hasPrevPage.value) {
            currentPage.value--
            console.log(`上一页：${currentPage.value}`)
            return true
        }
        console.log('已是第一页')
        return false
    }

    // 下一页
    const nextPage = () => {
        if (hasNextPage.value) {
            currentPage.value++
            console.log(`下一页：${currentPage.value}`)
            return true
        }
        console.log('已是最后一页')
        return false
    }

    // 跳转到指定页
    const goToPage = pageNum => {
        if (pageNum < 1 || pageNum > totalPages.value) {
            console.warn(`页码${pageNum}超出范围1 ~ ${totalPages.value}`)
            return false
        }

        currentPage.value = pageNum
        console.log(`跳转到${pageNum}页`)
        return true
    }

    return {
        // state
        posts,
        loading,
        error,
        currentPage,

        // getters
        getRecentPosts,
        getPostById,
        getCurrentPosts,
        totalPages,
        hasPrevPage,
        hasNextPage,

        // actions
        loadPostsMeta,
        fetchPostContent,
        prevPage,
        nextPage,
        goToPage
    }
})