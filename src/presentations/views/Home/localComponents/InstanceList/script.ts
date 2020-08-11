import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import InstanceListItem from '@/presentations/views/Home/localComponents/InstanceListItem/index.vue'
import { Instance } from '@/types'
import WatchInstanceDialog from '@/presentations/views/Home/localComponents/InstanceList/localComponents/WatchInstanceDialog/index.vue'

@Component({
  components: {
    InstanceListItem,
    WatchInstanceDialog,
  },
})
export default class InstanceList extends Vue {
  @Prop()
  private instances!: Instance[]
}
