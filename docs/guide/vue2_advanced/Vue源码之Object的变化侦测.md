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

因此模仿 `Vue` 源码写个简单例子：
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

## 参考文献

- 书籍《深入浅出 Vue.js》
- [learnVue](https://github.com/answershuto/learnVue)