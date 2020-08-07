import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import {
  friendsModule,
  instanceModalModule,
  instancesModule,
} from '@/presentations/store/ModuleFactory'
import OnlineFriendsList from '@/presentations/views/Home/localComponents/OnlineFriendsList/index.vue'
import InstanceList from '@/presentations/views/Home/localComponents/InstanceList/index.vue'
import { Friend, Instance } from '@/types'
import InstanceListItem from '@/presentations/views/Home/localComponents/InstanceListItem/index.vue'

@Component({
  components: {
    OnlineFriendsList,
    InstanceList,
    InstanceListItem,
  },
})
export default class Home extends Vue {
  isInitialLoading = false
  isLaterLoading = false

  get friends(): Friend[] {
    return friendsModule.friends
  }

  get instances(): Instance[] {
    return instancesModule.instances
  }

  get isVisibleInstanceModal() {
    return instanceModalModule.isVisible
  }

  get instanceModalInstance() {
    const location = instanceModalModule.location
    if (location === null) {
      throw new Error('location is null')
    }

    return instancesModule.instanceByLocation(location)
  }

  get showOnlineFriendsListLoading() {
    return this.isInitialLoading
  }

  get showInstanceListLoading() {
    return this.isInitialLoading
  }

  get showFABLoading() {
    return this.isLaterLoading
  }

  onClickInstanceModalOverlay() {
    instanceModalModule.hide()
  }

  async fetchData() {
    await friendsModule.fetchFriends()
    await instancesModule.updateInstances()
  }

  async reload() {
    if (this.isLaterLoading) return

    this.isLaterLoading = true
    await this.fetchData().finally(() => {
      this.isLaterLoading = false
    })
  }

  async created() {
    this.isInitialLoading = true
    await this.fetchData().finally(() => {
      this.isInitialLoading = false
    })
  }
}
