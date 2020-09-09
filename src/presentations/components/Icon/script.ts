import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { Color, getRGB } from '@/presentations/Colors'

@Component
export default class Icon extends Vue {
  @Prop({ default: 16 })
  size!: number

  @Prop({ default: 'black' })
  color!: Color

  get rootStyle() {
    return {
      'font-size': `${this.size}px`,
      color: `rgb(${getRGB(this.color)})`,
    }
  }
}
