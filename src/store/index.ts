import Vue from 'vue'
import Vuex from 'vuex'
import InstanceModalStore from '@/store/module/InstanceModalStore'
import InstanceWatchDialogStore from '@/store/module/InstanceWatchDialogStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    instanceModal: InstanceModalStore,
    instanceWatchDialog: InstanceWatchDialogStore,
  },
})
