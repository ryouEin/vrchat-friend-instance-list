import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import * as Presentation from '@/types/Presentation'
import { worldsModule } from '@/store/ModuleFactory'
import UserList from './localComponents/UserList/index.vue'
import { getInstancePermissionFromLocation } from '@/shame/getInstancePermissionFromLocation'
import { InstancePermission } from '@/types/InstancePermission'
import Permission from '@/views/Home/localComponents/InstanceListItem/localComponents/Permission/index.vue'
import Spinner from '@/components/Spinner/index.vue'
import { fetchInstanceInfo } from '@/infras/network/vrcApi'
import Icon from '@/components/Icon/index.vue'
import InstanceButton from '@/views/Home/localComponents/InstanceListItem/localComponents/InstanceButton/index.vue'
import WatchInstanceButton from '@/views/Home/localComponents/InstanceListItem/localComponents/WatchInstanceButton/index.vue'

// TODO: めっちゃごちゃってる。リファクタリング必須
// TODO: ユーザー数更新ボタン関係の処理が肥大化してきたので分けたい
@Component({
  components: {
    UserList,
    Permission,
    Spinner,
    Icon,
    InstanceButton,
    WatchInstanceButton,
  },
})
export default class Instance extends Vue {
  @Prop()
  private location!: string

  @Prop()
  private users!: Presentation.User[]

  userNum: number | null = null

  isFetchingUserNum = false

  fetchUserNumButtonDisabled = false

  get worldId(): string {
    return this.location.split(':')[0]
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

  get world(): Presentation.World | undefined {
    if (this.showWorldInfo) {
      return worldsModule.world(this.worldId)
    }

    return undefined
  }

  get currentUserNumText() {
    return this.userNum ?? '?'
  }

  join() {
    window.location.href = `vrchat://launch?id=${this.location}`
  }

  async updateUserNum() {
    if (this.isFetchingUserNum) return

    this.fetchUserNumButtonDisabled = true
    this.isFetchingUserNum = true
    const instanceInfo = await fetchInstanceInfo(this.location).finally(() => {
      this.isFetchingUserNum = false
      setTimeout(() => {
        this.fetchUserNumButtonDisabled = false
      }, 10 * 1000)
    })

    this.userNum = instanceInfo.n_users
  }

  async created() {
    if (this.showWorldInfo && this.world === undefined) {
      worldsModule.fetchWorld(this.worldId)
    }
  }
}
