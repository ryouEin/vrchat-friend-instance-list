import { InstanceModalStore } from '@/presentations/ui_store/InstanceModalStore'
import { InstanceWatchDialogStore } from '@/presentations/ui_store/InstanceWatchDialogStore'

export const instanceModalStore = (() => {
  return new InstanceModalStore()
})()

export const instanceWatchDialogStore = (() => {
  return new InstanceWatchDialogStore()
})()
