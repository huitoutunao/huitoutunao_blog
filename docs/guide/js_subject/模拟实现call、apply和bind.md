# 模拟实现 call、apply 和 bind

## call
### 介绍
一句话介绍 call：
> call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。

举个例子：
```js
// demo1
var student = {
    name: 'huitoutunao'
}

function people () {
    console.log(this.name)
}

people.call(student) // huitoutunao

// demo2
var student2 = {
    name: 'huitoutunao2'
}

function people2 (age, job) {
    console.log(this.name)
    console.log(age)
    console.log(job)
}

people2.call(student2, 18, 'student')
// huitoutunao2
// 18
// student
```

分析：
1. 在 demo1 中，people 函数执行时，call 改变了 this 的指向，指向到了 student
2. 在 demo2 中，people2 函数执行时，多传入了 2 个参数，[见文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call#%E4%BD%BF%E7%94%A8_call_%E6%96%B9%E6%B3%95%E8%B0%83%E7%94%A8%E5%87%BD%E6%95%B0%E5%B9%B6%E4%B8%94%E4%B8%8D%E6%8C%87%E5%AE%9A%E7%AC%AC%E4%B8%80%E4%B8%AA%E5%8F%82%E6%95%B0%EF%BC%88argument%EF%BC%89)

this 值没有搞明白，先研究下 this 再来补充。。。

### 实现
```js
待续...
```

## apply
### 介绍
### 实现

## bind
### 介绍
### 实现