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

function doEvent () {
    wrapperDom.innerHTML = count++
}
wrapperDom.onmousemove = doEvent
```
效果图如下：
![debounce1](../../assets/js_subject/debounce.gif)

从效果图可以看出，浏览器处理数字累加还是蛮流畅的，因为这个例子的事件函数相对简单。假设 1s 触发 1000 次事件，且事件是发送 ajax 请求，那么浏览器处理时就会出现卡顿。

为了解决这类问题，通常使用防抖（debounce）和节流（throttle）的方案。

## 介绍

防抖指的是触发事件后，在 `n` 秒内函数只能执行一次，如果触发事件后在 `n` 秒内又触发了事件，则会重新计算函数，延长执行时间。

根据上面的介绍，我们现在可以简单实现下：
```js
function debounce (func, wait) {
    var timeout
    return function () {
        clearTimeout(timeout)
        timeout = setTimeout(func, wait)
    }
}

wrapperDom.onmousemove = debounce(doEvent, 1000)
```

效果图如下：
![debounce2](../../assets/js_subject/debounce2.gif)

现在不管你在 1s 内鼠标移动多少次，它都只在移动完 1s 后再触发事件。


## 实现

## 应用

## 结语

