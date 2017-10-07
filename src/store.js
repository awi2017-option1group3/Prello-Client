import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './reducers'

export const history = createHistory()

const initialState = {}

const apiConnector = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/',
  responseType: 'json',
})

const enhancers = []
const middleware = [
  thunk,
  axiosMiddleware(apiConnector),
  routerMiddleware(history),
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers,
)

export default store
