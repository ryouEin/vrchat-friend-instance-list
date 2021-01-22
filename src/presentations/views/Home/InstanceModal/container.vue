<template>
  <div class="c-instanceModalContainer">
    <InstanceModal
      v-if="friendLocation !== undefined"
      :friendLocation="friendLocation"
      :hide="hide"
    />
    <div v-else class="notFound" @click="hide">Instance Not Found</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import InstanceModal from '@/presentations/views/Home/InstanceModal/index.vue'
import { FriendLocation } from '@/presentations/types'

@Component({
  components: {
    InstanceModal,
  },
})
export default class InstanceModalContainer extends Vue {
  @Prop({ required: true })
  readonly friendLocations!: FriendLocation[]

  get location() {
    return this.$route.params.location
  }

  get friendLocation() {
    return this.friendLocations.find(
      friendLocation => friendLocation.location === this.location
    )
  }

  hide() {
    this.$router.push({
      name: 'Home',
    })
  }
}
</script>

<style lang="scss" scoped>
.c-instanceModalContainer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: $zIndexInstanceModal;
}

.notFound {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 30px;
  font-weight: bold;
  background-color: rgba(var(--blackColor), 0.9);
}
</style>
