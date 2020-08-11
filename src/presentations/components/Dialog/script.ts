import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'

@Component
export default class Dialog extends Vue {
  @Prop({ default: '' })
  readonly title!: string
}
