import { getModule } from 'vuex-module-decorators'
import store from '@/store/index'
import InstancesStore from '@/store/module/InstancesStore'
import InstanceModalStore from '@/store/module/InstanceModalStore'
import InstanceWatchDialogStore from '@/store/module/InstanceWatchDialogStore'

export const instancesModule = getModule(InstancesStore, store)

export const instanceModalModule = getModule(InstanceModalStore, store)

export const instanceWatchDialogModule = getModule(
  InstanceWatchDialogStore,
  store
)
