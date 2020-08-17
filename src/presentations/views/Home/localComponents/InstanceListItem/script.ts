import { Component, Prop, Watch } from 'vue-property-decorator'
import Vue from 'vue'
import UserList from './localComponents/UserList/index.vue'
import { getInstancePermissionFromLocation } from '@/shame/getInstancePermissionFromLocation'
import { Friend, Instance, InstancePermission, World } from '@/types'
import { parseLocation } from '@/shame/parseLocation'
import WorldInfo from '@/presentations/views/Home/localComponents/InstanceListItem/localComponents/WorldInfo/index.vue'
import { worldsStore } from '@/store/data/DataStoreFactory'

@Component({
  components: {
    UserList,
    WorldInfo,
  },
})
export default class InstanceListItem extends Vue {
  @Prop({ required: true })
  private instance!: Instance

  @Prop({ required: true })
  private friends!: Friend[]

  get location(): string {
    return this.instance.location
  }

  get worldId(): string {
    return parseLocation(this.location).worldId
  }

  get world(): World | undefined {
    if (this.showWorldInfo) {
      return worldsStore.world(this.worldId)
    }

    return undefined
  }

  get instancePermission(): InstancePermission {
    return getInstancePermissionFromLocation(this.location)
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
    if (this.showWorldInfo && this.world === undefined) {
      await worldsStore.fetchWorldAction(this.worldId)
    }
  }

  async created() {
    await this.init()
  }
}
