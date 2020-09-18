import { Component, Inject } from 'vue-property-decorator'
import Vue from 'vue'
import InstanceListItem from '@/presentations/views/Home/localComponents/InstanceListItem/index.vue'
import { InstanceModalStore } from '@/presentations/views/Home/store/InstanceModalStore'
import { INSTANCE_MODAL_STORE_INJECT_KEY } from '@/presentations/views/Home/store/InjectKey'

@Component({
  components: {
    InstanceListItem,
  },
})
export default class InstanceModal extends Vue {
  @Inject(INSTANCE_MODAL_STORE_INJECT_KEY)
  instanceModalStore!: InstanceModalStore

  get isVisible() {
    return this.instanceModalStore.isVisible
  }

  get instance() {
    const location = this.instanceModalStore.location
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
    await this.instanceModalStore.hideAction()
  }
}
