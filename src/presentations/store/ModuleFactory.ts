import { getModule } from 'vuex-module-decorators'
import FriendsStore from '@/presentations/store/module/FriendsStore'
import store from '@/presentations/store/index'
import WorldsStore from '@/presentations/store/module/WorldsStore'
import NotificationsStore from '@/presentations/store/module/NotificationsStore'
import SettingStore from '@/presentations/store/module/SettingStore'
import InstancesStore from '@/presentations/store/module/InstancesStore'
import InstanceModalStore from '@/presentations/store/module/InstanceModalStore'
import InstanceWatchDialogStore from '@/presentations/store/module/InstanceWatchDialogStore'

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
