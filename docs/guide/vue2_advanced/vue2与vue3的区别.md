# vue2 与 vue3 的区别

## 前言

`vue3` 发布也有一年多时间了，最近跟着官网学习了 `vue3` 的相关语法，因此来整理 `vue2` 与 `vue3` 的区别。

根据官方介绍，`vue3` 主要变化在以下几个方面：

- 更强的性能以及更好的 `tree shaking`；
- 新增 `Composition API` 和 `setup`；
- 更好的支持 `TypeScript`；

## 生命周期

1. 实例销毁钩子函数名称区别如下：

vue2：beforeDestroy 和 destroyed。

vue3：beforeUnmount 和 unmounted。

2. vue3 新增组合式 API：

`setup()` 作为组件内部使用组合式 API 的入口点。

在创建组件实例时，在初始 `prop` 解析之后立即调用 `setup`。在生命周期方面，它是在 `beforeCreate` 钩子之前调用的。

`setup` 生命周期钩子需要导入才能使用，例如：
```js
import { onMounted, onUpdated, onUnmounted } from 'vue'

const MyComponent = {
  setup() {
    onMounted(() => {
      console.log('mounted!')
    })
    onUpdated(() => {
      console.log('updated!')
    })
    onUnmounted(() => {
      console.log('unmounted!')
    })
  }
}
```

组合式 API 生命周期钩子和选项式 API 生命周期钩子的映射关系如下：
```
beforeCreate => 使用 setup()
created => 使用 setup()
beforeMount => onBeforeMount
mounted => onMounted
beforeUpdate => onBeforeUpdate
updated => onUpdated
beforeUnmount => onBeforeUnmount
unmounted => onUnmounted
activated => onActivated
deactivated => onDeactivated
errorCaptured => onErrorCaptured
renderTracked => onRenderTracked
renderTriggered => onRenderTriggered
```

## 响应式原理

vue3 使用 `Proxy` 代替了 `Object.defineProperty()`。因为 vue2 使用它导致无法深层跟踪数组对象的变化，如果在定义对象后添加了属性，是不会触发更新渲染的。

它们两者兼容性比较：

- vue2 不兼容 IE8 以下浏览器，因为 `Object.defineProperty()` 语法。
- vue3 不兼容 IE11 浏览器，因为 `Proxy` 语法。

## TypeScript 支持

vue3 内部全面使用 typescript 重构，使它有出色的 typescript 支持。对于规模较大的项目，降低了后期维护成本。

## 打包体积优化

vue2 有时会把不必要的依赖打包进去，随着项目不断扩大，后期打包的体积会越来越大。

vue3 优化了这个缺陷，引用尤大大的话语：

> 在 Vue3 中，我们通过将大多数全局 API 和内部帮助程序移动到 Javascript 的 `module.exports` 属性上实现这一点。这允许现代模式下的 module bundler 能够静态地分析模块依赖关系，并删除与未使用的 `module.exports` 属性相关的代码。模板编译器还生成了对 tree shaking 友好的代码，只有在模板中实际使用某个特性时，该代码才导入该特性的帮助程序。

> 尽管增加了许多新特性，但 Vue3 被压缩后的基线大小约为 10KB，不到 Vue2 的一半。

## 其他细节

[详情请看 vue2 的迁移指南](https://v3.cn.vuejs.org/guide/migration/introduction.html)

## 参考文献

- [Vue3 对比 Vue2.x 差异性、注意点、整体梳理，与React hook比又如何？](https://juejin.cn/post/6892295955844956167)