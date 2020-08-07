import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import InstanceListItem from '@/presentations/views/Home/localComponents/InstanceListItem/index.vue'
import { InstanceDetail } from '@/types'

@Component({
  components: {
    InstanceListItem,
  },
})
export default class InstanceList extends Vue {
  @Prop()
  private instances!: InstanceDetail[]
}
