import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import { joinDialogStore } from '@/presentations/ui_store/UiStoreFactory'
import { Network } from '@/libs/Network/Network'
import { VRChatApi } from '@/libs/VRChatApi/VRChatApi'

@Component
export default class JoinDialog extends Vue {
  get isVisible() {
    return joinDialogStore.isVisible
  }

  get location() {
    return joinDialogStore.location
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
      this.hideDialog(),
    ])
  }

  async hideDialog() {
    await joinDialogStore.hideAction()
  }
}
