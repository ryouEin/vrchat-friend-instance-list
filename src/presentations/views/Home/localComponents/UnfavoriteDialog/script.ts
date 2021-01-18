import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Friend } from '@/presentations/types'
import { OnClickUnfavoriteCallback } from '@/presentations/views/Home/injectInfo'

export interface UnfavoriteDialogProps {
  friend: Friend
  onClickUnfavorite: OnClickUnfavoriteCallback
  hide: () => void
}

@Component
export default class UnfavoriteDialog extends Vue {
  @Prop({ required: true })
  readonly props!: UnfavoriteDialogProps

  get friend() {
    return this.props.friend
  }

  get onClickUnfavorite() {
    return this.props.onClickUnfavorite
  }

  get hide() {
    return this.props.hide
  }

  unfavoriteButtonHandler() {
    this.onClickUnfavorite(this.friend)
    this.hide()
  }
}
