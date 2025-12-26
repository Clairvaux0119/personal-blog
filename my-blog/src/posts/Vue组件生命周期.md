---
title: Vue 组件生命周期
date: 2025-10-18
tags: ["Vue", "组件"]
excerpt: "Vue 组件生命周期"
---

## 组件生命周期

每个组件在被创建时都要经过一系列的初始化过程————例如，需要设置数据监听、编译模板、将实例挂载到DOM并在数据变化时更新DOM等。同时在这个过程中也会运行一些叫做**生命周期钩子**的函数，这给了用户在不同阶段添加自己的代码的机会。

```dot
digraph {
    /* 颜色定义
       变量 = #e36209 (橙色)
       方法 = #22863a (绿色) */

    layout=neato;

    // 全局样式
    node [style="filled, rounded" width=2.6 height=0.5 penwidth=0 fontcolor=white fontsize="12px"];

    // 开始节点
    node [class="start-node, end-node" shape=box fillcolor="#3498db" ];
    start [pos="0,0!" label=<
        app = Vue.<font color="#22863a">createApp</font>(<font color="#e36209">options</font>)<br/>
        app.<font color="#22863a">mount</font>(<font color="#e36209">el</font>)
        >];
    
    // 中间节点
    node [class="step-node" fillcolor="#1abc9c"];
    step1 [pos="0,-1!" label="Init\nevents & lifecycle" ];
    step2 [pos="0,-2.5!" label="Init\ninjections & reactivity"];
    step3 [pos="-2,-6!" label="Compile template\ninto render function*"];
    step4 [pos="2,-6!" label="Compile el's innerHTML\nas template*"];
    step5 [pos="0,-8.5!" label="Create app.$el and\nappend it to el"];
    step6 [pos="4,-10.2!" label="Virtual DOM\nre-rendered\nand patch"];
    
    // 分支节点
    node [class="branch-node" style=filled shape=diamond fillcolor="#FF980c"];
    branch1 [pos="0,-4.5!" label="Has\n\"template\"\noptions?"];
    
    // 注释节点
    node [class="note-node" shape=box width=1.5 style="filled, rounded" penwidth=1 color=red fillcolor=none fontcolor=red];
    note1 [pos="-3.5,-1.7!" label="beforeCreate"];
    note2 [pos="-3.5,-3.2!" label="created"];
    note3 [pos="-3.5,-7.6!" label="beforeMount"];
    note4 [pos="-3.5,-9.15!" label="mounted"];
    note5 [pos="-3.5,-12.2!" label="beforeUnmount"];
    note6 [pos="4,-9!" label="beforeUpdate"];
    note7 [pos="4,-11.5!" label="beforeUpdate"];
    note8 [pos="-3.5,-13.2!" label="unmounted"]

    // 圆形节点
    node [class="circle-node" width=1.0 fillcolor=red fontcolor=white shape=circle];
    circle1 [pos="0,-10.2!" label="Mounted"];
    circle2 [pos="0,-13.2!" label="Unmounted"];

    // 不可见转折点
    node [style=invis shape=point width=0 height=0 label=""];
    point1 [pos="0,-1.7!"];
    point2 [pos="0,-3.2!"];
    left_point1 [pos="-2,-4.5!"];
    right_point1 [pos="2,-4.5!"];
    left_point2 [pos="-2,-7!"];
    right_point2 [pos="2,-7!"];
    point3 [pos="0,-7!"];
    point4 [pos="0,-7.6!"];
    point5 [pos="0,-9.15!"];
    point6 [pos="1.82, -11.5!"];
    point7 [pos="0,-12.2!"];
    point8 [pos="2.7,-9.5!"];
    point9 [pos="2.7,-11!"];

    // 文本节点
    node [style=solid shape=box penwidth=0 fontcolor="#888"];
    text1 [pos="1.8,-9!" label="when data changes"];
    text2 [pos="0,-11.5!" label=<
    when<br/>app <font color="red">unmount</font>()<br/>is called
    >];

    // 流程连接
    edge [color="#888" penwidth=2 style=solid fontname=Arial fontsize=10];
    start -> step1 [dir=forward];
    step1 -> point1 [dir=none];
    point1 -> step2 [dir=forward];
    step2 -> point2 [dir=none];
    point2 -> branch1 [dir=forward];

    branch1:w -> left_point1 [dir=none];
    left_point1 -> step3 [label="Yes"];

    branch1:e -> right_point1 [dir=none];
    right_point1 -> step4 [label="No"];

    step3 -> left_point2 [dir=none];
    step4 -> right_point2 [dir=none];
    left_point2 -> point3 [dir=none];
    right_point2 -> point3 [dir=none];
    point3 -> point4 [dir=none];
    point4 -> step5;
    step5 -> point5 [dir=none];
    point5 -> circle1;
    circle1 -> text1 [style=dashed dir=none];
    text1 -> point8 [style=dashed dir=none];
    point8 -> step6 [style=dashed dir=none];
    step6 -> point9 [style=dashed dir=none];
    point9 -> point6 [style=dashed dir=none];
    point6 -> circle1 [style=dashed dir=none];
    circle1 -> text2 [style=dashed dir=none];
    text2 -> point7 [style=dashed dir=none];
    point7 -> circle2 [style=dashed]
    
    // 注释连接
    edge [style=dashed color=red minlen=4];
    point1 -> note1;
    point2 -> note2;
    point4 -> note3;
    point5 -> note4;
    point7 -> note5;
    point8 -> note6;
    point9 -> note7;
    circle2 -> note8;
}
```

为了方便记忆，可以将它们分类

创建时：`beforeCreate`、`created`

渲染时：`beforeMount`、`mounted`

更新时：`beforeUpdate`、`updated`

卸载时：`beforeUnmount`、`unmounted`

其中`beforeCreate`、`created`两个生命周期函数在选项式API中可以被调用，而在组合式API中无需使用。

下面使用组合式API的方式演示一下几个生命周期函数

创建`组件生命周期.vue`

```vue
<template>
    <h3>生命周期函数</h3>
    <p>{{ message }}</p>
    <button @click="message='数据改变'">更新数据</button>
</template>

<script setup>
import { onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, ref } from 'vue'

const message = ref("")

onBeforeMount(() => {
    console.log("beforeMount: 渲染之前")
})

onMounted(() => {
    console.log("mounted: 组件渲染完成")
})

onBeforeUpdate(() => {
    console.log("beforeUpdata: 组件更新之前")
})

onUpdated(() => {
    console.log("updated: 组件更新完成")
})

onBeforeUnmount(() => {
    console.log("beforeUnmount: 组件卸载之前")
})

onUnmounted(() => {
    console.log("unmounted: 组件卸载之后")
})
</script>
```

在`App.vue`中引入`组件生命周期.vue`组件

```vue
<template>
  <button @click="showLifecycle = !showLifecycle">
    {{ showLifecycle ? '卸载' : '加载' }}生命周期组件
  </button>
  <Lifecycle v-if="showLifecycle" />
</template>

<script setup>
import { ref } from "vue"
import Lifecycle from "./components/组件生命周期.vue"

const showLifecycle = ref(true)
</script>
```

运行之后会在控制台依次打印

```console
beforeMount: 渲染之前
mounted: 组件渲染完成
```

当点击“更新数据”按钮之后`message`的值更改为`数据改变`，同时控制台依次打印

```console
beforeUpdata: 组件更新之前
updated: 组件更新完成
```

点击“卸载生命周期组件”按钮后，控制台依次打印

```console
beforeUnmount: 组件卸载之前
unmounted: 组件卸载之后
```
