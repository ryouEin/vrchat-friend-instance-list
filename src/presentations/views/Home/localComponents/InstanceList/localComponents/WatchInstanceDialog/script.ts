import { Component, Inject } from 'vue-property-decorator'
import Vue from 'vue'
import { InstanceModalStore } from '@/presentations/views/Home/store/InstanceModalStore'
import {
  INSTANCE_MODAL_STORE_INJECT_KEY,
  INSTANCE_WATCH_DIALOG_STORE_INJECT_KEY,
} from '@/presentations/views/Home/store/InjectKey'
import { InstanceWatchDialogStore } from '@/presentations/views/Home/store/InstanceWatchDialogStore'

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
  @Inject(INSTANCE_WATCH_DIALOG_STORE_INJECT_KEY)
  instanceWatchDialogStore!: InstanceWatchDialogStore

  @Inject(INSTANCE_MODAL_STORE_INJECT_KEY)
  instanceModalStore!: InstanceModalStore

  notifyUserNum = 1

  get isVisible() {
    return this.instanceWatchDialogStore.isVisible.value
  }

  get instance() {
    const instance = this.instanceWatchDialogStore.instance.value
    if (instance === null) {
      throw new Error('instance is null.')
    }

    return instance
  }

  get world() {
    const world = this.$store.worldsStore.world.value(this.instance.worldId)
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
      this.$store.alertStore.showAction({
        title: '通知の許可が必要です',
        content: `デスクトップに通知を届けるには、通知の許可をして頂く必要があります。

このダイアログを閉じた後、通知の許可を求めるポップアップが表示されますので、「許可」のボタンをクリックしてください。`,
        isMarkdown: true,
        onClose: () => {
          Notification.requestPermission()
        },
      })
    } else if (permission === 'denied') {
      this.$store.alertStore.showAction({
        title: '通知の許可が必要です',
        content: `デスクトップに通知を届けるには、通知の許可をして頂く必要があります。

通知の設定を「許可」に変更してください。`,
        isMarkdown: true,
      })
    }

    const worldName = this.world.name
    const location = this.instance.location
    await this.$store.instancesStore.watchInstanceAction({
      location: this.location,
      notifyUserNum: this.notifyUserNum,
      onFindVacancy: async () => {
        await this.$store.notificationsStore.pushNotificationAction({
          text: `${worldName}に空きができました。`,
          date: Date.now(),
          onClick: async () => {
            await this.instanceModalStore.showAction(location)
          },
        })
      },
    })
  }

  async hideDialog() {
    await this.instanceWatchDialogStore.hideAction()
  }

  async onClickWatchStart() {
    await this.startWatch()
    await this.hideDialog()
  }
}
