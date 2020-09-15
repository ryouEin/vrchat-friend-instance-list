import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import { fullLoaderStore } from '@/presentations/ui_store/UiStoreFactory'

@Component({
  components: {},
})
export default class FullLoader extends Vue {
  get isVisible() {
    return fullLoaderStore.isVisible
  }
}
