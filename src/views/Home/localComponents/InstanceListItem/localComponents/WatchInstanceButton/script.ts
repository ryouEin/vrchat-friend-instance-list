import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import InstanceButton from '@/views/Home/localComponents/InstanceListItem/localComponents/InstanceButton/index.vue'
import Icon from '@/components/Icon/index.vue'
import Button from '@/components/Button/index.vue'
import Dialog from '@/components/Dialog/index.vue'
import Select from '@/components/Select/index.vue'

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

  onChangeNotifyUserNum(userNum: string) {
    this.$emit('changeNotifyUserNum', Number(userNum))
  }

  startWatch() {
    this.$emit('clickStartWatch')

    // TODO: 適当に置いただけなので、ユーザーにちゃんと許可押してもらえるような箇所に記述すること
    Notification.requestPermission()
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
