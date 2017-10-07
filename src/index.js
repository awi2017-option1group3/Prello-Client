/* eslint-disable no-undef,react/jsx-filename-extension */

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import 'antd/dist/antd.css'

import registerServiceWorker from './registerServiceWorker'
import store, { history } from './store'
import App from './components/app/App'

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <App />
      </div>
    </ConnectedRouter>
  </Provider>,
  target,
)

registerServiceWorker()
