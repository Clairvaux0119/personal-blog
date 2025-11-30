const n=`---\r
title: 对象\r
date: 2025-09-04\r
tags: ["javascript", "对象"]\r
excerpt: "学习有关javascript对象的知识"\r
---\r
\r
## 对象\r
\r
### 对象概述\r
\r
对象（object）是JavaScript语言的核心概念，也是最重要的数据类型。简单说，对象就是一组“键值对”（key-value）的集合，是一种无序的复合数据集合。\r
\r
下面创建了一个名叫user的对象。\r
\r
\`\`\`javascript\r
let user = {\r
    name: 'chanxiang',\r
    age: '18'\r
}\r
\`\`\`\r
\r
对象的每一个键名又称为“属性”（property），它的“键值”可以是任何数据类型。如果一个属性的值为函数，通常把这个属性称为“方法”，它可以像函数那样调用。\r
\r
对象的读取方式对象名.属性。\r
\r
\`\`\`javascript\r
et user = {\r
    getName: function (name) {\r
        return name\r
    }\r
}\r
\r
console.log(user.getName('chanxiang'))\r
\`\`\`\r
\r
输出结果\r
\r
\`\`\`console\r
chanxiang\r
\`\`\`\r
\r
如果属性的值还是一个对象，就形成了链式引用。\r
\r
\`\`\`javascript\r
let user = {\r
    name: 'chanxiang',\r
    age: '18',\r
    container: {\r
        frontEnd: ['web前端', 'Android', 'iOS'],\r
        backEnd: ['Java', 'C++', 'Python']\r
    }\r
}\r
\`\`\`\r
`;export{n as default};
