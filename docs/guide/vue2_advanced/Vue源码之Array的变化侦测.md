# Vue 源码之 Array 的变化侦测

## 前言

这是 `Vue.js` 的源码分析，记录自己在学习源码时的心得和收获。

`Vue.js` 的源码目录结构如下：
```
src
├── compiler        # 编译相关 
├── core            # 核心代码 
├── platforms       # 不同平台的支持
├── server          # 服务端渲染
├── sfc             # .vue 文件解析
├── shared          # 共享代码
```

重点关注 `core` 文件夹下面的代码文件，因为这是 `Vue.js` 的核心代码。

## 拦截器

原因：例如对数组进行 push 操作，如何监听它的变化呢？因为在 ES6 之前并没有提供元编程能力，即不能对原型方法进行拦截，所以需要自定义方法去覆盖原生方法。

原理：每当使用 Array 原型上的方法操作数组，实际执行的是拦截器中提供的方法，然后在拦截器中使用原生的 Array 方法操作数组。

```js
// array.js
const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto) // arrayMethods 继承自 Array.prototype

;[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach(function (method) {
  const original = arrayProto[method]

  // 为 arrayMethods 封装数组的方法
  Object.defineProperty(arrayMethods, method, {
    enumerable: false,
    writable: true,
    configurable: true,
    value: function mutator(...args) {
      return original.apply(this, args) // 实际调用 Array.prototype 上的方法
    }
  })
})
```

## 拦截器覆盖 Array 原型

为了不污染全局的 Array，我们可以只覆盖那些响应式数组的数据。因此通过修改 Observer 类来覆盖响应数组 Array 原型的方法。
```js
import { arrayMethods } from './array.js'
import { def } from '../util/lang.js'
// ...省略其他引入

const hasProto = '__proto__' in {}
const arrayKeys = Object.getOwnPropertyNames(arrayMethods) // 数组方法名称列表

export class Observer {
  constructor(value) {
    this.value = value
    if (Array.isArray(value)) {
      // 兼容浏览器是否支持 __proto__ 属性
      if (hasProto) {
        protoAugment(value, arrayMethods)
      } else {
        copyAugment(value, arrayMethods, arrayKeys)
      }
    } else {
      this.walk(value)
    }
  }
  // ...省略代码
}

// 支持 __proto__ 属性
function protoAugment(target, src) {
  target.__proto__ = src
}

// 不支持 __proto__ 属性，直接遍历数组方法挂载到对象上
// 所以使用这些数组方法时，并不是调用 Array.prototype 上的方法，而是挂载到对象上的方法，即拦截器的方法
function copyAugment(target, src, keys) {
  for (let i = 0, len = keys.length; i < len; i++) {
    const key = keys[i]
    def(target, key, src[key])
  }
}
```
```js
// util/lang.js

// 定义属性
export function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}
```

## 如何收集依赖

Array 在 getter 中收集依赖，依赖被存储到 Dep 里。

举个例子：
```js
{
  list: [1, 2, 3, 4, 5]
}

this.list
```

因为获取 list 中的数据要读取 list 这个属性，所以肯定会触发 list 中的 getter 函数。
```js
import { hasOwn, isObject } from '../shared/util.js'

// 举例 伪代码
// new Observer({
//   list: [1, 2, 3, 4, 5]
// })

export class Observer {
  constructor(value) {
    this.value = value
    this.dep = new Dep() // Observer 实例需要调用 Dep 的收集和通知依赖方法
    def(value, '__ob__', this) // this 指向 Observer 实例

    if (Array.isArray(value)) {
      if (hasProto) {
        protoAugment(value, arrayMethods)
      } else {
        copyAugment(value, arrayMethods, arrayKeys)
      }
    } else {
      this.walk(value)
    }
  }

  // ...省略代码
}

/**
 * 为 value 创建一个 Observer 实例
 * 如果创建成功，直接返回创建的 Observer 实例
 * 如果 value 已经存在一个 Observer 实例，则直接返回它
*/
export function observe(value, asRootData) {
  if (!isObject(value)) {
    return
  }

  let ob

  // __ob__ 标记 value 是否被 Observer 转换为响应式数据
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else {
    ob = new Observer(value) // 将 value 转为响应式数据
  }
  return ob // Observer 实例
}

function defineReactive(data, key, val) {
  // if (typeof val === 'object') {
  //   new Observer(val)
  // }
  let childOb = observe(val) // childOb 是 Observer 实例
  let dep = new Dep()
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      dep.depend()

      if (childOb) {
        childOb.dep.depend() // 调用 Observer 实例 dep 属性方法收集依赖
      }
      return val
    },
    set: function (newVal) {
      if (val === newVal) {
        return
      }
      val = newVal
      dep.notify()
    },
  })
}
```
```js
;[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach(function (method) {
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator(...args) {
    const result = original.apply(this, args)
    const ob = this.__ob__ // this 指向调用该拦截器方法的对象，即 value（数组）
    ob.dep.notify() // 通知依赖
    return result
  })
})

// 假设 value 是数组类型且定义了 __ob__ 属性。
// 当 value.push(1) 执行时，实际是调用了拦截器的 push 方法，所以 push 方法里的 this 此时指向 value，所以 this.__ob__ 可以访问 Observer 实例。
```
```js
// shared/util.js

// 快速检测对象
export function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

// 检测对象是否有某属性
const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key)
}
```

## 侦测数组中元素的变化

直接上代码：
```js
export class Observer {
  constructor(value) {
    this.value = value
    this.dep = new Dep()
    def(value, '__ob__', this)

    if (Array.isArray(value)) {
      if (hasProto) {
        protoAugment(value, arrayMethods)
      } else {
        copyAugment(value, arrayMethods, arrayKeys)
      }
      this.observeArray(value) // 将数组的每一项转成响应式数据
    } else {
      this.walk(value)
    }
  }

  // 侦测 Array 中的每一项
  observeArray(items) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }

  // ...省略其他代码
}
```

## 侦测新增元素的变化

直接上代码：
```js
;[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach(function(method) {
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator(...args) {
    const result = original.apply(this, args)
    const ob = this.__ob__

    let inserted
    switch (method) {
      case 'path':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) {
      ob.observeArray(inserted)
    }

    ob.dep.notify()
    return result
  })
})
```

数组新增元素的方法有 `push`，`unshift` 和 `splice`，将它们的参数传入 `observeArray` 方法转换成响应式数据。

## 结语

`Array` 追踪变化的方式是通过拦截器覆盖数组原型方法，具体是使用 `__proto__` 属性来覆盖原型方法，目的是不污染全局的 `Array.prototype`，但是 `__proto__` 这个属性并不是所有浏览器都支持，因此为了兼容部分浏览器，直接将拦截器的方法设置到数组本身。

`Array` 收集依赖也是通过 `getter` 函数进行的，在 `Observer` 中对每个被侦测的对象做了标记 `__ob__`，且它值指向当前的 `Observer` 实例，因此后面通过 `__ob__` 属性获取实例上的方法（保存的依赖和通知依赖）。数组中的子元素通过 `observerArray` 方法把每一个元素都转换成响应式数据。

用户通过新增数组元素的方法添加的元素也需要被侦测，判断数组方法是 `push`，`unshift` 和 `splice`，就调用 `observerArray` 方法将元素转成响应式数据。

## 参考文献

- 《深入浅出 Vue.js》刘博文·著
- [learnVue](https://github.com/answershuto/learnVue)