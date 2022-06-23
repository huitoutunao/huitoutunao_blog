# 009-手写 filter 函数

## filter 定义

> `filter()` 方法创建一个新数组，其包含通过所提供函数实现的测试的所有元素。

> 返回值：一个新的、由通过测试的元素组成的数组，如果没有任何数组元素通过测试，则返回空数组。

语法如下：
```js
var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])
```

注意：
+ 不对空数组进行检测
+ 不改变原始数组

## 实现
```js
Array.prototype.filter = function(fn, thisArg) {
  let that
  const result = []

  if (typeof fn !== 'function') {
    throw new Error('参数必须是函数')
  }

  const arr = this
  if (!Array.isArray(arr)) {
    throw new Error('只能数组使用 filter 方法')
  }

  if (arguments.length > 1) {
    that = thisArg
  }

  for (let i = 0; i < arr.length; i++) {
    const res = fn.call(that, arr[i], i, arr)
    if (res) {
      result.push(arr[i])
    }
  }

  return result
}
```