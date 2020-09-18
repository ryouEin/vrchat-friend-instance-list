import Vue from 'vue'
import { ColorManager } from '@/presentations/Colors'

declare module 'vue/types/vue' {
  interface Vue {
    readonly $colorManager: Readonly<ColorManager>
  }
}
