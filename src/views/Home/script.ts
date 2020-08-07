import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import { usersModule } from '@/store/ModuleFactory'
import UserList from '@/views/Home/localComponents/UserList/index.vue'
import InstanceList from '@/views/Home/localComponents/InstanceList/index.vue'
import { InstanceDetail } from '@/types'
import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'
import Instance from '@/views/Home/localComponents/InstanceListItem/index.vue'

// TODO: コンポーネント特有の型の持ち方を再考
export interface User {
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
    UserList,
    InstanceList,
    Instance,
  },
})
export default class Home extends Vue {
  isInitialLoading = false
  isLaterLoading = false

  focusedUser: User | null = null

  get users(): User[] {
    return usersModule.users.map(user => {
      return {
        ...user,
        isFocused: user.id === this.focusedUser?.id,
      }
    })
  }

  get instances(): InstanceDetail[] {
    const tmp: { [key: string]: User[] } = groupBy(this.users, 'location')
    const instances = Object.entries(tmp).map(item => {
      const [location, users] = item

      return {
        location,
        users,
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

  get instanceOfFocusedUser(): InstanceDetail | null {
    const focusedUser = this.focusedUser
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

  get showUserListLoading() {
    return this.isInitialLoading
  }

  get showInstanceListLoading() {
    return this.isInitialLoading
  }

  get showFABLoading() {
    return this.isLaterLoading
  }

  get isVisibleInstanceModal() {
    return this.instanceOfFocusedUser !== null
  }

  async fetchData() {
    await usersModule.fetchUsers()
  }

  async reload() {
    if (this.isLaterLoading) return

    this.isLaterLoading = true
    await this.fetchData().finally(() => {
      this.isLaterLoading = false
    })
  }

  onClickUser(user: User) {
    this.focusedUser = user
  }

  async created() {
    this.isInitialLoading = true
    await this.fetchData().finally(() => {
      this.isInitialLoading = false
    })
  }
}
