import { Component, Provide } from 'vue-property-decorator'
import Vue from 'vue'
import OnlineFriendsList from '@/presentations/views/Home/localComponents/OnlineFriendsList/index.vue'
import InstanceList from '@/presentations/views/Home/localComponents/InstanceList/index.vue'
import { Friend, Instance } from '@/types'
import InstanceModal from '@/presentations/views/Home/localComponents/InstanceModal/index.vue'
import JoinDialog from '@/presentations/views/Home/localComponents/JoinDialog/index.vue'
import { createInstanceModalStore } from '@/presentations/views/Home/store/InstanceModalStore'
import {
  INSTANCE_MODAL_STORE_INJECT_KEY,
  INSTANCE_WATCH_DIALOG_STORE_INJECT_KEY,
  JOIN_DIALOG_STORE_INJECT_KEY,
} from '@/presentations/views/Home/store/InjectKey'
import { createJoinDialogStore } from '@/presentations/views/Home/store/JoinDialogStore'
import { createInstanceWatchDialogStore } from '@/presentations/views/Home/store/InstanceWatchDialogStore'

@Component({
  components: {
    OnlineFriendsList,
    InstanceList,
    InstanceModal,
    JoinDialog,
  },
})
export default class Home extends Vue {
  @Provide(INSTANCE_MODAL_STORE_INJECT_KEY)
  instanceModalStore = createInstanceModalStore()

  @Provide(JOIN_DIALOG_STORE_INJECT_KEY)
  joinDialogStore = createJoinDialogStore()

  @Provide(INSTANCE_WATCH_DIALOG_STORE_INJECT_KEY)
  instanceWatchDialogStore = createInstanceWatchDialogStore()

  isInitialLoading = false
  isLaterLoading = false
  isVisibleSideMenu = false

  get friends(): Friend[] {
    return this.$domainStore.friendsStore.friends.value
  }

  get instances(): Instance[] {
    return this.$domainStore.instancesStore.instances.value
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
    await Promise.all([
      this.$domainStore.friendsStore.fetchFriendsAction(),
      this.$domainStore.favoritesStore.fetchFavoritesAction(),
    ])
    await this.$domainStore.instancesStore.updateAction(
      this.$domainStore.friendsStore.friends.value
    )
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
