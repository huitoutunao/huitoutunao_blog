# 010-手写 reduce 函数

## 定义

> `reduce()` 方法对数组中的每个元素按序执行一个由您提供的 reducer 函数，每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。

第一次执行回调函数时，不存在「上一次的计算结果」。如果需要回调函数从数组索引为 0 的元素开始执行，则需要传递初始值。否则，数组索引为 0 的元素将被作为初始值 initialValue，迭代器将从第二个元素开始执行（索引为 1 而不是 0）。

语法如下：
```js
reduce(function(previousValue, currentValue, currentIndex, array) { /* ... */ }, initialValue)
```

+ `previousValue`：上次 callbackFn 返回的值。若指定了初始值 initialValue，其值则为 initialValue。
+ `currentValue`：数组中正在处理的元素。
+ `currentIndex`：数组中正在处理的元素的索引。
+ `array`：用于遍历的数组。
+ `initialValue`：作为第一次调用 callback 函数时参数 previousValue 的值。若指定了初始值 initialValue，则 currentValue 则将使用数组第一个元素；否则 previousValue 将使用数组第一个元素，而 currentValue 将使用数组第二个元素。

## 实现
```js
Array.prototype.myReduce = function(fn, initVal) {}
```