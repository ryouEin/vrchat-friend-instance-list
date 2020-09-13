import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { FavoriteTag, Friend } from '@/types'
import { favoritesStore } from '@/domains/DomainStoreFactory'

export type UserListItemPropFriend = Friend & { isOwner: boolean }

@Component
export default class UserListItem extends Vue {
  isLoadingFavorite = false

  menuPosition = {
    vertical: 'bottom',
    horizontal: 'left',
  }

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
    this.isLoadingFavorite = true
    await favoritesStore.addFavoriteAction(this.friend.id, favoriteTag)
    this.isLoadingFavorite = false
  }

  async unfavorite() {
    if (this.friend.favorite === undefined) {
      throw new Error('cant delete favorite for not favorite user')
    }
    this.isLoadingFavorite = true
    await favoritesStore.deleteFavoriteAction(this.friend.favorite.id)
    this.isLoadingFavorite = false
  }

  updateDropdownMenuPosition() {
    const scrollWidth = document.body.scrollWidth
    const menuButtonElement = this.$refs.menuButton as HTMLElement
    const menuButtonLeft = menuButtonElement.getBoundingClientRect().left
    const margin = scrollWidth - menuButtonLeft

    if (margin > 200) {
      this.menuPosition.horizontal = 'left'
    } else {
      this.menuPosition.horizontal = 'right'
    }
  }

  mounted() {
    window.addEventListener('resize', this.updateDropdownMenuPosition)
    this.updateDropdownMenuPosition()
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.updateDropdownMenuPosition)
  }
}
