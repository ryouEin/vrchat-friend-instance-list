import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import Spinner from '@/components/Spinner/index.vue'

@Component({
  components: {
    Spinner,
  },
})
export default class FullLoader extends Vue {
  visible = false

  show() {
    this.visible = true
  }

  hide() {
    this.visible = false
  }
}
