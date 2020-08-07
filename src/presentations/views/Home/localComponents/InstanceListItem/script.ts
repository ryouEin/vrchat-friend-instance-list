import { Component, Prop, Watch } from 'vue-property-decorator'
import Vue from 'vue'
import {
  friendsModule,
  instanceModalModule,
  instancesModule,
  notificationsModule,
  worldsModule,
} from '@/presentations/store/ModuleFactory'
import UserList from './localComponents/UserList/index.vue'
import { getInstancePermissionFromLocation } from '@/shame/getInstancePermissionFromLocation'
import Permission from '@/presentations/views/Home/localComponents/InstanceListItem/localComponents/Permission/index.vue'
import { fetchInstanceInfo } from '@/infras/network/vrcApi'
import InstanceButton from '@/presentations/views/Home/localComponents/InstanceListItem/localComponents/InstanceButton/index.vue'
import WatchInstanceButton from '@/presentations/views/Home/localComponents/InstanceListItem/localComponents/WatchInstanceButton/index.vue'
import { INSTANCE_WATCH_INTERVAL } from '@/config/settings'
import {
  InstanceDetail,
  InstancePermission,
  Friend,
  World,
  Instance,
} from '@/types'

// TODO: めっちゃごちゃってる。リファクタリング必須
// TODO: ユーザー数更新ボタン関係の処理が肥大化してきたので分けたい
@Component({
  components: {
    UserList,
    Permission,
    InstanceButton,
    WatchInstanceButton,
  },
})
export default class InstanceListItem extends Vue {
  @Prop({ required: true })
  private instance!: Instance

  isFetchingUserNum = false

  fetchUserNumButtonDisabled = false

  get location(): string {
    return this.instance.location
  }

  get userNum() {
    return this.instance.userNum
  }

  get friends(): Friend[] {
    return friendsModule.friendsByLocation(this.location)
  }

  get worldId(): string {
    return this.location.split(':')[0]
  }

  get capacity(): number {
    const world = this.world
    if (world === undefined) {
      throw new Error('world is undefined')
    }

    return world.capacity === 1 ? 1 : world.capacity * 2
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

  get isFull() {
    if (this.userNum === undefined) {
      return false
    }

    return this.userNum >= this.capacity
  }

  get isPrivate(): boolean {
    return this.instancePermission === InstancePermission.Private
  }

  get world(): World | undefined {
    if (this.showWorldInfo) {
      return worldsModule.world(this.worldId)
    }

    return undefined
  }

  get currentUserNumText() {
    return this.userNum ?? '?'
  }

  get userNumClass() {
    return {
      '-full': this.isFull,
    }
  }

  // virtual-scrollerはコンポーネントを使い回すためlocationの変更を見て
  // 初期化する必要がある
  @Watch('instance.location')
  onChangeLocation() {
    this.init()
  }

  join() {
    window.location.href = `vrchat://launch?id=${this.location}`
  }

  async updateUserNum() {
    if (this.isFetchingUserNum) return

    this.fetchUserNumButtonDisabled = true
    this.isFetchingUserNum = true
    await instancesModule.updateUserNum(this.location).finally(() => {
      this.isFetchingUserNum = false
      setTimeout(() => {
        this.fetchUserNumButtonDisabled = false
      }, 10 * 1000)
    })
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
