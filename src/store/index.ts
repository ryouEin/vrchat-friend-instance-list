import Vue from 'vue'
import Vuex from 'vuex'
import InstanceWatchDialogStore from '@/store/module/InstanceWatchDialogStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    instanceWatchDialog: InstanceWatchDialogStore,
  },
})
