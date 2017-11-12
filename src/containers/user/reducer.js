import moment from 'moment'

import { CLEAN_STATE, GET_ONE_USER_BY_TOKEN, REFRESH_TOKEN, SET_TOKEN } from './constants'

const initialState = {
  infos: null,
  auth: {
    token: '',
    tokenToRefresh: '',
    expiresAt: moment(),
    isRefreshingToken: false,
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAN_STATE:
      return initialState
    case `${GET_ONE_USER_BY_TOKEN}_SUCCESS`:
      return {
        ...state,
        infos: action.payload.data,
      }
    case `${REFRESH_TOKEN}`:
      return {
        ...state,
        auth: {
          ...state.auth,
          isRefreshingToken: true,
        },
      }
    case `${REFRESH_TOKEN}_SUCCESS`:
      return {
        ...state,
        auth: {
          token: action.payload.data.access_token,
          tokenToRefresh: action.payload.data.refresh_token,
          expiresAt: moment().add(action.payload.data.expires_in, 's'),
          isRefreshingToken: false,
        },
      }
    case `${REFRESH_TOKEN}_FAIL`:
      return {
        ...state,
        auth: {
          ...state.auth,
          isRefreshingToken: false,
        },
      }
    case SET_TOKEN:
      return {
        ...state,
        auth: {
          ...state.auth,
          token: action.tokenData.token,
          tokenToRefresh: action.tokenData.tokenToRefresh,
          expiresAt: action.tokenData.expiresAt,
        },
      }
    default:
      return state
  }
}
