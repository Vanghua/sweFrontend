import Vue from 'vue'
import VueRouter from 'vue-router'
import { constantRoutes } from "@/router/config";

Vue.use(VueRouter)

const router = new VueRouter({
  // mode: 'history',
  // 打包成webapp采用hash模式的路由，采用history路由时因为webapp要配置publicPath使用相对路径会造成冲突
  mode: 'hash',
  // 基路径
  base: '/',
  routes: constantRoutes
})

export default router
