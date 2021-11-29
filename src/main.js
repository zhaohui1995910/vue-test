import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import '@/utils/route-guards'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUi)


new Vue({
    // 全局事件总线
    beforeCreate() {
        Vue.prototype.$bus = this
    },
    store,
    router,
    render: h => h(App),
}).$mount('#app')

