import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import { Color } from '@/presentations/Colors'
import AlertPresentation from '@/presentations/App/localComponents/Alert/presentation.vue'

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
  components: {
    AlertPresentation,
  },
})
export default class Alert extends Vue {
  get props(): AlertProps | undefined {
    return this.$store.alertStore.alert.value
  }

  async close() {
    await this.$store.alertStore.hideAction()
  }
}
