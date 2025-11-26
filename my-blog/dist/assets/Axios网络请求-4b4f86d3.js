const r=`---\r
title: Axios网络请求\r
date: 2025-10-21\r
tags: ["javascript", "Vue", "Axious", "网络请求"]\r
excerpt: "Axios网络请求安装、引入和简单示例"\r
---\r
\r
## Axios网络请求\r
\r
Axios是一个基于promise的网络请求库。\r
\r
### 安装\r
\r
> \`npm install --save axios\`\r
\r
### 引入\r
\r
在组件中引入：\`import axios from "axios"\`\r
\r
全局引用：\r
\r
\`\`\`javascript\r
// 在main.js文件中添加\r
import { createApp } from 'vue'\r
import App from './App.vue'\r
import axios from 'axios';\r
\r
const app = createApp(App)\r
app.config.globalProperties.$axios = axios;\r
app.mount('#app')\r
\`\`\`\r
\r
在组件中调用\r
\r
\`\`\`javascript\r
this.$axios\r
\`\`\`\r
\r
### 网络请求基本实例\r
\r
#### get请求\r
\r
\`\`\`vue\r
<template>\r
    <div>\r
        <p>{{ axiosData }}</p>\r
    </div>\r
</template>\r
\r
<script setup>\r
import axios from 'axios';\r
import { onMounted, ref } from 'vue';\r
\r
const axiosData = ref();\r
\r
onMounted(() => {\r
    axios({\r
        method: "get",\r
        url: "https://需要请求的网址"\r
    }).then(res => {\r
        axiosData = res.data;\r
    })\r
})\r
<\/script>\r
\`\`\`\r
\r
或者使用快捷方案\r
\r
\`\`\`javascript\r
axios.get("https://需要请求的网址")\r
    .then(res => {\r
        axiosData = res.data;\r
    })\r
\`\`\`\r
\r
#### post请求\r
\r
>**注意**\r
>post请求参数需要额外处理\r
>安装依赖：\`npm install --save querystring\`\r
>转换参数格式：\`qs.stringify()\`\r
\r
\`\`\`vue\r
<template>\r
    <div>\r
        <p>{{ axiosData }}</p>\r
    </div>\r
</template>\r
\r
<script setup>\r
import axios from 'axios';\r
import { onMounted, ref } from 'vue';\r
import qs from 'queryString';\r
\r
const axiosData = ref();\r
\r
onMounted(() => {\r
    axios({\r
        method: "post",\r
        url: "https://需要请求的网址",\r
        data: qs.stringify({\r
            user_id: "",\r
            password: "",\r
            verification_code: ""\r
        })\r
    }).then(res => {\r
        axiosData = res.data;\r
    })\r
})\r
<\/script>\r
\`\`\`\r
\r
或者使用快捷方式\r
\r
\`\`\`javascript\r
axios.post("https://需要请求的网址", qs.stringify({\r
    user_id: "",\r
    password: "",\r
    verification_code: ""\r
})).then(res => {\r
    axiosData = res.data;\r
})\r
\`\`\`\r
\r
### Axios网络请求封装\r
\r
在应用过程中，一个项目中的网络请求会很多，此时一般采用的方案是将网络请求封装起来。\r
\r
在\`src\`目录下创建文件夹\`utils\`，并创建文件\`request.js\`，用来存储网络请求对象\`axios\`\r
\r
\`\`\`javascript\r
import axios from "axios";\r
import qs from "querystring";\r
\r
// 错误信息\r
const errorHandle = (status, info) => {\r
    switch (status) {\r
        case 400:\r
            console.log("语义错误");\r
            break;\r
        case 401:\r
            console.log("服务器认证失败");\r
            break;\r
        case 403:\r
            console.log("服务器拒绝访问");\r
            break;\r
        case 404:\r
            console.log("地址错误");\r
            break;\r
        case 500:\r
            console.log("服务器遇到意外");\r
            break;\r
        case 502:\r
            console.log("服务器无响应");\r
            break;\r
        default:\r
            console.log(info);\r
            break;\r
    }\r
}\r
\r
const instance = axios.create({\r
    // 网络请求的公共配置\r
    timeout: 5000\r
});\r
\r
// 常用的拦截器\r
\r
// 发送数据之前\r
instance.interceptors.request.use(\r
    config => {\r
        if (config.method === "post") {\r
            config.data = qs.stringify(config.data);\r
        }\r
        // config: 包含网络请求的所有信息\r
        return config;\r
    },\r
    error => {\r
        return Promise.reject(error);\r
    }\r
)\r
\r
// 获取数据之前\r
instance.interceptors.response.use(\r
    response => {\r
        return response.status === 200 ? Promise.resolve(response) : Promise.reject(response);\r
    },\r
    error => {\r
        const { response } = error;\r
        errorHandle(response.status, response.info);\r
    }\r
)\r
\r
export default instance;\r
\`\`\`\r
\r
>参考文档：<https://www.kancloud.cn/yunye/axios/234845>\r
\r
#### 使用方式\r
\r
在\`src/api/\`路径下创建文件\`index.js\`和\`path.js\`\r
\r
\`path.js\`内容\r
\r
\`\`\`javascript\r
const base = {\r
    baseUrl:"http://localhost:3000", // 公共路径\r
    testApi: "api/test"\r
}\r
\r
export default base;\r
\`\`\`\r
\r
\`index.js\`内容\r
\r
\`\`\`javascript\r
import axios from "../utils/request";\r
import path from "./path";\r
\r
const api = {\r
    getTestUrl() {\r
        return axios.get(path.baseUrl + path.testApi);\r
    }\r
}\r
\r
export default api;\r
\`\`\`\r
\r
在组件中使用\r
\r
\`\`\`javascript\r
import { onMounted } from 'vue';\r
import api from '../api/index';\r
\r
onMounted(() => {\r
    api.getTestUrl().then(res => {\r
        console.log(res.data);\r
    })\r
})\r
\`\`\`\r
`;export{r as default};
