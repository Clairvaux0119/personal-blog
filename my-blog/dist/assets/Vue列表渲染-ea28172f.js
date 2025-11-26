const r=`---\r
title: Vue列表渲染\r
date: 2025-10-12\r
tags: ["javascript", "Vue", "列表渲染"]\r
excerpt: "Vue列表渲染"\r
---\r
\r
## 列表渲染\r
\r
### \`v-for\`\r
\r
可以使用\`v-for\`指令基于一个数组来渲染一个列表。\`v-for\`指令需要使用\`item in items\`形式的特殊语法，其中\`items\`是源数据数组，\`item\`是被迭代的数组元素的别名。\r
\r
\`\`\`vue\r
<template>\r
<div class="list">\r
  <h3>列表渲染</h3>\r
  <ul>\r
    <li v-for="item in newsList">\r
      {{ item }}\r
    </li>\r
  </ul>\r
</div>\r
</template>\r
\r
<script setup>\r
import { ref } from 'vue';\r
\r
const newsList = ref([\r
  {\r
    id: 1001,\r
    title: "今日新闻"\r
  },\r
  {\r
    id: 1002,\r
    title: "焦点关注"\r
  },\r
  {\r
    id: 1003,\r
    title: "国际新闻"\r
  }\r
]);\r
<\/script>\r
\`\`\`\r
\r
页面渲染内容\r
\r
\`\`\`text\r
列表渲染\r
· { "id": 1001, "title": "今日新闻" }\r
· { "id": 1002, "title": "焦点关注" }\r
· { "id": 1003, "title": "国际新闻" }\r
\`\`\`\r
\r
### 通过key管理状态\r
\r
Vue默认按照“就地更新”的策略来更新通过\`v-for\`渲染的元素列表。当数据项的顺序改变时，Vue不会随之移动DOM元素的顺序，而是就地更新每个元素，确保它们在原本指定的索引位置上渲染。\r
\r
对于上面列表渲染的例子，为数组\`newsList\`添加新的数组元素\r
\r
\`\`\`javascript\r
{\r
  id: 1004,\r
  title: "社会热点"\r
}\r
\`\`\`\r
\r
渲染页面的时候只会把新添加的元素重新渲染上去，而不会重新渲染整个对象。\r
\r
默认模式是高效的，但只适用于列表渲染输出的结果不依赖子组件状态或者临时DOM状态 (例如表单输入值) 的情况。\r
\r
为了给Vue一个提示，以便它可以跟踪每个节点的标识，从而重用和重新排序现有的元素，你需要为每个元素对应的块提供一个唯一的\`key attribute\`\r
\r
\`\`\`vue\r
<li v-for="item in newsList" :key="item.id">\r
    {{ item }}\r
</li>\r
\`\`\`\r
\r
如果没有设置唯一标识\`id\`，也可以使用数组索引进行标识\r
\r
\`\`\`vue\r
<li v-for="(item, index) in newsList" :key="index">\r
    {{ item }}\r
</li>\r
\`\`\`\r
\r
要注意的是，只有在简单静态列表时才考虑使用索引进行标识，更建议使用数据中的唯一标识。\r
`;export{r as default};
