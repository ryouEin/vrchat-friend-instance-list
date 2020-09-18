import Vue from 'vue'
import { GlobalStore } from '@/GlobalStoreFactory'

declare module 'vue/types/vue' {
  interface Vue {
    readonly $store: Readonly<GlobalStore>
  }
}
