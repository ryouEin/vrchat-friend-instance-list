import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import Instance from '@/views/Home/localComponents/InstanceListItem/index.vue'
import { User } from '@/views/Home/script'
import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'

@Component({
  components: {
    Instance,
  },
})
export default class InstanceList extends Vue {
  @Prop()
  private users!: User[]

  // TODO: テスト
  get instances(): { id: string; location: string; users: User[] }[] {
    const tmp: { [key: string]: User[] } = groupBy(this.users, 'location')
    const instances = Object.entries(tmp).map(item => {
      const [location, users] = item

      return {
        id: location,
        location,
        users,
      }
    })

    const instancesWithoutPrivate = sortBy(
      instances.filter(instance => instance.location !== 'private'),
      'location'
    )
    const privateInstance = instances.filter(
      instance => instance.location === 'private'
    )

    return instancesWithoutPrivate.concat(privateInstance)
  }
}
