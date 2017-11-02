/* eslint-disable no-undef,react/jsx-filename-extension,import/first */

// Load the environment variables from the potential .env file
require('dotenv').config()

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import 'antd/dist/antd.css'

import registerServiceWorker from './registerServiceWorker'
import store from './store'
import App from './components/app/App'

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <App />
  </Provider>,
  target,
)

registerServiceWorker()
