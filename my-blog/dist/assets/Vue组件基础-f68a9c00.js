const n=`---\r
title: Vue组件基础\r
date: 2025-10-14\r
tags: ["javascript", "Vue", "组件"]\r
excerpt: "Vue组件基础"\r
---\r
\r
## 组件基础\r
\r
### 单文件组件\r
\r
Vue单文件组件（即\`*.vue\`文件，缩写为SFC）是一种特殊的文件格式，它允许将Vue组件的模板、逻辑与样式封装在单个文件中。\r
\r
创建一个单文件组件\`单文件组件.vue\`\r
\r
\`\`\`vue\r
<template>\r
    <h3>单文件组件</h3>\r
</template>\r
\r
<script setup>\r
const name = "MyComponents";\r
<\/script>\r
\r
<style scoped>\r
h3 {\r
    color: red;\r
}\r
</style>\r
\`\`\`\r
\r
### 加载组件\r
\r
在\`App.vue\`中\r
\r
\`\`\`vue\r
<template>\r
  <MyComponent />\r
</template>\r
\r
<script setup>\r
import MyComponent from "./components/单文件组件.vue";\r
<\/script>\r
\`\`\`\r
\r
### 组件的组织\r
\r
通常一个应用会以一棵嵌套的组件树的形式来组织。\r
`;export{n as default};
