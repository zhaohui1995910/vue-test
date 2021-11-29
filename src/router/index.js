import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/layout'

Vue.use(VueRouter)


export const constantRoutes = [
    {
        path: '/',
        component: Layout,
        meta: {title: '首页'}
    },
    {
        path: '/test1',
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

export const asyncRoutes = [
    {
        path: '/test1',
        component: Layout,
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
                component: Layout,
                meta: {
                    title: 'T111',
                    roles: ['spider']
                }
            }
        ]
    },
    {
        path: '/test2',
        component: Layout,
        name: 'Test2',
        meta: {
            title: '测试2',
            roles: ['spider'],
            icon: 'el-icon-menu',
        },
    },
    {
        path: '/test3',
        component: Layout,
        name: 'Test3',
        meta: {
            title: '测试3',
            roles: ['spider'],
            icon: 'el-icon-menu',
        },
    },
]

const createRouter = () => new VueRouter({
    routes: constantRoutes
})
const router = createRouter()

export default router