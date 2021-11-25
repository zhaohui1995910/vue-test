import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/layout'

Vue.use(VueRouter)


export default new VueRouter({
    routes: [
        {path: '/', component: Layout},
        {path: '/login', component: Login, name: 'Login'},
    ]
})

