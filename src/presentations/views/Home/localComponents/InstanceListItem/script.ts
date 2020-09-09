import { Component, Prop, Watch } from 'vue-property-decorator'
import Vue from 'vue'
import UserList from './localComponents/UserList/index.vue'
import { Friend, Instance, InstancePermission, World } from '@/types'
import WorldInfo from '@/presentations/views/Home/localComponents/InstanceListItem/localComponents/WorldInfo/index.vue'
import { worldsStore } from '@/domains/DomainStoreFactory'
import { UserListItemPropFriend } from '@/presentations/views/Home/localComponents/InstanceListItem/localComponents/UserListItem/script'

@Component({
  components: {
    UserList,
    WorldInfo,
  },
})
export default class InstanceListItem extends Vue {
  isLoading = false

  @Prop({ required: true })
  private instance!: Instance

  @Prop({ required: true })
  private friends!: Friend[]

  get location(): string {
    return this.instance.location
  }

  get worldId(): string {
    return this.instance.worldId
  }

  get world(): World | undefined {
    if (this.showWorldInfo) {
      return worldsStore.world(this.worldId)
    }

    return undefined
  }

  get userListItemPropFriends(): UserListItemPropFriend[] {
    return this.friends.map(friend => {
      return {
        ...friend,
        isOwner: friend.id === this.instance.ownerId,
      }
    })
  }

  get instancePermission(): InstancePermission {
    return this.instance.permission
  }

  get showWorldInfo(): boolean {
    return (
      this.instancePermission === InstancePermission.Friends ||
      this.instancePermission === InstancePermission.FriendPlus ||
      this.instancePermission === InstancePermission.Public
    )
  }

  get isPrivate(): boolean {
    return this.instancePermission === InstancePermission.Private
  }

  // virtual-scrollerはコンポーネントを使い回すためlocationの変更を見て
  // 初期化する必要がある
  @Watch('instance.location')
  async onChangeLocation() {
    await this.init()
  }

  async init() {
    this.isLoading = true
    if (this.showWorldInfo && this.world === undefined) {
      await worldsStore.fetchWorldAction(this.worldId).finally(() => {
        this.isLoading = false
      })
    }
  }

  async created() {
    await this.init()
  }
}
