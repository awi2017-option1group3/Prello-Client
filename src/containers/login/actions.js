import { AUTHENTICATE, REFRESH_TOKEN } from './constants'

// TODO: Move in env variable the `client_id` and `client_secret`
export const authenticate = (email, password) => (dispatch) => {
  dispatch({
    type: AUTHENTICATE,
    payload: {
      request: {
        method: 'POST',
        url: '/auth/token',
        data: {
          grant_type: 'password',
          username: email,
          password,
          client_id: process.env.REACT_APP_CLIENT_ID,
          client_secret: process.env.REACT_APP_CLIENT_SECRET,
        },
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