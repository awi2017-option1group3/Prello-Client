import { SEND_FORGOT_PASSWORD } from './constants'

export const sendForgotPassword = formValues => (dispatch) => {
  dispatch({
    type: SEND_FORGOT_PASSWORD,
    payload: {
      request: {
        method: 'POST',
        url: '/forgotPassword',
        data: {
          email: formValues.email,
        },
      },
    },
  })
}
