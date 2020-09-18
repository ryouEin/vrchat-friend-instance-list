import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { Color } from '@/presentations/Colors'

export type ToastType = 'info' | 'warn' | 'error'

export type ToastProps = {
  type: ToastType
  content: string
}

@Component
export default class Toast extends Vue implements ToastProps {
  @Prop({ type: String, default: 'info' })
  type!: 'info' | 'warn' | 'error'

  @Prop({ type: String, required: true })
  content!: string

  get rootStyle() {
    const backgroundColor: Color = (() => {
      switch (this.type) {
        case 'error':
          return 'danger'
        case 'warn':
          return 'warning'
      }
      return 'gray'
    })()
    const backgroundRGB = this.$colorManager.getRGB(backgroundColor)

    return {
      'background-color': `rgb(${backgroundRGB})`,
    }
  }

  onClose() {
    this.$emit('close')
  }
}
