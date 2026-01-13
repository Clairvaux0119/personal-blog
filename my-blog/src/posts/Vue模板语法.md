---
title: Vue模板语法
date: 2025-10-04
tags: ["Vue", "模板语法"]
excerpt: "Vue模板语法"
---

## Vue模板语法

Vue使用的是一种基于HTML的模板语法，它能够声明式地将组件实例的数据绑定到呈现的DOM上。所有的Vue模板都是语法层面合法的HTML，可以被符合规范的浏览器和HTML解析器解析。

### 文本插值

数据绑定最常见的形式就是使用 "Mustache"（双大括号）语法的文本插值。

```vue
<template>
  <div>
    <h3>学习vue：模板语法</h3>
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref("学习vue")
</script>
```

### 原始HTML

双大括号会将数据解释为普通文本，而非HTML代码。输出真正的HTML，需要使用`v-html`指令。

```vue
<template>
  <div>
    <div>{{ rawHtml }}</div>
    <div><span v-html="rawHtml"></span></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const rawHtml = ref("<a href='https://zhidao.baidu.com/'>百度知道</a>")
</script>
```

### 属性（Attribute）绑定

Mustache语法不能在HTML属性中使用，要使用它需要使用`v-bind`指令。

```vue
<template>
  <div>
    <div v-bind:id="dynamicId" v-bind:class="dynamicClass"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const dynamicId = ref(10001)
const dynamicClass = ref("class")
</script>
```

如果绑定的attribute值为`null`或`null`，那么该attribute将会从渲染的元素上移除。

>**注意**&nbsp;&nbsp;&nbsp;&nbsp;`v-bind`可以简写成`:`，即上述代码中`v-bind:id=""`可以简写成`:id=""`。

#### 布尔型Attribute

布尔型attribute依据`true`/`false`值来决定attribute是否应该存在于该元素上，`disabled`就是一个常见的例子。

```vue
<template>
  <div>
    <button :disabled="isButtonDisabled"></button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isButtonDisabled = ref(true)
</script>
```

#### 动态绑定多个值

如果要绑定一个包含多个attribute的JavaScript对象

```vue
<template>
  <div>
    <div v-bind="objectOfAttrs"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const objectOfAttrs = ref({
  id: 'container',
  class: 'textClass'
})
</script>
```

### 使用JavaScript表达式

在模板中可以使用完整的JavaScript表达式。

```vue
<template>
  <div>
    <p>{{ num + 10 }}</p>
    <p>{{ flag ? "孙悟空" : "六耳猕猴" }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const num = ref(10)
const flag = ref(true)
</script>
```

会在页面分别渲染

```text
20
孙悟空
```

这些表达式会在当前活动实例的数据作用域下作为JavaScript被解析。要注意的是，每个绑定只能包含**单个表达式**。因此下面的例子都不会生效。

```vue
<!-- 这是语句，不是表达式 -->
{{ var a = 1 }}

<!-- 流程控制不会生效，if语句不是单个表达式 -->
{{ if (ok) {return message} }}
```
