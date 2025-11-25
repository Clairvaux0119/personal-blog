---
title: Image对象
date: 2025-10-02
tags: ["javascript", "Image", "DOM"]
excerpt: "HTML DOM Image对象"
---

## Image对象

Image 对象
Image 对象代表嵌入的图像。

`<img>`标签每出现一次，一个`Image`对象就会被创建。

### `Image`对象属性

W3C: W3C标准。

|属性|描述|W3C|
|---|---|---|
|align|设置或返回与内联内容的对齐方式。|Yes|
|alt|设置或返回无法显示图像时的替代文本。|Yes|
|border|设置或返回图像周围的边框。|Yes|
|complete|返回浏览器是否已完成对图像的加载。|No|
|height|设置或返回图像的高度。|Yes|
|hspace|设置或返回图像左侧和右侧的空白。|Yes|
|longDesc|设置或返回指向包含图像描述的文档的 URL。|Yes|
|lowsrc|设置或返回指向图像的低分辨率版本的 URL。|No|
|name|设置或返回图像的名称。|Yes|
|src|设置或返回图像的 URL。|Yes|
|useMap|设置或返回客户端图像映射的 usemap 属性的值。|Yes|
|vspace|设置或返回图像的顶部和底部的空白。|Yes|
|width|设置或返回图像的宽度。|Yes|

### `Image`对象事件

|事件|描述|W3C|
|---|---|---|
|onabort|当用户放弃图像的装载时调用的事件句柄。|Yes|
|onerror|在装载图像的过程中发生错误时调用的事件句柄。|Yes|
|onload|当图像装载完毕时调用的事件句柄。|Yes|
