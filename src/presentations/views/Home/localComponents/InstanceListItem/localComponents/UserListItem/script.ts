import { Component, Inject, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import {
  FAVORITE_FRIEND,
  FavoriteFriend,
  SHOW_FAVORITE_DIALOG,
  SHOW_UNFAVORITE_DIALOG,
  ShowFavoriteDialog,
  ShowUnfavoriteDialog,
  UNFAVORITE_FRIEND,
  UnfavoriteFriend,
} from '@/presentations/views/Home/injectInfo'
import { Friend } from '@/presentations/types'

@Component
export default class UserListItem extends Vue {
  @Inject(SHOW_FAVORITE_DIALOG)
  private readonly showFavoriteDialog!: ShowFavoriteDialog

  @Inject(SHOW_UNFAVORITE_DIALOG)
  private readonly showUnfavoriteDialog!: ShowUnfavoriteDialog

  @Inject(FAVORITE_FRIEND)
  private readonly favoriteFriend!: FavoriteFriend

  @Inject(UNFAVORITE_FRIEND)
  private readonly unfavoriteFriend!: UnfavoriteFriend

  @Prop({ required: true })
  readonly friend!: Friend

  @Prop({ required: true })
  readonly ownerId!: string | undefined

  private isLoadingFavorite = false

  get isFavorited() {
    return this.friend.favorite !== undefined
  }

  get isOwner() {
    return this.friend.id === this.ownerId
  }

  async favoriteButtonHandler() {
    this.showFavoriteDialog(this.friend, async (friend, tag) => {
      this.isLoadingFavorite = true
      await this.favoriteFriend(friend, tag).finally(() => {
        this.isLoadingFavorite = false
      })
    })
  }

  async unfavoriteButtonHandler() {
    this.showUnfavoriteDialog(this.friend, async (friend: Friend) => {
      this.isLoadingFavorite = true
      await this.unfavoriteFriend(friend).finally(() => {
        this.isLoadingFavorite = false
      })
    })
  }
}
