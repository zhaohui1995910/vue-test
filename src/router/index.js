import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/layout'

Vue.use(VueRouter)


export default new VueRouter({
    routes: [
        {path: '/', component: Login},
        {path: '/login', component: Login, name: 'Login'},
        {path: '/Layout', component: Layout, name: 'Layout'},
    ]
})

