import Vue from 'vue'
import { ScrollToInstance } from '@/plugins/Scroll/index'
import { ScrollToUser } from '@/plugins/Scroll/index'

declare module 'vue/types/vue' {
  interface Vue {
    $scrollToInstance: ScrollToInstance
    $scrollToUser: ScrollToUser
  }
}
