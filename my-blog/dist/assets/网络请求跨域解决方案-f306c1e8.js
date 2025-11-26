const r=`---\r
title: 网络请求跨域解决方案\r
date: 2025-10-23\r
tags: ["javascript", "Vue", "Axious", "网络请求"]\r
excerpt: "网络请求跨域解决方案"\r
---\r
\r
## 网络请求跨域解决方案\r
\r
JavaScript采取的是**同源策略**。\r
\r
同源策略是浏览器的一项安全策略，它是指浏览器只允许js代码请求和当前所在服务器域名、端口、协议相同的数据接口上的数据。\r
\r
也就是说，当域名、协议、端口其中任意一个不相同时，都会产生跨域问题。\r
\r
### 使用json-server搭建测试用api\r
\r
\`\`\`bash\r
# 全局安装\r
npm install -g json-server\r
\r
# 局部安装\r
npm install json-server --save-dev\r
\`\`\`\r
\r
创建测试数据\r
\r
\`\`\`json\r
// user.json\r
{\r
    "user": [\r
        {\r
            "id": 1,\r
            "name": "Alice",\r
            "age": 20,\r
            "job": "student"\r
        },\r
        {\r
            "id": 2,\r
            "name": "Bob",\r
            "age": 24,\r
            "job": "teacher"\r
        },\r
        {\r
            "id": 3,\r
            "name": "carl",\r
            "age": 28,\r
            "job": "saler"\r
        }\r
    ]\r
}\r
\`\`\`\r
\r
### 启动 json server\r
\r
在\`user.json\`所在目录使用命令\r
\r
\`\`\`bash\r
# 启动服务\r
json-server --watch user.json\r
\`\`\`\r
\r
这样就可以直接访问<http://localhost:3000/user>获取到\`user.json\`中的内容\r
\r
如果直接使用\`axios\`请求<http://localhost:3000/user>中的信息\r
\r
\`\`\`javascript\r
import axios from 'axios';\r
\r
axios.get("http://localhost:3000/user").then(res => {\r
    console.log(res.data);\r
})\r
\`\`\`\r
\r
控制台会打印错误信息\r
\r
\`\`\`bash\r
Access to XMLHttpRequest at 'https://zhidao.baidu.com/' from origin 'http://localhost:5174' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.\r
Failed to load resource: net::ERR_FAILED\r
Uncaught (in promise) AxiosError\r
\`\`\`\r
\r
### 解决方案\r
\r
前台解决方案：\`proxy\`\r
\r
在\`vite.config,js\`文件中添加\r
\r
\`\`\`javascript\r
devServer: {\r
    proxy: {\r
      '/api': {\r
        target: '<url>',\r
        changeOrigin: true\r
      }\r
    }\r
  }\r
\`\`\`\r
`;export{r as default};
