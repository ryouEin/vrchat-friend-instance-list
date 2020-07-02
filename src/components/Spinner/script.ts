import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'

@Component
export default class Spinner extends Vue {
  @Prop({ type: String, default: 'default' })
  readonly color!: string

  get rootCssClass() {
    return {
      '-white': this.color === 'white',
      '-black': this.color === 'black',
      '-green': this.color === 'green',
      '-blue': this.color === 'blue',
    }
  }
}
