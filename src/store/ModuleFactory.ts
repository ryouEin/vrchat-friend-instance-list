import { getModule } from 'vuex-module-decorators'
import FriendsStore from '@/store/module/FriendsStore'
import store from '@/store/index'
import WorldsStore from '@/store/module/WorldsStore'
import NotificationsStore from '@/store/module/NotificationsStore'
import SettingStore from '@/store/module/SettingStore'

export const friendsModule = getModule(FriendsStore, store)

export const worldsModule = getModule(WorldsStore, store)

export const notificationsModule = getModule(NotificationsStore, store)

export const settingModule = getModule(SettingStore, store)
