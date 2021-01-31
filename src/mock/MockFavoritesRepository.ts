import { IFavoritesRepository } from '../repositories/Favorites/IFavoritesRepository'
import { FavoriteApiResponse } from '../types/ApiResponse'
import { FavoriteLimit } from '../presentations/types'

export class MockFavoritesRepository implements IFavoritesRepository {
  constructor(public favorites: FavoriteApiResponse[]) {}

  async fetchFavoritesAboutFriends(): Promise<FavoriteApiResponse[]> {
    return this.favorites
  }

  async addFavoriteAboutFriend(
    userId: string,
    tag: 'group_0' | 'group_1' | 'group_2'
  ): Promise<FavoriteApiResponse> {
    const randomId = String(new Date().getTime())
    const favorite: FavoriteApiResponse = {
      id: `fvrt_${randomId}`,
      favoriteId: userId,
      tags: [tag],
      type: 'friend',
    }

    this.favorites.push(favorite)

    return favorite
  }

  async deleteFavoritesAboutFriends(id: string): Promise<void> {
    this.favorites = this.favorites.filter((favorite) => favorite.id !== id)
  }

  async fetchFriendFavoriteLimits(): Promise<FavoriteLimit[]> {
    return []
  }
}
