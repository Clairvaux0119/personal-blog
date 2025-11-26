const r=`---\r
title: Image对象\r
date: 2025-10-02\r
tags: ["javascript", "Image", "DOM"]\r
excerpt: "HTML DOM Image对象"\r
---\r
\r
## Image对象\r
\r
Image 对象\r
Image 对象代表嵌入的图像。\r
\r
\`<img>\`标签每出现一次，一个\`Image\`对象就会被创建。\r
\r
### \`Image\`对象属性\r
\r
W3C: W3C标准。\r
\r
|属性|描述|W3C|\r
|---|---|---|\r
|align|设置或返回与内联内容的对齐方式。|Yes|\r
|alt|设置或返回无法显示图像时的替代文本。|Yes|\r
|border|设置或返回图像周围的边框。|Yes|\r
|complete|返回浏览器是否已完成对图像的加载。|No|\r
|height|设置或返回图像的高度。|Yes|\r
|hspace|设置或返回图像左侧和右侧的空白。|Yes|\r
|longDesc|设置或返回指向包含图像描述的文档的 URL。|Yes|\r
|lowsrc|设置或返回指向图像的低分辨率版本的 URL。|No|\r
|name|设置或返回图像的名称。|Yes|\r
|src|设置或返回图像的 URL。|Yes|\r
|useMap|设置或返回客户端图像映射的 usemap 属性的值。|Yes|\r
|vspace|设置或返回图像的顶部和底部的空白。|Yes|\r
|width|设置或返回图像的宽度。|Yes|\r
\r
### \`Image\`对象事件\r
\r
|事件|描述|W3C|\r
|---|---|---|\r
|onabort|当用户放弃图像的装载时调用的事件句柄。|Yes|\r
|onerror|在装载图像的过程中发生错误时调用的事件句柄。|Yes|\r
|onload|当图像装载完毕时调用的事件句柄。|Yes|\r
`;export{r as default};
