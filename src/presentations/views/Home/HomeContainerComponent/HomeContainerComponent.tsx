import { useFriendLocations } from './hooks/useFriendLocations'
import React, { useMemo, useState } from 'react'
import { SpinnerComponent } from '../../../components/presentational/SpinnerComponent/SpinnerComponent'
import styles from './style.module.scss'
import { HomeComponent } from './components/HomeComponent/HomeComponent'
import { useFavorites } from '../../../store/Favorites/useFavorites'
import { FavoriteLimit, Friend } from '../../../types'
import { favoritesRepository } from '../../../../factory/repository'
import { Route, Switch } from 'react-router-dom'
import { InstanceModalContainerComponent } from './components/InstanceModalContainerComponent/InstanceModalContainerComponent'
import { FavoriteTag, FavoriteTags } from '../../../../types'
import { useAppRouting } from '../../../hooks/useAppRouting'
import { useMount } from 'react-use'
import { FriendLocationContainerComponent } from '../../../components/container/FriendLocationContainerComponent/FriendLocationContainerComponent'
import { VRChatApiFavoriteLimitReachedError } from '../../../../libs/VRChatApi/VRChatApi'
import { useToast } from '../../../providers/Toasts/useToast'
import { ToastTypes } from '../../../providers/Toasts/types'

export const HomeContainerComponent = () => {
  const { toInstanceModal } = useAppRouting()
  const [isInitialized, setIsInitialized] = useState(false)
  const { favorites, init, addFavorite, deleteFavorite } = useFavorites(
    favoritesRepository
  )
  const { friends, friendLocations, update } = useFriendLocations(favorites)
  const { toast } = useToast()

  useMount(async () => {
    await Promise.all([update(), init()])
    setIsInitialized(true)
  })

  const showInstanceModal = (friend: Friend) => {
    toInstanceModal(friend.location)
  }

  const limits = useMemo<FavoriteLimit[]>(() => {
    return Object.values(FavoriteTags).map((tag) => {
      return {
        name: tag,
        used: favorites.filter((favorite) => favorite.tags.includes(tag))
          .length,
      }
    })
  }, [favorites])

  const fetchFavoriteLimits: () => Promise<FavoriteLimit[]> = async () => {
    return limits
  }

  const favoriteFriend = async (friend: Friend, tag: FavoriteTag) => {
    try {
      await addFavorite(friend.id, tag)
    } catch (error) {
      if (error instanceof VRChatApiFavoriteLimitReachedError) {
        toast({
          type: ToastTypes.Error,
          content: 'グループのFavorite数上限によりFavoriteが失敗しました。',
        })
      } else {
        throw error
      }
    }
  }
  const unfavoriteFriend = async (friend: Friend) => {
    if (friend.favorite === undefined) {
      throw new Error('can not unfavorite friend who is not favorited')
    }
    await deleteFavorite(friend.favorite.id)
  }

  return (
    <>
      {isInitialized ? (
        <>
          <HomeComponent
            friends={friends}
            friendLocations={friendLocations}
            update={update}
            onClickOnlineFriend={showInstanceModal}
            listItem={(friendLocation) => (
              <FriendLocationContainerComponent
                friendLocation={friendLocation}
                fetchFavoriteLimits={fetchFavoriteLimits}
                favoriteFriend={favoriteFriend}
                unfavoriteFriend={unfavoriteFriend}
              />
            )}
          />
          <Switch>
            <Route
              path="/:id"
              children={
                <InstanceModalContainerComponent
                  friendLocations={friendLocations}
                >
                  {(friendLocation) => (
                    <FriendLocationContainerComponent
                      friendLocation={friendLocation}
                      fetchFavoriteLimits={fetchFavoriteLimits}
                      favoriteFriend={favoriteFriend}
                      unfavoriteFriend={unfavoriteFriend}
                    />
                  )}
                </InstanceModalContainerComponent>
              }
            />
          </Switch>
        </>
      ) : (
        <div className={styles.loading}>
          <SpinnerComponent color="front" />
        </div>
      )}
    </>
  )
}
