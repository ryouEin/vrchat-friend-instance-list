import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { InstancePermission } from '@/types'

@Component
export default class Permission extends Vue {
  @Prop()
  private permission!: InstancePermission

  get cssClass() {
    return {
      '-public': this.permission === InstancePermission.Public,
      '-friends': this.permission === InstancePermission.Friends,
      '-friendPlus': this.permission === InstancePermission.FriendPlus,
    }
  }
}
