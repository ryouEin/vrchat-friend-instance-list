import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import Instance from '@/views/Home/localComponents/InstanceListItem/index.vue'
import { User } from '@/views/Home/script'

@Component({
  components: {
    Instance,
  },
})
export default class InstanceList extends Vue {
  @Prop()
  private instances!: { location: string; users: User[] }[]
}
