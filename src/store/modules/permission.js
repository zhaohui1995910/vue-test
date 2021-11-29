import {asyncRoutes} from "@/router"


function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        // 默认是没有设置权限的
        return true
    }
}


export function filterAsyncRoutes(routes, roles) {
    const res = []
    routes.forEach(route => {
        const tmp = {...route}
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    })
    return res
}


const state = {
    routes: [],
    asyncRoutes: []
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.asyncRoutes = routes
        // state.routes =
    }
}

const actions = {
    generateRoutes({commit}, roles) {
        return new Promise(resolve => {
            let accessedRoutes
            console.log('generateRoutes0', roles)
            console.log('generateRoutes1', asyncRoutes)
            if (roles.includes('admin')) {
                accessedRoutes = asyncRoutes || []
            } else {
                accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
            }
            console.log('generateRoutes2', accessedRoutes)
            commit('SET_ROUTES', accessedRoutes)
            resolve(accessedRoutes)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}