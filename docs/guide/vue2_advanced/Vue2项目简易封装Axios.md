# Vue2 项目简易封装 Axios

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

## 通用
```js
// utils/axios.js

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
            instance.get(url, {
                params
            }).then(res => {
                return resolve(res)
            }).catch(err =>{
                return reject(err)
        })
    })
}
```
```js
// utils/index.js

export * from './axios.js'
```
```js
// api/sendMsg.js

import { get, post } from '../utils/index.js'

export const apiSendMsg = data => post('api/v1/sendMsg', data)
```
```js
// api/index.js

export * from './sendMsg.js'
```

## 特殊

例如，token 过期了自动获取最新的，让用户无感知。
```js
// utils/axios.js

import axios from 'axios'
import QS from 'qs'
import md5 from './md5' // md5 加密，参考：https://github.com/blueimp/JavaScript-MD5
import secret from './crypto'

const BASE_URL = process.env.NODE_ENV === 'development'
    ? 'https://www.kaifa_dev.com'
    : 'https://www.shengchan_prod.com'

const TOKEN_URL = process.env.NODE_ENV === 'development'
    ? 'https://www.kaifa_token_dev.com'
    : 'https://www.shengchan_token_prod.com'

// 获取 token
function fetchToken() {
    const instance = axios.create({
        baseURL: TOKEN_URL,
        transformRequest: [
            (data) => {
                let v = data
                v = QS.stringify(v)
                return v
            },
        ],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        timeout: 15000,
    })

    return instance
        .post('/auth/getTokenExample', {
            appName: 'example',
            appKey: 'example',
        })
        .then((res) => {
            if (res.data.result === 'success') {
                localStorage.setItem('token', res.data.data)
                return Promise.resolve(res.data.data)
            }
            return Promise.reject(res)
        })
        .catch((err) => {
            return Promise.reject(err)
        })
}

// 创建通用 axios 实例
function createBaseInstance() {
    // 创建实例
    const instance = axios.create({
        baseURL: BASE_URL,
        transformRequest: [
            (data) => {
                let v = data
                v = QS.stringify(v)
                return v
            },
        ],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        timeout: 15000,
    })

    // 请求拦截器
    const handleRequest = function(config) {
        const cfg = config
        const token = localStorage.getItem('token') || ''

        cfg.data = {
            token,
            jsonData: secret.encrypt(config.data.jsonData),
            sign: md5(`jsonData=${config.data.jsonData}&example=123456`), // example 与后端约定
        }
        return cfg
    }

    // 响应拦截器
    const handleResponse = async function(response) {
        const responseData = response
        if (responseData.data.result === 'success') {
            return Promise.resolve(responseData.data)
        }

        if (responseData.data.errorCode === 1000) {
            // 重新获取 token，然后再请求上一个接口
            const tokenRes = await fetchToken()
            const configData = QS.parse(responseData.config.data)
            configData.token = tokenRes
            configData.jsonData = secret.decrypt(configData.jsonData)
            responseData.config.data = configData
            return instance.request(responseData.config)
        }

        return Promise.reject(responseData)
    }

    // 处理异常
    const handleError = function(error) {
        if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
            return Promise.reject(new Error('加载超时'))
        }
        return Promise.reject(error)
    }

    instance.interceptors.request.use(handleRequest, handleError)
    instance.interceptors.response.use(handleResponse, handleError)

    return instance
}

const request = createBaseInstance()

export default request
```
```js
// utils/index.js

import request from './axios.js'

export { request }
```
```js
// api/sendMsg.js

import { request } from '@/utils'

export const apiSendMsg = data => request.post('api/v1/sendMsg', data)
```
```js
// api/index.js

export * from './sendMsg.js'
```
```js
// crypto.js 参考：https://github.com/brix/crypto-js

import CryptoJS from 'crypto-js'

const key = CryptoJS.enc.Utf8.parse('example') // 与后端约定
const iv = CryptoJS.enc.Utf8.parse('example') // 与后端约定

export default {
    // 加密 TripleDES
    encrypt(word) {
        let ciphertext = ''
        ciphertext = CryptoJS.TripleDES.encrypt(word, key, {
            iv,
            mode: CryptoJS.mode.ECB, // ECB 模式
            padding: CryptoJS.pad.Pkcs7, // padding 处理
        })
        return ciphertext.toString()
    },

    // 解密
    decrypt(word) {
        let ciphertext = ''
            ciphertext = CryptoJS.TripleDES.decrypt(word, key, {
            iv,
            mode: CryptoJS.mode.ECB, // ECB 模式
            padding: CryptoJS.pad.Pkcs7, // padding 处理
        })

        // 解析数据后转为 UTF-8
        return ciphertext.toString(CryptoJS.enc.Utf8)
    },
}
```

## 结语

以上对 axios 封装仅提供思路，请求前或响应后具体如何处理，还需要根据自己业务需求和后端返回的状态数据来定。

本文到这里就结束了，希望这篇文章对你有所帮助。