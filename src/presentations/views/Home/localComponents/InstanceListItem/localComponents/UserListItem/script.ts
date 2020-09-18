import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { FavoriteTag, Friend } from '@/types'
import { VRChatApiFavoriteLimitReachedError } from '@/libs/VRChatApi/VRChatApi'
import { MAX_FAVORITE_PER_GROUP } from '@/config/settings'

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

    const items: { label: string; tag: FavoriteTag }[] = [
      {
        label: 'Group 0',
        tag: 'group_0',
      },
      {
        label: 'Group 1',
        tag: 'group_1',
      },
      {
        label: 'Group 2',
        tag: 'group_2',
      },
    ]

    return items.map(item => {
      const currentNum = this.$store.favoritesStore.favorites.value.filter(
        favorite => favorite.tags.includes(item.tag)
      ).length

      return {
        label: `Favorite ${item.label} (${currentNum}/${MAX_FAVORITE_PER_GROUP})`,
        onClick: async () => {
          await this.favorite(item.tag)
        },
        isDisabled: currentNum >= MAX_FAVORITE_PER_GROUP,
      }
    })
  }

  async favorite(favoriteTag: FavoriteTag) {
    this.isLoadingFavorite = true
    await this.$store.favoritesStore
      .addFavoriteAction(this.friend.id, favoriteTag)
      .catch(error => {
        let content = ''
        if (error instanceof VRChatApiFavoriteLimitReachedError) {
          content = `グループの登録数上限に達したため、${this.friend.displayName}のFavoriteが失敗しました`
        } else {
          content = `${this.friend.displayName}のFavoriteが失敗しました`
        }
        this.$store.toastsStore.showAction({
          type: 'error',
          content,
        })
      })
      .finally(() => {
        this.isLoadingFavorite = false
      })
  }

  async unfavorite() {
    if (this.friend.favorite === undefined) {
      throw new Error('cant delete favorite for not favorite user')
    }
    this.isLoadingFavorite = true
    await this.$store.favoritesStore
      .deleteFavoriteAction(this.friend.favorite.id)
      .catch(() => {
        this.$store.toastsStore.showAction({
          type: 'error',
          content: `${this.friend.displayName}のUnfavoriteが失敗しました`,
        })
      })
      .finally(() => {
        this.isLoadingFavorite = false
      })
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
