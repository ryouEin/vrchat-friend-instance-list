import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'

@Component
export default class InstanceButton extends Vue {
  @Prop({ default: 16 })
  fontSize!: number

  @Prop({ default: false })
  disabled!: boolean

  get rootStyle() {
    return {
      'font-size': `${this.fontSize}px`,
    }
  }

  get rootClass() {
    return {
      '-disabled': this.disabled,
    }
  }
}
