import { Component, Inject, Prop, Watch } from 'vue-property-decorator'
import Vue from 'vue'
import { Instance, World } from '@/types'
import WorldInfo from '@/presentations/views/Home/localComponents/InstanceListItem/localComponents/WorldInfo/index.vue'
import { FETCH_WORLD, FetchWorld } from '@/presentations/views/Home/injectInfo'
import CanJoinInstanceDetail from '@/presentations/views/Home/localComponents/InstanceListItem/localComponents/InstanceDetail/CanJoinInstanceDetail.vue'

@Component({
  components: {
    WorldInfo,
    CanJoinInstanceDetail,
  },
})
export default class InstanceDetail extends Vue {
  @Prop()
  readonly instance?: Instance

  get isPrivate(): boolean {
    return this.instance === undefined
  }
}
