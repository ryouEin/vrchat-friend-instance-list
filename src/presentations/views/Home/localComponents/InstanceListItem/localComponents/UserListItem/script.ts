import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { FavoriteTag, Friend } from '@/types'
import { Network } from '@/libs/Network/Network'
import { VRChatApi } from '@/libs/VRChatApi/VRChatApi'
import { favoritesStore } from '@/domains/DomainStoreFactory'

export type UserListItemPropFriend = Friend & { isOwner: boolean }

@Component({
  components: {},
})
export default class UserListItem extends Vue {
  favoriteGroup: FavoriteTag = 'group_0'

  @Prop()
  private friend!: UserListItemPropFriend

  get isFavorited() {
    return this.friend.favorite !== undefined
  }

  async favorite() {
    await favoritesStore.addFavoriteAction(this.friend.id, this.favoriteGroup)
  }

  async unfavorite() {
    if (this.friend.favorite === undefined) {
      throw new Error('cant delete favorite for not favorite user')
    }
    await favoritesStore.deleteFavoriteAction(this.friend.favorite.id)
  }
}
