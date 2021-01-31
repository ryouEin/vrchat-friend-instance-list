import React from 'react'
import ReactDOM from 'react-dom'
import './presentations/stylesheets/base.scss'
import { App } from './presentations/App/App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { store } from './presentations/store'
import { HashRouter } from 'react-router-dom'
import 'react-virtualized/styles.css'
import { SEND_ERROR_LOG } from './config/env'
import { initializeSentry } from './initializeSentry'
import { FullLoaderProvider } from './presentations/providers/FullLoader/FullLoaderProvider'
import { ToastsProvider } from './presentations/providers/Toasts/ToastsProvider'

const main = async () => {
  if (SEND_ERROR_LOG) await initializeSentry()

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <FullLoaderProvider>
          <ToastsProvider>
            <HashRouter>
              <App />
            </HashRouter>
          </ToastsProvider>
        </FullLoaderProvider>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  )

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals()
}

main()
