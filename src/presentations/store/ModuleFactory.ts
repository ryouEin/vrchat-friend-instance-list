import { getModule } from 'vuex-module-decorators'
import FriendsStore from '@/presentations/store/module/FriendsStore'
import store from '@/presentations/store/index'
import WorldsStore from '@/presentations/store/module/WorldsStore'
import NotificationsStore from '@/presentations/store/module/NotificationsStore'
import SettingStore from '@/presentations/store/module/SettingStore'
import InstancesStore from '@/presentations/store/module/InstancesStore'

export const friendsModule = getModule(FriendsStore, store)

export const instancesModule = getModule(InstancesStore, store)

export const worldsModule = getModule(WorldsStore, store)

export const notificationsModule = getModule(NotificationsStore, store)

export const settingModule = getModule(SettingStore, store)
