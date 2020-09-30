import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { Color } from '@/presentations/Colors'

@Component
export default class Button extends Vue {
  @Prop({ type: Boolean, default: false })
  readonly primary!: boolean

  @Prop({ default: null })
  readonly full!: string | null

  @Prop({ type: String, default: 'secondary' })
  readonly color!: Color

  @Prop({ type: String, default: 'default' })
  readonly size!: 'default' | 'large'

  get isFull() {
    return this.full !== null
  }

  get rootClass() {
    const tmp: (string | { [key: string]: boolean })[] = [
      {
        '-full': this.isFull,
      },
    ]
    if (this.size !== 'default') tmp.push(`-${this.size}`)

    return tmp
  }

  get rootStyle() {
    return {
      'background-color': `rgb(${this.$colorManager.getRGB(this.color)})`,
    }
  }

  onClick() {
    this.$emit('click')
  }
}
