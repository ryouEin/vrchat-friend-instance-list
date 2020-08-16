import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import InstanceButton from '@/presentations/views/Home/localComponents/InstanceListItem/localComponents/WorldInfo/localComponents/InstanceButton/index.vue'
import { Instance } from '@/types'
import instancesStore from '@/store/module/InstancesStore'
import instanceWatchDialogStore from '@/store/module/InstanceWatchDialogStore'

@Component({
  components: {
    InstanceButton,
  },
})
export default class WatchInstanceButton extends Vue {
  @Prop({ required: true })
  instance!: Instance

  get location() {
    return this.instance.location
  }

  get isWatching() {
    return this.instance.isWatching
  }

  async endWatch() {
    await instancesStore.unwatchInstanceAction(this.location)
  }

  async showDialog() {
    await instanceWatchDialogStore.showAction(this.instance)
  }
}
