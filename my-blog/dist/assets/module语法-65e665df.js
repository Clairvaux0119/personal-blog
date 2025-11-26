const r=`---\r
title: module语法\r
date: 2025-10-07\r
tags: ["javascript", "module", "ES6"]\r
excerpt: "ES6 模块（module）"\r
---\r
\r
## module语法\r
\r
历史上，JavaScript一直没有模块（module）体系，无法将一个大程序拆分成互相依赖的小文件，再用简单的方法拼接起来。其他语言都有这项功能，比如Ruby的\`require\`、python的\`import\`，CSS都有\`@import\`，但是JavaScript任何这方面的支持都没有，对开发大型的、复杂的项目存在着巨大的障碍。\r
\r
ES6模块是通过\`export\`命令显示指定输出的代码，再通过\`import\`命令输入。\r
`;export{r as default};
