import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import permission from "@/store/modules/permission";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    permission
  }
})
