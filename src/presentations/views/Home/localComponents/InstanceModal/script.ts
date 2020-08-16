import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import { instanceModalModule, instancesModule } from '@/store/ModuleFactory'
import InstanceListItem from '@/presentations/views/Home/localComponents/InstanceListItem/index.vue'
import friendsStore from '@/store/module/FriendsStore'

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

  get friends() {
    const instance = this.instance
    if (instance === undefined) {
      throw new Error('instance is undefined.')
    }

    return friendsStore.friendsByLocation(instance.location)
  }

  hide() {
    instanceModalModule.hide()
  }
}
