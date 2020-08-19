import { Component, Watch } from 'vue-property-decorator'
import Vue from 'vue'
import NotificationItem from '@/presentations/App/localComponents/NotificationButton/localComponents/NotificationItem/index.vue'
import { notificationsStore } from '@/domains/DomainStoreFactory'
// TODO: requireで読み込むしか無いか検討
// eslint-disable-next-line
const ClickOutside = require('vue-click-outside')

@Component({
  components: {
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
    return [...notificationsStore.notifications].reverse()
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
