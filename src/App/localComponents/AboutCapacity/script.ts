import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import Dialog from '@/components/Dialog/index.vue'
import Icon from '@/components/Icon/index.vue'
import Button from '@/components/Button/index.vue'

@Component({
  components: {
    Dialog,
    Icon,
    Button,
  },
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
