import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import OnlineFriendsList from '@/presentations/views/Home/localComponents/OnlineFriendsList/index.vue'
import InstanceList from '@/presentations/views/Home/localComponents/InstanceList/index.vue'
import { Friend, FriendLocation } from '@/presentations/types'

@Component({
  components: {
    OnlineFriendsList,
    InstanceList,
  },
})
export default class Home extends Vue {
  private isReloading = false
  private isVisibleOnlineFriends = false

  @Prop({ required: true })
  readonly friends!: Friend[]

  @Prop({ required: true })
  readonly friendLocations!: FriendLocation[]

  @Prop({ required: true })
  readonly onReload!: () => Promise<void>

  get showFABLoading() {
    return this.isReloading
  }

  showOnlineFriends() {
    this.isVisibleOnlineFriends = true
  }

  hideOnlineFriends() {
    this.isVisibleOnlineFriends = false
  }

  async reload() {
    if (this.isReloading) return

    this.isReloading = true
    await this.onReload().finally(() => {
      this.isReloading = false
    })
  }
}
