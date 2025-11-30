const n=`---\r
title: Vue 组件生命周期\r
date: 2025-10-18\r
tags: ["javascript", "Vue", "组件"]\r
excerpt: "Vue 组件生命周期"\r
---\r
\r
## 组件生命周期\r
\r
每个组件在被创建时都要经过一系列的初始化过程————例如，需要设置数据监听、编译模板、将实例挂载到DOM并在数据变化时更新DOM等。同时在这个过程中也会运行一些叫做**生命周期钩子**的函数，这给了用户在不同阶段添加自己的代码的机会。\r
\r
\`\`\`dot\r
digraph {\r
    /* 颜色定义\r
       变量 = #e36209 (橙色)\r
       方法 = #22863a (绿色) */\r
\r
    layout=neato;\r
\r
    // 全局样式\r
    node [style="filled, rounded" width=2.6 height=0.5 penwidth=0 fontcolor=white fontsize="12px"];\r
\r
    // 开始节点\r
    node [class="start-node, end-node" shape=box fillcolor="#3498db" ];\r
    start [pos="0,0!" label=<\r
        app = Vue.<font color="#22863a">createApp</font>(<font color="#e36209">options</font>)<br/>\r
        app.<font color="#22863a">mount</font>(<font color="#e36209">el</font>)\r
        >];\r
    \r
    // 中间节点\r
    node [class="step-node" fillcolor="#1abc9c"];\r
    step1 [pos="0,-1!" label="Init\\nevents & lifecycle" ];\r
    step2 [pos="0,-2.5!" label="Init\\ninjections & reactivity"];\r
    step3 [pos="-2,-6!" label="Compile template\\ninto render function*"];\r
    step4 [pos="2,-6!" label="Compile el's innerHTML\\nas template*"];\r
    step5 [pos="0,-8.5!" label="Create app.$el and\\nappend it to el"];\r
    step6 [pos="4,-10.2!" label="Virtual DOM\\nre-rendered\\nand patch"];\r
    \r
    // 分支节点\r
    node [class="branch-node" style=filled shape=diamond fillcolor="#FF980c"];\r
    branch1 [pos="0,-4.5!" label="Has\\n\\"template\\"\\noptions?"];\r
    \r
    // 注释节点\r
    node [class="note-node" shape=box width=1.5 style="filled, rounded" penwidth=1 color=red fillcolor=none fontcolor=red];\r
    note1 [pos="-3.5,-1.7!" label="beforeCreate"];\r
    note2 [pos="-3.5,-3.2!" label="created"];\r
    note3 [pos="-3.5,-7.6!" label="beforeMount"];\r
    note4 [pos="-3.5,-9.15!" label="mounted"];\r
    note5 [pos="-3.5,-12.2!" label="beforeUnmount"];\r
    note6 [pos="4,-9!" label="beforeUpdate"];\r
    note7 [pos="4,-11.5!" label="beforeUpdate"];\r
    note8 [pos="-3.5,-13.2!" label="unmounted"]\r
\r
    // 圆形节点\r
    node [class="circle-node" width=1.0 fillcolor=red fontcolor=white shape=circle];\r
    circle1 [pos="0,-10.2!" label="Mounted"];\r
    circle2 [pos="0,-13.2!" label="Unmounted"];\r
\r
    // 不可见转折点\r
    node [style=invis shape=point width=0 height=0 label=""];\r
    point1 [pos="0,-1.7!"];\r
    point2 [pos="0,-3.2!"];\r
    left_point1 [pos="-2,-4.5!"];\r
    right_point1 [pos="2,-4.5!"];\r
    left_point2 [pos="-2,-7!"];\r
    right_point2 [pos="2,-7!"];\r
    point3 [pos="0,-7!"];\r
    point4 [pos="0,-7.6!"];\r
    point5 [pos="0,-9.15!"];\r
    point6 [pos="1.82, -11.5!"];\r
    point7 [pos="0,-12.2!"];\r
    point8 [pos="2.7,-9.5!"];\r
    point9 [pos="2.7,-11!"];\r
\r
    // 文本节点\r
    node [style=solid shape=box penwidth=0 fontcolor="#888"];\r
    text1 [pos="1.8,-9!" label="when data changes"];\r
    text2 [pos="0,-11.5!" label=<\r
    when<br/>app <font color="red">unmount</font>()<br/>is called\r
    >];\r
\r
    // 流程连接\r
    edge [color="#888" penwidth=2 style=solid fontname=Arial fontsize=10];\r
    start -> step1 [dir=forward];\r
    step1 -> point1 [dir=none];\r
    point1 -> step2 [dir=forward];\r
    step2 -> point2 [dir=none];\r
    point2 -> branch1 [dir=forward];\r
\r
    branch1:w -> left_point1 [dir=none];\r
    left_point1 -> step3 [label="Yes"];\r
\r
    branch1:e -> right_point1 [dir=none];\r
    right_point1 -> step4 [label="No"];\r
\r
    step3 -> left_point2 [dir=none];\r
    step4 -> right_point2 [dir=none];\r
    left_point2 -> point3 [dir=none];\r
    right_point2 -> point3 [dir=none];\r
    point3 -> point4 [dir=none];\r
    point4 -> step5;\r
    step5 -> point5 [dir=none];\r
    point5 -> circle1;\r
    circle1 -> text1 [style=dashed dir=none];\r
    text1 -> point8 [style=dashed dir=none];\r
    point8 -> step6 [style=dashed dir=none];\r
    step6 -> point9 [style=dashed dir=none];\r
    point9 -> point6 [style=dashed dir=none];\r
    point6 -> circle1 [style=dashed dir=none];\r
    circle1 -> text2 [style=dashed dir=none];\r
    text2 -> point7 [style=dashed dir=none];\r
    point7 -> circle2 [style=dashed]\r
    \r
    // 注释连接\r
    edge [style=dashed color=red minlen=4];\r
    point1 -> note1;\r
    point2 -> note2;\r
    point4 -> note3;\r
    point5 -> note4;\r
    point7 -> note5;\r
    point8 -> note6;\r
    point9 -> note7;\r
    circle2 -> note8;\r
}\r
\`\`\`\r
\r
为了方便记忆，可以将它们分类\r
\r
创建时：\`beforeCreate\`、\`created\`\r
\r
渲染时：\`beforeMount\`、\`mounted\`\r
\r
更新时：\`beforeUpdate\`、\`updated\`\r
\r
卸载时：\`beforeUnmount\`、\`unmounted\`\r
\r
其中\`beforeCreate\`、\`created\`两个生命周期函数在选项式API中可以被调用，而在组合式API中无需使用。\r
\r
下面使用组合式API的方式演示一下几个生命周期函数\r
\r
创建\`组件生命周期.vue\`\r
\r
\`\`\`vue\r
<template>\r
    <h3>生命周期函数</h3>\r
    <p>{{ message }}</p>\r
    <button @click="message='数据改变'">更新数据</button>\r
</template>\r
\r
<script setup>\r
import { onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, ref } from 'vue'\r
\r
const message = ref("")\r
\r
onBeforeMount(() => {\r
    console.log("beforeMount: 渲染之前")\r
})\r
\r
onMounted(() => {\r
    console.log("mounted: 组件渲染完成")\r
})\r
\r
onBeforeUpdate(() => {\r
    console.log("beforeUpdata: 组件更新之前")\r
})\r
\r
onUpdated(() => {\r
    console.log("updated: 组件更新完成")\r
})\r
\r
onBeforeUnmount(() => {\r
    console.log("beforeUnmount: 组件卸载之前")\r
})\r
\r
onUnmounted(() => {\r
    console.log("unmounted: 组件卸载之后")\r
})\r
<\/script>\r
\`\`\`\r
\r
在\`App.vue\`中引入\`组件生命周期.vue\`组件\r
\r
\`\`\`vue\r
<template>\r
  <button @click="showLifecycle = !showLifecycle">\r
    {{ showLifecycle ? '卸载' : '加载' }}生命周期组件\r
  </button>\r
  <Lifecycle v-if="showLifecycle" />\r
</template>\r
\r
<script setup>\r
import { ref } from "vue"\r
import Lifecycle from "./components/组件生命周期.vue"\r
\r
const showLifecycle = ref(true)\r
<\/script>\r
\`\`\`\r
\r
运行之后会在控制台依次打印\r
\r
\`\`\`console\r
beforeMount: 渲染之前\r
mounted: 组件渲染完成\r
\`\`\`\r
\r
当点击“更新数据”按钮之后\`message\`的值更改为\`数据改变\`，同时控制台依次打印\r
\r
\`\`\`console\r
beforeUpdata: 组件更新之前\r
updated: 组件更新完成\r
\`\`\`\r
\r
点击“卸载生命周期组件”按钮后，控制台依次打印\r
\r
\`\`\`console\r
beforeUnmount: 组件卸载之前\r
unmounted: 组件卸载之后\r
\`\`\`\r
`;export{n as default};
