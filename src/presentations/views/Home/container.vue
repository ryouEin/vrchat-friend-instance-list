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
      <router-view
        name="InstanceModal"
        :friendLocations="friendLocations"
      ></router-view>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Provide } from 'vue-property-decorator'
import Home from '@/presentations/views/Home/index.vue'
import { Friend, FriendLocation } from '@/presentations/types'
import { FavoriteTag, Instance, InstanceLocation } from '@/types'
import {
  END_WATCH_INSTANCE,
  EndWatchInstance,
  FAVORITE_FRIEND,
  FavoriteFriend,
  FETCH_WORLD,
  FetchWorld,
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
import {
  friendLocationsRepository,
  instancesRepository,
  worldsRepository,
} from '@/singletonFactory'
import * as FriendLocationsRepository from '@/infras/FriendLocations/IFriendLocationsRepository'

interface ProvideMethods {
  updateInstance: UpdateInstance
  fetchWorld: FetchWorld
  favoriteFriend: FavoriteFriend
  unfavoriteFriend: UnfavoriteFriend
  startWatchInstance: StartWatchInstance
  endWatchInstance: EndWatchInstance
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

  private oldUserIds: string[] = []

  private friendLocationsFromRepository:
    | FriendLocationsRepository.FriendLocation[]
    | null = null

  get friendLocations(): FriendLocation[] {
    if (this.friendLocationsFromRepository === null) return []

    return this.friendLocationsFromRepository.map(friendLocation => {
      const instance =
        friendLocation.instance === undefined
          ? undefined
          : {
              ...friendLocation.instance,
              isWatching:
                this.$store.watchingInstancesStore.watchingInstances.value.find(
                  watchingInstance =>
                    watchingInstance.instanceId === friendLocation.instance?.id
                ) !== undefined,
              location: friendLocation.instance.id,
              userNum: this.$store.instanceUserNumsStore.instanceUserNums.value.find(
                instanceUserNum =>
                  instanceUserNum.instanceId === friendLocation.instance?.id
              )?.userNum,
            }
      return {
        ...friendLocation,
        instance,
        friends: friendLocation.friends.map(friend => {
          const favorite = this.$store.favoritesStore.favoriteByUserId.value(
            friend.id
          )

          return {
            ...friend,
            favorite,
            isNew:
              this.oldUserIds.length <= 0
                ? false
                : !this.oldUserIds.includes(friend.id),
          }
        }),
      }
    })
  }

  get friends(): Friend[] {
    if (this.friendLocations === null) return []

    return this.friendLocations.reduce<Friend[]>((ac, current) => {
      return ac.concat(current.friends)
    }, [])
  }

  @Provide(UPDATE_INSTANCE)
  async updateInstance(instance: Instance) {
    const response = await instancesRepository.fetchInstance(instance.id)
    await this.$store.instanceUserNumsStore.addAction({
      instanceId: instance.id,
      userNum: response.n_users,
    })
  }

  @Provide(FETCH_WORLD)
  async fetchWorld(worldId: string) {
    return await worldsRepository.fetchWorld(worldId)
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
  async startWatchInstance(location: InstanceLocation, notifyUserNum: number) {
    await this.$store.watchingInstancesStore.addAction({
      instanceId: location,
      notifyFreeSpaceNum: notifyUserNum,
    })
  }

  @Provide(END_WATCH_INSTANCE)
  async endWatchInstance(instance: Instance) {
    await this.$store.watchingInstancesStore.deleteAction(instance.id)
  }

  async fetchData() {
    const [friendLocations] = await Promise.all([
      friendLocationsRepository.fetchFriendLocations(),
      this.$store.favoritesStore.fetchFavoritesAction(),
    ])
    this.oldUserIds = this.friendLocations.reduce<string[]>(
      (previous, current) => {
        const friendIdsInInstance = current.friends.map(friend => friend.id)
        return previous.concat(friendIdsInInstance)
      },
      []
    )
    this.friendLocationsFromRepository = friendLocations
  }

  @Provide(SHOW_JOIN_DIALOG)
  showJoinDialog(instance: Instance) {
    this.joinDialogLocation = instance.id
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
