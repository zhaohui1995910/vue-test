import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/layout'

Vue.use(VueRouter)


export default new VueRouter({
    routes: [
        {
            path: '/',
            component: Layout,
            meta: {title: '首页'}
        },
        {
            path: '/login',
            component: Login,
            name: 'Login',
            meta: {title: '登录'}
        },
    ]
})

export const asyncRoutes = [
    {
        path: '/test1',
        component: Login,
        name: 'Test',
        meta: {
            title: '测试1',
            roles: ['spider'],
            icon: 'el-icon-menu',
        },
        children: [
            {
                path: 't1',
                name: 'T1',
                component: Login,
                meta: {
                    title: 'T111',
                    roles: ['spider']
                }
            }
        ]
    },
    {
        path: '/test2',
        component: Login,
        name: 'Test',
        meta: {
            title: '测试2',
            roles: ['spider'],
            icon: 'el-icon-menu',
        },
    },
    {
        path: '/test3',
        component: Login,
        name: 'Test',
        meta: {
            title: '测试3',
            roles: ['spider'],
            icon: 'el-icon-menu',
        },
    },
]
