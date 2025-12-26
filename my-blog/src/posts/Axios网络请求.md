---
title: Axios网络请求
date: 2025-10-21
tags: ["javascript", "Vue", "Axious", "网络请求"]
excerpt: "Axios网络请求安装、引入和简单示例"
---

## Axios网络请求

Axios是一个基于promise的网络请求库。

### 安装

> `npm install --save axios`

### 引入

在组件中引入：`import axios from "axios"`

全局引用：

```javascript
// 在main.js文件中添加
import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'

const app = createApp(App)
app.config.globalProperties.$axios = axios
app.mount('#app')
```

在组件中调用

```javascript
this.$axios
```

### 网络请求基本实例

#### get请求

```vue
<template>
    <div>
        <p>{{ axiosData }}</p>
    </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const axiosData = ref()

onMounted(() => {
    axios({
        method: "get",
        url: "https://需要请求的网址"
    }).then(res => {
        axiosData = res.data
    })
})
</script>
```

或者使用快捷方案

```javascript
axios.get("https://需要请求的网址")
    .then(res => {
        axiosData = res.data
    })
```

#### post请求

>**注意**
>post请求参数需要额外处理
>安装依赖：`npm install --save querystring`
>转换参数格式：`qs.stringify()`

```vue
<template>
    <div>
        <p>{{ axiosData }}</p>
    </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import qs from 'queryString'

const axiosData = ref()

onMounted(() => {
    axios({
        method: "post",
        url: "https://需要请求的网址",
        data: qs.stringify({
            user_id: "",
            password: "",
            verification_code: ""
        })
    }).then(res => {
        axiosData = res.data
    })
})
</script>
```

或者使用快捷方式

```javascript
axios.post("https://需要请求的网址", qs.stringify({
    user_id: "",
    password: "",
    verification_code: ""
})).then(res => {
    axiosData = res.data
})
```

### Axios网络请求封装

在应用过程中，一个项目中的网络请求会很多，此时一般采用的方案是将网络请求封装起来。

在`src`目录下创建文件夹`utils`，并创建文件`request.js`，用来存储网络请求对象`axios`

```javascript
import axios from "axios"
import qs from "querystring"

// 错误信息
const errorHandle = (status, info) => {
    switch (status) {
        case 400:
            console.log("语义错误")
            break
        case 401:
            console.log("服务器认证失败")
            break
        case 403:
            console.log("服务器拒绝访问")
            break
        case 404:
            console.log("地址错误")
            break
        case 500:
            console.log("服务器遇到意外")
            break
        case 502:
            console.log("服务器无响应")
            break
        default:
            console.log(info)
            break
    }
}

const instance = axios.create({
    // 网络请求的公共配置
    timeout: 5000
})

// 常用的拦截器

// 发送数据之前
instance.interceptors.request.use(
    config => {
        if (config.method === "post") {
            config.data = qs.stringify(config.data)
        }
        // config: 包含网络请求的所有信息
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 获取数据之前
instance.interceptors.response.use(
    response => {
        return response.status === 200 ? Promise.resolve(response) : Promise.reject(response)
    },
    error => {
        const { response } = error
        errorHandle(response.status, response.info)
    }
)

export default instance
```

>参考文档：<https://www.kancloud.cn/yunye/axios/234845>

#### 使用方式

在`src/api/`路径下创建文件`index.js`和`path.js`

`path.js`内容

```javascript
const base = {
    baseUrl:"http://localhost:3000", // 公共路径
    testApi: "api/test"
}

export default base
```

`index.js`内容

```javascript
import axios from "../utils/request"
import path from "./path"

const api = {
    getTestUrl() {
        return axios.get(path.baseUrl + path.testApi)
    }
}

export default api
```

在组件中使用

```javascript
import { onMounted } from 'vue'
import api from '../api/index'

onMounted(() => {
    api.getTestUrl().then(res => {
        console.log(res.data)
    })
})
```
