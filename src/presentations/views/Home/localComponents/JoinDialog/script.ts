import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import { joinDialogStore } from '@/presentations/ui_store/UiStoreFactory'
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

  async hideDialog() {
    await joinDialogStore.hideAction()
  }
}
