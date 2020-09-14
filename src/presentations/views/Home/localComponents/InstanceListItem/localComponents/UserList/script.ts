import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import UserListItem from '../UserListItem/index.vue'
import { UserListItemPropFriend } from '@/presentations/views/Home/localComponents/InstanceListItem/localComponents/UserListItem/script'
import { sortUsers } from '@/shame/sortUsers'

@Component({
  components: {
    UserListItem,
  },
})
export default class UserList extends Vue {
  @Prop()
  private friends!: UserListItemPropFriend[]

  get sortedFriends() {
    return sortUsers(this.friends)
  }
}
