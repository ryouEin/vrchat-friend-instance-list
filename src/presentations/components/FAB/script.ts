import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { Color } from '@/presentations/Colors'

@Component
export default class FAB extends Vue {
  @Prop({ default: 'right' })
  position!: string

  @Prop({ default: 'white' })
  color!: Color

  get rootStyle() {
    return {
      'background-color': `rgb(${this.$colorManager.getRGB(this.color)})`,
    }
  }

  get rootClass() {
    return [`-${this.position}`]
  }

  onClick() {
    this.$emit('click')
  }
}
