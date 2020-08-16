import Vue from 'vue'
import Vuex from 'vuex'
import InstancesStore from '@/store/module/InstancesStore'
import InstanceModalStore from '@/store/module/InstanceModalStore'
import InstanceWatchDialogStore from '@/store/module/InstanceWatchDialogStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    instances: InstancesStore,
    instanceModal: InstanceModalStore,
    instanceWatchDialog: InstanceWatchDialogStore,
  },
})
