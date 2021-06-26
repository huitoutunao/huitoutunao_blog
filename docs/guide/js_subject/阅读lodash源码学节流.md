# 阅读 lodash 源码学节流

## 前言

上一篇文章我们已经学习了防抖的实现原理，如果还没有学习的同学可以[戳这里学习]('/guide/js_subject/阅读lodash源码学防抖')。今天我们一起来学习节流的实现原理。

## 介绍

如果你在这 1s 内连续触发事件，那么只执行一次。（1s 为自定义间隔时间）

这里有首次是否执行和结束后是否执行两种效果，而它们的实现方式也各有不同。

## 实现

好，看完上面对节流的概述，我们可以简单实现如下：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
    <title>throttle</title>
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
    <script src="throttle.js"></script>
</body>
</html>
```
```js
// throttle.js

let count = 1
let wrapperDom = document.getElementById('wrapper')

function doEvent (e) {
    wrapperDom.innerHTML = count++
}

function throttle (func, wait) {
    let timerId
    let lastInvokeTime = 0

    function throttled (...args) {
        const lastThis = this
        const lastArgs = args

        if (!timerId) {
            timerId = setTimeout(function () {
                timerId = null
                func.apply(lastThis, lastArgs)
            }, wait)
        }
    }

    return throttled
}

wrapperDom.onmousemove = throttle(doEvent, 1500)
```
运行效果图如下：

![throttle1](../../assets/js_subject/throttle1.gif)

从效果图可以看出，鼠标首次触发事件是在 1.5s 后，就是说它不是立即触发事件的，而且在鼠标移出区域 1.5s 后，即结束后执行了一次事件。

我现在想让它首次执行事件该如何修改代码呢？见下方实现：
```js
function throttle (func, wait) {
    let lastInvokeTime = 0
    
    function throttled (...args) {
        const lastThis = this
        const lastArgs = args
        const time = Date.now()

        if (time - lastInvokeTime > wait) {
            func.apply(lastThis, lastArgs)
            lastInvokeTime = time
        }
    }

    return throttled
}
```
运行效果图如下：

![throttle2](../../assets/js_subject/throttle2.gif)

从该效果图可以看出，它与上面介绍的有两点不同：1、首次执行事件；2、结束后没有执行事件。

## 优化

现在将上面两种效果结合，且外部可以通过传递参数控制首次或结束是否执行事件。我们定下规则：

1. leading: false 表示禁用在节流开始前执行。
2. trailing: false 表示禁用在节流结束后执行。

```js
function throttle (func, wait, options) {
    let timerId,
        lastThis,
        lastArgs,
        result

    let lastInvokeTime = 0
    let leading = true
    let trailing = true

    if (options) {
        leading = 'leading' in options ? !!options.leading : leading
        trailing = 'trailing' in options ? !!options.trailing : trailing
    }

    function throttled (...args) {
        const time = Date.now()

        lastThis = this
        lastArgs = args

        if (!lastInvokeTime && !leading) {
            lastInvokeTime = time
        }

        const remainingWait = wait - (time - lastInvokeTime)

        // 如果没有剩余的时间了或者你改了系统时间
        if (remainingWait <= 0 || remainingWait > wait) {
            if (timerId) {
                clearTimeout(timerId)
                timerId = null
            }

            lastInvokeTime = time
            result = func.apply(lastThis, lastArgs)

            if (!timerId) {
                lastThis = lastArgs = null
            }
        } else if (!timerId && trailing) {
            // leading 和 trailing 的值不允许同时为 false
            timerId = setTimeout(invokeFunc, remainingWait)
        }

        return result
    }

    function invokeFunc () {
        lastInvokeTime = leading ? 0 : Date.now()
        timerId = null
        result = func.apply(lastThis, lastArgs)

        if (!timerId) {
            lastThis = lastArgs = null
        }
    }

    // 取消
    function cancel () {
        lastInvokeTime = 0
        timerId = null
        clearTimeout(timeout)
    }

    throttled.cancel = cancel

    return throttled
}

wrapperDom.onmousemove = throttle(doEvent, 1500, {
    trailing: false
})
// wrapperDom.onmousemove = throttle(doEvent, 1500, {
//     leading: false
// })
```
运行效果图如下：

![throttle3](../../assets/js_subject/throttle3.gif)

## 结语

本文到这里就结束了，通过文章我们了解到什么是节流以及它的实现原理，使用节流函数可以解决项目中，懒加载要监听计算滚动条的位置，按一定时间的频率获取。

在前端面试中，节流函数还是一道高频考题，希望小伙伴们看完本文后能够顺利拿下。

## 参考文献

- [Lodash 源码](https://github.com/lodash/lodash/blob/master/throttle.js)
- [冴羽的博客](https://github.com/mqyqingfeng/Blog/issues/26)