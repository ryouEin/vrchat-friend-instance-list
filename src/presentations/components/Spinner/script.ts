import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { Color, getRGB } from '@/presentations/Colors'

@Component
export default class Spinner extends Vue {
  @Prop({ type: String, default: 'green' })
  readonly color!: Color

  @Prop({ type: Number, default: 48 })
  readonly size!: number

  get rootStyle() {
    return {
      width: `${this.size}px`,
      height: `${this.size}px`,
      'line-height': `${this.size}px`,
      color: `rgb(${getRGB(this.color)})`,
    }
  }
}
