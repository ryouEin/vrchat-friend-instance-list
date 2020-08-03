import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'

@Component
export default class Toggle extends Vue {
  @Prop({ required: true })
  value!: boolean
}
