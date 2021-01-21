import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { Instance } from '@/types'
import WorldInfo from '@/presentations/views/Home/localComponents/InstanceListItem/localComponents/WorldInfo/index.vue'
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
