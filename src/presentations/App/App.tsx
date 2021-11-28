import React, { useCallback, useEffect, useState } from 'react'
import styles from './style.module.scss'
import { HomeContainerComponent } from '../views/Home/HomeContainerComponent/HomeContainerComponent'
import {
  instancesRepository,
  newsRepository,
  settingRepository,
} from '../../factory/repository'
import { useSetting } from '../store/Setting/useSetting'
import { useRegularWatchingInstanceCheck } from './hooks/useRegularWatchingInstanceCheck'
import { useRootCSSVariablesStyle } from './hooks/useRootCSSVariablesStyle'
import { ErrorBoundary } from './ErrorBoundary'
import { AlertsProvider } from '../providers/Alerts/AlertsProvider'
import { AlertContainerComponent } from '../providers/Alerts/AlertContainerComponent'
import { useNotification } from './hooks/useNotification'
import { useFullLoader } from '../providers/FullLoader/useFullLoader'
import { FullLoaderContainerComponent } from '../providers/FullLoader/FullLoaderContainerComponent'
import { ToastsContainerComponent } from '../providers/Toasts/ToastsContainerComponent'
import { AlertsContext } from '../providers/Alerts/AlertsContext'
import { ToastsContext } from '../providers/Toasts/ToastsContext'
import { useMount } from 'react-use'
import { notifier } from '../../factory/notifier'
import { HeaderContainerComponent } from './components/HeaderContainerComponent/HeaderContainerComponent'
import { useAlert } from '../providers/Alerts/useAlert'
import { MarkdownTextComponent } from '../components/presentational/MarkdownTextComponent/MarkdownTextComponent'
import { useNews } from './hooks/useNews'

const Content = () => {
  const { notifications } = useNotification(notifier)
  const { alertUnreadNews } = useNews()

  useEffect(() => {
    alertUnreadNews()
  }, [alertUnreadNews])

  return (
    <>
      <HeaderContainerComponent notifications={notifications} />
      <div className={styles.main}>
        <HomeContainerComponent />
      </div>
    </>
  )
}

export const App = () => {
  const [initialized, setInitialized] = useState(false)
  const rootCSSVariablesStyle = useRootCSSVariablesStyle()
  const setting = useSetting(settingRepository)
  const { notify } = useNotification(notifier)
  const fullLoader = useFullLoader()
  useRegularWatchingInstanceCheck(instancesRepository, notify)

  useMount(async () => {
    fullLoader.show()
    await setting.init()
    setInitialized(true)
    fullLoader.hide()
  })

  return (
    <AlertsProvider>
      <AlertsContext.Consumer>
        {(alerts) => (
          <ToastsContext.Consumer>
            {(toasts) => (
              <ErrorBoundary alerts={alerts} toasts={toasts}>
                <div
                  id="app"
                  className={styles.root}
                  style={rootCSSVariablesStyle}
                >
                  {initialized && <Content />}
                  <AlertContainerComponent />
                  <FullLoaderContainerComponent />
                  <ToastsContainerComponent />
                </div>
              </ErrorBoundary>
            )}
          </ToastsContext.Consumer>
        )}
      </AlertsContext.Consumer>
    </AlertsProvider>
  )
}
