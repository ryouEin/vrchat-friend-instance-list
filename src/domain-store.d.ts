import Vue from 'vue'
import { DomainStore } from '@/domains/DomainStoreFactory'

declare module 'vue/types/vue' {
  interface Vue {
    readonly $domainStore: Readonly<DomainStore>
  }
}
