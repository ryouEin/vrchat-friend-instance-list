import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { favoritesRepository } from '@/singletonFactory'
import { FavoriteLimit, Friend } from '@/presentations/types'
import { OnClickFavoriteCallback } from '@/presentations/views/Home/injectInfo'
import { FavoriteTag } from '@/types'

export interface FavoriteDialogProps {
  friend: Friend
  onClickFavorite: OnClickFavoriteCallback
  hide: () => void
}

@Component
export default class FavoriteDialog extends Vue {
  private limits: FavoriteLimit[] | null = null

  private selectedTag: FavoriteTag = 'group_0'

  private isLoadingLimits = false

  @Prop({ required: true })
  readonly props!: FavoriteDialogProps

  get friend() {
    return this.props.friend
  }

  get onClickFavorite() {
    return this.props.onClickFavorite
  }

  get hide() {
    return this.props.hide
  }

  get selectItems() {
    if (this.limits === null) return []

    return [
      ...this.limits.map(limit => {
        return {
          label: `${limit.name}(${limit.used}/${limit.capacity})`,
          value: limit.name,
        }
      }),
    ]
  }

  onChangeSelect(tag: FavoriteTag) {
    this.selectedTag = tag
  }

  get favoriteButtonIsDisabled() {
    if (this.limits === null) return true
    const limit = this.limits.find(limit => limit.name === this.selectedTag)
    if (limit === undefined) return true

    if (limit.used >= limit.capacity) return true

    return false
  }

  favoriteButtonHandler() {
    this.onClickFavorite(this.friend, this.selectedTag)
    this.hide()
  }

  async created() {
    this.isLoadingLimits = true
    this.limits = await favoritesRepository
      .fetchFriendFavoriteLimits()
      .finally(() => {
        this.isLoadingLimits = false
      })
  }
}
