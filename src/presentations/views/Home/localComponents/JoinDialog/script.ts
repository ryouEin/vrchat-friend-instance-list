import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { Network } from '@/libs/Network/Network'
import { VRChatApi } from '@/libs/VRChatApi/VRChatApi'
import { InstanceLocation } from '@/types'

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

    // TODO: プレゼンテーション層でVRChatApiのインスタンスの構築するのは微妙な気がする
    const vrchatApi = new VRChatApi(new Network())

    await Promise.all([
      vrchatApi.inviteMe({ location: this.location }),
      this.hide(),
    ])
  }
}
