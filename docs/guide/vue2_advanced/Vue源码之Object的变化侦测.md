# Vue 源码之 Object 的变化侦测

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
        get: function() {
            dep.depend()
            return val
        },
        set: function(newVal) {
            if (val === newVal) {
                return
            }
            val = newVal
            dep.notify()
        }
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
            subs[i].update()
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

## 参考文献

- 《深入浅出 Vue.js》刘博文·著
- [learnVue](https://github.com/answershuto/learnVue)