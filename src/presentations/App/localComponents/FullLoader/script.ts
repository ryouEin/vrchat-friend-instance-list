import { Component } from 'vue-property-decorator'
import Vue from 'vue'

@Component({
  components: {},
})
export default class FullLoader extends Vue {
  get isVisible() {
    return this.$store.fullLoaderStore.isVisible.value
  }
}
