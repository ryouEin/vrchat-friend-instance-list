import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { Color } from '@/presentations/Colors'

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
export default class Alert extends Vue implements AlertProps {
  @Prop({ type: String, default: '' })
  readonly title!: string

  @Prop({ required: true })
  readonly content!: string

  @Prop({ default: false })
  readonly isMarkdown!: boolean

  @Prop()
  readonly onClose?: () => void

  @Prop({ type: Array, default: () => [] })
  readonly customButtonOptions!: CustomButtonOption[]

  @Prop({ type: Boolean, default: true })
  readonly showCloseButton!: boolean

  visible = false

  show() {
    this.visible = true
  }

  close() {
    this.visible = false

    if (this.onClose !== undefined) {
      this.onClose()
    }
  }
}
