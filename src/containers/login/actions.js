import { CLEAN_STATE, AUTHENTICATE } from './constants'

export const cleanState = () => (dispatch) => {
  dispatch({
    type: CLEAN_STATE,
  })
}

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
