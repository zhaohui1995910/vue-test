import {verify_toekn} from "@/api/user"
import router from '@/router'
import store from "@/store"
import {getToken, setToken} from '@/utils/auth'
import getPageTitle from "@/utils/index"
import {Message} from "element-ui"



router.beforeEach(async (to, from, next) => {
    // 这是标题
    document.title = getPageTitle(to.meta.title)

    // 如果有hastoken不能再访问登录页面
    const hasToken = getToken()
    console.log('token1', hasToken)
    if (hasToken && hasToken !== 'null') {
        console.log('token2', hasToken)
        // 当刷新页面需要重新挂载路由
        if (store.getters.routes.length===0) {
            // 需要重新挂载动态路由
            console.log('角色', store.getters.roles)
            const { roles } = await store.dispatch('user/getInfo')
            const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
            router.addRoutes(accessRoutes)
            console.log('角色', store.getters.routes)
            next({...to, replace: true})
        }
        // 校验tokne是否有效
        verify_toekn({token: hasToken}).then(
            response => {
                const {message} = response
                if (message.result) {
                    console.log('token有效')
                    if (to.path !== '/login') {
                        next()
                    } else {
                        next(from)
                    }
                } else {
                    console.log('token失效')
                    setToken(null)
                    next('/login')
                }
            }
        ).catch(
            error => {
                Message.error(error)
                console.log('发送验证token的请求失败')
                setToken(null)
                // next('/login')
            }
        )
    } else {
        if (to.path === '/login') {
            next()
        } else (
            next('/login')
        )
    }
})

router.afterEach(() => {
    console.log('进入afterEach')
})