# JS 实用技巧

## 前言

Javascript 可以做许多神奇的事情，也有很多东西需要学习，下面是收集日常开发中常用的代码片段。

## 保留指定的小数位

```js
const toFixed = (n, fixed) => ~~(Math.pow(10, fixed) * n) / Math.pow(10, fixed)

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
const reverse = str => str.split('').reverse().join('')

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

## 关于拼接字符串

不要忘记了 `${}` 里面可以写任意 JavaScript 表达式，运算和引用对象属性。
```js
const name = 'huitoutunao'
const score = 59
return `${name}${score > 60 ? '合格' : '不合格'}`
```

## 关于添加对象属性

```js
let obj = {}
let index = 1
obj[`topic${index}`] = '话题内容'
```

## 关于输入框非空的判断

```js
if (value !== null && value !== undefined && value !== '') {
    //...
}
```

优化

```js
if ((value??'') !== '') {
  //...
}
```

## 精确小数

```js
const RoundNum = (num, decimal) => Math.round(num * 10 ** decimal) / 10 ** decimal
const num1 = RoundNum(9.59, 1)
const num2 = RoundNum(9.594, 1)
// num1 => 9.6
// num2 => 9.59
```

## 判断奇偶数

```js
const OddEven = num => !!(num & 1) ? 'odd' : 'even'
const num = OddEven(2)
// num => "even"
```

## 补零

```js
const FillZero = (num, len) => num.toString().padStart(len, '0')
const num = FillZero(119, 4)
// num => 0119
```

## 转数值

只对 `null、""、false、数值字符串` 有效
```js
const num1 = +null
const num2 = +''
const num3 = +false
const num4 = +'119'
// num1 num2 num3 num4 => 0 0 0 119
```

## 生成范围内的随机数

```js
const RandomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const num = RandomNum(1, 10)
```

## 参考文献

- [你会用ES6，那倒是用啊](https://juejin.cn/post/7016520448204603423)
- [死磕 36 个 JS 手写题（搞懂后，提升真的大）](https://juejin.cn/post/6946022649768181774)
- [灵活运用JS开发技巧](https://juejin.cn/post/6844903838449664013)
- [编写自己的代码库（javascript常用实例的实现与封装）](https://juejin.cn/post/6844903520596918280)