import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import InstanceButton from '@/views/Home/localComponents/InstanceListItem/localComponents/InstanceButton/index.vue'
import Icon from '@/components/Icon/index.vue'
import Button from '@/components/Button/index.vue'
import Dialog from '@/components/Dialog/index.vue'
import Select from '@/components/Select/index.vue'

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

@Component({
  components: {
    InstanceButton,
    Icon,
    Button,
    Dialog,
    Select,
  },
})
export default class WatchInstanceButton extends Vue {
  dialogIsVisible = false

  @Prop({ required: true })
  notifyUserNum!: number

  @Prop({ default: false })
  isWatching!: boolean

  get selectItems() {
    const MAX_NUM = 15

    return generateSelectItems(MAX_NUM)
  }

  onChangeNotifyUserNum(userNum: string) {
    this.$emit('changeNotifyUserNum', Number(userNum))
  }

  startWatch() {
    this.$emit('clickStartWatch')

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
  }

  endWatch() {
    this.$emit('clickEndWatch')
  }

  showDialog() {
    this.dialogIsVisible = true
  }

  hideDialog() {
    this.dialogIsVisible = false
  }

  onClickWatchStart() {
    this.startWatch()
    this.hideDialog()
  }
}
