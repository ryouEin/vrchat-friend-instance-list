import Vue from 'vue'
import Vuex from 'vuex'
import FriendsStore from '@/store/module/FriendsStore'
import WorldsStore from '@/store/module/WorldsStore'
import InstancesStore from '@/store/module/InstancesStore'
import InstanceModalStore from '@/store/module/InstanceModalStore'
import InstanceWatchDialogStore from '@/store/module/InstanceWatchDialogStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    friends: FriendsStore,
    instances: InstancesStore,
    worlds: WorldsStore,
    instanceModal: InstanceModalStore,
    instanceWatchDialog: InstanceWatchDialogStore,
  },
})
