<template>
  <div class="c-canJoinInstanceDetail">
    <WorldInfo v-if="world !== null" :instance="instance" :world="world" />
    <div v-else-if="isLoading" class="loading">
      <g-Spinner color="white" />
    </div>
    <div v-else class="error">Error</div>
  </div>
</template>

<script lang="ts">
import { Component, Inject, Prop, Watch } from 'vue-property-decorator'
import Vue from 'vue'
import WorldInfo from '@/presentations/views/Home/localComponents/InstanceListItem/localComponents/WorldInfo/index.vue'
import { FETCH_WORLD, FetchWorld } from '@/presentations/views/Home/injectInfo'
import { Instance, World } from '@/presentations/types'

@Component({
  components: {
    WorldInfo,
  },
})
export default class CanJoinInstanceDetail extends Vue {
  @Inject(FETCH_WORLD)
  private readonly fetchWorld!: FetchWorld

  @Prop({ required: true })
  readonly instance!: Instance

  private isLoading = false

  private world: World | null = null

  // virtual-scrollerはコンポーネントを使い回すためlocationの変更を見て
  // 初期化する必要がある
  @Watch('instance.location')
  async onChangeLocation() {
    await this.init()
  }

  async init() {
    this.isLoading = true
    this.world = null
    this.world = await this.fetchWorld(this.instance.worldId).finally(() => {
      this.isLoading = false
    })
  }

  async created() {
    await this.init()
  }
}
</script>

<style scoped lang="scss">
.c-canJoinInstanceDetail {
  height: 100%;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.error {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 30px;
  font-weight: bold;
  color: rgb(var(--whiteColor));
  background-color: rgb(var(--blackColor));
}
</style>
