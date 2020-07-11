import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'

export interface AlertProps {
  title?: string
  content: string
  isMarkdown?: boolean
  onClose?: () => void
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
