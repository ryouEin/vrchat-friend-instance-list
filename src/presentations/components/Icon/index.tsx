import * as tsx from 'vue-tsx-support'
import { Component, Prop } from 'vue-property-decorator'
import styles from './style.module.scss'

interface ComponentProps {
  size: number
  color: string
}

@Component
export default class Icon extends tsx.Component<ComponentProps> {
  @Prop({ default: 16 })
  size!: number

  // TODO: colorをenum等で型にしたい
  @Prop({ default: 'black' })
  color!: string

  get rootStyle() {
    return {
      'font-size': `${this.size}px`,
    }
  }

  get rootClass() {
    // TODO SOON: もっとスマートな書き方
    const classNames = ['material-icons', styles.cIcon]
    if (this.color === 'white') classNames.push(styles.white)
    if (this.color === 'gray') classNames.push(styles.gray)
    if (this.color === 'black') classNames.push(styles.black)
    if (this.color === 'green') classNames.push(styles.green)

    return classNames
  }

  render() {
    return (
      <i class={this.rootClass} style={this.rootStyle}>
        {this.$slots.default}
      </i>
    )
  }
}
