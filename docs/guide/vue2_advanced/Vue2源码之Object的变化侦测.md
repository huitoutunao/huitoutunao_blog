# Vue2 源码之 Object 的变化侦测

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

## Object.defineProperty

`Object.defineProperty()` 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象，语法如下：
```js
Object.defineProperty(obj, prop, descriptor)
```

`obj` 要定义属性的对象；`prop` 要定义或修改的属性的名称；`descriptor` 要定义或修改的属性描述符。`Vue.js` 之所以可以追踪到对象的变化，主要依靠属性描述符提供的 `get` 和 `set`。`get` 是一个给属性提供的 `getter` 函数，当访问该属性时，会调用此函数；`set` 是一个给属性提供的 `setter` 函数，当属性值被修改时，会调用此函数。

因此模仿 `Vue.js` 源码写个简单例子：
```js
function defineReactive(data, key, val) {
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            return val
        },
        set: function(newVal) {
            if (val === newVal) {
                return
            }
            val = newVal
        }
    })
}

let obj = {}
defineReactive(obj, 'name', 'huitoutunao')
console.log(obj.name) // huitoutunao
obj.name = 'jack'
console.log(obj.name) // jack
```

## 收集依赖

通过上面 `Object.defineProperty()` 方法提供的 `getter` 函数进行收集依赖，在 `setter` 函数进行通知依赖。

举个例子：
```html
<template>
    <h1>{{ title }}</h1>
</template>
```

该模板使用了数据 title，所以当 title 发生变化时，也需要通知使用它的地方更新。

### 依赖被收集到哪里

首先为了收集来自各个地方的引用，在定义每个 key 时就需要有一个数组来保存当前 key 的依赖。假设依赖是一个函数或者是上面提到的那个模板，且它保存在 `window.target` 上，现在可以把 defineReactive 函数改造如下：
```js
import Dep from './dep.js'

function defineReactive(data, key, val) {
  let dep = new Dep()
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      dep.depend()
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
// dep.js
export default class Dep {
  constructor() {
    this.subs = []
  }

  // 添加依赖
  addSub(sub) {
    this.subs.push(sub)
  }

  // 移除依赖
  removeSub(sub) {
    remove(this.subs, sub)
  }

  // 收集依赖
  depend() {
    if (window.target) {
      this.addSub(window.target)
    }
  }

  // 通知依赖
  notify() {
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update() // 触发依赖项定义的 update 函数，后面会补充
    }
  }
}

function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}
```

现在封装了 Dep 类来专门管理依赖，收集、删除或向依赖者发送通知等。

### Watcher

因为上面的依赖是直接添加进 Dep 中，依赖可能比较多且它类型还不一样，所以需要抽象出一个能集中处理这些情况的类，然后，收集依赖时只收集这个**类的实例**。

Watcher 充当一个中介角色，数据发生变化时通知它，它再去通知其他依赖。

举个例子：
```js
vm.$watch('a.b.c', function(newVal, oldVal) {
  // 做什么
})
```

当 `data.a.b.c` 属性发生变化时，触发第二个参数中的函数。即当 `data.a.b.c` 的值变化时，通知 Watcher。接着，Watcher 再执行参数中的回调函数。也说明 `$watch` 函数内部有使用到 Watcher 封装好的类的实例。

```js
// watcher.js
import { parsePath } from '../util/lang.js'

export default class Watcher {
  /*
    vm：当前组件实例
    expOrFn：表达式或函数
    cb：回调函数
  */
  constructor(vm, expOrFn, cb) {
    this.vm = vm
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn) // 解析简单路径，返回函数
    }
    this.cb = cb
    this.value = this.get() // 读取属性值
  }

  get() {
    // 前面说过依赖保存在 window.target 上，所以把当前的实例赋值给它
    // 当前实例，即当前的依赖调用 Watcher 类生成的实例
    window.target = this
    let value = this.getter.call(this.vm, this.vm) // 读取属性值，同时将依赖添加进 Dep 中
    window.target = undefined
    return value
  }

  update() {
    const oldValue = this.value
    this.value = this.get() // 获取更新后的值
    this.cb.call(this.vm, this.value, oldValue)
  }
}
```
```js
// lang.js
const bailRE = /[^\w.$]/ // 排除字符组 [0-9a-zA-Z_]
export function parsePath(path) {
  if (bailRE.test(path)) {
    return
  }

  const segments = path.split('.')
  return function(obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}
```

## 递归侦测所有 key

上面只能侦测对象的某一属性，现在是希望数据中的所有属性都能侦测到，所以要封装一个 Observer 类。
```js
export class Observer {
  constructor(value) {
    this.value = value
    if (!Array.isArray(value)) {
      this.walk(value) // 只有 Object 类型才调用 walk 方法
    }
  }

  // 将每一个属性转换成 getter/setter 的形式来侦测变化
  walk(obj) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]])
    }
  }
}

function defineReactive(data, key, val) {
  if (typeof val === 'object') {
    new Observer(val) // 递归对象的子属性
  }
  // ...省略代码
}

let tom = {
  name: 'tom'
  age: '24'
}
let obs = new Observer(tom) // tom 变成了响应式的 object
```

## 结语

通过 `Object.defineProperty` 将对象属性转换成 getter/setter 的形式来追踪变化。读取数据时触发 getter，修改数据时触发 setter。

在 getter 中收集依赖，在 setter 中通知依赖。创建 Dep 类来帮助我们收集依赖，删除依赖和通知依赖。

依赖就是 Watcher，它充当一个中介角色，数据发生变化时通知它，它再去通知其他依赖。

最后创建了 Observer 类将对象的所有属性都转换成响应式。

## 参考文献

- 《深入浅出 Vue.js》刘博文·著
- [learnVue](https://github.com/answershuto/learnVue)