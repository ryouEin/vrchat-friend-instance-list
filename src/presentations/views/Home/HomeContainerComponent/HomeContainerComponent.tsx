import { useFriendLocations } from './hooks/useFriendLocations'
import React, { useState } from 'react'
import { SpinnerComponent } from '../../../components/presentational/SpinnerComponent/SpinnerComponent'
import styles from './style.module.scss'
import { HomeComponent } from './components/HomeComponent/HomeComponent'
import { useFavorites } from '../../../store/Favorites/useFavorites'
import { Friend } from '../../../types'
import { favoritesRepository } from '../../../../factory/repository'
import { Route, Switch } from 'react-router-dom'
import { InstanceModalContainerComponent } from './components/InstanceModalContainerComponent/InstanceModalContainerComponent'
import { FavoriteTag } from '../../../../types'
import { useAppRouting } from '../../../hooks/useAppRouting'
import { useMount } from 'react-use'
import { FriendLocationContainerComponent } from '../../../components/container/FriendLocationContainerComponent/FriendLocationContainerComponent'

export const HomeContainerComponent = () => {
  const { toInstanceModal } = useAppRouting()
  const [isInitialized, setIsInitialized] = useState(false)
  const { favorites, init, addFavorite, deleteFavorite } = useFavorites(
    favoritesRepository
  )
  const { friends, friendLocations, update } = useFriendLocations(favorites)

  useMount(async () => {
    await Promise.all([update(), init()])
    setIsInitialized(true)
  })

  const showInstanceModal = (friend: Friend) => {
    toInstanceModal(friend.location)
  }

  const fetchFavoriteLimits = async () => {
    return await favoritesRepository.fetchFriendFavoriteLimits()
  }

  const favoriteFriend = async (friend: Friend, tag: FavoriteTag) => {
    await addFavorite(friend.id, tag)
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
