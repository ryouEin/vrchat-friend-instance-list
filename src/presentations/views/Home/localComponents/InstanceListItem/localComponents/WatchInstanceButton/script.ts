import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import InstanceButton from '@/presentations/views/Home/localComponents/InstanceListItem/localComponents/InstanceButton/index.vue'
import {
  instancesModule,
  instanceWatchDialogModule,
} from '@/presentations/store/ModuleFactory'
import { Instance } from '@/types'

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
    await instancesModule.unwatchInstance(this.location)
  }

  showDialog() {
    instanceWatchDialogModule.show(this.instance)
  }
}
