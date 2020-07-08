import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import Icon from '@/components/Icon/index.vue'
import Button from '@/components/Button/index.vue'
import NotificationItem from '@/App/localComponents/NotificationButton/localComponents/NotificationItem/index.vue'
// TODO: requireで読み込むしか無いか検討
// eslint-disable-next-line
const ClickOutside = require('vue-click-outside')

@Component({
  components: {
    Icon,
    Button,
    NotificationItem,
  },
  directives: {
    ClickOutside,
  },
})
export default class NotificationButton extends Vue {
  menuIsVisible = false

  // TODO: Notificationsストアを作成し、そこから取得するように
  notifications = [
    {
      text:
        '「ワールド名」に空きができました。 （クリックでインスタンスを表示）',
      date: '2020/7/20 18:20',
      onClick: () => {
        this.$scrollToInstance('wrld_2:123')
      },
    },
    {
      text:
        '「ワールド名」に空きができました。 （クリックでインスタンスを表示）',
      date: '2020/7/20 18:20',
      onClick: () => {
        this.$scrollToInstance('wrld_2:123')
      },
    },
  ]

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
