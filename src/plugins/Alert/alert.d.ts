import Vue from 'vue'
import { AlertHandler } from '@/plugins/Alert/index'

declare module 'vue/types/vue' {
  interface Vue {
    $alert: AlertHandler
  }
}
