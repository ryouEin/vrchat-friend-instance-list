import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import OnlineFriendsListItem from '@/presentations/views/Home/localComponents/OnlineFriendsListItem/index.vue'
import { Friend } from '@/types'
import { sortUsers } from '@/presentations/views/Home/localComponents/OnlineFriendsList/sortUsers'

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
