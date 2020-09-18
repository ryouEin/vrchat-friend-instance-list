import { Component, Inject, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import Permission from '@/presentations/views/Home/localComponents/InstanceListItem/localComponents/WorldInfo/localComponents/Permission/index.vue'
import InstanceButton from '@/presentations/views/Home/localComponents/InstanceListItem/localComponents/WorldInfo/localComponents/InstanceButton/index.vue'
import WatchInstanceButton from '@/presentations/views/Home/localComponents/InstanceListItem/localComponents/WorldInfo/localComponents/WatchInstanceButton/index.vue'
import { Instance, InstancePermission, World } from '@/types'
import { JOIN_DIALOG_STORE_INJECT_KEY } from '@/presentations/views/Home/store/InjectKey'
import { JoinDialogStore } from '@/presentations/views/Home/store/JoinDialogStore'

@Component({
  components: {
    Permission,
    InstanceButton,
    WatchInstanceButton,
  },
})
export default class WorldInfo extends Vue {
  @Inject(JOIN_DIALOG_STORE_INJECT_KEY)
  joinDialogStore!: JoinDialogStore

  @Prop({ required: true })
  private instance!: Instance

  @Prop({ required: true })
  private world!: World

  isFetchingUserNum = false

  fetchUserNumButtonDisabled = false

  get location(): string {
    return this.instance.location
  }

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

  async onClickJoinButton() {
    await this.joinDialogStore.showAction(this.location)
  }

  async updateUserNum() {
    if (this.isFetchingUserNum) return

    this.fetchUserNumButtonDisabled = true
    this.isFetchingUserNum = true
    await this.$store.instancesStore
      .updateInstanceInfoAction(this.location)
      .finally(() => {
        this.isFetchingUserNum = false
        setTimeout(() => {
          this.fetchUserNumButtonDisabled = false
        }, 10 * 1000)
      })
  }
}
