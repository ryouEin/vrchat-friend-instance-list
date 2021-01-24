import { GlobalStore } from '@/presentations/GlobalStoreFactory'

declare module 'vue/types/vue' {
  interface Vue {
    readonly $store: Readonly<GlobalStore>
  }
}
