import { CLEAN_STATE, GET_ONE_USER_BY_TOKEN, REFRESH_TOKEN, SET_TOKEN } from './constants'

export const cleanState = () => (dispatch) => {
  dispatch({
    type: CLEAN_STATE,
  })
}

export const getOneUserByToken = userToken => (dispatch) => {
  dispatch({
    type: GET_ONE_USER_BY_TOKEN,
    payload: {
      request: {
        method: 'GET',
        url: `/auth/tokens/${userToken}`,
      },
    },
  })
}

export const refreshToken = tokenToRefresh => (dispatch) => {
  dispatch({
    type: REFRESH_TOKEN,
    payload: {
      request: {
        method: 'POST',
        url: '/auth/token',
        data: {
          grant_type: 'refresh_token',
          refresh_token: tokenToRefresh,
          client_id: process.env.REACT_APP_CLIENT_ID,
          client_secret: process.env.REACT_APP_CLIENT_SECRET,
        },
      },
    },
  })
}

export const setToken = tokenData => (dispatch) => {
  dispatch({
    type: SET_TOKEN,
    tokenData,
  })
}
