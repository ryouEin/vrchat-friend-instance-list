import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { FavoriteTag, Friend } from '@/types'
import { favoritesStore } from '@/domains/DomainStoreFactory'

export type UserListItemPropFriend = Friend & { isOwner: boolean }

@Component
export default class UserListItem extends Vue {
  @Prop()
  private friend!: UserListItemPropFriend

  get isFavorited() {
    return this.friend.favorite !== undefined
  }

  get dropdownMenuItems() {
    if (this.isFavorited) {
      return [
        {
          label: 'Unfavorite',
          onClick: async () => {
            await this.unfavorite()
          },
        },
      ]
    }

    return [
      {
        label: 'Favorite Group 0',
        onClick: async () => {
          await this.favorite('group_0')
        },
      },
      {
        label: 'Favorite Group 1',
        onClick: async () => {
          await this.favorite('group_1')
        },
      },
      {
        label: 'Favorite Group 2',
        onClick: async () => {
          await this.favorite('group_2')
        },
      },
    ]
  }

  async favorite(favoriteTag: FavoriteTag) {
    await favoritesStore.addFavoriteAction(this.friend.id, favoriteTag)
  }

  async unfavorite() {
    if (this.friend.favorite === undefined) {
      throw new Error('cant delete favorite for not favorite user')
    }
    await favoritesStore.deleteFavoriteAction(this.friend.favorite.id)
  }
}
