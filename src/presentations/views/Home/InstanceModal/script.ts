import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import InstanceListItem from '@/presentations/views/Home/localComponents/InstanceListItem/index.vue'
import { FriendLocation } from '@/presentations/types'

@Component({
  components: {
    InstanceListItem,
  },
})
export default class InstanceModal extends Vue {
  @Prop({ required: true })
  readonly friendLocation!: FriendLocation

  @Prop({ required: true })
  readonly hide!: () => void
}
