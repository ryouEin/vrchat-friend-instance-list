import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { Color, getRGB } from '@/presentations/Colors'
import { settingStore } from '@/domains/DomainStoreFactory'

@Component
export default class FAB extends Vue {
  @Prop({ default: 'right' })
  position!: string

  @Prop({ default: 'white' })
  color!: Color

  get rootStyle() {
    return {
      'background-color': `rgb(${getRGB(
        this.color,
        settingStore.setting.theme
      )})`,
    }
  }

  get rootClass() {
    return [`-${this.position}`]
  }

  onClick() {
    this.$emit('click')
  }
}
