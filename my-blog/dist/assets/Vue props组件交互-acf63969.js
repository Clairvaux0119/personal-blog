const r=`---\r
title: Vue props组件交互\r
date: 2025-10-16\r
tags: ["javascript", "Vue", "props", "组件"]\r
excerpt: "Vue props组件交互"\r
---\r
\r
## Props组件交互\r
\r
组件与组件之间是需要存在交互的，如果没有关系的话组件的意义就很小了。\`props\`属性是可以在组件上注册的一些自定义attribute。\r
\r
在\`App.vue\`中定义响应式数据\`title\`, \`age\`, \`name\`作为子组件的自定义attribute\r
\r
\`\`\`vue\r
<template>\r
  <MyComponent :title="title"/>\r
</template>\r
\r
<script setup>\r
import { ref } from "vue";\r
import MyComponent from "./components/Props组件交互.vue";\r
\r
const title = ref("我是一个标题");\r
const age = ref(20);\r
const name = ['Mike', 'Bob', 'Alice'];\r
<\/script>\r
\`\`\`\r
\r
在\`Props组件交互.vue\`组件中添加属性\`title\`, \`age\`, \`name\`\r
\r
\`\`\`vue\r
<template>\r
    <h3>prop传递数据</h3>\r
    <p>{{ title }}</p>\r
    <p>{{ age }}</p>\r
    <ul>\r
        <li v-for="item in name" :key="name">\r
            {{ item }}\r
        </li>\r
    </ul>\r
</template>\r
\r
<script setup>\r
const name = "Mycomponent";\r
const props = defineProps({\r
    title: {\r
        type: String,\r
        default: ""\r
    },\r
    age: {\r
        type: Number,\r
        default: 0\r
    },\r
    name: {\r
        type: Array,\r
\r
        // 数组和对象必须使用函数进行返回\r
        default: function () {\r
            return [];\r
        }\r
    }\r
});\r
<\/script>\r
\`\`\`\r
\r
通过上述代码可以将父组件中的数据传递到子组件中使用。\r
\r
### Prop类型\r
\r
\`prop\`传递参数是没有类型限制的。\r
\r
\`\`\`vue\r
<script setup>\r
const props = defineProps({\r
    title: String,\r
    likes: Number,\r
    isPublished: Boolean,\r
    commentIds: Array,\r
    author: Object,\r
    callback: Function\r
});\r
<\/script>\r
\`\`\`\r
\r
>**温馨提示**\r
>\r
>数据类型为数组或对象的时候，默认值需要返回**工厂模式**（即不直接使用\`new\`关键字创建对象，而是通过一个工厂方法来创建对象）。\r
`;export{r as default};
