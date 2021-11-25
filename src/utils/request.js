import axios from 'axios'
import store from '@/store'
import {getToken} from '@/utils/auth'
import {Message} from "element-ui"

console.log('VUE_APP_BASE_API', process.env.VUE_APP_BASE_API)
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 60000
})

// 配置请求拦截器
service.interceptors.request.use(
    config => {
        // do something before request is sent
        if (store.getters.token) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers['X-Token'] = 'Bearer ' + getToken()
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// 配置响应拦截器
service.interceptors.response.use(
    response => {
        const data = response.data

        if (data.code !== 200) {
            // 开发环境下,输入ajax请求失败错误message
            if (process.env.ENV === 'development') {
                Message({
                    message: data.error || 'ERROR',
                    type: "error",
                    duration: 5 * 1000
                })
            }
            return Promise.reject(new Error(data.error || 'Error'))
        } else {
            return data
        }
    },
    error => {
        Message({
            message: error.message,
            type: "error",
            duration: 5 * 1000
        })
        return new Promise.reject(error)
    }
)

export default service