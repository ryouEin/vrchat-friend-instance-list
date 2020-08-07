import Vue from 'vue'
import Vuex from 'vuex'
import FriendsStore from '@/presentations/store/module/FriendsStore'
import WorldsStore from '@/presentations/store/module/WorldsStore'
import NotificationsStore from '@/presentations/store/module/NotificationsStore'
import SettingStore from '@/presentations/store/module/SettingStore'
import InstancesStore from '@/presentations/store/module/InstancesStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    friends: FriendsStore,
    instances: InstancesStore,
    worlds: WorldsStore,
    notifications: NotificationsStore,
    setting: SettingStore,
  },
})
