import { SEND_FORGOT_PASSWORD, GET_USER_FORGOT_PASSWORD, RESET_PASSWORD } from './constants'

export const sendForgotPassword = formValues => (dispatch) => {
  dispatch({
    type: SEND_FORGOT_PASSWORD,
    payload: {
      request: {
        method: 'POST',
        url: 'auth/forgotPassword',
        data: {
          email: formValues.email,
        },
      },
    },
  })
}

export const getUserForgotPassword = token => (dispatch) => {
  dispatch({
    type: GET_USER_FORGOT_PASSWORD,
    payload: {
      request: {
        method: 'GET',
        url: `auth/forgotPassword/${token}`,
      },
    },
  })
}

export const resetPassword = (token, formValues) => (dispatch) => {
  dispatch({
    type: RESET_PASSWORD,
    payload: {
      request: {
        method: 'POST',
        url: `auth/forgotPassword/${token}/resetPassword`,
        data: {
          password: formValues.password,
        },
      },
    },
  })
}