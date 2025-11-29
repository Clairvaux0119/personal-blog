---
title: class类
date: 2025-10-05
tags: ["javascript", "class", "ES6"]
excerpt: "ES6 class类基本语法及属性与方法"
---

## class类

### 基本语法

在ES5中，使用`function`来声明一个类。

```javascript
// 构造函数
function User (name, age) {
    this.name = name
    this.age = age
}

// 原型方法（相当于实例方法）
User.prototype.getName = function () {
    console.log(this.name)
}

let user = new User("Bob", 20)
user.getName()
```

控制台输出

```console
Bob
```

ES5 类声明的特点

+ 构造函数：使用`function`关键字，类名首字母习惯大写
+ 实例方法：通过`prototype`添加

在ES6中，class（类）作为对象的模板被引入，可以通过`class`关键字定义类。`class`的本质是`function`.它可以看作一个语法糖，让对象原型的写法更加清晰、更像面向对象编程的语法。

```javascript
class User {
    // 构造函数
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    // 实例方法
    getName(){
        console.log(this.name)
    }
}

let user = new User("Bob", 20)
user.getName()
```

控制台输出

```console
Bob
```

#### `constructor`方法

`constructor()`方法是类的默认方法，通过`new`命令生成对象实例时，自动调用该方法。一个类必须有`constructor()`方法，如果没有显式定义，一个空的`constructor()`方法会被默认添加。

```javascript
class User {

}
```

等同于

```javascript
class User {
    constructor() {

    }
}
```

#### 类的实例

使用`new`命令生成类的实例。

```javascript
class User {
    // ...
}

// 报错
let user = User("name", 20)

// 正确
let user = new User("name", 20)
```

#### 注意事项

类不存在变量提升（holst），这一点与ES5不同。

### class类属性和方法

声明一个`User`类

```javascript
class User {
    // 构造函数
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    // 实例方法
    getName(){
        console.log(this.name)
    }
}

let user = new User("Bob", 20)
user.getName()
```

#### 实例方法

实例方法是指通过类的实例对象调用的方法。

在`User`类中利用`new`关键字声明了实例对象`user`，通过其调用了`User`类的实例方法`getName()`。

```javascript
getName(){
    console.log(this.name)
}
```

#### 实例属性

实例属性是指类的实例对象可调用的属性。

`User`类中构造函数的参数即为实例属性，可以通过实例对象直接调用。

```javascript
console.log(user.age)
```

控制台输出

```console
20
```

#### 静态方法

类相当于实例的原型，所有在类中定义的方法都会被实例继承。如果在一个方法前加上`static`关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这种方法被称为**静态方法**。

在`User`类中声明一个静态方法`getAge()`

```javascript
static showPromot() {
    console.log("这是一个用户类")
}
```

调用该方法

```javascript
let user = new User("Bob", 20)
User.showPromot()
user.showPromot()
```

直接通过类名调用`User.showPromot()`，控制台打印

```console
这是一个用户类
```

通过实例`user`调用`user.showPromot()`，控制台打印错误信息

```console
Uncaught TypeError TypeError: user.showPromot is not a function
```

>**注意**
>
>如果静态方法包含`this`关键字，这个`this`指向的是类，而不是实例。

```javascript
class User {
    static getShowPromot() {
        this.showPromot()
    }

    static showPromot() {
        console.log("这是一个用户类")
    }

    showPromot() {
        console.log("This is a class of User.")
    }
}

User.getShoWPromot()
```

控制台打印

```console
这是一个用户类
```

对于上述代码，静态方法`getShowPromot()`中的`this`指向的是`User`类本身，因此`this.showPromot()`指向的是静态方法`showPromot()`，而不是后面的实例方法。

同样的，对于下面代码中的静态方法`getAge()`

```javascript
class User {
    // 实例属性
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    static getAge() {
        console.log(this.age)
    }
}
```

由于静态方法中的`this`指向的是类本身而不是实例属性，由于类本身没有关于属性`age`的定义，控制台打印

```console
undefined
```

#### 静态属性

