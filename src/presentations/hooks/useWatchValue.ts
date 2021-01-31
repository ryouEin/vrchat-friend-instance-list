import { useEffect, useRef, useState } from 'react'

type Callback<T> = (newValue: T, oldValue: T | undefined) => void
export const useWatchValue = <T>(value: T, callback: Callback<T>) => {
  const savedCallback = useRef<Callback<T>>()
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  const [oldValue, setOldValue] = useState<T | undefined>(undefined)
  const savedOldValue = useRef<T>()
  useEffect(() => {
    savedOldValue.current = oldValue
  }, [oldValue])

  useEffect(() => {
    if (savedCallback.current !== undefined) {
      savedCallback.current(value, savedOldValue.current)
    }
    setOldValue(value)
  }, [value, setOldValue])
}
