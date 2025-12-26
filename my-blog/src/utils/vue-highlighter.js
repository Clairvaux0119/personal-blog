import hljs from "highlight.js";
import { parse } from "@vue/compiler-sfc";

//导入commonJS模块（TS类型声明见types/highlightjs.d.ts）
import html from "highlight.js/lib/languages/xml";
import javascript from'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import css from'highlight.js/lib/languages/css';
import plaintext from'highlight.js/lib/languages/plaintext';

// 注册语言
if(!hljs.getLanguage('html')) hljs.registerLanguage('html', html);
if(!hljs.getLanguage('javascript')) hljs.registerLanguage('javascript', javascript);
if(!hljs.getLanguage('typescript')) hljs.registerLanguage('typescript', typescript);
if(!hljs.getLanguage('css')) hljs.registerLanguage('css', css);
if(!hljs.getLanguage('plaintext')) hljs.registerLanguage('plaintext', plaintext);

const LANGUAGE_MAP = {
    html: 'html',
    js: 'js',
    ts: 'ts',
    javascript: 'javascript',
    typescript: 'typescript',
    css: 'css',
    vue: 'vue'
}

// 清理代码内容
function cleanCodeContent(content) {
    return content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n')
    .trim();
}

export const renderCode = (code, type) => {
    console.log('=== renderCode被调用 ===');
    console.log('类型: ', type);
    // console.log('原始代码: ', code);
    
    if (type === 'vue' || type === 'vue3') {
        try {
            console.log('开始解析Vue SFC');
            
            const { descriptor } = parse(code.trim());
            let text = '';

            console.log('Vue SFC解析成功');
            console.log('模板: ', !!descriptor.template);
            console.log('脚本: ', !!(descriptor.script || descriptor.scriptSetup));
            console.log('样式: ', !!(descriptor.styles && descriptor.styles.length > 0));

            // 高亮模板部分
            if (descriptor.template) {
                console.log('处理模板部分');
                
                const templateContent = descriptor.template.content;
                const fullTemplate = `<template>${templateContent}</template>`;
                const highlightedTemplate = hljs.highlight(fullTemplate, { language: 'html' }).value;

                // text += `<div class="vue-section hljs"><pre><code class="language-html hljs">${highlightedTemplate}</code></pre></div>`
                text += `${highlightedTemplate}\n`;
                console.log('模板部分处理成功: ', highlightedTemplate.slice(0, 100));
            }

            // 高亮脚本部分
            if (descriptor.script || descriptor.scriptSetup) {
                console.log('处理脚本部分');
                const scriptBlock = descriptor.script || descriptor.scriptSetup;
                const scriptContent = scriptBlock.content || '';
                const isTypeScript = scriptBlock.lang === 'ts';
                const scriptLang = isTypeScript ? 'typescript' : 'javascript';
                
                // 构建脚本标签
                let label = '<script';
                if (descriptor.scriptSetup) label += ' setup';
                if (isTypeScript) label += 'lang="ts"';
                label += '>'
                
                const fullScript = `${label}${scriptContent}</script>`;
                const highlightedScript = hljs.highlight(fullScript, { language: scriptLang }).value;
                // text += `<div class="vue-section hljs"><pre><code class="language-${scriptLang} hljs">${highlightedScript}</code></pre></div>`
                text += `\n${highlightedScript}\n`;
                console.log('脚本高亮成功: ', highlightedScript.slice(0, 100));
            }

            // 高亮样式部分
            if (descriptor.styles && descriptor.styles.length > 0) {
                console.log('处理样式部分');
                
                descriptor.styles.forEach(style => {
                    // 构建样式标签
                    let label = '<style'
                    if (style.scoped) label += ' scoped';
                    if (style.lang) label += ` lang="${style.lang}"`;
                    label += '>';

                    const fullStyle = `${label}${style.content}</style>`;
                    const styleContent = hljs.highlight(fullStyle, { language: style.lang || 'css' }).value;

                    // text += `<div class="vue-section"><pre><code class="language-css hljs">${styleContent}</code></pre></div>`
                    text += `\n${styleContent}`
                });
            }

            return text.trim();
        } catch(err) {
            console.warn('Vue SFC解析失败，使用普通高亮: ', err)

            // 失败时退回到HTML高亮
            return hljs.highlight(code, { language: 'html' }).value;
        }
    }

    const language = LANGUAGE_MAP[type] || 'plaintext'
    return hljs.highlight(code, { language }).value
}