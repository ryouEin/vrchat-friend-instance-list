import { IconComponent } from '../IconComponent/IconComponent'
import styles from './style.module.scss'
import { useMemo } from 'react'

type SelectItem<T> = {
  label: string
  value: T
}

type Props<T> = {
  items: SelectItem<T>[]
  value: T
  onChange?: (value: T) => void
}
export const SelectComponent: <T>(props: Props<T>) => JSX.Element = (props) => {
  const selectedIndex = useMemo(() => {
    const index = props.items.findIndex((item) => item.value === props.value)
    if (index < 0) {
      throw new Error(
        `cant find ${props.value} in ${JSON.stringify(props.items)}`
      )
    }

    return index
  }, [props])

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (props.onChange !== undefined) {
      const index = Number(event.target.value)
      const value = props.items[index].value

      props.onChange(value)
    }
  }

  const Options = () => {
    return (
      <>
        {props.items.map((item, index) => (
          <option className={styles.option} value={index} key={index}>
            {item.label}
          </option>
        ))}
      </>
    )
  }

  return (
    <div className={styles.root}>
      <select
        className={styles.select}
        value={selectedIndex}
        onChange={onChange}
      >
        <Options />
      </select>
      <div className={styles.arrow}>
        <IconComponent icon="arrow_drop_down" color="front" size={24} />
      </div>
    </div>
  )
}
