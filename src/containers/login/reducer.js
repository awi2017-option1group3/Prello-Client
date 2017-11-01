import moment from 'moment'

import { AUTHENTICATE, REFRESH_TOKEN } from './constants'

const initialState = {
  token: '',
  tokenToRefresh: '',
  expiresAt: moment(),
  isAuthenticating: false,
  isRefreshingToken: false,
  failedAuthentication: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case `${AUTHENTICATE}`:
      return {
        ...state,
        isAuthenticating: true,
      }
    case `${AUTHENTICATE}_SUCCESS`:
      return {
        ...state,
        token: action.payload.data.access_token,
        tokenToRefresh: action.payload.data.refresh_token,
        expiresAt: moment().add(action.payload.data.expires_in, 's'),
        isAuthenticating: false,
        failedAuthentication: false,
      }
    case `${AUTHENTICATE}_FAIL`:
      return {
        ...state,
        isAuthenticating: false,
        failedAuthentication: true,
      }
    case `${REFRESH_TOKEN}`:
      return {
        ...state,
        isRefreshingToken: true,
      }
    case `${REFRESH_TOKEN}_SUCCESS`:
      return {
        ...state,
        token: action.payload.data.access_token,
        tokenToRefresh: action.payload.data.refresh_token,
        expiresAt: moment().add(action.payload.data.expires_in, 's'),
        isRefreshingToken: false,
      }
    case `${REFRESH_TOKEN}_FAIL`:
      return {
        ...state,
        isRefreshingToken: false,
      }
    default:
      return state
  }
}
