import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import Dialog from '@/components/Dialog/index.vue'
import Button from '@/components/Button/index.vue'
import MarkdownText from '@/components/MarkdownText/index.vue'

export interface AlertProps {
  title?: string
  content: string
  isMarkdown?: boolean
  onClose?: () => void
}

@Component({
  components: {
    Dialog,
    Button,
    MarkdownText,
  },
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
