---
title: Vue列表渲染
date: 2025-10-12
tags: ["Vue", "列表渲染"]
excerpt: "Vue列表渲染"
---

## 列表渲染

### `v-for`

可以使用`v-for`指令基于一个数组来渲染一个列表。`v-for`指令需要使用`item in items`形式的特殊语法，其中`items`是源数据数组，`item`是被迭代的数组元素的别名。

```vue
<template>
<div class="list">
  <h3>列表渲染</h3>
  <ul>
    <li v-for="item in newsList">
      {{ item }}
    </li>
  </ul>
</div>
</template>

<script setup>
import { ref } from 'vue'

const newsList = ref([
  {
    id: 1001,
    title: "今日新闻"
  },
  {
    id: 1002,
    title: "焦点关注"
  },
  {
    id: 1003,
    title: "国际新闻"
  }
])
</script>
```

页面渲染内容

```text
列表渲染
· { "id": 1001, "title": "今日新闻" }
· { "id": 1002, "title": "焦点关注" }
· { "id": 1003, "title": "国际新闻" }
```

也可以使用`of`作为分隔符来替代`in`，这更接近JavaScript的迭代器语法。

### 通过key管理状态

Vue默认按照“就地更新”的策略来更新通过`v-for`渲染的元素列表。当数据项的顺序改变时，Vue不会随之移动DOM元素的顺序，而是就地更新每个元素，确保它们在原本指定的索引位置上渲染。

对于上面列表渲染的例子，为数组`newsList`添加新的数组元素

```javascript
{
  id: 1004,
  title: "社会热点"
}
```

渲染页面的时候只会把新添加的元素重新渲染上去，而不会重新渲染整个对象。

默认模式是高效的，但只适用于列表渲染输出的结果不依赖子组件状态或者临时DOM状态 (例如表单输入值) 的情况。

为了给Vue一个提示，以便它可以跟踪每个节点的标识，从而重用和重新排序现有的元素，你需要为每个元素对应的块提供一个唯一的`key attribute`

```vue
<li v-for="item of newsList" :key="item.id">
    {{ item }}
</li>
```

>**注意**
>`key`在这里是一个通过`v-bind`绑定的特殊attribute。推荐在任何可行的时候为`v-for`提供一个`key`attribute。它绑定的值期望是一个基础类型的值，例如字符串或number类型。

如果没有设置唯一标识`id`，也可以使用数组索引进行标识

```vue
<li v-for="(item, index) of newsList" :key="index">
    {{ item }}
</li>
```

要注意的是，只有在简单静态列表时才考虑使用索引进行标识，更建议使用数据中的唯一标识。因为要确保每一条数据的唯一索引不会发生变化。
