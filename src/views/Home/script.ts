import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import { usersModule } from '@/store/ModuleFactory'
import UserList from '@/views/Home/localComponents/UserList/index.vue'
import InstanceList from '@/views/Home/localComponents/InstanceList/index.vue'
import FAB from '@/components/FAB/index.vue'
import * as Presentation from '@/types/Presentation'

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
  },
})
export default class Home extends Vue {
  focusedUser: Presentation.User | null = null

  get users(): User[] {
    return usersModule.users.map(user => {
      return {
        ...user,
        isFocused: user.id === this.focusedUser?.id,
      }
    })
  }

  async fetchData() {
    this.$fullLoader.show()
    await usersModule.fetchUsers().finally(() => {
      this.$fullLoader.hide()
    })
  }

  async reload() {
    await this.fetchData()
  }

  onFocusUser(user: User) {
    this.focusedUser = user
  }

  async created() {
    await this.fetchData()
  }
}
