import styles from './style.module.scss'

type Props = {
  checked: boolean
  onChange: (checked: boolean) => void
}
export const ToggleComponent = (props: Props) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked
    props.onChange(checked)
  }

  return (
    <label className={styles.root}>
      <input
        type="checkbox"
        className={styles.input}
        onChange={onChange}
        checked={props.checked}
      />
      <span className={styles.body} />
    </label>
  )
}
