import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { Friend } from '@/presentations/types'

@Component({
  components: {},
})
export default class OnlineFriendsListItem extends Vue {
  @Prop({ required: true })
  readonly friend!: Friend

  get isFavorited() {
    return this.friend.favorite !== undefined
  }

  get canJoinText() {
    return this.friend.canJoin ? 'can join' : 'private'
  }

  get statusCssClass() {
    return {
      '-canJoin': this.friend.canJoin,
    }
  }
}
