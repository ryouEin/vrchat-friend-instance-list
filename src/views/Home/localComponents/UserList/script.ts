import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { User } from '@/views/Home/script'
import { sortUsers } from '@/shame/sortUsers'
import UserListItem from '@/views/Home/localComponents/UserListItem/index.vue'

@Component({
  components: {
    UserListItem,
  },
})
export default class UserList extends Vue {
  @Prop()
  private users!: User[]

  get sortedUsers() {
    return sortUsers(this.users)
  }

  get itemHeight() {
    return 80
  }

  onClick(user: User) {
    this.$emit('focusUser', user)
    this.$scrollToUser(user.id)
  }
}
