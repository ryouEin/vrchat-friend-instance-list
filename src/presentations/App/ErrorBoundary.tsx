import React, { ErrorInfo } from 'react'
import { AlertsContext } from '../providers/Alerts/AlertsContext'
import { VRChatApiUnauthorizedError } from '../../libs/VRChatApi/VRChatApi'
import { UNAUTHORIZED_FROM_VRCHAT_ERROR } from '../providers/Alerts/AlertDefinitions'
import { ToastsContext } from '../providers/Toasts/ToastsContext'
import { NetworkError } from '../../libs/Network/Network'
import { ToastTypes } from '../providers/Toasts/types'
import { logger } from '../../factory/logger'

const reportError = (error: Error) => {
  logger.error(error)

  throw error
}

type Props = {
  alerts: AlertsContext
  toasts: ToastsContext
}
type State = {}
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  private init() {
    window.addEventListener('unhandledrejection', (event) => {
      logger.log('unhandledrejection')
      this.errorHandler(event.reason)
    })
  }

  errorHandler(error: unknown) {
    if (!(error instanceof Error)) {
      throw new Error('none error object past to errorHandler')
    }
    logger.log(`errorHandler: ${error.message}`)

    if (error instanceof VRChatApiUnauthorizedError) {
      this.props.alerts.alert(UNAUTHORIZED_FROM_VRCHAT_ERROR)
      return
    }
    if (error instanceof NetworkError) {
      this.props.toasts.toast({
        type: ToastTypes.Error,
        content: '通信が何らかの理由により失敗しました',
      })
      return
    }

    reportError(error)
  }

  componentDidMount(): void {
    this.init()
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.log('component did catch')
    this.errorHandler(error)
  }

  render() {
    return this.props.children
  }
}
