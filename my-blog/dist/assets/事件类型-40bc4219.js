const n=`---\r
title: 事件类型\r
date: 2025-09-11\r
tags: ["javascript", "事件"]\r
excerpt: "不同的事件类型"\r
---\r
\r
## 常用事件类型分类\r
\r
鼠标事件：\`click\`, \`dblclick\`, \`mouseover\`, \`mouseout\`, \`mousemove\`, \`contextmenu\` (右键菜单)\r
\r
键盘事件：\`keydown\`, \`keyup\`, \`keypress\`\r
\r
表单事件：\`submit\`, \`change\`, \`input\`, \`focus\`, \`blur\`\r
\r
窗口/文档事件：\`load\`, \`DOMContentLoaded\`, \`resize\`, \`scroll\`\r
\r
触摸事件 (移动端)：\`touchstart\`, \`touchmove\`, \`touchend\`\r
\r
当事件发生的时候，浏览器会自动创建一个事件对象，并作为参数传递给事件处理函数。这个对象包含了事件的详细信息。\r
\r
## 鼠标事件\r
\r
鼠标事件指与鼠标相关的事件，具体的事件主要有以下一些\r
\r
|属性|描述|DOM级别|\r
|---|---|---|\r
|click|当用户点击某个对象时调用的事件句柄|2|\r
|contextmenu|在用户点击鼠标右键打开上下文菜单时触发|2|\r
|dblclick|当用户双击某个对象时调用的事件句柄|2|\r
|mousedown|鼠标按钮被按下|2|\r
|mouseenter|鼠标进入一个节点时触发，进入子节点不会触发这个事件|2|\r
|mouseleave|鼠标离开一个节点时触发，离开父节点不会触发这个事件|2|\r
|mousemove|鼠标被移动|2|\r
|mouseover|鼠标进入一个节点时触发，进入子节点会再一次触发这个事件|2|\r
|mouseout|鼠标进入一个节点时触发，离开父节点也会触发这个事件|2|\r
|mouseup|鼠标按键被松开|2|\r
|wheel|滚动鼠标滚轮时触发|3|\r
\r
### 鼠标点击事件\r
\r
\`\`\`html\r
<button id="btn1">点击</button>\r
<button id="btn2">双击</button>\r
<button id="btn3">右键点击</button>\r
\r
<script>\r
    let btn1 = document.getElementById("btn1");\r
    let btn2 = document.getElementById("btn2");\r
    let btn3 = document.getElementById("btn3");\r
\r
    // click事件\r
    btn1.addEventListener("click", function () {\r
        console.log("元素被点击了");\r
    });\r
\r
    // dblclick事件\r
    btn2.addEventListener("dblclick", function () {\r
        console.log("元素被双击了");\r
    });\r
\r
    // contextmenu 事件（右键菜单）\r
    btn3.addEventListener('contextmenu', function () {\r
        event.preventDefault(); // 阻止默认右键菜单\r
        console.log('右键点击');\r
        // 显示自定义右键菜单\r
    });\r
<\/script>\r
\`\`\`\r
\r
网页输出\r
\r
<!-- markdownlint-disable no-inline-html -->\r
<button>点击</button> <button>双击</button> <button>右键点击</button>\r
<!-- markdownlint-restore -->\r
\r
依次用鼠标执行对应操作后控制台输出\r
\r
\`\`\`console\r
元素被点击了\r
元素被双击了\r
右键点击\r
\`\`\`\r
\r
### 鼠标按下/释放事件\r
\r
\`\`\`html\r
<button id="btn1">鼠标按下</button>\r
<button id="btn2">鼠标抬起</button>\r
\r
<script>\r
    let btn1 = document.getElementById("btn1");\r
    let btn2 = document.getElementById("btn2");\r
// mousedown事件\r
btn1.addEventListener("mousedown", function () {\r
            console.log('鼠标按下，按钮:', event.button);\r
            // 0: 左键, 1: 中键, 2: 右键\r
        });\r
\r
// mouseup事件\r
btn2.addEventListener("mouseup", function () {\r
    console.log("鼠标按钮抬起");\r
});\r
</scrpt>\r
\`\`\`\r
\r
网页输出\r
\r
<!-- markdownlint-disable no-inline-html -->\r
<button>鼠标按下</button> <button>鼠标抬起</button>\r
<!-- markdownlint-restore -->\r
\r
依次用鼠标执行对应操作后控制台输出\r
\r
\`\`\`console\r
鼠标按下，按钮: 0\r
鼠标按钮抬起\r
\`\`\`\r
\r
### 鼠标移动事件\r
\r
\`\`\`html\r
<head>\r
    <style>\r
        #btn {\r
            width: 100px;\r
            height: 100px;\r
            background-color: red;\r
        }\r
    </style>\r
</head>\r
\r
<body>\r
    <div id="btn"></div>\r
\r
    <script>\r
        let btn = document.getElementById("btn");\r
        // mousemove事件\r
        btn.addEventListener("mousemove", function () {\r
            console.log("鼠标移动了");\r
        });\r
\r
        // mouseleave事件\r
        btn.addEventListener("mouseleave", function () {\r
            console.log("鼠标离开了");\r
        });\r
    <\/script>\r
</body>\r
\`\`\`\r
\r
网页输出\r
\r
<!-- markdownlint-disable no-inline-html -->\r
<style>\r
    #btn {\r
        width: 100px;\r
        height: 100px;\r
        background-color: red;\r
    }\r
</style>\r
\r
<div id="btn"></div>\r
<!-- markdownlint-restore -->\r
\r
鼠标在元素中移动时控制台输出\r
\r
\`\`\`console\r
鼠标移动了\r
\`\`\`\r
\r
鼠标离开元素后控制台输出\r
\r
\`\`\`console\r
鼠标离开了\r
\`\`\`\r
\r
### 鼠标进入/离开事件\r
\r
\`\`\`html\r
<head>\r
    <style>\r
        #btn {\r
            width: 100px;\r
            height: 100px;\r
            background-color: red;\r
        }\r
    </style>\r
</head>\r
\r
<body>\r
    <div id="btn"></div>\r
\r
    <script>\r
        let btn = document.getElementById("btn");\r
        // mouseenter事件\r
        btn.addEventListener("mouseenter", function () {\r
            console.log("鼠标进入元素");\r
        });\r
\r
        // mouseout事件\r
        btn.addEventListener("mouseout", function () {\r
            console.log("鼠标离开元素");\r
        });\r
    <\/script>\r
</body>\r
\`\`\`\r
\r
网页输出\r
\r
<!-- markdownlint-disable no-inline-html -->\r
<style>\r
    #btn {\r
        width: 100px;\r
        height: 100px;\r
        background-color: red;\r
    }\r
</style>\r
\r
<div id="btn"></div>\r
<!-- markdownlint-restore -->\r
\r
当鼠标进入元素后控制台输出\r
\r
\`\`\`console\r
鼠标进入元素\r
\`\`\`\r
\r
当鼠标离开元素后控制台输出\r
\r
\`\`\`console\r
鼠标离开元素\r
\`\`\`\r
\r
### 滚轮事件\r
\r
\`\`\`html\r
<head>\r
    <style>\r
        #btn {\r
            width: 100px;\r
            height: 100px;\r
            background-color: red;\r
        }\r
    </style>\r
</head>\r
\r
<body>\r
    <div id="btn"></div>\r
\r
    <script>\r
        let btn = document.getElementById("btn");\r
        // wheel事件\r
        btn.addEventListener("wheel", function () {\r
            console.log("滑动鼠标滚轮");\r
        });\r
    <\/script>\r
</body>\r
\`\`\`\r
\r
网页输出\r
\r
<!-- markdownlint-disable no-inline-html -->\r
<style>\r
    #btn {\r
        width: 100px;\r
        height: 100px;\r
        background-color: red;\r
    }\r
</style>\r
\r
<div id="btn"></div>\r
<!-- markdownlint-restore -->\r
\r
在元素内滑动滚轮后控制台输出\r
\r
\`\`\`console\r
滑动鼠标滚轮\r
\`\`\`\r
\r
## 键盘事件\r
\r
键盘事件由用户击打键盘触发，主要有\`keydown\`、\`keypress\`、\`keyup\`三个事件。\r
\r
|属性|描述|DOM级别|\r
|---|---|---|\r
|keydown|某个键盘按键被按下触发，不松开按键会连续触发|2|\r
|keypress|某个有值的键盘按键被按下并松开后触发，即按下Ctrl、Alt、Shift、Meta、delete这样无值的键，这个事件不会触发。对于有值的键，按下时先触发keydown事件，再触发这个事件|2|\r
|keyup|某个键盘按键被松开|2|\r
\r
### keydown事件\r
\r
\`\`\`html\r
<input type="text" id="username" placeholder="请输入用户名">\r
\r
<script>\r
    let username = document.getElementById("username");\r
\r
    username.addEventListener("keydown", function () {\r
        console.log("键盘输入内容：", event.target.value);\r
    })\r
<\/script>\r
\`\`\`\r
\r
通过键盘依次键入 "username" 后网页输出\r
\r
<!-- markdownlint-disable no-inline-html -->\r
<style>\r
    input::placeholder {\r
        color: black;\r
        font-size: 14px;\r
    }\r
</style>\r
\r
<input type="text" id="username" placeholder="username">\r
<!-- markdownlint-restore -->\r
\r
通过键盘依次键入 "username" 后控制台输出\r
\r
\`\`\`console\r
键盘输入内容： \r
键盘输入内容： u\r
键盘输入内容： us\r
键盘输入内容： use\r
键盘输入内容： user\r
键盘输入内容： usern\r
键盘输入内容： userna\r
键盘输入内容： usernam\r
\`\`\`\r
\r
第一次输入控制台输出为空的原因是，\`keydown\`事件检测的是键盘按下时候输入框内的值，第一次按下时输入框内内容为空。\r
\r
### keyup事件\r
\r
\`\`\`html\r
<input type="text" id="username" placeholder="请输入用户名">\r
\r
<script>\r
    let username = document.getElementById("username");\r
\r
    username.addEventListener("keyup", function () {\r
        console.log("键盘输入内容：", event.target.value);\r
    })\r
<\/script>\r
\`\`\`\r
\r
通过键盘依次键入 "username" 后网页输出\r
\r
<!-- markdownlint-disable no-inline-html -->\r
<style>\r
    input::placeholder {\r
        color: black;\r
        font-size: 14px;\r
    }\r
</style>\r
\r
<input type="text" id="username" placeholder="username">\r
<!-- markdownlint-restore -->\r
\r
通过键盘依次键入 "username" 后控制台输出\r
\r
\`\`\`console\r
键盘输入内容： u\r
键盘输入内容： us\r
键盘输入内容： use\r
键盘输入内容： user\r
键盘输入内容： usern\r
键盘输入内容： userna\r
键盘输入内容： usernam\r
键盘输入内容： username\r
\`\`\`\r
\r
利用\`keyup\`事件检测的是按键松开后输入框内键入的内容，所以控制台第一个输出的是 "u" 。\r
\r
### keypress事件（已废弃）\r
\r
\`\`\`html\r
<input type="text" id="username" placeholder="请输入用户名">\r
\r
<script>\r
    let username = document.getElementById("username");\r
\r
    username.addEventListener("keypress", function () {\r
        console.log("键盘输入内容：", event.target.value);\r
    })\r
<\/script>\r
\`\`\`\r
\r
通过键盘依次键入 "username" 后网页输出\r
\r
<!-- markdownlint-disable no-inline-html -->\r
<style>\r
    input::placeholder {\r
        color: black;\r
        font-size: 14px;\r
    }\r
</style>\r
\r
<input type="text" id="username" placeholder="username">\r
<!-- markdownlint-restore -->\r
\r
通过键盘依次键入 "username" 后控制台输出\r
\r
\`\`\`console\r
键盘输入内容： \r
键盘输入内容： u\r
键盘输入内容： us\r
键盘输入内容： use\r
键盘输入内容： user\r
键盘输入内容： usern\r
键盘输入内容： userna\r
键盘输入内容： usernam\r
\`\`\`\r
\r
废弃原因\r
\r
1. 不能检测功能键\r
\r
2. 行为不一致\r
\r
3. 被\`keydown\`和\`input\`事件替代，文本输入改用\`input\`事件，功能按键 改用\`keydown\`事件。\r
\r
## 表单事件\r
\r
表单事件是在使用表单元素及输入框元素时可以监听的一系列事件。\r
\r
|属性|描述|DOM级别|\r
|---|---|---|\r
|blur|元素失去焦点时触发|2|\r
|change|该事件在表单元素的内容改变时触发(\`<input>\`, \`<keygen>\`, \`<select>\`, 和\`<textarea>\`)|2|\r
|focus|元素获取焦点时触发|2|\r
|focusin|元素即将获取焦点时触发|2|\r
|focusout|元素即将失去焦点时触发|2|\r
|input|元素获取用户输入时触发|3|\r
|reset|表单重置时触发|2|\r
|search|用户向搜索域输入文本时触发 (\`<input="search">\`)| |\r
|select|用户选取文本时触发 (\`<input>\`和\`<textarea>\`)|2|\r
|submit|表单提交时触发|2|\r
\r
### 核心表单事件\r
\r
#### submit事件\r
\r
submit事件在表单数据向服务器提交时触发。注意，submit事件的发生对象是\`<form>\`元素，而不是\`<button>\`元素。因为提交的是表单，而不是按钮。\r
\r
\`\`\`html\r
<form action="" id="myForm">\r
    <input type="text">\r
    <button id="submitBtn">提交</button>\r
</form>\r
\r
<script>\r
    let submitBtn = document.getElementById("submitBtn");\r
    let myForm  = document.getElementById("myForm");\r
\r
    submitBtn.addEventListener("click", function ()  {\r
        myForm.submit();\r
    })\r
<\/script>\r
\`\`\`\r
\r
点击提交按钮后控制台输出\r
\r
\`\`\`console\r
表单内容已提交\r
\`\`\`\r
\r
#### reset事件\r
\r
reset事件在表单重置（所有表单成员变回默认值）时触发。\r
\r
\`\`\`html\r
<form action="" id="myForm">\r
    <input type="text">\r
    <button id="resetBtn">重置</button>\r
</form>\r
\r
<script>\r
    let resetBtn = document.getElementById("resetBtn");\r
    let myForm  = document.getElementById("myForm");\r
\r
    resetBtn.addEventListener("click", function ()  {\r
        myForm.reset();\r
        console.log("表单内容已重置");\r
    })\r
\`\`\`\r
\r
在输入框输入内容并点击重置按钮后，控制台输出\r
\r
\`\`\`console\r
表单内容已重置\r
\`\`\`\r
\r
### 输入元素表单事件\r
\r
#### input事件\r
\r
input事件在\`<input>\`、\`<select>\`、\`<textarea>\`的值发生变化时触发。对于复选框（\`<input type=checkbox>\`）或单选框（\`<input type=radio>\`），用户改变选项时，也会触发这个事件。\r
\r
input事件的一个特点是会连续触发，比如用户每按下一次按键，就会触发一次input事件。\r
\r
\`\`\`html\r
<input type="text" id="username" placeholder="username">\r
\r
<script>\r
    let username = document.getElementById("username");\r
\r
    username.addEventListener("input", function (event) {\r
        console.log(event.target.value);\r
    });\r
<\/script>\r
\`\`\`\r
\r
在输入框内依次键入"username"后控制台输出\r
\r
\`\`\`console\r
u\r
us\r
use\r
user\r
usern\r
userna\r
usernam\r
username\r
\`\`\`\r
\r
#### select事件\r
\r
select事件在\`<input>\`、\`<textarea>\`中选中文本时触发。\r
\r
\`\`\`html\r
<input type="text" id="username" placeholder="username">\r
\r
<script>\r
    let username = document.getElementById("username");\r
\r
    username.addEventListener("select", function (event) {\r
        // 获取选择的文本\r
        const selectedText = username.value.substring(\r
            username.selectionStart,\r
            username.selectionEnd\r
        );\r
\r
        console.log("选中的文本：", selectedText);\r
    });\r
<\/script>\r
\`\`\`\r
\r
在输入框中输入"username"并选中"user"后，控制台输出\r
\r
\`\`\`console\r
选中的文本： user\r
\`\`\`\r
\r
#### change事件\r
\r
change事件在\`<input>\`、\`<select>\`、\`<textarea>\`的值发生变化时触发。它与input事件的最大不同就是不会连续触发，只有当全部修改完成后才会触发。\r
\r
\`\`\`html\r
<input type="text" id="username" placeholder="username">\r
\r
<script>\r
    let username = document.getElementById("username");\r
\r
    username.addEventListener("change", function (event) {\r
        console.log(event.target.value);\r
    });\r
<\/script>\r
\`\`\`\r
\r
在输入框中输入"username"并回车或者点击空白处失去焦点后，控制台输出\r
\r
\`\`\`console\r
username\r
\`\`\`\r
\r
在输入没有完成之前控制台没有输出。\r
\r
#### focus事件和blur事件\r
\r
focus事件在元素获取焦点时触发，blur事件在元素失去焦点时触发。通常用于\`<input>\`, \`<select>\`, 和\`<a>\`。\r
\r
\`\`\`html\r
<input type="text" id="username" placeholder="请输入用户名">\r
\r
<script>\r
    let username = document.getElementById("username")\r
\r
    username.addEventListener("focus", function ()  {\r
        this.style.background = "red";\r
    });\r
\r
    username.addEventListener("blur", function () {\r
        this.style.background = "";\r
    });\r
<\/script>\r
\`\`\`\r
\r
当输入框获得焦点时网页输出\r
\r
<!-- markdownlint-disable no-inline-html -->\r
<input type="text" id="username" placeholder="请输入用户名" style="background: red">\r
<!-- markdownlint-restore -->\r
\r
失去焦点后网页输出\r
\r
<!-- markdownlint-disable no-inline-html -->\r
<input type="text" id="username" placeholder="请输入用户名">\r
<!-- markdownlint-restore -->\r
\r
### 表单验证事件\r
\r
#### invalid事件和valid事件\r
\r
invalid事件在表单验证失败时触发，valid事件在表单验证通过时触发。\r
\r
\`\`\`html\r
<input type="email" id="email" required placeholder="请输入邮箱">\r
<div id="emailError" class="error-message"></div>\r
\r
<script>\r
    let emailInput = document.getElementById("email");\r
    let emailError = document.getElementById("emailError");\r
\r
    // invalid事件处理\r
    emailInput.addEventListener("invalid", function(event) {\r
        event.preventDefault(); // 阻止默认浏览器错误提示\r
        \r
        if (this.validity.valueMissing) {\r
            this.setCustomValidity('邮箱地址不能为空');\r
        } else if (this.validity.typeMismatch) {\r
            this.setCustomValidity('请输入有效的邮箱格式');\r
        }\r
        \r
        emailError.textContent = this.validationMessage;\r
        this.classList.add('invalid');\r
    });\r
\r
    // valid事件处理\r
    emailInput.addEventListener("valid", function() {\r
        emailError.textContent = '';\r
        this.classList.remove('invalid');\r
        this.classList.add('valid');\r
        this.setCustomValidity(''); // 清除自定义错误信息\r
    });\r
\r
    // 输入时重新验证\r
    emailInput.addEventListener("input", function() {\r
        this.checkValidity(); // 触发验证\r
    });\r
<\/script>\r
\`\`\`\r
`;export{n as default};
