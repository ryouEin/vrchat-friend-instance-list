import { InstanceModalStore } from '@/presentations/ui_store/InstanceModalStore'
import { InstanceWatchDialogStore } from '@/presentations/ui_store/InstanceWatchDialogStore'
import { JoinDialogStore } from '@/presentations/ui_store/JoinDialogStore'
import { ToastsStore } from '@/presentations/ui_store/ToastsStore'

export const instanceModalStore = (() => {
  return new InstanceModalStore()
})()

export const instanceWatchDialogStore = (() => {
  return new InstanceWatchDialogStore()
})()

export const joinDialogStore = (() => {
  return new JoinDialogStore()
})()

export const toastsStore = (() => {
  return new ToastsStore()
})()
