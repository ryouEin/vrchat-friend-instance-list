import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import InstanceListItem from '@/presentations/views/Home/localComponents/InstanceListItem/index.vue'
import { instanceModalStore } from '@/presentations/ui_store/UiStoreFactory'

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

    return this.$domainStore.instancesStore.instanceByLocation.value(location)
  }

  get friends() {
    const instance = this.instance
    if (instance === undefined) {
      throw new Error('instance is undefined.')
    }

    return this.$domainStore.friendsStore.friendsByLocation.value(
      instance.location
    )
  }

  async hide() {
    await instanceModalStore.hideAction()
  }
}
