# 011-手写 reduce 实现 map 函数

## 实现
```js
Array.prototype.myMap = function(fn, thisArg) {
  const res = []
  const that = thisArg || null
  this.reduce((prev, curr, index, array) => {
    res.push(fn.call(that, curr, index, array))
  }, null)

  return res
}
```