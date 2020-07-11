import { Component } from 'vue-property-decorator'
import Vue from 'vue'

@Component({
  components: {},
})
export default class AboutCapacity extends Vue {
  dialogIsVisible = false

  showDialog() {
    this.dialogIsVisible = true
  }

  hideDialog() {
    this.dialogIsVisible = false
  }
}
