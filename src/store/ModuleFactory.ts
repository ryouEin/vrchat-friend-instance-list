import { getModule } from 'vuex-module-decorators'
import store from '@/store/index'
import InstanceWatchDialogStore from '@/store/module/InstanceWatchDialogStore'

export const instanceWatchDialogModule = getModule(
  InstanceWatchDialogStore,
  store
)
