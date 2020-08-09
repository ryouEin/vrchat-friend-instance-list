import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import {
  instanceModalModule,
  instancesModule,
} from '@/presentations/store/ModuleFactory'
import InstanceListItem from '@/presentations/views/Home/localComponents/InstanceListItem/index.vue'

@Component({
  components: {
    InstanceListItem,
  },
})
export default class InstanceModal extends Vue {
  get isVisible() {
    return instanceModalModule.isVisible
  }

  get instance() {
    const location = instanceModalModule.location
    if (location === null) {
      throw new Error('location is null')
    }

    return instancesModule.instanceByLocation(location)
  }

  hide() {
    instanceModalModule.hide()
  }
}