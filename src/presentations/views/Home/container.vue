<template>
  <div class="c-homeContainer">
    <Home
      v-if="initialized"
      :friends="friends"
      :friendLocations="friendLocations"
      :onReload="fetchData"
    />
    <div v-else class="loading">
      <g-Spinner color="front" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Provide } from 'vue-property-decorator'
import Home from '@/presentations/views/Home/index.vue'
import { Friend, FriendLocation } from '@/presentations/types'
import * as GeneralType from '@/types'
import { FavoriteTag, Instance, InstanceLocation } from '@/types'
import {
  END_WATCH_INSTANCE,
  EndWatchInstance,
  FAVORITE_FRIEND,
  FavoriteFriend,
  FETCH_WORLD,
  FetchWorld,
  GET_FRIEND_LOCATION,
  GetFriendLocation,
  START_WATCH_INSTANCE,
  StartWatchInstance,
  UNFAVORITE_FRIEND,
  UnfavoriteFriend,
  UPDATE_INSTANCE,
  UpdateInstance,
} from '@/presentations/views/Home/injectInfo'

interface ProvideMethods {
  updateInstance: UpdateInstance
  fetchWorld: FetchWorld
  favoriteFriend: FavoriteFriend
  unfavoriteFriend: UnfavoriteFriend
  startWatchInstance: StartWatchInstance
  endWatchInstance: EndWatchInstance
  getFriendLocation: GetFriendLocation
}

@Component({
  components: {
    Home,
  },
})
export default class HomeContainer extends Vue implements ProvideMethods {
  private initialized = false

  get friends(): Friend[] {
    return this.$store.friendsStore.friends.value.map(friend => {
      let canJoin = false
      const instance = this.$store.instancesStore.instanceByLocation.value(
        friend.location
      )
      if (
        instance !== undefined &&
        instance.permission !== GeneralType.InstancePermission.Private &&
        instance.permission !== GeneralType.InstancePermission.Unknown
      ) {
        canJoin = true
      }

      return {
        ...friend,
        canJoin,
        isOwner: instance !== undefined && instance.ownerId === friend.id,
      }
    })
  }

  get friendsByLocation() {
    return (location: InstanceLocation) => {
      return this.friends.filter(friend => friend.location === location)
    }
  }

  get friendLocations(): FriendLocation[] {
    return this.$store.instancesStore.instances.value.map(instance => {
      return {
        location: instance.location,
        instance: instance.location === 'private' ? undefined : instance,
        friends: this.friendsByLocation(instance.location),
      }
    })
  }

  @Provide(UPDATE_INSTANCE)
  async updateInstance(instance: Instance) {
    await this.$store.instancesStore.updateInstanceInfoAction(instance.location)
  }

  @Provide(FETCH_WORLD)
  async fetchWorld(worldId: string) {
    await this.$store.worldsStore.fetchWorldAction(worldId)

    const world = this.$store.worldsStore.world.value(worldId)
    if (world === undefined) {
      throw new Error('world is undefined')
    }

    return world
  }

  @Provide(FAVORITE_FRIEND)
  async favoriteFriend(friend: Friend, group: FavoriteTag) {
    await this.$store.favoritesStore.addFavoriteAction(friend.id, group)
  }

  @Provide(UNFAVORITE_FRIEND)
  async unfavoriteFriend(friend: Friend) {
    const id = friend.favorite?.id
    if (id === undefined) {
      throw new Error("cant unfavorite friend who isn't favorited")
    }
    await this.$store.favoritesStore.deleteFavoriteAction(id)
  }

  @Provide(START_WATCH_INSTANCE)
  async startWatchInstance(
    location: InstanceLocation,
    worldName: string,
    notifyUserNum: number
  ) {
    await this.$store.instancesStore.watchInstanceAction({
      location: location,
      notifyUserNum: notifyUserNum,
      onFindVacancy: async () => {
        await this.$store.notificationsStore.pushNotificationAction({
          text: `${worldName}に空きができました。`,
          date: Date.now(),
          onClick: async () => {
            await this.$router.push({
              name: 'Instance',
              params: {
                location,
              },
            })
          },
        })
      },
    })
  }

  @Provide(END_WATCH_INSTANCE)
  async endWatchInstance(instance: Instance) {
    await this.$store.instancesStore.unwatchInstanceAction(instance.location)
  }

  async fetchData() {
    await Promise.all([
      this.$store.friendsStore.fetchFriendsAction(),
      this.$store.favoritesStore.fetchFavoritesAction(),
    ])
    await this.$store.instancesStore.updateAction(
      this.$store.friendsStore.friends.value
    )
  }

  @Provide(GET_FRIEND_LOCATION)
  getFriendLocation(location: InstanceLocation) {
    return this.friendLocations.find(
      friendLocation => friendLocation.location === location
    )
  }

  async created() {
    await this.fetchData().finally(() => {
      this.initialized = true
    })
  }
}
</script>

<style lang="scss" scoped>
.c-homeContainer {
  height: 100%;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
