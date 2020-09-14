import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import OnlineFriendsListItem from '@/presentations/views/Home/localComponents/OnlineFriendsListItem/index.vue'
import { Friend } from '@/types'
import { sortUsers } from '@/shame/sortUsers'

@Component({
  components: {
    OnlineFriendsListItem,
  },
})
export default class OnlineFriendsList extends Vue {
  isVisibleToTop = false

  @Prop()
  private friends!: Friend[]

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

  toTop() {
    this.scrollerElement.scrollTo({ top: 0 })
  }

  updateToTop() {
    const scrollTop = this.scrollerElement.scrollTop

    this.isVisibleToTop = scrollTop > 100
  }

  mounted() {
    this.scrollerElement.addEventListener('scroll', this.updateToTop)
  }

  beforeDestroy() {
    this.scrollerElement.removeEventListener('scroll', this.updateToTop)
  }
}
