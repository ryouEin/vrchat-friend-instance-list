import { Component } from 'vue-property-decorator'
import Vue from 'vue'

@Component({
  components: {},
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
