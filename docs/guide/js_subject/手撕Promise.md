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

## Promise.prototype.then()

> 它的作用是为 Promise 实例添加状态改变时的回调函数。then 方法的第一个参数是 resolved 状态的回调函数，第二个参数是 rejected 状态的回调函数，它们都是可选的。

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

  then(handleFullfilled, handleRejected) {
    if (this.status === 'success') {
      handleFullfilled(this.success)
    }

    if (this.status === 'error') {
      handleRejected(this.error)
    }
  }
}

const mp = new MyPromise((resolve) => {
  resolve('我是成功')
})
mp.then((res) => {
  console.log('进入then的fulfilled,', res)
}, (err) => {
  console.log('进入then的rejected,', err)
})
// => 结果
// 进入then的fulfilled, 我是成功
```

## 异步实现

当 resolve 在 setTimeout 内执行，then 的 state 还是 pending 等待状态。我们就需要在 then 调用的时候，将成功和失败存到各自的数组，一旦 reject 或者 resolve，就调用它们。

```js
class MyPromise {
  constructor(fn) {
    this.status = 'pending'
    this.success = ''
    this.error = ''
    this.resolveQueue = []
    this.rejectQueue = []

    const resolve = (res) => {
      if (this.status === 'pending') {
        this.success = res
        this.status = 'success'
        this.resolveQueue.forEach((item) => item())
      }
    }

    const reject = (err) => {
      if (this.status === 'pending') {
        this.error = err
        this.status = 'error'
        this.rejectQueue.forEach((item) => item())
      }
    }

    fn(resolve, reject)
  }

  then(handleFullfilled, handleRejected) {
    if (this.status === 'success') {
      handleFullfilled(this.success)
    }

    if (this.status === 'error') {
      handleRejected(this.error)
    }

    if (this.status === 'pending') {
      this.resolveQueue.push(() => {
        handleFullfilled(this.success)
      })

      this.rejectQueue.push(() => {
        handleRejected(this.error)
      })
    }
  }
}

const mp = new MyPromise((resolve) => {
  setTimeout(() => resolve('我是成功'), 3000)
})
mp.then((res) => {
  console.log('进入then的fulfilled,', res)
})
// => 3s 后输出结果
// 进入then的fulfilled, 我是成功
```

## then 链式调用

原理：在第一个 then 中返回一个新的 Promise。

```js
class MyPromise {
  constructor(fn) {
    this.status = 'pending'
    this.success = ''
    this.error = ''
    this.resolveQueue = []
    this.rejectQueue = []

    const resolve = (res) => {
      if (this.status === 'pending') {
        this.success = res
        this.status = 'success'
        this.resolveQueue.forEach((item) => item())
      }
    }

    const reject = (err) => {
      if (this.status === 'pending') {
        this.error = err
        this.status = 'error'
        this.rejectQueue.forEach((item) => item())
      }
    }

    fn(resolve, reject)
  }

  then(handleFullfilled, handleRejected) {
    let promise2
    // promise2 = new Promise((resolve, reject) => {})
    if (this.status === 'success') {
      handleFullfilled(this.success)
    }

    if (this.status === 'error') {
      handleRejected(this.error)
    }

    if (this.status === 'pending') {
      this.resolveQueue.push(() => {
        handleFullfilled(this.success)
      })

      this.rejectQueue.push(() => {
        handleRejected(this.error)
      })
    }
  }
}
// 待补充...
```

## 参考资料

+ [ES6 中文文档](https://es6.ruanyifeng.com/#docs/promise)
+ [手撕 Promise](https://juejin.cn/post/6845166891061739528)