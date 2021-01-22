import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import UserList from './localComponents/UserList/index.vue'
import InstanceDetail from '@/presentations/views/Home/localComponents/InstanceListItem/localComponents/InstanceDetail/index.vue'
import { FriendLocation } from '@/presentations/types'

@Component({
  components: {
    UserList,
    InstanceDetail,
  },
})
export default class InstanceListItem extends Vue {
  @Prop({ required: true })
  readonly friendLocation!: FriendLocation

  get instance() {
    return this.friendLocation.instance
  }

  get friends() {
    return this.friendLocation.friends
  }
}
