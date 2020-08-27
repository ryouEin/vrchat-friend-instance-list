import { InstanceModalStore } from '@/presentations/ui_store/InstanceModalStore'
import { InstanceWatchDialogStore } from '@/presentations/ui_store/InstanceWatchDialogStore'
import { JoinDialogStore } from '@/presentations/ui_store/JoinDialogStore'

export const instanceModalStore = (() => {
  return new InstanceModalStore()
})()

export const instanceWatchDialogStore = (() => {
  return new InstanceWatchDialogStore()
})()

export const joinDialogStore = (() => {
  return new JoinDialogStore()
})()
