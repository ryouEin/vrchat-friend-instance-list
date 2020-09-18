import { GlobalStore } from '@/GlobalStoreFactory'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $store: any
  }
}
export const makeGlobalStoreReferenceToWindowObject = (store: GlobalStore) => {
  window.$store = store
}
