import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
// TODO: requireで読み込むしか無いか検討
// eslint-disable-next-line
const ClickOutside = require('vue-click-outside')

export type DropdownMenuItem = {
  label: string
  isDisabled?: boolean
  onClick: () => void
}

@Component({
  directives: {
    ClickOutside,
  },
})
export default class DropdownMenu extends Vue {
  isVisibleMenu = false

  @Prop({ type: Array, required: true })
  private readonly items!: DropdownMenuItem[]

  @Prop({ type: String, default: 'left' })
  private readonly positionHorizontal!: 'left' | 'right'

  @Prop({ type: String, default: 'top' })
  private readonly positionVertical!: 'top' | 'bottom'

  @Prop({ type: Boolean, default: false })
  isDisabled!: boolean

  get transitionName() {
    const initialToUpper = (text: string) => {
      return text.charAt(0).toUpperCase() + text.slice(1)
    }

    return `t-scalingFrom${initialToUpper(
      this.positionHorizontal
    )}${initialToUpper(this.positionVertical)}`
  }

  get menuStyle() {
    return {
      left: this.positionHorizontal === 'left' ? '0' : 'auto',
      right: this.positionHorizontal === 'right' ? '0' : 'auto',
      top: this.positionVertical === 'top' ? '0' : 'auto',
      bottom: this.positionVertical === 'bottom' ? '0' : 'auto',
    }
  }

  showMenu() {
    this.isVisibleMenu = true
  }

  hideMenu() {
    this.isVisibleMenu = false
  }

  onClickItem(index: number) {
    this.items[index].onClick()

    this.hideMenu()
  }
}
