import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import InstanceButton from '@/presentations/views/Home/localComponents/InstanceListItem/localComponents/WorldInfo/localComponents/InstanceButton/index.vue'
import { Instance } from '@/types'
import { instancesStore } from '@/domains/DomainStoreFactory'
import { instanceWatchDialogStore } from '@/presentations/ui_store/UiStoreFactory'

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
