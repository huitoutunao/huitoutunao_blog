# 模拟实现 new

## 介绍
一句话介绍 new：
> new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。

```js
// demo1
function Factory (name, age) {
    this.name = name
    this.age = age
}

Factory.prototype.sayAge = function () {
    console.log(this.age)
}

var foo = new Factory('Jack', 20)
console.log(foo.name) // Jack
foo.sayAge() // 20

// demo2
function Factory (name, age) {
    this.name = name
    this.age = age

    return {
        name: name,
        job: 'fontend developer'
    }
}

var foo = new Factory('Jack', 20)
console.log(foo.name) // Jack
console.log(foo.job) // fontend developer
console.log(foo.age) // undefined

// demo3
function Factory (name, age) {
    this.name = name
    this.age = age

    return 'hello world'
}

var foo = new Factory('Jack', 20)
console.log(foo.name) // Jack
console.log(foo.age) // 20
console.log(foo.job) // undefined
```

分析 demo1：
1. foo 实例可以访问到 Factory 构造函数里面的属性
2. foo 实例可以访问到 Factory 原型属性

分析 demo2：
1. 当构造函数的返回值是对象时，实例只能够访问返回值中的对象属性

分析 demo3：
1. 当构造函数的返回值是基本类型的值时，结果相当于没有返回值进行处理

## 实现
```js
function myNew () {
    // 创建空对象
    var obj = new Object()

    // 规定传入的第一个参数是构造函数，使用 shift 将返回值赋予 constructor
    var constructor = Array.prototype.shift.call(arguments)

    // 通过 __proto__ 使得 obj 和 constructor.prototype 对象进行关联（原型链）
    // __proto__：JavaScript 的非标准但许多浏览器实现的属性
    obj.__proto__ = constructor.prototype

    // 通过 apply 使得 constructor 构造函数的 this 绑定到 obj，并且携带参数
    var res = constructor.apply(obj, arguments)

    // 对构造函数是否返回对象进行判断
    return typeof res === 'object' ? res : obj
}

// 用法
function Factory (name, age) {
    this.name = name
    this.age = age
}

Factory.prototype.sayAge = function () {
    console.log(this.age)
}

var foo = myNew(Factory, 'Jack', 20)
console.log(foo.name) // Jack
console.log(foo.age) // 20
```

## 结语

阅读[冴羽的博客](https://github.com/mqyqingfeng/Blog/issues/13)的学习笔记。