import { renderHook } from '@testing-library/react-hooks'
import { useWatchValue } from './useWatchValue'

type CallbackResult<T> = {
  newValue: T
  oldValue: T | undefined
}

describe('useWatchValue', () => {
  it('通常パターン', () => {
    let result: CallbackResult<number> = {
      oldValue: 0,
      newValue: 0,
    }
    let value = 10
    const { rerender } = renderHook(() =>
      useWatchValue(value, (newValue, oldValue) => {
        result.oldValue = oldValue
        result.newValue = newValue
      })
    )
    expect(result).toEqual({
      newValue: 10,
      oldValue: undefined,
    })

    value = 20
    rerender()

    expect(result).toEqual({
      newValue: 20,
      oldValue: 10,
    })
  })
})
