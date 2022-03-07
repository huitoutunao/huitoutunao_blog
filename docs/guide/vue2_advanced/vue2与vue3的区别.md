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

`setup` 生命周期钩子需要从导入才能使用，例如：
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

## 参考文献

- [Vue3 对比 Vue2.x 差异性、注意点、整体梳理，与React hook比又如何？](https://juejin.cn/post/6892295955844956167)
- [vue2与vue3的区别](http://www.huhaowb.com/2021/08/19/vue2%E4%B8%8Evue3%E7%9A%84%E5%8C%BA%E5%88%AB/)