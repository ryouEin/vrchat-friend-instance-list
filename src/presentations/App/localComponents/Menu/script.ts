import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import SettingDialog from '@/presentations/App/localComponents/Menu/localComponents/SettingDialog/index.vue'

@Component({
  components: {
    SettingDialog,
  },
})
export default class Menu extends Vue {
  isVisibleSettingDialog = false
  isVisibleAboutCapacityDialog = false
  isVisibleAuthorDialog = false

  @Prop()
  value!: boolean

  showSettingDialog() {
    this.isVisibleSettingDialog = true
  }

  hideSettingDialog() {
    this.isVisibleSettingDialog = false
  }

  showAboutCapacityDialog() {
    this.isVisibleAboutCapacityDialog = true
  }

  hideAboutCapacityDialog() {
    this.isVisibleAboutCapacityDialog = false
  }

  showAuthorDialog() {
    this.isVisibleAuthorDialog = true
  }

  hideAuthorDialog() {
    this.isVisibleAuthorDialog = false
  }

  hideMenu() {
    this.$emit('input', false)
  }
}
