const r=`---\r
title: Vue模板语法\r
date: 2025-10-04\r
tags: ["javascript", "Vue", "模板语法"]\r
excerpt: "Vue模板语法"\r
---\r
\r
## Vue模板语法\r
\r
### 文本插值\r
\r
数据绑定最常见的形式就是使用 "Mustache"（双大括号）语法的文本插值。\r
\r
\`\`\`vue\r
<template>\r
  <div>\r
    <h3>学习vue：模板语法</h3>\r
    <p>{{ message }}</p>\r
  </div>\r
</template>\r
\r
<script setup>\r
import { ref } from 'vue';\r
\r
const message = ref("学习vue")\r
<\/script>\r
\`\`\`\r
\r
### 原始HTML\r
\r
双大括号会将数据解释为普通文本，而非HTML代码。输出真正的HTML，需要使用\`v-html\`指令。\r
\r
\`\`\`vue\r
<template>\r
  <div>\r
    <div>{{ rawHtml }}</div>\r
    <div><span v-html="rawHtml"></span></div>\r
  </div>\r
</template>\r
\r
<script setup>\r
import { ref } from 'vue';\r
\r
const rawHtml = ref("<a href='https://zhidao.baidu.com/'>百度知道</a>");\r
<\/script>\r
\`\`\`\r
\r
### 属性Attribute\r
\r
Mustache语法不能在HTML属性中使用，要使用它需要使用\`v-bind\`指令。\r
\r
\`\`\`vue\r
<template>\r
  <div>\r
    <div v-bind:id="dynamicId" ></div>\r
  </div>\r
</template>\r
\r
<script setup>\r
import { ref } from 'vue';\r
\r
const dynamicId = ref(10001);\r
<\/script>\r
\`\`\`\r
\r
>**注意**&nbsp;&nbsp;&nbsp;&nbsp;\`v-bind\`可以简写成\`:\`，即上述代码中\`v-bind:id=""\`可以简写成\`:id=""\`。\r
\r
### 使用JavaScript表达式\r
\r
在模板中可以使用完整的JavaScript表达式。\r
\r
\`\`\`vue\r
<template>\r
  <div>\r
    <p>{{ num + 10 }}</p>\r
    <p>{{ flag ? "孙悟空" : "六耳猕猴" }}</p>\r
  </div>\r
</template>\r
\r
<script setup>\r
import { ref } from 'vue';\r
\r
const num = ref(10);\r
const flag = ref(true);\r
<\/script>\r
\`\`\`\r
\r
会在页面分别渲染\r
\r
\`\`\`text\r
20\r
孙悟空\r
\`\`\`\r
\r
这些表达式会在当前活动实例的数据作用域下作为JavaScript被解析。要注意的是，每个绑定只能包含**单个表达式**。因此下面的例子都不会生效。\r
\r
\`\`\`vue\r
<!-- 这是语句，不是表达式 -->\r
{{ var a = 1 }}\r
\r
<!-- 流程控制不会生效，if语句不是单个表达式 -->\r
{{ if (ok) {return message} }}\r
\`\`\`\r
`;export{r as default};
