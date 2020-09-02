import * as tsx from 'vue-tsx-support'
import { Component, Prop } from 'vue-property-decorator'
import styles from './style.module.scss'

interface ComponentProps {
  primary: boolean
  full: string | null
}

interface ComponentEvents {
  onClick: void
}

@Component
export default class Button extends tsx.Component<
  ComponentProps,
  ComponentEvents
> {
  @Prop({ type: Boolean, default: false })
  readonly primary!: boolean

  @Prop({ default: null })
  readonly full!: string | null

  get isFull() {
    return this.full !== null
  }

  get rootClass() {
    // TODO SOON: これもっとスマートな書き方を探す
    const classNames = [styles.cButton]
    if (this.primary) classNames.push(styles.primary)
    if (this.isFull) classNames.push(styles.full)

    return classNames
  }

  onClick() {
    this.$emit('click')
  }

  render() {
    return (
      <span class={this.rootClass} onClick={this.onClick}>
        {this.$slots.default}
      </span>
    )
  }
}
