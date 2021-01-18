<template>
  <InstanceModal
    v-if="friendLocation !== null"
    :friendLocation="friendLocation"
    :hide="hide"
  />
</template>

<script lang="ts">
import { Component, Inject, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import InstanceModal from '@/presentations/views/Home/localComponents/InstanceModal/index.vue'
import { FriendLocation } from '@/presentations/types'
import {
  GET_FRIEND_LOCATION,
  GetFriendLocation,
} from '@/presentations/views/Home/injectInfo'
import { InstanceLocation } from '@/types'

@Component({
  components: {
    InstanceModal,
  },
})
export default class InstanceModalContainer extends Vue {
  @Inject(GET_FRIEND_LOCATION)
  private readonly getFriendLocation!: GetFriendLocation

  @Prop({ required: true })
  readonly location!: InstanceLocation

  private friendLocation: FriendLocation | null = null

  hide() {
    this.$router.push({
      name: 'Home',
    })
  }

  created() {
    const friendLocation = this.getFriendLocation(this.location)
    if (friendLocation === undefined) {
      this.hide()
      this.$store.toastsStore.showAction({
        type: 'error',
        content: 'インスタンスが見つかりませんでした',
      })
    } else {
      this.friendLocation = friendLocation
    }
  }
}
</script>
