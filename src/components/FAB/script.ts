import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'

@Component
export default class FAB extends Vue {
  @Prop()
  private icon!: string

  onClick() {
    this.$emit('click')
  }
}
