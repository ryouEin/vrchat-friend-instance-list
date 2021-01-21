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
    <JoinDialog :location="joinDialogLocation" :hide="hideJoinDialog" />
    <WatchInstanceDialog
      v-if="watchInstanceDialogInstance !== null"
      :instance="watchInstanceDialogInstance"
      :hide="hideWatchDialog"
    />
    <FavoriteDialog
      v-if="favoriteDialogProps !== null"
      :props="favoriteDialogProps"
    />
    <UnfavoriteDialog
      v-if="unfavoriteDialogProps !== null"
      :props="unfavoriteDialogProps"
    />
    <transition appear name="t-fade">
      <router-view></router-view>
    </transition>
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
  OnClickFavoriteCallback,
  OnClickUnfavoriteCallback,
  SHOW_FAVORITE_DIALOG,
  SHOW_JOIN_DIALOG,
  SHOW_UNFAVORITE_DIALOG,
  SHOW_WATCH_DIALOG,
  ShowFavoriteDialog,
  ShowJoinDialog,
  ShowUnfavoriteDialog,
  ShowWatchDialog,
  START_WATCH_INSTANCE,
  StartWatchInstance,
  UNFAVORITE_FRIEND,
  UnfavoriteFriend,
  UPDATE_INSTANCE,
  UpdateInstance,
} from '@/presentations/views/Home/injectInfo'
import { FavoriteDialogProps } from '@/presentations/views/Home/localComponents/FavoriteDialog/script'
import { UnfavoriteDialogProps } from '@/presentations/views/Home/localComponents/UnfavoriteDialog/script'
import JoinDialog from '@/presentations/views/Home/localComponents/JoinDialog/index.vue'
import WatchInstanceDialog from '@/presentations/views/Home/localComponents/WatchInstanceDialog/index.vue'
import FavoriteDialog from '@/presentations/views/Home/localComponents/FavoriteDialog/index.vue'
import UnfavoriteDialog from '@/presentations/views/Home/localComponents/UnfavoriteDialog/index.vue'

interface ProvideMethods {
  updateInstance: UpdateInstance
  fetchWorld: FetchWorld
  favoriteFriend: FavoriteFriend
  unfavoriteFriend: UnfavoriteFriend
  startWatchInstance: StartWatchInstance
  endWatchInstance: EndWatchInstance
  getFriendLocation: GetFriendLocation
  showJoinDialog: ShowJoinDialog
  showWatchDialog: ShowWatchDialog
  showFavoriteDialog: ShowFavoriteDialog
  showUnfavoriteDialog: ShowUnfavoriteDialog
}

@Component({
  components: {
    Home,
    JoinDialog,
    WatchInstanceDialog,
    FavoriteDialog,
    UnfavoriteDialog,
  },
})
export default class HomeContainer extends Vue implements ProvideMethods {
  private joinDialogLocation: InstanceLocation | null = null

  private watchInstanceDialogInstance: Instance | null = null

  private favoriteDialogProps: FavoriteDialogProps | null = null
  private unfavoriteDialogProps: UnfavoriteDialogProps | null = null

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

  @Provide(SHOW_JOIN_DIALOG)
  showJoinDialog(instance: Instance) {
    this.joinDialogLocation = instance.location
  }

  hideJoinDialog() {
    this.joinDialogLocation = null
  }

  @Provide(SHOW_WATCH_DIALOG)
  showWatchDialog(instance: Instance) {
    this.watchInstanceDialogInstance = instance
  }

  hideWatchDialog() {
    this.watchInstanceDialogInstance = null
  }

  @Provide(SHOW_FAVORITE_DIALOG)
  showFavoriteDialog(friend: Friend, onClickFavorite: OnClickFavoriteCallback) {
    this.favoriteDialogProps = {
      friend,
      onClickFavorite,
      hide: () => {
        this.favoriteDialogProps = null
      },
    }
  }

  @Provide(SHOW_UNFAVORITE_DIALOG)
  showUnfavoriteDialog(
    friend: Friend,
    onClickUnfavorite: OnClickUnfavoriteCallback
  ) {
    this.unfavoriteDialogProps = {
      friend,
      onClickUnfavorite,
      hide: () => {
        this.unfavoriteDialogProps = null
      },
    }
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
