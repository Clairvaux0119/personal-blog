const n=`---\r
title: class类\r
date: 2025-10-05\r
tags: ["javascript", "class", "ES6"]\r
excerpt: "ES6 class类基本语法及属性与方法"\r
---\r
\r
## class类\r
\r
### 基本语法\r
\r
在ES5中，使用\`function\`来声明一个类。\r
\r
\`\`\`javascript\r
// 构造函数\r
function User (name, age) {\r
    this.name = name\r
    this.age = age\r
}\r
\r
// 原型方法（相当于实例方法）\r
User.prototype.getName = function () {\r
    console.log(this.name)\r
}\r
\r
let user = new User("Bob", 20)\r
user.getName()\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
Bob\r
\`\`\`\r
\r
ES5 类声明的特点\r
\r
+ 构造函数：使用\`function\`关键字，类名首字母习惯大写\r
+ 实例方法：通过\`prototype\`添加\r
\r
在ES6中，class（类）作为对象的模板被引入，可以通过\`class\`关键字定义类。\`class\`的本质是\`function\`.它可以看作一个语法糖，让对象原型的写法更加清晰、更像面向对象编程的语法。\r
\r
\`\`\`javascript\r
class User {\r
    // 构造函数\r
    constructor(name, age) {\r
        this.name = name\r
        this.age = age\r
    }\r
\r
    // 实例方法\r
    getName(){\r
        console.log(this.name)\r
    }\r
}\r
\r
let user = new User("Bob", 20)\r
user.getName()\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
Bob\r
\`\`\`\r
\r
#### \`constructor\`方法\r
\r
\`constructor()\`方法是类的默认方法，通过\`new\`命令生成对象实例时，自动调用该方法。一个类必须有\`constructor()\`方法，如果没有显式定义，一个空的\`constructor()\`方法会被默认添加。\r
\r
\`\`\`javascript\r
class User {\r
\r
}\r
\`\`\`\r
\r
等同于\r
\r
\`\`\`javascript\r
class User {\r
    constructor() {\r
\r
    }\r
}\r
\`\`\`\r
\r
#### 类的实例\r
\r
使用\`new\`命令生成类的实例。\r
\r
\`\`\`javascript\r
class User {\r
    // ...\r
}\r
\r
// 报错\r
let user = User("name", 20)\r
\r
// 正确\r
let user = new User("name", 20)\r
\`\`\`\r
\r
#### 注意事项\r
\r
类不存在变量提升（holst），这一点与ES5不同。\r
\r
### class类属性和方法\r
\r
声明一个\`User\`类\r
\r
\`\`\`javascript\r
class User {\r
    // 构造函数\r
    constructor(name, age) {\r
        this.name = name\r
        this.age = age\r
    }\r
\r
    // 实例方法\r
    getName(){\r
        console.log(this.name)\r
    }\r
}\r
\r
let user = new User("Bob", 20)\r
user.getName()\r
\`\`\`\r
\r
#### 实例方法\r
\r
实例方法是指通过类的实例对象调用的方法。\r
\r
在\`User\`类中利用\`new\`关键字声明了实例对象\`user\`，通过其调用了\`User\`类的实例方法\`getName()\`。\r
\r
\`\`\`javascript\r
getName(){\r
    console.log(this.name)\r
}\r
\`\`\`\r
\r
#### 实例属性\r
\r
实例属性是指类的实例对象可调用的属性。\r
\r
\`User\`类中构造函数的参数即为实例属性，可以通过实例对象直接调用。\r
\r
\`\`\`javascript\r
console.log(user.age)\r
\`\`\`\r
\r
控制台输出\r
\r
\`\`\`console\r
20\r
\`\`\`\r
\r
#### 静态方法\r
\r
类相当于实例的原型，所有在类中定义的方法都会被实例继承。如果在一个方法前加上\`static\`关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这种方法被称为**静态方法**。\r
\r
在\`User\`类中声明一个静态方法\`getAge()\`\r
\r
\`\`\`javascript\r
static showPromot() {\r
    console.log("这是一个用户类")\r
}\r
\`\`\`\r
\r
调用该方法\r
\r
\`\`\`javascript\r
let user = new User("Bob", 20)\r
User.showPromot()\r
user.showPromot()\r
\`\`\`\r
\r
直接通过类名调用\`User.showPromot()\`，控制台打印\r
\r
\`\`\`console\r
这是一个用户类\r
\`\`\`\r
\r
通过实例\`user\`调用\`user.showPromot()\`，控制台打印错误信息\r
\r
\`\`\`console\r
Uncaught TypeError TypeError: user.showPromot is not a function\r
\`\`\`\r
\r
>**注意**\r
>\r
>如果静态方法包含\`this\`关键字，这个\`this\`指向的是类，而不是实例。\r
\r
\`\`\`javascript\r
class User {\r
    static getShowPromot() {\r
        this.showPromot()\r
    }\r
\r
    static showPromot() {\r
        console.log("这是一个用户类")\r
    }\r
\r
    showPromot() {\r
        console.log("This is a class of User.")\r
    }\r
}\r
\r
User.getShoWPromot()\r
\`\`\`\r
\r
控制台打印\r
\r
\`\`\`console\r
这是一个用户类\r
\`\`\`\r
\r
对于上述代码，静态方法\`getShowPromot()\`中的\`this\`指向的是\`User\`类本身，因此\`this.showPromot()\`指向的是静态方法\`showPromot()\`，而不是后面的实例方法。\r
\r
同样的，对于下面代码中的静态方法\`getAge()\`\r
\r
\`\`\`javascript\r
class User {\r
    // 实例属性\r
    constructor(name, age) {\r
        this.name = name\r
        this.age = age\r
    }\r
\r
    static getAge() {\r
        console.log(this.age)\r
    }\r
}\r
\`\`\`\r
\r
由于静态方法中的\`this\`指向的是类本身而不是实例属性，由于类本身没有关于属性\`age\`的定义，控制台打印\r
\r
\`\`\`console\r
undefined\r
\`\`\`\r
\r
#### 静态属性\r
\r
静态属性是指class本身的属性，即直接定义在类内部的属性\`Class.propName\`，不需要实例化。\r
\r
ES2022 (ES13) 正式将静态属性加入语言标准中。\r
\r
\`\`\`javascript\r
class User {\r
    static age = 18\r
    \r
    static getAge() {\r
        console.log(this.age)\r
    }\r
}\r
\`\`\`\r
\r
控制台打印\r
\r
\`\`\`console\r
18\r
\`\`\`\r
\r
在ES2022之前静态属性最常用的写法是在类外部添加静态属性。\r
\r
\`\`\`javascript\r
class User {}\r
\r
User.age = 18\r
console.log("User.age")\r
\`\`\`\r
\r
控制台打印\r
\r
\`\`\`console\r
18\r
\`\`\`\r
\r
### class类的继承\r
\r
class可以通过\`extends\`关键字实现继承，让子类继承父类的属性和方法。相较于ES5的原型链继承，\`extends\`的写法更加清晰和方便。\r
\r
ES5原型链继承\r
\r
\`\`\`javascript\r
function Person(name, age) {\r
    this.name = name\r
    this.age = age\r
}\r
\r
Person.prototype.getName = function () {\r
    console.log(this.name)\r
}\r
\r
Person.getInfo = function () {\r
    console.log("这是一个人类")\r
}\r
\r
function Student(name, age, grade) {\r
    Person.call(this, name, age) // 调用父类构造函数\r
}\r
\r
// 设置原型链继承\r
Student.prototype = Object.create(Person.prototype)\r
Student.prototype.constructor = Student\r
\r
// 继承静态方法（ES6新增）\r
Object.setPrototypeOf(Student, Person)\r
// ES5继承方式：Student.__proto__ = Person\r
\r
// 使用\r
let s = new Student("Bob", 20)\r
s.getName()\r
Student.getInfo()\r
\`\`\`\r
\r
控制台打印\r
\r
\`\`\`console\r
Bob\r
这是一个人类\r
\`\`\`\r
\r
ES6 extends继承\r
\r
\`\`\`javascript\r
class Person {\r
    constructor(name, age) {\r
        this.name = name\r
        this.age = age\r
    }\r
\r
    getName() {\r
        console.log(this.name)\r
    }\r
\r
    static getInfo() {\r
        console.log("这是一个人类")\r
    }\r
}\r
\r
class Student extends Person {\r
\r
}\r
\r
let s = new Student("Bob", 20)\r
s.getName()\r
Student.getInfo()\r
\`\`\`\r
\r
控制台打印\r
\r
\`\`\`console\r
Bob\r
这是一个人类\r
\`\`\`\r
\r
可以看出与原型链继承相比，extends继承不用手动设置继承关系，并且会自动继承静态方法，写法更加直观清晰。\r
\r
#### super\r
\r
ES6规定，子类必须在\`constructor()\`方法中调用\`super()\`，否则会报错。因为子类自己的\`this\`对象必须先通过父类的构造函数完成塑造，得到与父类同样的实例和方法。然后再对其进行加工，添加子类自己的实例属性和方法。如果不调用\`super()\`方法，子类就得不到自己的\`this\`对象。\r
\r
使用\`super()\`调用父类构造函数\r
\r
\`\`\`javascript\r
class Person {\r
    constructor(name, age) {\r
        this.name = name\r
        this.age = age\r
    }\r
\r
    getName() {\r
        console.log(this.name)\r
    }\r
\r
    static getInfo() {\r
        console.log("这是一个人类")\r
    }\r
}\r
\r
class Student extends Person {\r
    constructor(name, age, gender) {\r
        super(name, age)\r
        this.gender = gender\r
    }\r
\r
    getGender() {\r
        console.log(\`性别：\${this.gender}\`)\r
    }\r
}\r
\r
let s = new Student("Bob", 20, "男")\r
console.log(s.name)\r
\`\`\`\r
\r
控制台打印\r
\r
\`\`\`console\r
Bob\r
\`\`\`\r
\r
**注意**&nbsp;&nbsp;&nbsp;&nbsp;子类构造函数中的\`super()\`必须在\`this\`之前调用。\r
\r
使用\`super()\`调用父类方法\r
\r
\`\`\`javascript\r
class Person {\r
    constructor(name, age) {\r
        this.name = name\r
        this.age = age\r
    }\r
\r
    getName() {\r
        console.log(this.name)\r
    }\r
\r
    static getInfo() {\r
        console.log("这是一个人类")\r
    }\r
}\r
\r
class Student extends Person {\r
    constructor(name, age, gender) {\r
        super(name, age)\r
        this.gender = gender\r
    }\r
\r
    getGender() {\r
        console.log(\`性别：\${this.gender}\`)\r
    }\r
\r
    getName() {\r
        console.log("学生姓名")\r
        // 调用父类getName()方法\r
        super.getName()\r
    }\r
}\r
\r
let s = new Student("Bob", 20, "男")\r
s.getName()\r
\`\`\`\r
\r
控制台打印\r
\r
\`\`\`console\r
学生姓名\r
Bob\r
\`\`\`\r
\r
使用\`super()\`调用父类静态方法\r
\r
\`\`\`javascript\r
class Person {\r
    constructor(name, age) {\r
        this.name = name\r
        this.age = age\r
    }\r
\r
    getName() {\r
        console.log(this.name)\r
    }\r
\r
    static getInfo() {\r
        console.log("这是一个人类")\r
    }\r
}\r
\r
class Student extends Person {\r
    constructor(name, age, gender) {\r
        super(name, age)\r
        this.gender = gender\r
    }\r
\r
    getGender() {\r
        console.log(\`性别：\${this.gender}\`)\r
    }\r
\r
    static getInfo() {\r
        super.getInfo()\r
        console.log("这是一位学生")\r
    }\r
}\r
\r
let s = new Student("Bob", 20, "男")\r
Student.getInfo()\r
\`\`\`\r
\r
控制台打印\r
\r
\`\`\`console\r
这是一个人类\r
这是一位学生\r
\`\`\`\r
\r
要注意的是箭头函数中不能使用\`super()\`，普通函数中的\`super()\`指向父类原型。\r
`;export{n as default};
