import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { User } from '@/views/Home/script'
import FavoriteMark from '@/components/FavoriteMark/index.vue'

@Component({
  components: {
    FavoriteMark,
  },
})
export default class UserListItem extends Vue {
  @Prop()
  private user!: User
}
