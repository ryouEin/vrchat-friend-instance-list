import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import InstanceListItem from '@/presentations/views/Home/localComponents/InstanceListItem/index.vue'
import { Friend, Instance } from '@/types'
import WatchInstanceDialog from '@/presentations/views/Home/localComponents/InstanceList/localComponents/WatchInstanceDialog/index.vue'
import { friendsModule } from '@/store/ModuleFactory'

@Component({
  components: {
    InstanceListItem,
    WatchInstanceDialog,
  },
})
export default class InstanceList extends Vue {
  @Prop()
  private instances!: Instance[]

  get items(): { id: string; instance: Instance; friends: Friend[] }[] {
    return this.instances.map(instance => {
      return {
        id: instance.location,
        instance,
        friends: friendsModule.friendsByLocation(instance.location),
      }
    })
  }
}
