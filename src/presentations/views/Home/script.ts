import { Component, Provide } from 'vue-property-decorator'
import Vue from 'vue'
import OnlineFriendsList from '@/presentations/views/Home/localComponents/OnlineFriendsList/index.vue'
import InstanceList from '@/presentations/views/Home/localComponents/InstanceList/index.vue'
import { Friend, Instance } from '@/types'
import InstanceModal from '@/presentations/views/Home/localComponents/InstanceModal/index.vue'
import JoinDialog from '@/presentations/views/Home/localComponents/JoinDialog/index.vue'
import {
  INSTANCE_MODAL_STORE_INJECT_KEY,
  INSTANCE_WATCH_DIALOG_STORE_INJECT_KEY,
  JOIN_DIALOG_STORE_INJECT_KEY,
} from '@/presentations/views/Home/store/InjectKey'
import { InstanceModalStore } from '@/presentations/views/Home/store/InstanceModalStore'
import { InstanceWatchDialogStore } from '@/presentations/views/Home/store/InstanceWatchDialogStore'
import { JoinDialogStore } from '@/presentations/views/Home/store/JoinDialogStore'

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
  instanceModalStore = new InstanceModalStore()

  @Provide(JOIN_DIALOG_STORE_INJECT_KEY)
  joinDialogStore = new JoinDialogStore()

  @Provide(INSTANCE_WATCH_DIALOG_STORE_INJECT_KEY)
  instanceWatchDialogStore = new InstanceWatchDialogStore()

  isInitialLoading = false
  isLaterLoading = false
  isVisibleSideMenu = false

  get friends(): Friend[] {
    return this.$store.friendsStore.friends.value
  }

  get instances(): Instance[] {
    return this.$store.instancesStore.instances.value
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
      this.$store.friendsStore.fetchFriendsAction(),
      this.$store.favoritesStore.fetchFavoritesAction(),
    ])
    await this.$store.instancesStore.updateAction(
      this.$store.friendsStore.friends.value
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
