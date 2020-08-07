import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { Friend } from '@/presentations/views/Home/script'

@Component({
  components: {},
})
export default class UserListItem extends Vue {
  @Prop()
  private user!: Friend
}
