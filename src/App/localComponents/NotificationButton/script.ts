import { Component, Watch } from 'vue-property-decorator'
import Vue from 'vue'
import Icon from '@/components/Icon/index.vue'
import Button from '@/components/Button/index.vue'
import NotificationItem from '@/App/localComponents/NotificationButton/localComponents/NotificationItem/index.vue'
import { notificationsModule } from '@/store/ModuleFactory'
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

  hasUnreadNotification = false

  @Watch('notifications')
  onChangeNotifications() {
    this.hasUnreadNotification = true
  }

  get notifications() {
    return [...notificationsModule.notifications].reverse()
  }

  showMenu() {
    if (this.menuIsVisible) return

    this.hasUnreadNotification = false

    // setTimeoutしないと、showMenuの後にhideMenuが呼び出されてメニューが表示されない
    setTimeout(() => {
      this.menuIsVisible = true
    }, 0)
  }

  hideMenu() {
    this.menuIsVisible = false
  }
}
