/*
Vueでのテンプレート型チェックに関して
TSX対応すれば大枠出来るが以下に注意
・クラススタイルでコンポーネントを書く必要がある
  ・`implements Props` と書くことでPropsが実装されていることを担保するため
  ・`implements Props` と書かなくてもコンパイルエラーが出ないことに注意が必要
  ・また、Propデコレータをつけ忘れてる場合もエラーが出ない
・Eventは使えない
  ・Reactみたいな感じで、親から関数をPropsとして渡してもらって、それを実行する形になる
 */
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
export default class Button
  extends tsx.Component<ComponentProps, ComponentEvents>
  implements ComponentProps {
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
