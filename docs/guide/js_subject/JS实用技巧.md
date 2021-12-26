# JS 实用技巧

## 前言

Javascript 可以做许多神奇的事情，也有很多东西需要学习，下面是收集日常开发中常用的代码片段。

## 保留指定的小数位

```js
const toFixed = (n, fixed) => ~~(Math.pow(10, fixed) * n) / Math.pow(10, fixed);

// Examples
toFixed(99.198726354, 1) // 99.1
toFixed(99.198726354, 2) // 99.19
toFixed(99.198726354, 3) // 99.198
toFixed(99.198726354, 4) // 99.1987
toFixed(99.198726354, 5) // 99.19872
toFixed(99.198726354, 6) // 99.198726
```

## 反转字符串

```js
const reverse = str => str.split('').reverse().join('');

// Examples
reverse('hello world') // 'dlrow olleh'
```

## 判断当前用户是否是苹果设备

使用 `navigator.platform`
```js
const isAppleDevice = /Mac|iPod|iPhone|iPad/.test(navigator.platform)
console.log(isAppleDevice)
```

## 滚动至页面顶部

```js
const goToTop = () => window.scrollTo(0, 0)
goToTop()
```

## 转换华氏/摄氏

```js
const celsiusToFahrenheit = (celsius) => celsius * 9/5 + 32 // 摄氏温度转华氏温度
const fahrenheitToCelsius = (fahrenheit) => (fahrenheit - 32) * 5/9 // 华氏温度转摄氏温度
```

## 判断一个日期是否是工作日

```js
const isWeekday = (date) => date.getDay() % 6 !== 0
console.log(isWeekday(new Date(2021, 0, 11))) // true (周一)
console.log(isWeekday(new Date(2021, 0, 10))) // false (周日)
```

## 获取所有参数的平均值

`reduce()` 方法计算
```js
const average = (...args) => args.reduce((a, b) => a + b) / args.length
average(1, 2, 3, 4) // 2.5
```