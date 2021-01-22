import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'

@Component
export default class FavoriteMark extends Vue {
  @Prop({ type: Boolean, default: false })
  readonly inactive!: boolean
}
