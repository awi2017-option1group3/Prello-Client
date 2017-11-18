import { GET_USER_REGISTRATED, VALIDATE_USER } from './constants'


export const getUserRegistrated = token => (dispatch) => {
  dispatch({
    type: GET_USER_REGISTRATED,
    payload: {
      request: {
        method: 'GET',
        url: `auth/registration/${token}`,
      },
    },
  })
}

export const validateUser = token => (dispatch) => {
  dispatch({
    type: VALIDATE_USER,
    payload: {
      request: {
        method: 'POST',
        url: `auth/registration/${token}/validateUser`,
      },
    },
  })
}
