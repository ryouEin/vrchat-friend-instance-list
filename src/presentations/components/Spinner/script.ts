import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'

@Component
export default class Spinner extends Vue {
  @Prop({ type: String, default: 'default' })
  readonly color!: string

  @Prop({ type: Number, default: 48 })
  readonly size!: number

  get rootCssClass() {
    return {
      '-white': this.color === 'white',
      '-black': this.color === 'black',
      '-green': this.color === 'green',
      '-blue': this.color === 'blue',
    }
  }

  get rootStyle() {
    return {
      width: `${this.size}px`,
      height: `${this.size}px`,
      'line-height': `${this.size}px`,
    }
  }
}
