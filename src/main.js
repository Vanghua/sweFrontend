import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入全部的ant-design-vue
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
// 引入路由守卫
import '@/permission'

Vue.config.productionTip = false
Vue.use(Antd)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
