# Vue 项目简易封装 Axios

## 前言

日常开发前后端分离项目时，经常会使用到 axios 这个 HTTP 库。下面对它进行简易封装做了归纳整理。

## 目录

目录结构，我一般是这么安排的
```
|- src
|-- api
|--- index.js
|--- sendMsg.js
|-- utils
|--- index.js
|--- axios.js
```

## 代码

### 通用流程
```js
// axios.js

import axios from 'axios'
import QS from 'qs' // 引入 qs 模块，用来序列化 post 类型的数据

// 环境切换
const BASE_URL = process.env.NODE_ENV === 'development'
    ? 'https://www.kaifa_dev.com'
    : 'https://www.shengchan_prod.com'

// 设置默认的请求超时时间
axios.defaults.timeout = 15000

// 创建实例
const instance = axios.create({
    baseURL: BASE_URL,
    // transformRequest: [
    //     (data) => {
    //         let v = data
    //         v = QS.stringify(v)
    //         return v
    //     },
    // ],
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
})

// 请求拦截器
instance.interceptors.request.use(function(config) {
    // 每次发送请求时，需要判断是否存在 token（vuex、cookie、localStorage）
    // 如果存在，那么将它添加在 header 上携带给后端，后端可以根据 token 判断用户登录状态
    // 如果存储的 token 过期了，须要在响应拦截里面做处理
    const myToken = localStorage.getItem('myToken')
    if (token) {
        config.headers.Authorization = token
    } else {
        // 引导用户登录
    }
    return config
})

// 响应拦截器
instance.interceptors.response.use(function(response) {
    // 处理返回结果
    if (response.status === 200) {
        // 成功
        return Promise.resolve(response)
    } else {
        // 失败
        return Promise.reject(error)
    }
}, function(error) {
    // 处理异常
    return Promise.reject(error)
})

// 封装 post 请求
export function post(url, data) {
    return new Promise((resolve, reject) => {
        instance.post(url, QS.stringify(data))
            .then((res) => {
                return resolve(res)
            })
            .catch((err) => {
                return reject(err)
            })
    })
}

// 封装 get 请求
export function get(url, params) {
    return new Promise((resolve, reject) => {
            axios.get(url, {
                params
            }).then(res => {
                return resolve(res)
            }).catch(err =>{
                return reject(err)     
        })
    })
}
```