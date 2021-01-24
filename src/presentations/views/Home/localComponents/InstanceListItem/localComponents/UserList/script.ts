import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import UserListItem from '../UserListItem/index.vue'
import { sortUsers } from '@/shame/sortUsers'
import { Friend } from '@/presentations/types'

@Component({
  components: {
    UserListItem,
  },
})
export default class UserList extends Vue {
  @Prop({ required: true })
  readonly friends!: Friend[]

  @Prop({ required: true })
  readonly ownerId!: string | undefined

  get sortedFriends() {
    return sortUsers(this.friends)
  }
}
