import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'

@Component
export default class Button extends Vue {
  @Prop({ type: Boolean, default: false })
  readonly primary!: boolean

  @Prop({ default: null })
  readonly full!: string | null

  get isFull() {
    return this.full !== null
  }

  get rootClass() {
    return {
      '-primary': this.primary,
      '-full': this.isFull,
    }
  }

  onClick() {
    this.$emit('click')
  }
}
