# 关于 this
## this 是什么

举个例子：
```js
function foo (num) {
    console.log('foo：' + num)
    this.count++
}
foo.count = 0

for (var i = 0; i < 10; i++) {
    if (i > 5) {
        foo(i)
    }
}

// foo: 6
// foo: 7
// foo: 8
// foo: 9

console.log(foo.count) // 0
```

分析：

从 foo 函数输出的 4 条记录来看，foo 函数的确被执行了 4 次，但是 foo.count 输出的结果居然是 0。在执行 foo.count = 0 时，已经向函数对象 foo 添加了属性 count，但是函数内部代码 this.count 中的 this 并不指向函数对象，所以 foo.count 才会输出 0。

结论：

this 的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。

扩展：

当一个函数被调用时，会创建一个活动记录（执行上下文）。这个记录会包含函数在哪里调用（调用栈）、函数的调用方式、传入的参数信息。this 就是这个记录的一个属性，会在函数执行的过程中用到。