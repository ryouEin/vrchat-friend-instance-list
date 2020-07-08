import { Component } from 'vue-property-decorator'
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
  isWatching = false
  notifyUserNumString = '1'

  get notifyUserNum(): number {
    return Number(this.notifyUserNumString)
  }

  startWatch() {
    this.isWatching = true
  }

  endWatch() {
    this.isWatching = false
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
