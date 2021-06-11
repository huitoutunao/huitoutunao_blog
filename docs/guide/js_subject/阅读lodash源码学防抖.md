# 阅读 lodash 源码学防抖

## 前言

在介绍防抖之前，我们先看下面这个例子：频繁按下键盘 `A` 键触发数字累加事件。
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

document.onkeydown = function (e) {
    if (e.keyCode === 65) {
        wrapperDom.innerHTML = count++
    }
}
```
效果图如下：
![debounce1](../../assets/js_subject/debounce.gif)

从效果图可以看出，浏览器处理数字累加还是蛮流畅的，因为这个例子是我人工按键触发，我平均 1s 按键一次，事件函数也比较简单。假设有个人工智能可以 1s 触发 1000 次按键事件，且事件是发送 ajax 请求，那么浏览器处理时就会出现卡顿。

## 介绍

防抖指的是触发事件后，在 `n` 秒内函数只能执行一次，如果触发事件后在 `n` 秒内又触发了事件，则会重新计算函数，延长执行时间。


## 实现

## 应用

## 结语

