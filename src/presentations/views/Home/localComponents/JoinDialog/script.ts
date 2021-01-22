import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { InstanceLocation } from '@/types'
import { vrchatApi } from '@/singletonFactory'

@Component
export default class JoinDialog extends Vue {
  @Prop({ required: true })
  readonly location!: InstanceLocation | null

  @Prop({ required: true })
  readonly hide!: () => void

  get isVisible() {
    return this.location !== null
  }

  join() {
    window.location.href = `vrchat://launch?id=${this.location}`
  }

  async inviteMe() {
    if (this.location === null) {
      throw new Error('location is null')
    }

    await Promise.all([
      // TODO: プレゼンテーション層でvrchatApiを使用するのは微妙
      vrchatApi.inviteMe({ location: this.location }),
      this.hide(),
    ])
  }
}
