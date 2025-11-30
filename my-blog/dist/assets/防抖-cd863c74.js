const n=`---\r
title: 防抖\r
date: 2025-09-17\r
tags: ["javascript", "防抖"]\r
excerpt: "防抖的知识以及相关处理方法"\r
---\r
\r
## 防抖\r
\r
防抖 (debounce) 严格算起来属于性能优化的知识，但实际上遇到的频率相当高，处理不当或者放任不管容易引起浏览器卡死。\r
\r
给定一个滚动条监视的例子\r
\r
\`\`\`javascript\r
function scrollHandle() {\r
    let scrollTop = document.documentElement.scrollTop\r
    console.log("滚动条位置", scrollTop)\r
}\r
\r
window.onscroll = scrollHandle\r
\`\`\`\r
\r
在运行之后会发现，这个函数的执行频率太高了。当点击一次键盘的向下方向键，这个函数执行了9次。\r
\r
\`\`\`console\r
滚动条位置 1.600000023841858\r
滚动条位置 4.800000190734863\r
滚动条位置 10.399999618530273\r
滚动条位置 17.600000381469727\r
滚动条位置 24.799999237060547\r
滚动条位置 32\r
滚动条位置 36.79999923706055\r
滚动条位置 39.20000076293945\r
滚动条位置 40\r
\`\`\`\r
\r
实际上我们不并需要这样高频的反馈，毕竟浏览器的性能是有限的，不应该浪费在这里。下面讨论如何优化这种场景。\r
\r
在第一次触发事件时，不立即执行函数，而是给出一个期限值（比如200ms），然后\r
\r
+ 如果在200ms内没有再次触发滚动事件，那么执行函数。\r
\r
+ 如果在200ms内再次触发滚动事件，当前计时取消，重新开始计时。\r
\r
效果：短时间内大量触发同一事件只会执行一次函数。\r
\r
下面尝试实现这种思路\r
\r
\`\`\`javascript\r
function debounce(fn, delay) {\r
    let timer = null\r
\r
    // 闭包\r
    return function () {\r
        clearTimeout(timer)\r
        timer = setTimeout(fn, delay)\r
    }\r
}\r
\r
function scrollHandle() {\r
    let scrollTop = document.documentElement.scrollTop\r
    console.log("滚动条位置", scrollTop)\r
}\r
\r
window.addEventListener('scroll', debounce(scrollHandle, 200))\r
\`\`\`\r
\r
运行之后滑动进度条控制台输出频率变低，实现了**防抖**。\r
\r
>**防抖定义**\r
>\r
>对于短时间内连续触发的事件（比如上述代码的滚动事件），防抖的含义就是让某个事件期限（比如上述代码的200ms）内，事件处理函数只执行一次。\r
`;export{n as default};
