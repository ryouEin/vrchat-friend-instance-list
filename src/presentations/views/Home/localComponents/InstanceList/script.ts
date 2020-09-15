import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import InstanceListItem from '@/presentations/views/Home/localComponents/InstanceListItem/index.vue'
import { Friend, Instance } from '@/types'
import WatchInstanceDialog from '@/presentations/views/Home/localComponents/InstanceList/localComponents/WatchInstanceDialog/index.vue'
import { friendsStore } from '@/domains/DomainStoreFactory'

@Component({
  components: {
    InstanceListItem,
    WatchInstanceDialog,
  },
})
export default class InstanceList extends Vue {
  isInitialized = false

  showOnlyFavoriteFriends = false

  @Prop()
  private instances!: Instance[]

  get items(): { id: string; instance: Instance; friends: Friend[] }[] {
    const friends = friendsStore.friends

    return this.instances
      .map(instance => {
        return {
          id: instance.location,
          instance,
          friends: friends.filter(
            friend => friend.location === instance.location
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
  }

  get scrollerElement() {
    const scroller = this.$refs.scroller as Vue
    return scroller.$el as HTMLElement
  }

  mounted() {
    this.isInitialized = true
  }
}
