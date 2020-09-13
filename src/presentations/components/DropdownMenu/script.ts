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

  showMenu() {
    this.isVisibleMenu = true
  }

  hideMenu() {
    this.isVisibleMenu = false
  }

  async onClickItem(index: number) {
    await this.items[index].onClick()

    this.hideMenu()
  }
}
