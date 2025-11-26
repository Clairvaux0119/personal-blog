const n=`---\r
title: 节流\r
date: 2025-09-17\r
tags: ["javascript", "节流"]\r
excerpt: "节流的知识以及相关处理方法"\r
---\r
\r
## 节流\r
\r
节流 (throttle) 严格算起来属于性能优化的知识，但实际上遇到的频率相当高，处理不当或者放任不管容易引起浏览器卡死。\r
\r
对于之前防抖部分的代码\r
\r
\`\`\`javascript\r
function debounce(fn, delay) {\r
    let timer = null;\r
\r
    // 闭包\r
    return function () {\r
        clearTimeout(timer);\r
        timer = setTimeout(fn, delay);\r
    }\r
}\r
\r
function scrollHandle() {\r
    let scrollTop = document.documentElement.scrollTop;\r
    console.log("滚动条位置", scrollTop);\r
}\r
\r
window.addEventListener('scroll', debounce(scrollHandle, 200));\r
\`\`\`\r
\r
如果在限定时间段内，不断触发滚动事件（比如用户按住滚动不断地拖动），只要不停止触发，理论上就永远不会输出当前位置顶部的距离。\r
\r
如果想要实现即使用户不断拖动滚动条，也能在某个时间间隔后给出反馈。可以设计一个类似控制阀门一样定期开放的函数，也就是让函数执行一次后，在某个时间段内暂时失效，经过这段时间后再重新激活。\r
\r
效果：如果短时间内大量触发同一事件，那么在函数执行一次后，该函数在指定的时间期限内不再工作，直至经过这段时间才重新生效。\r
\r
实现\r
\r
\`\`\`javascript\r
function throttle(fn, delay) {\r
    let valid = true;\r
\r
    // 闭包\r
    return function () {\r
        if (!valid) {\r
            return false;\r
        }\r
        valid = false;\r
        timer = setTimeout(function () {\r
            fn();\r
            valid = true;\r
        }, delay);\r
    }\r
}\r
\r
function scrollHandle() {\r
    let scrollTop = document.documentElement.scrollTop;\r
    console.log("滚动条位置", scrollTop);\r
}\r
\r
window.addEventListener('scroll', throttle(scrollHandle, 2000));\r
\`\`\`\r
\r
运行后如果按住滚动条一直滑动，控制台会每隔\`delay\` (2000ms) 的时间打印一次滚动条位置。\r
\r
使用场景\r
\r
+ 搜索框input事件。如果要支持输入实时搜索可以使用节流方案（间隔一段时间就必须查询相关内容），或者实现输入间隔大于某个值（如500ms），就当做用户输入已经完成，然后开始搜索。具体使用哪种方案要看具体需求。\r
\r
+ 页面resize事件，常见于需要做页面适配的时候。需要根据最终呈现的页面情况进行DOM渲染（这种情况一般是使用防抖，因为只需要判断最后一次的变化情况）\r
`;export{n as default};
