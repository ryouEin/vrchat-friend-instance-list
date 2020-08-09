import { Component, Prop, Watch } from 'vue-property-decorator'
import Vue from 'vue'
import {
  friendsModule,
  worldsModule,
} from '@/presentations/store/ModuleFactory'
import UserList from './localComponents/UserList/index.vue'
import { getInstancePermissionFromLocation } from '@/shame/getInstancePermissionFromLocation'
import { Friend, Instance, InstancePermission, World } from '@/types'
import { parseLocation } from '@/shame/parseLocation'
import WorldInfo from '@/presentations/views/Home/localComponents/InstanceListItem/localComponents/WorldInfo/index.vue'

@Component({
  components: {
    UserList,
    WorldInfo,
  },
})
export default class InstanceListItem extends Vue {
  @Prop({ required: true })
  private instance!: Instance

  get location(): string {
    return this.instance.location
  }

  get friends(): Friend[] {
    return friendsModule.friendsByLocation(this.location)
  }

  get worldId(): string {
    return parseLocation(this.location).worldId
  }

  get world(): World | undefined {
    if (this.showWorldInfo) {
      return worldsModule.world(this.worldId)
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
  onChangeLocation() {
    this.init()
  }

  init() {
    if (this.showWorldInfo && this.world === undefined) {
      worldsModule.fetchWorld(this.worldId)
    }
  }

  async created() {
    this.init()
  }
}
