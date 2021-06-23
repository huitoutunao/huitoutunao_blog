# 阅读 lodash 源码学防抖

## 前言

在介绍防抖之前，我们先看下面这个例子：鼠标滑过黑布触发 `onmousemove` 事件。
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
    <title>debounce</title>
    <style>
        #wrapper {
            width: 100%;
            height: 200px;
            line-height: 200px;
            text-align: center;
            font-size: 30px;
            color: #fff;
            background-color: #666;
        }
    </style>
</head>
<body>
    <div id="wrapper"></div>
    <script src="debounce.js"></script>
</body>
</html>
```
```js
// debounce.js

var count = 1
var wrapperDom = document.getElementById('wrapper')

function doEvent (e) {
    // 这两个是为了验证防抖前后的变化，后面会提到。
    // console.log(this)
    // console.log(e)
    wrapperDom.innerHTML = count++
}
wrapperDom.onmousemove = doEvent
```
运行效果图如下：
![debounce1](../../assets/js_subject/debounce.gif)

从效果图可以看出，浏览器处理数字累加还是蛮流畅的，因为这个例子的事件函数相对简单。假设 1s 触发 1000 次事件，且事件是发送 ajax 请求，那么浏览器处理时就会出现卡顿。

为了解决这类问题，通常使用防抖（debounce）和节流（throttle）的方案。

## 介绍

防抖指的是触发事件后，在 `n` 秒内函数只能执行一次，如果触发事件后在 `n` 秒内又触发了事件，则会重新计算函数，延长执行时间。

## 实现

根据上面的介绍，我们现在可以简单实现下：
```js
function debounce (func, wait) {
    let timeout
    return function () {
        clearTimeout(timeout)
        timeout = setTimeout(func, wait)
    }
}

wrapperDom.onmousemove = debounce(doEvent, 1000)
```

运行效果图如下：
![debounce2](../../assets/js_subject/debounce2.gif)

现在不管你在 1s 内鼠标移动多少次，它都只在移动完 1s 后再触发事件。

细心的你应该已经发现了，上面的实现过程中，this 的指向和 MouseEvent 对象参数发生了改变。那么现在我们来修复这两个已知问题，如下：
```js
function debounce (func, wait) {
    let timeout
    return function (...args) {
        const lastThis = this
        const lastArgs = args

        clearTimeout(timeout)
        timeout = setTimeout(function () {
            func.apply(lastThis, lastArgs)
        }, wait)
    }
}
```

## 立即调用

虽然上面的防抖函数已经基本完成了，但是产品经理有这么个需求：添加一个控制立即调用函数 `func` 的开关。
```js
// leading 默认不开启立即调用
function debounce (func, wait, leading = false) {
    let timerId
    function debounced (...args) {
        const lastThis = this
        const lastArgs = args

        timerId && clearTimeout(timerId)
        if (leading) {
            const invokeNow = !timerId
            timerId = setTimeout(function () {
                timerId = null
            }, wait)
            invokeNow && func.apply(lastThis, lastArgs)
        } else {
            timerId = setTimeout(function () {
                func.apply(lastThis, lastArgs)
            }, wait)
        }
    }

    return debounced
}

wrapperDom.onmousemove = debounce(doEvent, 1000, true)
```

运行效果图如下：
![debounce3](../../assets/js_subject/debounce3.gif)

## 返回值

如果调用的 `func` 函数有返回值怎么办？我们得添加它的返回值。代码实现如下：
```js
function debounce (func, wait, leading = false) {
    let timerId,
        result

    function debounced (...args) {
        const lastThis = this
        const lastArgs = args

        timerId && clearTimeout(timerId)
        if (leading) {
            const invokeNow = !timerId
            timerId = setTimeout(function () {
                timerId = null
            }, wait)
            result = invokeNow && func.apply(lastThis, lastArgs)
        } else {
            timerId = setTimeout(function () {
                func.apply(lastThis, lastArgs)
            }, wait)
        }

        return result
    }

    return debounced
}
```

注意：当 leading 为 false 的时候，因为使用了 setTimeout ，我们将 `func.apply(context, args)` 的返回值赋给变量，最后再 return 的时候，值将会一直是 undefined，所以我们只在 leading 为 true 的时候返回函数的执行结果。

虽然实际开发中，这个返回值几乎用不上，但是作为工具库的 Lodash 考虑情况比较全面。

## 取消

如果我不想等待防抖函数执行了，是否可以取消呢？答案是可以的哈~，下面我们为防抖函数添加一个取消属性即可。
```js
function debounce (func, wait, leading = false) {
    let timerId,
        result

    function debounced (...args) {
        const lastThis = this
        const lastArgs = args

        timerId && clearTimeout(timerId)
        if (leading) {
            const invokeNow = !timerId
            timerId = setTimeout(function () {
                timerId = null
            }, wait)
            result = invokeNow && func.apply(lastThis, lastArgs)
        } else {
            timerId = setTimeout(function () {
                func.apply(lastThis, lastArgs)
            }, wait)
        }

        return result
    }

    function cancel () {
        clearTimeout(timerId)
        timerId = null
    }

    debounced.cancel = cancel

    return debounced
}

// 给页面添加一个取消防抖函数按钮
var activity = debounce(doEvent, 20000, false) // 设置 20s 后才执行函数
$('#wrapper').on('mousemove', activity)
$('#btn').on('click', function () {
    activity.cancel()
})
```

## 题外话

或许有小伙伴会问，如果我想要调试 Lodash 源码怎么办？有没有方案推荐呢？

有的哈。我已经把它总结到这篇文章了。[戳这里学习](/guide/essays/vscode调试lodash源码)

## 结语

本文到这里就结束了，通过文章我们了解到什么是防抖以及它的实现原理，使用防抖函数可以解决项目中，搜索框输入关键字后间隔一段时间，才会请求获取建议列表......

在前端面试中，防抖函数还是一道高频考题，希望小伙伴们看完本文后能够顺利拿下。

## 参考文献

- [Lodash 源码](https://github.com/lodash/lodash/blob/master/debounce.js)
- [冴羽的博客](https://github.com/mqyqingfeng/Blog/issues/22)
