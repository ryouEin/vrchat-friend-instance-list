import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import { friendsModule } from '@/store/ModuleFactory'
import OnlineFriendsList from '@/views/Home/localComponents/OnlineFriendsList/index.vue'
import InstanceList from '@/views/Home/localComponents/InstanceList/index.vue'
import { InstanceDetail } from '@/types'
import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'
import Instance from '@/views/Home/localComponents/InstanceListItem/index.vue'

// TODO: コンポーネント特有の型の持ち方を再考
export interface Friend {
  id: string
  username: string
  displayName: string
  currentAvatarImageUrl: string
  currentAvatarThumbnailImageUrl: string
  location: string
  isFavorited: boolean
  isNew: boolean
  isFocused: boolean
}

@Component({
  components: {
    OnlineFriendsList,
    InstanceList,
    Instance,
  },
})
export default class Home extends Vue {
  isInitialLoading = false
  isLaterLoading = false

  focusedFriend: Friend | null = null

  get friends(): Friend[] {
    return friendsModule.friends.map(friend => {
      return {
        ...friend,
        isFocused: friend.id === this.focusedFriend?.id,
      }
    })
  }

  get instances(): InstanceDetail[] {
    const tmp: { [key: string]: Friend[] } = groupBy(this.friends, 'location')
    const instances = Object.entries(tmp).map(item => {
      const [location, friends] = item

      return {
        location,
        friends,
      }
    })

    const instancesWithoutPrivate = sortBy(
      instances.filter(instance => instance.location !== 'private'),
      'location'
    )
    const privateInstance = instances.filter(
      instance => instance.location === 'private'
    )

    return instancesWithoutPrivate.concat(privateInstance)
  }

  get instanceOfFocusedFriend(): InstanceDetail | null {
    const focusedUser = this.focusedFriend
    if (focusedUser === null) {
      return null
    }

    const instance = this.instances.find(instance => {
      return instance.location === focusedUser.location
    })

    if (instance === undefined) {
      return null
    }

    return instance
  }

  get showOnlineFriendsListLoading() {
    return this.isInitialLoading
  }

  get showInstanceListLoading() {
    return this.isInitialLoading
  }

  get showFABLoading() {
    return this.isLaterLoading
  }

  get isVisibleInstanceModal() {
    return this.instanceOfFocusedFriend !== null
  }

  async fetchData() {
    await friendsModule.fetchFriends()
  }

  async reload() {
    if (this.isLaterLoading) return

    this.isLaterLoading = true
    await this.fetchData().finally(() => {
      this.isLaterLoading = false
    })
  }

  onClickUser(user: Friend) {
    this.focusedFriend = user
  }

  async created() {
    this.isInitialLoading = true
    await this.fetchData().finally(() => {
      this.isInitialLoading = false
    })
  }
}
