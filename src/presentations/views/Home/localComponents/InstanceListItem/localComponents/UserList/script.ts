import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import UserListItem from '../UserListItem/index.vue'
import { Friend } from '@/types'

@Component({
  components: {
    UserListItem,
  },
})
export default class UserList extends Vue {
  @Prop()
  private users!: Friend[]
}
