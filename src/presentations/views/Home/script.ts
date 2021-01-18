import { Component, Prop, Provide } from 'vue-property-decorator'
import Vue from 'vue'
import OnlineFriendsList from '@/presentations/views/Home/localComponents/OnlineFriendsList/index.vue'
import InstanceList from '@/presentations/views/Home/localComponents/InstanceList/index.vue'
import InstanceModal from '@/presentations/views/Home/localComponents/InstanceModal/index.vue'
import JoinDialog from '@/presentations/views/Home/localComponents/JoinDialog/index.vue'
import { Instance, InstanceLocation } from '@/types'
import WatchInstanceDialog from '@/presentations/views/Home/localComponents/WatchInstanceDialog/index.vue'
import {
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
} from '@/presentations/views/Home/injectInfo'
import FavoriteDialog from '@/presentations/views/Home/localComponents/FavoriteDialog/index.vue'
import UnfavoriteDialog from '@/presentations/views/Home/localComponents/UnfavoriteDialog/index.vue'
import {
  Friend as Friend1,
  Friend,
  FriendLocation,
} from '@/presentations/types'
import { FavoriteDialogProps } from '@/presentations/views/Home/localComponents/FavoriteDialog/script'
import { UnfavoriteDialogProps } from '@/presentations/views/Home/localComponents/UnfavoriteDialog/script'

interface ProvideMethods {
  showJoinDialog: ShowJoinDialog
  showWatchDialog: ShowWatchDialog
  showFavoriteDialog: ShowFavoriteDialog
  showUnfavoriteDialog: ShowUnfavoriteDialog
}

@Component({
  components: {
    OnlineFriendsList,
    InstanceList,
    JoinDialog,
    WatchInstanceDialog,
    FavoriteDialog,
    UnfavoriteDialog,
  },
})
export default class Home extends Vue implements ProvideMethods {
  private joinDialogLocation: InstanceLocation | null = null

  private watchInstanceDialogInstance: Instance | null = null

  private favoriteDialogProps: FavoriteDialogProps | null = null
  private unfavoriteDialogProps: UnfavoriteDialogProps | null = null

  private isReloading = false
  private isVisibleOnlineFriends = false

  @Prop({ required: true })
  readonly friends!: Friend[]

  @Prop({ required: true })
  readonly friendLocations!: FriendLocation[]

  @Prop({ required: true })
  readonly onReload!: () => Promise<void>

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

  get showFABLoading() {
    return this.isReloading
  }

  showOnlineFriends() {
    this.isVisibleOnlineFriends = true
  }

  hideOnlineFriends() {
    this.isVisibleOnlineFriends = false
  }

  async reload() {
    if (this.isReloading) return

    this.isReloading = true
    await this.onReload().finally(() => {
      this.isReloading = false
    })
  }
}
