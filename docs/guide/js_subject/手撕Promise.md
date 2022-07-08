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

## 三种状态实现

+ 进行中 pending
+ 已成功 fulfilled
+ 已失败 rejected

> 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise 对象的状态改变，只有两种可能：从pending 变为 fulfilled 和从 pending 变为 rejected。

```js
class MyPromise {
  constructor(fn) {
    this.status = 'pending'
    this.success = ''
    this.error = ''

    const resolve = (res) => {
      if (this.status === 'pending') {
        this.success = res
        this.status = 'success'
      }
    }

    const reject = (err) => {
      if (this.status === 'pending') {
        this.error = err
        this.status = 'error'
      }
    }

    fn(resolve, reject)
  }
}
```

### pending
```js
const mp = new MyPromise(() => {
  // 不进行 resolve 和 reject
})
console.log(mp)
// => 结果
// {
//   "status": "pending",
//   "success": "",
//   "error": ""
// }
```

### fulfilled
```js
const mp = new MyPromise((resolve) => {
  resolve('我是成功')
})
console.log(mp)
// => 结果
// {
//   "status": "success",
//   "success": "我是成功",
//   "error": ""
// }
```

### rejected
```js
const mp = new MyPromise((resolve, reject) => {
  reject('我是失败')
})
console.log(mp)
// => 结果
// {
//   "status": "error",
//   "success": "",
//   "error": "我是失败"
// }
```

## 参考资料

[ES6 中文文档](https://es6.ruanyifeng.com/#docs/promise)
[手撕 Promise](https://juejin.cn/post/6845166891061739528)