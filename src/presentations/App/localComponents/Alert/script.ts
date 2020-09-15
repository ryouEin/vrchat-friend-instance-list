import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import { Color } from '@/presentations/Colors'
import { alertStore } from '@/presentations/ui_store/UiStoreFactory'

export interface AlertProps {
  title?: string
  content: string
  isMarkdown?: boolean
  onClose?: () => void
  customButtonOptions?: CustomButtonOption[]
  showCloseButton?: boolean
}

export type CustomButtonOption = {
  text: string
  color: Color
  onClick: () => void
}

@Component({
  components: {},
})
export default class Alert extends Vue {
  get props(): AlertProps | undefined {
    return alertStore.alert
  }

  get showCloseButton() {
    return this.props?.showCloseButton ?? true
  }

  get isVisible() {
    return this.props !== undefined
  }

  async close() {
    if (this.props?.onClose !== undefined) {
      this.props.onClose()
    }

    await alertStore.hideAction()
  }
}
