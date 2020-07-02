import { Component, Prop, Watch } from 'vue-property-decorator'
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

  @Watch('user')
  onUserChanged(value: User, oldValue: User) {
    if (value.isFocused && !oldValue.isFocused) {
      this.scrollToHere()
    }
  }

  scrollToHere() {
    const clientRect = this.$el.getBoundingClientRect()
    const pageY = window.pageYOffset + clientRect.top
    window.scrollTo({
      top: pageY,
    })
  }
}
