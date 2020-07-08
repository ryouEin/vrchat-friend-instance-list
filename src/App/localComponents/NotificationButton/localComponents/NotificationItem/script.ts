import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'

@Component
export default class NotificationItem extends Vue {
  @Prop({ required: true })
  readonly text!: string

  @Prop({ required: true })
  readonly date!: string

  @Prop()
  readonly onClick?: Function

  get isInteractive() {
    return this.onClick !== undefined
  }

  get rootClass() {
    return {
      '-interactive': this.isInteractive,
    }
  }

  triggerOnClick() {
    if (this.onClick !== undefined) {
      this.onClick()
    }
  }
}
