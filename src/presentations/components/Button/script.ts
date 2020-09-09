import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { Color, getRGB } from '@/presentations/Colors'

@Component
export default class Button extends Vue {
  @Prop({ type: Boolean, default: false })
  readonly primary!: boolean

  @Prop({ default: null })
  readonly full!: string | null

  @Prop({ type: String, default: 'secondary' })
  readonly color!: Color

  get isFull() {
    return this.full !== null
  }

  get rootClass() {
    return {
      '-full': this.isFull,
    }
  }

  get rootStyle() {
    return {
      'background-color': `rgb(${getRGB(this.color)})`,
    }
  }

  onClick() {
    this.$emit('click')
  }
}
