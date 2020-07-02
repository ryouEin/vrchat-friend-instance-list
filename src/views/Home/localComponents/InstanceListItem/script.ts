import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import * as Presentation from '@/types/Presentation'
import { worldsModule } from '@/store/ModuleFactory'
import UserList from './localComponents/UserList/index.vue'
import { getInstancePermissionFromLocation } from '@/shame/getInstancePermissionFromLocation'
import { InstancePermission } from '@/types/InstancePermission'
import Permission from '@/views/Home/localComponents/InstanceListItem/localComponents/Permission/index.vue'
import Spinner from '@/components/Spinner/index.vue'

// TODO: めっちゃごちゃってる。リファクタリング必須
@Component({
  components: {
    UserList,
    Permission,
    Spinner,
  },
})
export default class Instance extends Vue {
  @Prop()
  private location!: string

  @Prop()
  private users!: Presentation.User[]

  get worldId(): string {
    return this.location.split(':')[0]
  }

  get instancePermission(): InstancePermission {
    return getInstancePermissionFromLocation(this.location)
  }

  get showWorldInfo(): boolean {
    return (
      this.instancePermission === InstancePermission.Friends ||
      this.instancePermission === InstancePermission.FriendPlus ||
      this.instancePermission === InstancePermission.Public
    )
  }

  get isPrivate(): boolean {
    return this.instancePermission === InstancePermission.Private
  }

  get world(): Presentation.World | undefined {
    if (this.showWorldInfo) {
      return worldsModule.world(this.worldId)
    }

    return undefined
  }

  get joinUrl(): string {
    return `vrchat://launch?id=${this.location}`
  }

  async created() {
    if (this.showWorldInfo && this.world === undefined) {
      worldsModule.fetchWorld(this.worldId)
    }
  }
}
