import request from '@/utils/request'

export function login(data) {
    return request({
        url:"/user/login",
        method: 'POST',
        data
    })
}

export function verify_toekn(data) {
    return request({
        url:"/user/verify_toekn",
        method: 'POST',
        data
    })
}

export function getInfo() {
    return request({
        url: "/user/info",
        method: 'GET',
    })
}