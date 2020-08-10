import { Component } from 'vue-property-decorator'
import Vue from 'vue'

@Component
export default class FAB extends Vue {
  onClick() {
    this.$emit('click')
  }
}
