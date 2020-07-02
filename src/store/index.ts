import Vue from 'vue'
import Vuex from 'vuex'
import Users from '@/store/module/Users'
import Worlds from '@/store/module/Worlds'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users: Users,
    worlds: Worlds,
  },
})
