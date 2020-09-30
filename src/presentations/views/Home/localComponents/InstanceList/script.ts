import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import InstanceListItem from '@/presentations/views/Home/localComponents/InstanceListItem/index.vue'
import { Friend, Instance } from '@/types'
import WatchInstanceDialog from '@/presentations/views/Home/localComponents/InstanceList/localComponents/WatchInstanceDialog/index.vue'

type Order = 'default' | 'friends_desc' | 'friends_asc'

@Component({
  components: {
    InstanceListItem,
    WatchInstanceDialog,
  },
})
export default class InstanceList extends Vue {
  isInitialized = false

  showOnlyFavoriteFriends = false

  order: Order = 'default'

  @Prop()
  private instances!: Instance[]

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

  get items(): { id: string; instance: Instance; friends: Friend[] }[] {
    return this.instances
      .map(instance => {
        return {
          id: instance.location,
          instance,
          friends: this.$store.friendsStore.friendsByLocation.value(
            instance.location
          ),
        }
      })
      .filter(instance => {
        if (!this.showOnlyFavoriteFriends) return true

        return (
          instance.friends.find(friend => friend.favorite !== undefined) !==
          undefined
        )
      })
      .sort((a, b) => {
        const isPrivate =
          a.instance.permission === 'private' ||
          b.instance.permission === 'private'
        if (this.order === 'default' || isPrivate) {
          return 0
        }

        if (this.order === 'friends_desc') {
          return b.friends.length - a.friends.length
        }

        return a.friends.length - b.friends.length
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
