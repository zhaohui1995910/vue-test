import {verify_toekn} from "@/api/user"
import router from '@/router'
import {getToken, setToken} from '@/utils/auth'
import getPageTitle from "@/utils/index"
import {Message} from "element-ui"



router.beforeEach(async (to, from, next) => {
    // 这是标题
    document.title = getPageTitle(to.meta.title)

    // 如果有hastoken不能再访问登录页面
    const hasToken = getToken()

    if (hasToken) {
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