import {login, getInfo} from '@/api/user'
import {setToken} from "@/utils/auth"

const state = {
    token: '',
    name: '',
    avatar: '',
    introduction: '',
    roles: []
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_INTRODUCTION: (state, introduction) => {
        state.introduction = introduction
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    }
}

const actions = {
    login({commit}, userInfo) {
        return new Promise((resolve, reject) => {
            login(userInfo).then(
                response => {
                    console.log('actions then', response)
                    const {message} = response
                    commit('SET_TOKEN', message.token)
                    setToken(message.token)
                    resolve()

                }
            ).catch(
                error => {
                    console.log('actions catch', error)
                    reject()
                }
            )
        })
    },
    getInfo({commit, state}) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(
                response => {
                    const {message} = response
                    const {roles, name, avatar, introduction} = message

                    commit('SET_ROLES', roles)
                    commit('SET_NAME', name)
                    commit('SET_AVATAR', avatar)
                    commit('SET_INTRODUCTION', introduction)
                    resolve(message)
                }
            ).catch(
                error => {
                    reject(error)
                }
            )
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
