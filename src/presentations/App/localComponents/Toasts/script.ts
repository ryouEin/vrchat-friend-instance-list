import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import Toast from '@/presentations/App/localComponents/Toasts/localComponent/index.vue'
import { ToastProps } from '@/presentations/App/localComponents/Toasts/localComponent/script'

const TOAST_WIDTH = 300

@Component({
  components: {
    Toast,
  },
})
export default class Toasts extends Vue {
  toasts: (ToastProps & { isVisible: boolean })[] = [
    {
      type: 'info',
      content: 'ダミーテキスト',
      isVisible: true,
    },
    {
      type: 'warn',
      content: 'ダミーテキスト',
      isVisible: true,
    },
    {
      type: 'error',
      content: 'ダミーテキスト',
      isVisible: true,
    },
  ]

  get rootStyle() {
    return {
      width: `${TOAST_WIDTH}px`,
      'margin-left': `-${TOAST_WIDTH / 2}px`,
    }
  }

  get toastStyle() {
    return {
      width: `${TOAST_WIDTH}px`,
    }
  }

  onClose(index: number) {
    this.toasts[index].isVisible = false
  }
}
