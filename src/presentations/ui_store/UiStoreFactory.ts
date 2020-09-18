import { ToastsStore } from '@/presentations/ui_store/ToastsStore'
import { FullLoaderStore } from '@/presentations/ui_store/FullLoaderStore'
import { AlertStore } from '@/presentations/ui_store/AlertStore'

export const toastsStore = (() => {
  return new ToastsStore()
})()

export const fullLoaderStore = (() => {
  return new FullLoaderStore()
})()

export const alertStore = (() => {
  return new AlertStore()
})()
