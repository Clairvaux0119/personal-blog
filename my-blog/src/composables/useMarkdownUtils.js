import {
    parseFrontMatter,
    extractTitle,
    extractDate,
    extractTags,
    extractExcerpt,
    extractContent,
    generateFixedId,
    convertMarkdownToHTML,
    highlightCodeBlocks
} from "../utils/markdown"

export function useMarkdownUtils() {
    return {
        parseFrontMatter,
        extractTitle,
        extractDate,
        extractTags,
        extractExcerpt,
        extractContent,
        generateFixedId,
        convertMarkdownToHTML,
        highlightCodeBlocks
    }
}