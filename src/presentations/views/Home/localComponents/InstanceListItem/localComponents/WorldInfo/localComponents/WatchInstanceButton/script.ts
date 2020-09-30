import { Component, Inject, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import InstanceButton from '@/presentations/views/Home/localComponents/InstanceListItem/localComponents/WorldInfo/localComponents/InstanceButton/index.vue'
import { Instance } from '@/types'
import { INSTANCE_WATCH_DIALOG_STORE_INJECT_KEY } from '@/presentations/views/Home/store/InjectKey'
import { InstanceWatchDialogStore } from '@/presentations/views/Home/store/InstanceWatchDialogStore'

@Component({
  components: {
    InstanceButton,
  },
})
export default class WatchInstanceButton extends Vue {
  @Inject(INSTANCE_WATCH_DIALOG_STORE_INJECT_KEY)
  instanceWatchDialogStore!: InstanceWatchDialogStore

  @Prop({ required: true })
  instance!: Instance

  get location() {
    return this.instance.location
  }

  get isWatching() {
    return this.instance.isWatching
  }

  async endWatch() {
    await this.$store.instancesStore.unwatchInstanceAction(this.location)
  }

  async showDialog() {
    await this.instanceWatchDialogStore.showAction(this.instance)
  }
}
