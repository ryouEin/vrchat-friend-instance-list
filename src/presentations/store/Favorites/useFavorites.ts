import { favoritesRepository } from '../../../factory/repository'
import { Favorite } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import {
  addFavorite as addFavoriteAction,
  deleteFavorite as deleteFavoriteAction,
  selectFavorites,
  setFavorites,
} from './FavoritesStore'
import { FavoriteTag } from '../../../types'

export const useFavorites = () => {
  const dispatch = useDispatch()

  const favorites = useSelector(selectFavorites)

  const init = async () => {
    const favoriteApiResponses = await favoritesRepository.fetchFavoritesAboutFriends()
    const favorites: Favorite[] = favoriteApiResponses.map((item) => {
      return {
        ...item,
      }
    })

    dispatch(setFavorites(favorites))
  }

  const addFavorite = async (friendId: string, tag: FavoriteTag) => {
    const favorite: Favorite = await favoritesRepository.addFavoriteAboutFriend(
      friendId,
      tag
    )
    dispatch(addFavoriteAction(favorite))
  }

  const deleteFavorite = async (favoriteId: string) => {
    await favoritesRepository.deleteFavoritesAboutFriends(favoriteId)
    dispatch(deleteFavoriteAction(favoriteId))
  }

  return {
    favorites,
    init,
    addFavorite,
    deleteFavorite,
  }
}
