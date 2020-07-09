import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { notificationsModule, worldsModule } from '@/store/ModuleFactory'
import UserList from './localComponents/UserList/index.vue'
import { getInstancePermissionFromLocation } from '@/shame/getInstancePermissionFromLocation'
import Permission from '@/views/Home/localComponents/InstanceListItem/localComponents/Permission/index.vue'
import Spinner from '@/components/Spinner/index.vue'
import { fetchInstanceInfo } from '@/infras/network/vrcApi'
import Icon from '@/components/Icon/index.vue'
import InstanceButton from '@/views/Home/localComponents/InstanceListItem/localComponents/InstanceButton/index.vue'
import WatchInstanceButton from '@/views/Home/localComponents/InstanceListItem/localComponents/WatchInstanceButton/index.vue'
import { INSTANCE_WATCH_INTERVAL } from '@/config/settings'
import { InstancePermission, User, World } from '@/types'

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
  private users!: User[]

  userNum: number | null = null

  notifyUserNum = 1

  isFetchingUserNum = false

  isWatching = false

  fetchUserNumButtonDisabled = false

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

  onChangeNotifyUserNum(userNum: number) {
    this.notifyUserNum = userNum
  }

  join() {
    window.location.href = `vrchat://launch?id=${this.location}`
  }

  async fetchUserNum() {
    const instanceInfo = await fetchInstanceInfo(this.location)

    this.userNum = instanceInfo.n_users
  }

  async checkUserNum() {
    if (!this.isWatching) return

    await this.fetchUserNum()
    if (this.userNum === null) {
      // TODO: 例外時の正しい対処を考える
      throw new Error('userNum is null.')
    }
    const space = this.capacity - this.userNum
    if (space >= this.notifyUserNum) {
      this.isWatching = false
      notificationsModule.pushNotification({
        text: `${this.world!.name}に空きができました`,
        date: Date.now(),
        onClick: () => {
          this.$scrollToInstance(this.location)
        },
      })
      return
    }

    setTimeout(() => {
      this.checkUserNum()
    }, INSTANCE_WATCH_INTERVAL)
  }

  onClickStartWatch() {
    this.isWatching = true
    this.checkUserNum()
  }

  onClickEndWatch() {
    this.isWatching = false
  }

  async updateUserNum() {
    if (this.isFetchingUserNum) return

    this.fetchUserNumButtonDisabled = true
    this.isFetchingUserNum = true
    await this.fetchUserNum().finally(() => {
      this.isFetchingUserNum = false
      setTimeout(() => {
        this.fetchUserNumButtonDisabled = false
      }, 10 * 1000)
    })
  }

  async created() {
    if (this.showWorldInfo && this.world === undefined) {
      worldsModule.fetchWorld(this.worldId)
    }
  }
}
