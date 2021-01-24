import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import WorldInfo from '@/presentations/views/Home/localComponents/InstanceListItem/localComponents/WorldInfo/index.vue'
import CanJoinInstanceDetail from '@/presentations/views/Home/localComponents/InstanceListItem/localComponents/InstanceDetail/CanJoinInstanceDetail.vue'
import { Instance } from '@/presentations/types'

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
