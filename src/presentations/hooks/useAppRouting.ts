import { useHistory } from 'react-router-dom'

export const useAppRouting = () => {
  const history = useHistory()

  return {
    toHome: () => {
      history.push('/')
    },
    toInstanceModal: (instanceId: string) => {
      history.push(`/${instanceId}`)
    },
  }
}
