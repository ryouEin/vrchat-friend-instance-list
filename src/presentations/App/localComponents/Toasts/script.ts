import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import Toast from '@/presentations/App/localComponents/Toasts/localComponent/index.vue'

const TOAST_WIDTH = 300

@Component({
  components: {
    Toast,
  },
})
export default class Toasts extends Vue {
  get toasts() {
    return this.$store.toastsStore.toasts.value
  }

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

  async onClose(index: number) {
    await this.$store.toastsStore.hideAction(index)
  }
}
