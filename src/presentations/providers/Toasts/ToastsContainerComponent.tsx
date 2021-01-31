import { useToast } from './useToast'
import { ToastGroupComponent } from './components/ToastGroupComponent/ToastGroupComponent'

export const ToastsContainerComponent = () => {
  const { toasts, dismissToast } = useToast()

  return <ToastGroupComponent toasts={toasts} dismiss={dismissToast} />
}
