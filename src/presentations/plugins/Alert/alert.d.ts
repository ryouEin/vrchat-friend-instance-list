import { AlertHandler } from '@/presentations/plugins/Alert/index'

declare module 'vue/types/vue' {
  interface Vue {
    $alert: AlertHandler
  }
}
