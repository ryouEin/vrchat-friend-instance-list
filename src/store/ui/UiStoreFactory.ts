import { InstanceModalStore } from '@/store/ui/InstanceModalStore'
import { InstanceWatchDialogStore } from '@/store/ui/InstanceWatchDialogStore'

export const instanceModalStore = (() => {
  return new InstanceModalStore()
})()

export const instanceWatchDialogStore = (() => {
  return new InstanceWatchDialogStore()
})()
