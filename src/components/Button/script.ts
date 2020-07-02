import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'

@Component
export default class Button extends Vue {
  @Prop({ default: 'default' })
  readonly color!: string

  @Prop({ type: Boolean, default: false })
  readonly primary!: boolean

  onClick() {
    this.$emit('click')
  }
}
