import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import Dialog from '@/components/Dialog/index.vue'
import Button from '@/components/Button/index.vue'

export interface AlertProps {
  title?: string
  content: string | string[]
  onClose?: () => void
}

@Component({
  components: {
    Dialog,
    Button,
  },
})
export default class Alert extends Vue implements AlertProps {
  @Prop({ type: String, default: '' })
  readonly title!: string

  @Prop({ required: true })
  readonly content!: string | string[]

  @Prop()
  readonly onClose?: () => void

  visible = false

  get contents(): string[] {
    if (Array.isArray(this.content)) {
      return this.content
    }

    return [this.content]
  }

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