静态属性是指class本身的属性，即直接定义在类内部的属性`Class.propName`，不需要实例化。

ES2022 (ES13) 正式将静态属性加入语言标准中。

```javascript
class User {
    static age = 18
    
    static getAge() {
        console.log(this.age)
    }
}
```

控制台打印

```console
18
```

在ES2022之前静态属性最常用的写法是在类外部添加静态属性。

```javascript
class User {}

User.age = 18
console.log("User.age")
```

控制台打印

```console
18
```

### class类的继承

class可以通过`extends`关键字实现继承，让子类继承父类的属性和方法。相较于ES5的原型链继承，`extends`的写法更加清晰和方便。

ES5原型链继承

```javascript
function Person(name, age) {
    this.name = name
    this.age = age
}

Person.prototype.getName = function () {
    console.log(this.name)
}

Person.getInfo = function () {
    console.log("这是一个人类")
}

function Student(name, age, grade) {
    Person.call(this, name, age) // 调用父类构造函数
}

// 设置原型链继承
Student.prototype = Object.create(Person.prototype)
Student.prototype.constructor = Student

// 继承静态方法（ES6新增）
Object.setPrototypeOf(Student, Person)
// ES5继承方式：Student.__proto__ = Person

// 使用
let s = new Student("Bob", 20)
s.getName()
Student.getInfo()
```

控制台打印

```console
Bob
这是一个人类
```

ES6 extends继承

```javascript
class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    getName() {
        console.log(this.name)
    }

    static getInfo() {
        console.log("这是一个人类")
    }
}

class Student extends Person {

}

let s = new Student("Bob", 20)
s.getName()
Student.getInfo()
```

控制台打印

```console
Bob
这是一个人类
```

可以看出与原型链继承相比，extends继承不用手动设置继承关系，并且会自动继承静态方法，写法更加直观清晰。

#### super

ES6规定，子类必须在`constructor()`方法中调用`super()`，否则会报错。因为子类自己的`this`对象必须先通过父类的构造函数完成塑造，得到与父类同样的实例和方法。然后再对其进行加工，添加子类自己的实例属性和方法。如果不调用`super()`方法，子类就得不到自己的`this`对象。

使用`super()`调用父类构造函数

```javascript
class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    getName() {
        console.log(this.name)
    }

    static getInfo() {
        console.log("这是一个人类")
    }
}

class Student extends Person {
    constructor(name, age, gender) {
        super(name, age)
        this.gender = gender
    }

    getGender() {
        console.log(`性别：${this.gender}`)
    }
}

let s = new Student("Bob", 20, "男")
console.log(s.name)
```

控制台打印

```console
Bob
```

**注意**&nbsp;&nbsp;&nbsp;&nbsp;子类构造函数中的`super()`必须在`this`之前调用。

使用`super()`调用父类方法

```javascript
class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    getName() {
        console.log(this.name)
    }

    static getInfo() {
        console.log("这是一个人类")
    }
}

class Student extends Person {
    constructor(name, age, gender) {
        super(name, age)
        this.gender = gender
    }

    getGender() {
        console.log(`性别：${this.gender}`)
    }

    getName() {
        console.log("学生姓名")
        // 调用父类getName()方法
        super.getName()
    }
}

let s = new Student("Bob", 20, "男")
s.getName()
```

控制台打印

```console
学生姓名
Bob
```

使用`super()`调用父类静态方法

```javascript
class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    getName() {
        console.log(this.name)
    }

    static getInfo() {
        console.log("这是一个人类")
    }
}

class Student extends Person {
    constructor(name, age, gender) {
        super(name, age)
        this.gender = gender
    }

    getGender() {
        console.log(`性别：${this.gender}`)
    }

    static getInfo() {
        super.getInfo()
        console.log("这是一位学生")
    }
}

let s = new Student("Bob", 20, "男")
Student.getInfo()
```

控制台打印

```console
这是一个人类
这是一位学生
```

要注意的是箭头函数中不能使用`super()`，普通函数中的`super()`指向父类原型。
