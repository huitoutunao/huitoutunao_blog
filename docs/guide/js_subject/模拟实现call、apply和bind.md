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
### 实现

## bind
### 介绍
### 实现