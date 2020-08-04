import Vue from 'vue'
import Vuex from 'vuex'
import UsersStore from '@/store/module/UsersStore'
import WorldsStore from '@/store/module/WorldsStore'
import NotificationsStore from '@/store/module/NotificationsStore'
import SettingStore from '@/store/module/SettingStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users: UsersStore,
    worlds: WorldsStore,
    notifications: NotificationsStore,
    setting: SettingStore,
  },
})
