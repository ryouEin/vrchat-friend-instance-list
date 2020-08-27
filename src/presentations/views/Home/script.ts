import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import OnlineFriendsList from '@/presentations/views/Home/localComponents/OnlineFriendsList/index.vue'
import InstanceList from '@/presentations/views/Home/localComponents/InstanceList/index.vue'
import { Friend, Instance } from '@/types'
import InstanceModal from '@/presentations/views/Home/localComponents/InstanceModal/index.vue'
import { friendsStore, instancesStore } from '@/domains/DomainStoreFactory'
import JoinDialog from '@/presentations/views/Home/localComponents/JoinDialog/index.vue'

@Component({
  components: {
    OnlineFriendsList,
    InstanceList,
    InstanceModal,
    JoinDialog,
  },
})
export default class Home extends Vue {
  isInitialLoading = false
  isLaterLoading = false
  isVisibleSideMenu = false

  get friends(): Friend[] {
    return friendsStore.friends
  }

  get instances(): Instance[] {
    return instancesStore.instances
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

  showInstanceList() {
    this.isVisibleSideMenu = true
  }

  hideInstanceList() {
    this.isVisibleSideMenu = false
  }

  async fetchData() {
    await friendsStore.fetchFriendsAction()
    await instancesStore.updateAction(friendsStore.friends)
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
