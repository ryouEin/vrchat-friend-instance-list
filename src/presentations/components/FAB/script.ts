import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'

@Component
export default class FAB extends Vue {
  @Prop({ default: 'right' })
  position!: string

  @Prop({ default: 'white' })
  color!: string

  get rootClass() {
    return [`-${this.position}`, `-${this.color}`]
  }

  onClick() {
    this.$emit('click')
  }
}
