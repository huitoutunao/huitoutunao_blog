# 手撕 Promise
## 基本结构

+ 构造函数里传入一个函数，它有两个参数（resolve, reject）
+ resolve 成功时执行回调
+ reject 失败时执行回调
  
```js
class MyPromise {
  constructor(fn) {
    const resolve = res => {}
    const reject = err => {}
    fn(resolve, reject)
  }
}

// 测试
const mp = new MyPromise((resolve, reject) => {
  console.log('我到这里了')
})
// 结果 => 我到这里了
```

## 参考资料

[ES6 中文文档](https://es6.ruanyifeng.com/#docs/promise)
[手撕 Promise](https://juejin.cn/post/6845166891061739528)