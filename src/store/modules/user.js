import {asyncRoutes} from "@/router/config";
import fetchAPI from "@/utils/fetchAPI";

// 使用递归进行权限管理，考虑到路由对象可能有多级子路由
function routesSelect(routes,role) {
    var currentValue
    var addUserRouters = []
    // 遍历异步路由的每个子路由
    for(var i = 0; i < routes.length; i++) {
        currentValue = routes[i]
        // 筛选出该路由可以访问的子路由
        if(currentValue.children && currentValue.children.length) {
            currentValue.children = routesSelect(currentValue.children, role)
            if(currentValue.children && currentValue.children.length)
                // 只有当且仅当存在子路由可以访问时才会把当前路由加入可访问路由列表中
                addUserRouters.push(currentValue)
        }
        // 当前路由对象没有子路由
        else {
            // 遍历这个路由的权限列表，如果有权限和role匹配那么就添加到可访问路由之中
            for(var j = 0; j < currentValue.meta.permission.length; j++)
                if(role == currentValue.meta.permission[j]) {
                    addUserRouters.push(currentValue)
                    break
                }
        }
    }
    return addUserRouters
}

export default {
    state: {
        // 用户名
        username: '',
        // 用户权限名称,全局管理员，人事管理员，财务管理与，订单管理员，调度管理员，仓库管理员，用户，运输员,8种权限
        role: '',
        // 用户权限是否被检验
        isChecked: false,
        // 是否保存用户登录信息到本地
        isStored: true
    },
    getters: {

    },
    mutations: {
        setName(state, username) {
            state.username = username
        },
        setRole(state, role) {
            state.role = role
        },
        setIsChecked(state, isChecked) {
            state.isChecked = isChecked
        },
        userClear(state) {
            state.username = ''
            state.role = ''
            state.isChecked = false
            state.isStored = true
        }
    },
    actions: {
        // 第二个参数载荷直接就是传值(不需要对象解构)
        Login(context, userInfo) {
            return new Promise((resolve, reject) => {
                let obj = {
                    accountName: userInfo.userName,
                    accountPassword: userInfo.password
                }
                // 下面写网络请求，登录获取role
                fetchAPI('/account/login','post', obj).then(role => {
                    if(role == '错误')
                        reject('失败')
                    else {
                        // 把权限名称合并到userInfo对象中
                        Object.assign(userInfo, {role})
                        // 把用户的信息存入本地，用于记住密码。存储的信息有：用户名(userName)，用户密码(password)，用户权限(role)，是否记住密码(isStored)
                        if (userInfo.isStored == true)
                            localStorage.setItem('userInfo', JSON.stringify(userInfo))
                        else {
                            if (localStorage.getItem('userInfo') != null)
                                localStorage.removeItem('userInfo')
                        }
                        // 把登录信息存入全局变量
                        context.commit('setName', userInfo.userName)
                        context.commit('setRole', userInfo.role)
                        resolve(role)
                    }
                })
            })
        },
        CheckRole(context, role) {
            switch(role){
                case 'all':
                    // 最高权限加入所有异步路由，保障后续的安全性，这里都用对象的深复制
                    context.commit('setAddRoutes',asyncRoutes)
                    break
                case 'people':
                    context.commit('setAddRoutes',routesSelect(asyncRoutes,'people'))
                    break
                case 'value':
                    context.commit('setAddRoutes',routesSelect(asyncRoutes,'value'))
                    break
                case 'order':
                    context.commit('setAddRoutes',routesSelect(asyncRoutes,'order'))
                    break
                case 'assign':
                    context.commit('setAddRoutes',routesSelect(asyncRoutes,'assign'))
                    break
                case 'warehouse':
                    context.commit('setAddRoutes',routesSelect(asyncRoutes,'warehouse'))
                    break
                case 'user':
                    context.commit('setAddRoutes',routesSelect(asyncRoutes,'user'))
                    break
                case 'trans':
                    context.commit('setAddRoutes',routesSelect(asyncRoutes,'trans'))
                    break;
            }
            // 用户权限已经被检验过，此时异步路由已经加载
            context.commit('setIsChecked', true)
        }// GetInfo
    }// actions
}