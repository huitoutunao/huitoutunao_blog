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

## this 绑定规则

上面说到，this 的指向和函数的调用位置有关，那么在开发的时候如何判断呢？我们使用日常开发的调试工具 Chrome 浏览器来查看下。

举个例子：
```js
function baz () {
    console.log('baz')
    bar()
}

function bar () {
    console.log('bar')
    box()
}

function box () {
    debugger; // 断点
    console.log('box')
}

baz()
```

查看浏览器截图如下：

![关于this_1](../../assets/js_advanced/this_1.png)
![关于this_2](../../assets/js_advanced/this_2.png)

从调用栈列表中我们分析出 box 函数的调用位置是在 bar 这里。

### 默认规则

这是最常用的函数调用类型：独立函数调用。可以把这条规则看作是无法应用其他规则时的默认规则。

举个例子：
```js
// demo1
function foo1 () {
    console.log(this.name1)
}

var name1 = 'bar'

foo1() // bar

// demo2
function foo2 () {
    "use strict"

    console.log(this.name2)
}

var name2 = 'bar'

foo2() // TypeError: this is undefined

// demo3
function foo3 () {
    console.log(this.name3)
}

var name3 = 'bar'

(function () {
    "use strict"
    
    foo3() // bar
})()
```

分析：

在全局作用域声明的变量就是全局对象的一个属性。因此 this.name 的 this 指向全局对象。  
如果函数**运行**在严格模式（demo2），则不能将全局对象用于默认绑定，因此 this 会绑定到 undefined，而在严格模式下**调用**则不影响 `foo3()` 函数的默认绑定。

::: warning 注意
日常开发的时候，不应该将严格模式和非严格模式混合使用。整个程序要么严格要么非严格。
:::

### 隐式绑定

### 显式绑定

### new 绑定

**部分整理自《你不知道的JavaScript》**