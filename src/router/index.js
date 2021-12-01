import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/layout'

Vue.use(VueRouter)


export const constantRoutes = [
    {
        path: '/',
        name: 'Layout',
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
        // hidden: true, // 不在侧边栏显示
        meta: {
            title: '测试1',
            roles: ['spider'],
            icon: 'el-icon-menu',
        },
        children: [
            {
                path: 't1',
                name: 'test1',
                component: () => import('@/views/test1'),
                meta: {
                    title: 'T111',
                    roles: ['spider'],
                    cache: true
                }
            },
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
        children: [
            {
                path: 't2',
                name: 'test2',
                component: () => import('@/views/test2'),
                meta: {
                    title: 'T222',
                    roles: ['spider']
                }
            }
        ]
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