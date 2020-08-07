import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { Friend } from '@/presentations/views/Home/script'
import { getInstancePermissionFromLocation } from '@/shame/getInstancePermissionFromLocation'
import { InstancePermission } from '@/types'

const Status = {
  Private: 'private',
  CanJoin: 'can join',
} as const
type Status = typeof Status[keyof typeof Status]

@Component({
  components: {},
})
export default class OnlineFriendsListItem extends Vue {
  @Prop()
  private friend!: Friend

  get status(): Status {
    const permission = getInstancePermissionFromLocation(this.friend.location)
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

  onClick() {
    this.$emit('click', this.friend)
  }
}
