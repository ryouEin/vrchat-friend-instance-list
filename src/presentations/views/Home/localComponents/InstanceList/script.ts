import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import InstanceListItem from '@/presentations/views/Home/localComponents/InstanceListItem/index.vue'
import { FriendLocation } from '@/presentations/types'

type Order = 'default' | 'friends_desc' | 'friends_asc'

@Component({
  components: {
    InstanceListItem,
  },
})
export default class InstanceList extends Vue {
  private isInitialized = false

  private showOnlyFavoriteFriends = false

  private order: Order = 'default'

  @Prop({ required: true })
  readonly friendLocations!: FriendLocation[]

  get orderSelectItems(): { label: string; value: Order }[] {
    return [
      {
        label: 'なし',
        value: 'default',
      },
      {
        label: 'フレンドが多い順',
        value: 'friends_desc',
      },
      {
        label: 'フレンドが少ない順',
        value: 'friends_asc',
      },
    ]
  }

  get items() {
    return this.friendLocations
      .map(friendLocation => {
        return {
          id: friendLocation.location,
          friendLocation,
        }
      })
      .filter(item => {
        if (!this.showOnlyFavoriteFriends) return true

        return (
          item.friendLocation.friends.find(
            friend => friend.favorite !== undefined
          ) !== undefined
        )
      })
      .sort((a, b) => {
        const isPrivate =
          a.friendLocation.instance === undefined ||
          b.friendLocation.instance === undefined
        if (this.order === 'default' || isPrivate) {
          return 0
        }

        if (this.order === 'friends_desc') {
          return (
            b.friendLocation.friends.length - a.friendLocation.friends.length
          )
        }

        return a.friendLocation.friends.length - b.friendLocation.friends.length
      })
  }

  get scrollerElement() {
    const scroller = this.$refs.scroller as Vue
    return scroller.$el as HTMLElement
  }

  mounted() {
    this.isInitialized = true
  }
}
