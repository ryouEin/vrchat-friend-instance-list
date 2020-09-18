import { Component, Inject, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { Friend, InstancePermission } from '@/types'
import { InstanceModalStore } from '@/presentations/views/Home/store/InstanceModalStore'
import { INSTANCE_MODAL_STORE_INJECT_KEY } from '@/presentations/views/Home/store/InjectKey'

const Status = {
  Private: 'private',
  CanJoin: 'can join',
} as const
type Status = typeof Status[keyof typeof Status]

@Component({
  components: {},
})
export default class OnlineFriendsListItem extends Vue {
  @Inject(INSTANCE_MODAL_STORE_INJECT_KEY)
  instanceModalStore!: InstanceModalStore

  @Prop()
  private friend!: Friend

  get isFavorited() {
    return this.friend.favorite !== undefined
  }

  get instance() {
    return this.$store.instancesStore.instanceByLocation.value(
      this.friend.location
    )
  }

  // フレンド情報をストアに格納したあと、そのデータをつかってインスタンス情報を
  // ストアに格納するという都合上、フレンドの情報はあるがインスタンスの情報がないという
  // タイミングが存在してしまい、そのタイミングでinstanceがundefinedとなってしまう
  // そのタイミングでコンポーネントを表示させないためのgetter
  get isVisible() {
    return this.instance !== undefined
  }

  get status(): Status {
    if (this.instance === undefined) {
      throw new Error('instance is undefined')
    }

    const permission = this.instance.permission
    if (
      permission === InstancePermission.Public ||
      permission === InstancePermission.FriendPlus ||
      permission === InstancePermission.Friends
    ) {
      return Status.CanJoin
    }

    return Status.Private
  }

  get statusCssClass() {
    return {
      '-canJoin': this.status === Status.CanJoin,
    }
  }

  async onClick() {
    await this.instanceModalStore.showAction(this.friend.location)
  }
}
