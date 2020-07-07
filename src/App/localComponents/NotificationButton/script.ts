import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import Icon from '@/components/Icon/index.vue'
import Button from '@/components/Button/index.vue'
// TODO: requireで読み込むしか無いか検討
// eslint-disable-next-line
const ClickOutside = require('vue-click-outside')

@Component({
  components: {
    Icon,
    Button,
  },
  directives: {
    ClickOutside,
  },
})
export default class NotificationButton extends Vue {
  menuIsVisible = false

  showMenu() {
    if (this.menuIsVisible) return

    // setTimeoutしないと、showMenuの後にhideMenuが呼び出されてメニューが表示されない
    setTimeout(() => {
      this.menuIsVisible = true
    }, 0)
  }

  hideMenu() {
    this.menuIsVisible = false
  }
}
