import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { Friend } from '@/presentations/views/Home/script'
import UserListItem from '../UserListItem/index.vue'

@Component({
  components: {
    UserListItem,
  },
})
export default class UserList extends Vue {
  @Prop()
  private users!: Friend[]
}
