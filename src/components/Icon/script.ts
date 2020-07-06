import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'

@Component
export default class Icon extends Vue {
  @Prop({ default: 16 })
  size!: number

  get rootStyle() {
    return {
      'font-size': `${this.size}px`,
    }
  }
}
