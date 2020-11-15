import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'

@Component
export default class ToTopButton extends Vue {
  private isVisible = false

  @Prop({ required: true })
  private scrollerElement!: HTMLElement

  @Prop({ type: Number, default: 1000 })
  private showDistance!: number

  toTop() {
    this.scrollerElement.scrollTo({
      top: 0,
    })
  }

  updateToTop() {
    const scrollTop = this.scrollerElement.scrollTop

    this.isVisible = scrollTop > this.showDistance
  }

  mounted() {
    this.scrollerElement.addEventListener('scroll', this.updateToTop)
  }

  beforeDestroy() {
    this.scrollerElement.removeEventListener('scroll', this.updateToTop)
  }
}
