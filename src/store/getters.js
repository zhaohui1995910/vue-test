const getters = {
    token: state => state.user.token,
    roles: state => state.user.roles,
    name: state => state.user.name,
    avatar: state => state.user.avatar,
    introduction: state => state.user.introduction,
    asyncRoutes: state => state.permission.asyncRoutes,
}
export default getters
