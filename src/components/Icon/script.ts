import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'

@Component
export default class Icon extends Vue {
  @Prop({ default: 16 })
  size!: number

  // TODO: colorをenum等で型にしたい
  @Prop({ default: 'black' })
  color!: string

  get rootStyle() {
    return {
      'font-size': `${this.size}px`,
    }
  }

  get rootClass() {
    return [`-${this.color}`]
  }
}
