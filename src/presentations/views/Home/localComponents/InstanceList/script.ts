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
  isVisibleToTop = false

  showOnlyFavoriteFriends = false

  @Prop()
  private instances!: Instance[]

  get items(): { id: string; instance: Instance; friends: Friend[] }[] {
    return this.instances
      .map(instance => {
        return {
          id: instance.location,
          instance,
          friends: friendsStore.friendsByLocation(instance.location),
        }
      })
      .filter(instance => {
        if (!this.showOnlyFavoriteFriends) return true

        return instance.friends.find(friend => friend.isFavorited) !== undefined
      })
  }

  get scrollerElement() {
    const scroller = this.$refs.scroller as Vue
    return scroller.$el as HTMLElement
  }

  toTop() {
    this.scrollerElement.scrollTo({
      top: 0,
    })
  }

  updateToTop() {
    const scrollTop = this.scrollerElement.scrollTop

    if (scrollTop > 100) {
      this.isVisibleToTop = true
    } else {
      this.isVisibleToTop = false
    }
  }

  mounted() {
    this.scrollerElement.addEventListener('scroll', this.updateToTop)
  }

  beforeDestroy() {
    this.scrollerElement.removeEventListener('scroll', this.updateToTop)
  }
}
