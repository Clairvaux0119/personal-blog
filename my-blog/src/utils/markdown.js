import { marked } from "marked";
import hljs from "highlight.js";
import { renderCode } from "./vue-highlighter";
import mermaid from "mermaid";
import Viz from "viz.js";
import { Module, render } from "viz.js/full.render.js"

// 解析Front Matter
export function parseFrontMatter(text) {
    const metadata = {};
    let content = text;

    // 匹配Front Matter格式
    const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/
    const match = text.match(frontMatterRegex);

    if (match) {
        const frontMatterText = match[1];
        content = match[2].trim() || '';

        // 解析YAML格式的Front Matter
        const lines = frontMatterText.split('\n');
        lines.forEach(line => {
            line = line.trim();
            if (line && line.includes(':')) {
                const colonIndex = line.indexOf(':');
                const key = line.slice(0, colonIndex).trim();
                let value = line.slice(colonIndex + 1).trim();

                // 处理数组类型的值
                if (value.startsWith('[') && value.endsWith(']')) {
                    value = value.slice(1, -1).split(',').map(item => item.trim().replace(/['"]/g, ''));
                }
                // 处理字符串值（移除引号）
                else if ((value.startsWith("'") && value.endsWith("'")) ||
                    (value.startsWith('"') && value.endsWith('"'))) {
                }

                metadata[key] = value;
            }
        });
    }

    return { metadata, content };
}

// 从Markdown中提取标题
export function extractTitle(content) {
    const frontMatterMatch = content.match(/^---\s*\n(?:.*\n)*title:\s*(.+)(?:\n|$)/);
    if (frontMatterMatch) {
        return frontMatterMatch[1].trim();
    }
}

// 从Markdown提取日期
export function extractDate(content) {
    const frontMatterMatch = content.match(/^---\s*\n(?:.*\n)*date:\s*(.+)(?:\n|$)/);
    if (frontMatterMatch) {
        return frontMatterMatch[1].trim();
    }
}

// 从Markdown中提取标签
export function extractTags(content) {
    const frontMatterMatch = content.match(/^---\s*\n(?:.*\n)*tags:\s*\[([^\]]+)(?:\])/);
    if (frontMatterMatch) {
        return frontMatterMatch[1]
            .split(',')
            .map(tag => tag.trim().replace(/['"]/g, ''))
            .filter(tag => tag);
    }
}

// 从Markdown提取摘要
export function extractExcerpt(content) {
    const frontMatterMatch = content.match(/^---\s*\n(?:.*\n)*excerpt:\s*(.+)(?:\n|$)/);
    if (frontMatterMatch) {
        return frontMatterMatch[1].trim();
    }
}

// 从Markdown提取正文
export function extractContent(content) {
    const frontMatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n\s*([\s\S]*)/);
    if (frontMatterMatch) {
        return frontMatterMatch[2].trim();
    }
}

// 生成固定id
export function generateFixedId(filePath) {
    const fileName = filePath.split('/').pop().replace('.md', '');
    return 'md-' + fileName;
}

// 使用marked.js解析Markdown
export function convertMarkdownToHTML(markdownText) {
    console.log('=== 开始转换 Markdown ===');

    // 检查是否包含代码块
    const hasCodeBlocks = markdownText.includes('```');
    console.log('是否包含代码块 (```):', hasCodeBlocks);

    // 配置marked选项
    marked.setOptions({
        breaks: true,
        gfm: true,
        sanitize: false,
        smartypants: false,
    });

    // 初始化 mermaid
    mermaid.initialize({
        startOnLoad: false, // 手动控制渲染
        theme: 'default',
        fontFamily: 'consolas'  // 指定字体
    });

    const result = marked.parse(markdownText);
    console.log('=== 转换完成 ===');
    return result;
}

// 添加高亮函数
export function highlightCodeBlocks() {

    console.log('=== highlightCodeBlocks被调用 ===');

    if (typeof hljs === 'undefined') {
        console.warn('hljs未定义，跳过代码高亮');
        return;
    } else {
        document.querySelectorAll('pre code').forEach(async (block, index) => {
            const className = block.className || '';
            const language = className.replace('language-', '');
            const code = block.textContent;

            if (language === 'vue' || language === 'vue3') {

                console.log('开始高亮Vue代码');
                try {
                    console.log('开始处理Vue代码块');
                    const result = renderCode(code, language);
                    console.log('Vue代码高亮成功');
                    // 用高亮后的结果替换原始内容
                    block.innerHTML = result;
                    if (!className.includes('hljs')) {
                        block.className = className + ' hljs';
                    }
                } catch (err) {
                    console.warn('Vue代码高亮失败', err);
                }
            } else if (language === 'mermaid') {
                console.log('开始处理mermaid图表');
                const mermaidBlocks = document.querySelectorAll('pre code.language-mermaid');
                console.log(`找到 ${mermaidBlocks.length} 个 Mermaid 图表`);

                try {
                    const code = block.textContent.trim();

                    // 提供有效的唯一ID
                    const uniqueId = `mermaid-${index}`;

                    console.log(`渲染 Mermaid 图表 ${index + 1}, ID: ${uniqueId}`);

                    const { svg } = await mermaid.render(uniqueId, code);
                    block.innerHTML = svg;

                    console.log('Mermaid 图表渲染成功');
                } catch (err) {
                    console.warn('mermaid图表解析失败', err);
                }
            } else if (language === 'dot') {
                console.log('开始处理dot图表');
                const dotBlock = document.querySelectorAll('pre code.language-dot');
                console.log(`找到 ${dotBlock.length} 个dot图表`);

                try {
                    const code = block.textContent.trim();
                    const viz = new Viz({ Module, render });
                    const svg = await viz.renderSVGElement(code);

                    block.innerHTML = '';
                    block.appendChild(svg);
                    console.log('dot图表渲染成功');
                } catch (err) {
                    console.warn('dot图表解析失败', err);
                }
            } else if (hljs.getLanguage(language)) {
                hljs.highlightElement(block);
            } else {
                console.warn(`语言 '${language}' 不被支持，跳过高亮`);
            }
        });
    }
}