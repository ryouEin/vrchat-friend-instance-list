import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import {
  instanceModalStore,
  instanceWatchDialogStore,
} from '@/presentations/ui_store/UiStoreFactory'
import {
  instancesStore,
  notificationsStore,
} from '@/domains/DomainStoreFactory'

const generateSelectItems = (count: number) => {
  const tmp = []
  for (let index = 1; index <= count; index++) {
    tmp.push({
      label: String(index),
      value: String(index),
    })
  }

  return tmp
}

@Component
export default class WatchInstanceDialog extends Vue {
  notifyUserNum = 1

  get isVisible() {
    return instanceWatchDialogStore.isVisible
  }

  get instance() {
    const instance = instanceWatchDialogStore.instance
    if (instance === null) {
      throw new Error('instance is null.')
    }

    return instance
  }

  get world() {
    const world = instanceWatchDialogStore.world
    if (world === undefined) {
      throw new Error('world is null.')
    }

    return world
  }

  get location() {
    return this.instance.location
  }

  get selectItems() {
    const MAX_NUM = 15

    return generateSelectItems(MAX_NUM)
  }

  onChangeNotifyUserNum(userNum: string) {
    this.notifyUserNum = Number(userNum)
  }

  async startWatch() {
    const permission = Notification.permission
    if (permission === 'default') {
      this.$alert({
        title: '通知の許可が必要です',
        content: `デスクトップに通知を届けるには、通知の許可をして頂く必要があります。

このダイアログを閉じた後、通知の許可を求めるポップアップが表示されますので、「許可」のボタンをクリックしてください。`,
        isMarkdown: true,
        onClose: () => {
          Notification.requestPermission()
        },
      })
    } else if (permission === 'denied') {
      this.$alert({
        title: '通知の許可が必要です',
        content: `デスクトップに通知を届けるには、通知の許可をして頂く必要があります。

通知の設定を「許可」に変更してください。`,
        isMarkdown: true,
      })
    }

    const worldName = this.world.name
    const location = this.instance.location
    await instancesStore.watchInstanceAction({
      location: this.location,
      notifyUserNum: this.notifyUserNum,
      onFindVacancy: async () => {
        await notificationsStore.pushNotificationAction({
          text: `${worldName}に空きができました。`,
          date: Date.now(),
          onClick: async () => {
            await instanceModalStore.showAction(location)
          },
        })
      },
    })
  }

  async hideDialog() {
    await instanceWatchDialogStore.hideAction()
  }

  async onClickWatchStart() {
    await this.startWatch()
    await this.hideDialog()
  }
}
