import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { Friend } from '@/types'

export type UserListItemPropFriend =
  | Friend
  | {
      isOwner: boolean
    }

@Component({
  components: {},
})
export default class UserListItem extends Vue {
  @Prop()
  private friend!: UserListItemPropFriend
}
