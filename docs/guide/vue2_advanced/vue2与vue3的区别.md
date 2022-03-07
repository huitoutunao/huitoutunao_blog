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

## 参考文献

- [Vue3 对比 Vue2.x 差异性、注意点、整体梳理，与React hook比又如何？](https://juejin.cn/post/6892295955844956167)
- [浅析我们为什么要上Vue3？](https://juejin.cn/post/7046922345864232974)