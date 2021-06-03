import router from './router'
import store from './store'

router.beforeEach((to, from, next) => {
    // 处理刷新后的丢失问题
    if(sessionStorage.getItem("store")) {
        let obj = JSON.parse(sessionStorage.getItem("store"))
        store.replaceState(
          // 对象合并
          Object.assign(
            {},
            store.state,
            JSON.parse(sessionStorage.getItem("store"))
          )
        )
        sessionStorage.removeItem("store")

        // 重新根据用户权限加载路由
        store.dispatch('CheckRole', store.state.user.role)
        router.addRoutes(store.state.permission.addRoutes)
        // 取出缓存中的to的信息
        let objTo = JSON.parse(sessionStorage.getItem("to"))
        sessionStorage.removeItem("to")
        next({...objTo})
    }
    // 下面处理非刷新的情况
    else {
        // 每次跳转前都保存to，等到刷新时to的信息会被销毁
        // 为了鲁棒性，先检验是否已经存储了to
        if(sessionStorage.getItem('to'))
            sessionStorage.removeItem('to')
        // 下面是用于解决JSON序列化出错的问题(在实践中，还没搞清楚为何序列化路由时报错，报错原因是是存在循环引用，但是实在是找不到循环引用)
        let cache = []
        let jsTo = JSON.stringify(to,function(index, value) {
            // 在序列化中如果出现对象的某个属性值是自己的话，那么跳过。如果出现这样的循环引用是无法序列化的
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    return;
                }
                cache.push(value);
            }
            return value
        })
        cache = null
        sessionStorage.setItem("to", jsTo)

        // 注：想要捋清下述逻辑，请画决策树
        var userInfo = localStorage.getItem('userInfo')
        // 用户信息未本地存储
        if (userInfo == null) {
            // 当前无法在缓存中找到用户信息
            if (to.path === '/')
                // 这表示用户将要到登录状态，路由正常跳转
                next()
            else {
                // 如果浏览器中没有用户缓存信息且Vuex中也没有用户信息，并且用户当前想访问非登录界面，那么就是非法访问，需要重新跳回登录界面
                if (store.state.user.username == '') {
                    if(to.path == '/forget')
                        next()
                    else
                        next({"path": '/'})
                }
                // Vuex中有用户信息，说明此时用户已经登录
                else {
                    // 正常跳转
                    next()
                }
            }
        }
        // 用户信息本地存储过
        else {
            // 把userInfo从字符串转成对象
            userInfo = JSON.parse(userInfo)
            // 当前将要达到登录界面
            if (to.path == '/') {
                // 如果Vuex中没有数据，说明用户没有登录
                if (store.state.user.username == '' && from.path == '/') {
                    // 用户选择了记住秘密码
                    if (userInfo.isStored == true) {
                        // 模拟登录，不需要网络请求
                        store.commit('setRole', userInfo.role)
                        store.commit('setName', userInfo.userName)
                        store.dispatch('CheckRole', userInfo.role)
                        // 添加权限
                        router.addRoutes(store.state.permission.addRoutes)
                        // 跳转到我的页面
                        next({"name": 'Page'})
                    }
                    // 本地缓存中记录的是用户不记住密码
                    else {
                        // 正常到登录界面
                        next()
                    }
                }
                // Vuex中此时有数据，用户已经登录可以正常跳转;或者是Vuex中没有数据，此时是用户从界面退出登录
                else {
                    next()
                }
            }
            // 如果将要到达的不是登录界面
            else {
                // 用户未登录
                if (store.state.user.username == '') {
                    // 跳回登录界面，走上述流程
                    next({"path": '/'})
                } else {
                    // 登陆过则正常跳转
                    next()
                }
            }
        }
        // 备用
        next()
    }
})