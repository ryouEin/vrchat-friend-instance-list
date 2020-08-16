import { getModule } from 'vuex-module-decorators'
import FriendsStore from '@/store/module/FriendsStore'
import store from '@/store/index'
import InstancesStore from '@/store/module/InstancesStore'
import InstanceModalStore from '@/store/module/InstanceModalStore'
import InstanceWatchDialogStore from '@/store/module/InstanceWatchDialogStore'

export const friendsModule = getModule(FriendsStore, store)

export const instancesModule = getModule(InstancesStore, store)

export const instanceModalModule = getModule(InstanceModalStore, store)

export const instanceWatchDialogModule = getModule(
  InstanceWatchDialogStore,
  store
)
