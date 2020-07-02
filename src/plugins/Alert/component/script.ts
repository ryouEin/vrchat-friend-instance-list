import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import Dialog from '@/components/Dialog/index.vue'
import Button from '@/components/Button/index.vue'

export interface AlertProps {
  title?: string
  content: string
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

  @Prop({ type: String, required: true })
  readonly content!: string

  visible = false

  show() {
    this.visible = true
  }

  close() {
    this.visible = false
  }
}
