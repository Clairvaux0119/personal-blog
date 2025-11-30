const r=`---\r
title: Vue条件渲染\r
date: 2025-10-11\r
tags: ["javascript", "Vue", "条件渲染"]\r
excerpt: "Vue条件渲染"\r
---\r
\r
## 条件渲染\r
\r
### \`v-if\`\r
\r
\`v-if\`指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回值为\`true\`的时候被渲染。\r
\r
\`\`\`vue\r
<template>\r
  <div>\r
    <p v-if="flag">我是孙悟空</p>\r
  </div>\r
</template>\r
\r
<script setup>\r
import { ref } from 'vue'\r
\r
const flag = ref(true)\r
<\/script>\r
\`\`\`\r
\r
由于\`flag\`的值为\`ture\`，页面上会渲染文本\r
\r
\`\`\`text\r
我是孙悟空\r
\`\`\`\r
\r
### \`v-else\`\r
\r
可以使用\`v-else\`指令来表示\`v-if\`的“else块”。\r
\r
\`\`\`vue\r
<template>\r
  <div>\r
    <p v-if="flag">我是孙悟空</p>\r
    <p v-else="flag">我是六耳猕猴</p>\r
  </div>\r
</template>\r
\r
<script setup>\r
import { ref } from 'vue'\r
\r
const flag = ref(false)\r
<\/script>\r
\`\`\`\r
\r
页面会渲染文本\r
\r
\`\`\`text\r
我是六耳猕猴\r
\`\`\`\r
\r
### \`v-show\`\r
\r
另一个用于条件性展示元素的选项是\`v-show\`指令。\r
\r
\`\`\`vue\r
<template>\r
  <div>\r
    <p v-show="flag">你真的是孙悟空吗</p>\r
  </div>\r
</template>\r
\r
<script setup>\r
import { ref } from 'vue'\r
\r
const flag = ref(true)\r
<\/script>\r
\`\`\`\r
\r
页面渲染文本\r
\r
\`\`\`text\r
你真是孙悟空吗\r
\`\`\`\r
\r
### \`v-if\`和\`v-show\`的区别\r
\r
\`v-if\`是“真实的”按条件渲染，因为它确保了在切换时，条件区块内的事件监听器和子组件都会被**销毁与重建**。\r
\r
\`v-if\`也是**惰性**的：如果在初次渲染时条件值为\`false\`，则不会做任何事。条件区块只有当条件首次变为\`true\`时才被渲染。\r
\r
相比之下，\`v-show\`简单许多，元素无论初始条件如何，始终会被渲染，只有CSS display属性会被切换。\r
\r
总的来说，\`v-if\`有更高的切换开销，而\`v-show\`有更高的初始渲染开销。因此，如果需要频繁切换，则使用\`v-show\`较好；\r
如果在运行时绑定条件很少改变，则\`v-if\`会更合适。\r
`;export{r as default};
