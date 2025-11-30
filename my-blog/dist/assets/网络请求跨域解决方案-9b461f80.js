const r=`---\r
title: 网络请求跨域解决方案\r
date: 2025-10-23\r
tags: ["javascript", "Vue", "Axios", "网络请求"]\r
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
使用\`axios\`直接请求网页<https://clairvaux0119.github.io/personal-blog>\r
\r
\`\`\`javascript\r
import axios from 'axios'\r
import { onMounted } from 'vue' \r
\r
onMounted(() => {\r
    axios.get("https://clairvaux0119.github.io/personal-blog")\r
        .then(res => {\r
            console.log(res.data)\r
        })\r
})\r
\`\`\`\r
\r
控制台会打印错误信息\r
\r
\`\`\`bash\r
Access to XMLHttpRequest at 'https://clairvaux0119.github.io/personal-blog' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.\r
GET https://clairvaux0119.github.io/personal-blog net::ERR_FAILED\r
Uncaught (in promise)\r
AxiosError {message: 'Network Error', name: 'AxiosError', code: 'ERR_NETWORK', config: {…}, request: XMLHttpRequest, …}\r
\`\`\`\r
\r
### 解决方案\r
\r
前台解决方案：\`proxy\`\r
\r
在\`vite.config,js\`文件中添加\r
\r
\`\`\`javascript\r
server: {\r
    proxy: {\r
      '/api': {\r
        target: '<url>',\r
        changeOrigin: true,\r
        rewrite: (path) => path.replace(/^\\/api/, '/personal-blog')\r
      }\r
    }\r
  }\r
\`\`\`\r
\r
同时修改\`axios\`请求\r
\r
\`\`\`javascript\r
import axios from 'axios'\r
import { onMounted } from 'vue' \r
\r
onMounted(() => {\r
    axios.get("/api/")\r
        .then(res => {\r
            console.log(res.data)\r
        })\r
})\r
\`\`\`\r
\r
此时控制台就可以打印出具体获取到的网页内容了。\r
`;export{r as default};
