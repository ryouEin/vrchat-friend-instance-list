import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { User } from '@/views/Home/script'
import { getInstancePermissionFromLocation } from '@/shame/getInstancePermissionFromLocation'
import FavoriteMark from '@/components/FavoriteMark/index.vue'
import { InstancePermission } from '@/types'

const Status = {
  Private: 'private',
  CanJoin: 'can join',
} as const
type Status = typeof Status[keyof typeof Status]

@Component({
  components: {
    FavoriteMark,
  },
})
export default class UserListItem extends Vue {
  @Prop()
  private user!: User

  get status(): Status {
    const permission = getInstancePermissionFromLocation(this.user.location)
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
    this.$emit('click', this.user)
  }
}
