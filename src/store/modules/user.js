import {login} from '@/api/user'
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
}

const actions = {
    login({commit}, userInfo) {
        return new Promise((resolve, reject) => {
            login(userInfo).then(response => {
                console.log('actions then', response)
                const {message} = response
                commit('SET_TOKEN', message.token)
                setToken(message.token)
                resolve()

            }).catch(error => {
                console.log('actions catch', error)
                reject()
            })
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
