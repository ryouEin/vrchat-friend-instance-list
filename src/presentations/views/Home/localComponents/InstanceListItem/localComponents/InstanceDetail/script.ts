import { Component, Inject, Prop, Watch } from 'vue-property-decorator'
import Vue from 'vue'
import { Instance, World } from '@/types'
import WorldInfo from '@/presentations/views/Home/localComponents/InstanceListItem/localComponents/WorldInfo/index.vue'
import { FETCH_WORLD, FetchWorld } from '@/presentations/views/Home/injectInfo'

// TODO: このコンポーネント、更にPrivateか否かでわけたい（worldに関する処理がPrivateには不要なので、現状凝集度が低い）
@Component({
  components: {
    WorldInfo,
  },
})
export default class InstanceDetail extends Vue {
  @Inject(FETCH_WORLD)
  private readonly fetchWorld!: FetchWorld

  @Prop()
  readonly instance?: Instance

  private isLoading = false

  private world: World | null = null

  get isPrivate(): boolean {
    return this.instance === undefined
  }

  // virtual-scrollerはコンポーネントを使い回すためlocationの変更を見て
  // 初期化する必要がある
  @Watch('instance.location')
  async onChangeLocation() {
    await this.init()
  }

  async init() {
    this.isLoading = true
    this.world = null
    if (!this.isPrivate) {
      this.world = await this.fetchWorld(
        // !this.isPrivateでthis.instanceがundefinedでないことは担保されているので
        this.instance!.worldId
      ).finally(() => {
        this.isLoading = false
      })
    }
  }

  async created() {
    await this.init()
  }
}
