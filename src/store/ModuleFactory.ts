import { getModule } from 'vuex-module-decorators'
import FriendsStore from '@/store/module/FriendsStore'
import store from '@/store/index'
import WorldsStore from '@/store/module/WorldsStore'
import NotificationsStore from '@/store/module/NotificationsStore'
import SettingStore from '@/store/module/SettingStore'
import InstancesStore from '@/store/module/InstancesStore'
import InstanceModalStore from '@/store/module/InstanceModalStore'
import InstanceWatchDialogStore from '@/store/module/InstanceWatchDialogStore'

export const friendsModule = getModule(FriendsStore, store)

export const instancesModule = getModule(InstancesStore, store)

export const worldsModule = getModule(WorldsStore, store)

export const notificationsModule = getModule(NotificationsStore, store)

export const settingModule = getModule(SettingStore, store)

export const instanceModalModule = getModule(InstanceModalStore, store)

export const instanceWatchDialogModule = getModule(
  InstanceWatchDialogStore,
  store
)
