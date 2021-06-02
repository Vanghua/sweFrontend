import { constantRoutes } from '../../router/config'

export default {
    state: {
        routers: constantRoutes,
        addRoutes: []
    },
    mutations: {
        permissionClear(state) {
            state.routers = constantRoutes
            state.addRoutes = []
        },
        setAddRoutes(state, addRoutes) {
            // 将异步路由加入恒定路由中，这是当前的路由
            state.routers.push(...addRoutes)
            // 更新增加的路由
            state.addRoutes = addRoutes
        }
    }
}