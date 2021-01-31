import styles from './style.module.scss'

type Props = {
  children?: JSX.Element
  hide: () => void
}
export const InstanceModalComponent = (props: Props) => {
  return (
    <div className={styles.root}>
      <div className={styles.overlay} onClick={props.hide} />
      <div className={styles.scrollArea}>
        {/*
          ・Firefoxはoverflow: autoとpaddingを同時に指定すると、下端のpaddingが無視される
          ・InstanceListItem内部のv-click-outsideを有効にするために、stopPropagationは利用できない
          という制約のために若干トリッキーなレイアウトの実装になっている
        */}
        <div className={styles.verticalSpacer} onClick={props.hide} />

        <div className={styles.main}>
          <div className={styles.sideSpacer} onClick={props.hide} />
          <div className={styles.instance}>
            {props.children !== undefined ? props.children : null}
          </div>
          <div className={styles.sideSpacer} onClick={props.hide} />
        </div>

        <div className={styles.verticalSpacer} onClick={props.hide} />
      </div>
    </div>
  )
}
