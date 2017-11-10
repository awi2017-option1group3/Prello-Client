import moment from 'moment'

import { CLEAN_STATE, AUTHENTICATE } from './constants'

const initialState = {
  token: '',
  tokenToRefresh: '',
  expiresAt: moment(),
  isAuthenticating: false,
  failedAuthentication: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case `${CLEAN_STATE}`:
      return initialState
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
    default:
      return state
  }
}
