import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import { usersModule } from '@/store/ModuleFactory'
import UserList from '@/views/Home/localComponents/UserList/index.vue'
import InstanceList from '@/views/Home/localComponents/InstanceList/index.vue'
import FAB from '@/components/FAB/index.vue'
import * as Presentation from '@/types/Presentation'
import Spinner from '@/components/Spinner/index.vue'
import Icon from '@/components/Icon/index.vue'

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
    FAB,
    Spinner,
    Icon,
  },
})
export default class Home extends Vue {
  isInitialLoading = false
  isLaterLoading = false
  focusedUser: Presentation.User | null = null

  get users(): User[] {
    return usersModule.users.map(user => {
      return {
        ...user,
        isFocused: user.id === this.focusedUser?.id,
      }
    })
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

  onFocusUser(user: User) {
    this.focusedUser = user
  }

  async created() {
    this.isInitialLoading = true
    await this.fetchData().finally(() => {
      this.isInitialLoading = false
    })
  }
}
