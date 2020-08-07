import Vue from 'vue'
import Vuex from 'vuex'
import FriendsStore from '@/store/module/FriendsStore'
import WorldsStore from '@/store/module/WorldsStore'
import NotificationsStore from '@/store/module/NotificationsStore'
import SettingStore from '@/store/module/SettingStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    friends: FriendsStore,
    worlds: WorldsStore,
    notifications: NotificationsStore,
    setting: SettingStore,
  },
})
