import { Component, Inject, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import Permission from '@/presentations/views/Home/localComponents/InstanceListItem/localComponents/WorldInfo/localComponents/Permission/index.vue'
import InstanceButton from '@/presentations/views/Home/localComponents/InstanceListItem/localComponents/WorldInfo/localComponents/InstanceButton/index.vue'
import { Instance, InstancePermission, World } from '@/types'
import {
  END_WATCH_INSTANCE,
  EndWatchInstance,
  SHOW_JOIN_DIALOG,
  SHOW_WATCH_DIALOG,
  ShowJoinDialog,
  ShowWatchDialog,
  UPDATE_INSTANCE,
  UpdateInstance,
} from '@/presentations/views/Home/injectInfo'

@Component({
  components: {
    Permission,
    InstanceButton,
  },
})
export default class WorldInfo extends Vue {
  @Inject(SHOW_JOIN_DIALOG)
  private readonly showJoinDialog!: ShowJoinDialog

  @Inject(UPDATE_INSTANCE)
  private readonly updateInstance!: UpdateInstance

  @Inject(SHOW_WATCH_DIALOG)
  private readonly showWatchDialog!: ShowWatchDialog

  @Inject(END_WATCH_INSTANCE)
  private readonly endWatchInstance!: EndWatchInstance

  @Prop({ required: true })
  readonly instance!: Instance

  @Prop({ required: true })
  readonly world!: World

  private isFetchingUserNum = false

  private fetchUserNumButtonDisabled = false

  get userNum() {
    return this.instance.userNum
  }

  get capacity(): number {
    return this.world.hardCapacity
  }

  get instancePermission(): InstancePermission {
    return this.instance.permission
  }

  get isFull() {
    if (this.userNum === undefined) {
      return false
    }

    return this.userNum >= this.capacity
  }

  get currentUserNumText() {
    return this.userNum ?? '?'
  }

  get userNumClass() {
    return {
      '-full': this.isFull,
    }
  }

  joinButtonHandler() {
    this.showJoinDialog(this.instance)
  }

  async updateButtonHandler() {
    if (this.isFetchingUserNum) return

    this.isFetchingUserNum = true
    await this.updateInstance(this.instance).finally(() => {
      this.isFetchingUserNum = false
    })
  }

  watchButtonHandler() {
    this.showWatchDialog(this.instance)
  }

  unwatchButtonHandler() {
    this.endWatchInstance(this.instance)
  }
}
