import { computed, onMounted, ref } from "vue"
import { useMarkdownUtils } from "./useMarkdownUtils"

// 主组合函数
export function useMarkdownPosts() {
    const posts = ref([])
    const loading = ref(false)
    const error = ref(null)
    const {
        parseFrontMatter,
        extractTitle,
        extractDate,
        extractTags,
        extractExcerpt,
        generateFixedId,
    } = useMarkdownUtils()

    // 动态导入Markdown文件
    const loadAllMarkdownPosts = async () => {
        loading.value = true
        error.value = null

        try {
            console.log("开始加载markdown文件")

            // 使用glob获取src/posts/目录下所有.md文件
            const modules = import.meta.glob('../posts/*.md', {
                query: '?raw', // 直接返回文件内容的字符串
                import: 'default',
                eager: false // 懒加载
            })

            const mdPosts = []

            for (const path in modules) {
                try {
                    const rawContent = await modules[path]() // 获取原始Markdown内容

                    // 解析Front Matter和内容
                    const { metadata, content } = parseFrontMatter(rawContent)

                    // 提取元数据

                    mdPosts.push({
                        id: generateFixedId(path),
                        title: extractTitle(rawContent) || metadata.title,
                        date: extractDate(rawContent) || metadata.date,
                        tags: extractTags(rawContent) || metadata.tags,
                        excerpt: extractExcerpt(rawContent) || metadata.excerpt,
                        content: content
                    })
                } catch (err) {
                    console.error(`Markdown文件加载失败: ${path}`, err)
                    return null
                }
            }

            // 按日期排序
            posts.value = mdPosts.sort((a, b) => new Date(b.date) - new Date(a.date))
            console.log(`成功加载 ${posts.value.length} 篇Markdown文章`)
        } catch (err) {
            error.value = err.message
            console.error(`加载Markdown文章失败`, err)
        } finally {
            loading.value = false
        }
    }


    // 计算属性

    const allPosts = computed(() => posts.value)

    const getRecentPosts = (limit = 3) => {
        return posts.value.slice(0, limit)
    }

    const getPostById = id => {
        const post = posts.value.find(post => post.id === id)
        
        // 调试信息
        console.log('=== getPostById 调试信息 ===')
        console.log('查找的ID:', id)
        // console.log('所有可用ID:', posts.value.map(p => p.id))
        console.log('找到的结果:', post)
        
        return post
    }

    // 初始化加载
    onMounted(() => {
        loadAllMarkdownPosts()
    })

    return {
        posts: allPosts,
        loading,
        error,
        getRecentPosts,
        getPostById,
        reload: loadAllMarkdownPosts
    }
}