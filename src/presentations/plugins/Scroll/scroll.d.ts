import Vue from 'vue'
import { ScrollToInstance } from '@/presentations/plugins/Scroll/index'
import { ScrollToUser } from '@/presentations/plugins/Scroll/index'

declare module 'vue/types/vue' {
  interface Vue {
    $scrollToInstance: ScrollToInstance
    $scrollToUser: ScrollToUser
  }
}
