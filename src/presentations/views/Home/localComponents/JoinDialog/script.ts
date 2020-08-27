import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import { joinDialogStore } from '@/presentations/ui_store/UiStoreFactory'
import { Network } from '@/libs/Network/Network'
import { NetworkJoinRepository } from '@/infras/Join/NetworkJoinRepository'
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

    // TODO: プレゼンテーション層でリポジトリのインスタンスの構築するのは微妙な気がする
    const network = new Network()
    const joinRepository = new NetworkJoinRepository(network)

    await Promise.all([
      joinRepository.inviteMe(this.location),
      this.hideDialog(),
    ])
  }

  async hideDialog() {
    await joinDialogStore.hideAction()
  }
}
