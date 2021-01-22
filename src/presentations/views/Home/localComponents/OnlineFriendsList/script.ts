import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import OnlineFriendsListItem from '@/presentations/views/Home/localComponents/OnlineFriendsListItem/index.vue'
import { sortUsers } from '@/shame/sortUsers'
import { Friend } from '@/presentations/types'

@Component({
  components: {
    OnlineFriendsListItem,
  },
})
export default class OnlineFriendsList extends Vue {
  @Prop({ required: true })
  readonly friends!: Friend[]

  private isInitialized = false

  get sortedFriends() {
    return sortUsers(this.friends)
  }

  get itemHeight() {
    return 80
  }

  get scrollerElement() {
    const scroller = this.$refs.scroller as Vue
    return scroller.$el as HTMLElement
  }

  mounted() {
    this.isInitialized = true
  }
}
