import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import InstanceListItem from '@/presentations/views/Home/localComponents/InstanceListItem/index.vue'
import { instanceModalStore } from '@/presentations/ui_store/UiStoreFactory'
import { friendsStore, instancesStore } from '@/domains/DomainStoreFactory'

@Component({
  components: {
    InstanceListItem,
  },
})
export default class InstanceModal extends Vue {
  get isVisible() {
    return instanceModalStore.isVisible
  }

  get instance() {
    const location = instanceModalStore.location
    if (location === null) {
      throw new Error('location is null')
    }

    return instancesStore.instanceByLocation(location)
  }

  get friends() {
    const instance = this.instance
    if (instance === undefined) {
      throw new Error('instance is undefined.')
    }

    return friendsStore.friendsByLocation(instance.location)
  }

  async hide() {
    await instanceModalStore.hideAction()
  }
}
