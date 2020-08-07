import Vue from 'vue'
import Vuex from 'vuex'
import FriendsStore from '@/presentations/store/module/FriendsStore'
import WorldsStore from '@/presentations/store/module/WorldsStore'
import NotificationsStore from '@/presentations/store/module/NotificationsStore'
import SettingStore from '@/presentations/store/module/SettingStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    friends: FriendsStore,
    worlds: WorldsStore,
    notifications: NotificationsStore,
    setting: SettingStore,
  },
})
