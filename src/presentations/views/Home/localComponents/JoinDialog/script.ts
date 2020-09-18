import { Component, Inject } from 'vue-property-decorator'
import Vue from 'vue'
import { Network } from '@/libs/Network/Network'
import { VRChatApi } from '@/libs/VRChatApi/VRChatApi'
import { JOIN_DIALOG_STORE_INJECT_KEY } from '@/presentations/views/Home/store/InjectKey'
import { JoinDialogStore } from '@/presentations/views/Home/store/JoinDialogStore'

@Component
export default class JoinDialog extends Vue {
  @Inject(JOIN_DIALOG_STORE_INJECT_KEY)
  joinDialogStore!: JoinDialogStore

  get isVisible() {
    return this.joinDialogStore.isVisible.value
  }

  get location() {
    return this.joinDialogStore.location.value
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
    await this.joinDialogStore.hideAction()
  }
}
