# Vue 源码之虚拟 DOM

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

## VNode

### VNode 是什么

VNode 可以理解成节点描述对象，它描述了应该怎样去创建真实的 DOM，即 JavaScript 对象版本的 DOM 元素。

VNode 创建 DOM 并插入视图。
```
vnode (创建) => DOM (渲染) => 视图
```

### VNode 的作用

最重要的的一个作用是 VNode 更新前后的对比，这样只更新差异的节点，减少性能浪费。

### VNode 的类型

- 注释节点
- 文本节点
- 元素节点
- 组件节点
- 函数式节点
- 克隆节点

## patch

### 介绍

patch 是在现有 DOM 上进行修改来达到渲染视图的目的。对现有 DOM 进行修改需要做三件事：
- 创建新增的节点
- 删除已经废弃的节点
- 修改需要更新的节点

### 新增节点

以下这几种情况需要新增节点
- 首次渲染页面，oldVNode 不存在，所以需要使用 vnode 来渲染 DOM
- vnode 和 oldVNode 不是同一个节点，即vnode 是新节点而 oldVNode 是废弃节点

元素节点、注释节点和文本节点。整个流程如下：

![vnode1](../../assets/vue_js/vnode_1.png)

### 删除节点

以 vnode 为标准，vnode 没有的节点都属于废弃的节点，应该在 DOM 中删除。

```js
// 删除一组节点
function removeVnodes(vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
        const ch = vnodes[startIdx]
        if (ifDef(ch)) {
            removeNode(ch.elm)
        }
    }
}

// 删除单个节点
const nodeOps = {
    removeChild(node, child) {
        node.removeChild(child)
    }
}

function removeNode(el) {
    const parent = nodeOps.parentNode(el)
    if (isDef(parent)) {
        nodeOps.removeChild(parent, el)
    }
}
```

### 更新节点

vnode 和 oldVNode 是相同节点，对它们进行更细致的比对，替换差异化的值。

所以整个 patch 运行流程是这样的，首先检测 oldVNode 是否存在，如果不存在，就使用 vnode 创建节点并插入视图。否则进入下一步判断，oldVNode 和 vnode 是否是同一个节点，如果是，就使用 patchVnode 进行更详细的比对与更新操作。否则使用 vnode 创建真实节点并插入到视图中旧节点的旁边，最后将视图中的旧节点删除。

更新节点的逻辑流程如下：

![vnode2](../../assets/vue_js/vnode_2.png)

更新节点的具体实现过程如下：

![vnode3](../../assets/vue_js/vnode_3.png)

### 更新子节点

#### 更新策略

1. 创建子节点

新创建的虚拟节点和旧的虚拟节点通过循环比对，将新增的子节点插入到视图 DOM 中未处理节点前面。
```
A：已处理
B：未处理
C：新节点
index：数组下标

视图 DOM: [A, A, B, B]
新创建的虚拟节点：[A, A, C]
旧的虚拟节点：[A, A, B, B]

按照逻辑，新创建的虚拟节点 C，应该在视图 DOM 的数组下标 index = 2 前面插入。
```

2. 更新子节点

新虚拟节点和旧虚拟节点两个节点是同一个节点且位置相同，只需要更新节点的操作即可。

3. 移动子节点

移动节点通常发生在新虚拟节点中的某个节点和旧虚拟节点中的某个节点是同一个节点，但是位置不同，所以在真实的 DOM 中需要将这个节点的位置以新虚拟节点的位置为基准进行移动。

4. 删除子节点

当新虚拟节点中的所有节点都被循环了一遍后，也就是循环结束后，如果旧虚拟节点中还有剩余的没有被处理的节点，那么这些节点就该废弃，需要删除的节点。

### 优化策略

使用下面四种方式快速查找节点。

- 新前与旧前
- 新后与旧后
- 新后与旧前
- 新前与旧后

新前：newChildren 中所有未处理的第一个节点；

新后：newChildren 中所有未处理的最后一个节点；

旧前：oldChildren 中所有未处理的第一个节点；

旧后：oldChildren 中所有未处理的最后一个节点；

## 参考文献

- 《深入浅出 Vue.js》刘博文·著
- [learnVue](https://github.com/answershuto/learnVue)