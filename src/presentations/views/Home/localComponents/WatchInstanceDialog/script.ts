import { Component, Inject, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { Instance } from '@/types'
import {
  START_WATCH_INSTANCE,
  StartWatchInstance,
} from '@/presentations/views/Home/injectInfo'

const generateSelectItems = (count: number) => {
  const tmp = []
  for (let index = 1; index <= count; index++) {
    tmp.push({
      label: String(index),
      value: index,
    })
  }

  return tmp
}

@Component
export default class WatchInstanceDialog extends Vue {
  @Inject(START_WATCH_INSTANCE)
  private readonly startWatchInstance!: StartWatchInstance

  @Prop({ required: true })
  readonly instance!: Instance

  @Prop({ required: true })
  readonly hide!: () => void

  private notifyUserNum = 1

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

  checkNotifyPermission() {
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
  }

  async startWatch() {
    // TODO SOON: ここ、通知許可周囲で絶対バグるので再考
    this.checkNotifyPermission()
    this.startWatchInstance(
      this.instance.location,
      this.world.name,
      this.notifyUserNum
    )
    await this.hide()
  }
}
