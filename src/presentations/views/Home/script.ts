import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import { friendsModule, instancesModule } from '@/store/ModuleFactory'
import OnlineFriendsList from '@/presentations/views/Home/localComponents/OnlineFriendsList/index.vue'
import InstanceList from '@/presentations/views/Home/localComponents/InstanceList/index.vue'
import { Friend, Instance } from '@/types'
import InstanceModal from '@/presentations/views/Home/localComponents/InstanceModal/index.vue'

@Component({
  components: {
    OnlineFriendsList,
    InstanceList,
    InstanceModal,
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

  get showOnlineFriendsListLoading() {
    return this.isInitialLoading
  }

  get showInstanceListLoading() {
    return this.isInitialLoading
  }

  get showFABLoading() {
    return this.isLaterLoading
  }

  async fetchData() {
    await friendsModule.fetchFriends()
    await instancesModule.update(friendsModule.friends)
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
