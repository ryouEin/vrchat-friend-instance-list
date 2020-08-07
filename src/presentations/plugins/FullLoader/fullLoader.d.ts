import Vue from 'vue'
import { FullLoaderHandler } from '@/presentations/plugins/FullLoader/index'

declare module 'vue/types/vue' {
  interface Vue {
    $fullLoader: FullLoaderHandler
  }
}
