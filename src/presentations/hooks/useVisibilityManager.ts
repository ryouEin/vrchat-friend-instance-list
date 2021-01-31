import { useCallback, useMemo, useState } from 'react'

export const useVisibilityManager = (initialVisibility: boolean) => {
  const [isVisible, setIsVisible] = useState(initialVisibility)

  const show = useCallback(() => {
    setIsVisible(true)
  }, [setIsVisible])

  const hide = useCallback(() => {
    setIsVisible(false)
  }, [setIsVisible])

  return useMemo(() => {
    return {
      isVisible,
      show,
      hide,
    }
  }, [isVisible, show, hide])
}
