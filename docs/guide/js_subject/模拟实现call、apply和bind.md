# 模拟实现 call、apply 和 bind

## call
### 介绍
一句话介绍 call：
> call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。

举个例子：
```js
// demo1
var student = {
    name: 'xiaoming'
}

function people () {
    console.log(this.name)
}

people.call(student) // xiaoming

// demo2
var student2 = {
    name: 'xiaoming2'
}

function people2 (age, job) {
    console.log(this.name)
    console.log(age)
    console.log(job)
}

people2.call(student2, 18, 'student')
// xiaoming2
// 18
// student

// demo3
var student3 = 'xiaoming3'

function people3 () {
    console.log(this.student3)
}

people3.call(null) // xiaoming3
```

分析：

1. 在 demo1 中，people 函数执行时，`call()` 方法改变了 `this` 的指向，指向到了 student。
2. 在 demo2 中，people2 函数执行时，多传入了 2 个参数。
3. 如果没有传递第一个参数，那么 `this` 值指向全局对象。[见文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call#%E4%BD%BF%E7%94%A8_call_%E6%96%B9%E6%B3%95%E8%B0%83%E7%94%A8%E5%87%BD%E6%95%B0%E5%B9%B6%E4%B8%94%E4%B8%8D%E6%8C%87%E5%AE%9A%E7%AC%AC%E4%B8%80%E4%B8%AA%E5%8F%82%E6%95%B0%EF%BC%88argument%EF%BC%89)

### 实现
```js
Function.prototype.myCall = function ($this) {
    var context = $this || window // 判断是否传递第一个参数
    var args = []
    context.fn = this // 这里 this 指向调用 myCall() 的对象

    // 遍历除第一位后面的参数
    for (var i = 1, len = arguments.length; i < len; i++) {
        args.push(arguments[i])
    }

    var res = context.fn(...args) // 返回 call 绑定函数的值

    delete context.fn // fn 的对象属性，在这里是辅助作用，最后得删掉
    return res
}

var v = 1
var foo = {
    v: 1
}

function bar (name, age) {
    console.log(this.v)
    return {
        name: name,
        age: age,
        value: this.v
    }
}

bar.myCall(null) // 1
console.log(bar.myCall(foo, 'kevin', 18))
// 1
// Object {
//    name: 'kevin',
//    age: 18,
//    value: 1,
// }
```

## apply

### 介绍
一句话介绍 apply：
> apply() 方法调用一个具有给定 this 值的函数，以及以一个数组（或类数组对象）的形式提供的参数。

因此除了传递参数的形式不同之外，其他实现和 call 类似。
### 实现
```js
Function.prototype.myApply = function ($this, arr) {
    var context = $this || window
    var res
    context.fn = this

    if (!arr) {
        res = context.fn()
    } else {
        res = context.fn(...arr)
    }

    delete context.fn
    return res
}

var v = 1
var foo = {
    v: 1
}

function bar (name, age) {
    console.log(this.v)
    return {
        name: name,
        age: age,
        value: this.v
    }
}

bar.myApply(null) // 1
console.log(bar.myApply(foo, ['kevin', 18]))
// 1
// Object {
//    name: 'kevin',
//    age: 18,
//    value: 1,
// }
```

## bind

### 介绍
一句话介绍 bind：
> `bind()` 方法创建一个新的函数，在 `bind()` 被调用时，这个新函数的 this 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

举个例子：
```js
// demo1
var foo = {
    v: 1
}

function bar (name, age) {
    console.log(this.v)
    console.log(name)
    console.log(age)
}

var bindFoo = bar.bind(foo, 'daisy')
bindFoo('20')
// 1
// daisy
// 20
```

分析：

1. 返回一个函数。
2. 可以传入参数，在使用 bind 绑定时传入一个参数(name)，在后面执行返回函数时再传入另一个参数(age)。
3. 调用 `bind()` 方法是一个函数。
4. 作为构造函数的绑定函数。[见文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#%E4%BD%9C%E4%B8%BA%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0%E4%BD%BF%E7%94%A8%E7%9A%84%E7%BB%91%E5%AE%9A%E5%87%BD%E6%95%B0)

### 实现
```js
Function.prototype.myBind = function (context) {
    if (typeof this !== 'function') {
        throw new Error('调用 bind 的不是函数')
    }

    var $this = this
    var args = Array.prototype.slice.call(arguments, 1)
    var fnBind = function () {
        var fnBindArgs = Array.prototype.slice.call(arguments)
        var _this = null

        if (this instanceof fnBind) {
            _this = this
        } else {
            _this = context
        }

        return $this.apply(_this, args.concat(fnBindArgs))
    }

    fnBind.prototype = Object.create(this.prototype)
    return fnBind
}

var value = 2
var fooBind = {
    value: 1
}

function barBind (name, age) {
    this.habit = 'shopping'
    console.log('barBind', this.value)
    console.log('barBind', name)
    console.log('barBind', age)
}

barBind.prototype.friend = 'xiaohong'

var bindFoo = barBind.myBind(fooBind, 'xiaoming')
var obj = new bindFoo('20')
// barBind undefined
// barBind xiaoming
// barBind 20
console.log(obj.habit)
console.log(obj.friend)
// shopping
// xiaohong
```