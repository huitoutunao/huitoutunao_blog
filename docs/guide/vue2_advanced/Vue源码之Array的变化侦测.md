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
    value: function mutator (...args) {
      return original.apply(this, args) // 实际调用 Array.prototype 上的方法
    }
  })
})
```


## 参考文献

- 《深入浅出 Vue.js》刘博文·著
- [learnVue](https://github.com/answershuto/learnVue)