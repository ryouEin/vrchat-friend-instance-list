import Vue from 'vue'
import { FullLoaderHandler } from '@/plugins/FullLoader/index'

declare module 'vue/types/vue' {
  interface Vue {
    $fullLoader: FullLoaderHandler
  }
}
