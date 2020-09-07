import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import OnlineFriendsListItem from '@/presentations/views/Home/localComponents/OnlineFriendsListItem/index.vue'
import { Friend } from '@/types'

export const sortUsers: (users: Friend[]) => Friend[] = users => {
  return users.sort((a, b) => {
    if (a.isFavorited !== b.isFavorited) {
      return a.isFavorited ? -1 : 1
    }

    if (a.isNew !== b.isNew) {
      return a.isNew ? -1 : 1
    }

    return a.displayName.localeCompare(b.displayName, 'ja')
  })
}

@Component({
  components: {
    OnlineFriendsListItem,
  },
})
export default class OnlineFriendsList extends Vue {
  @Prop()
  private friends!: Friend[]

  get sortedFriends() {
    return sortUsers(this.friends)
  }

  get itemHeight() {
    return 80
  }
}
