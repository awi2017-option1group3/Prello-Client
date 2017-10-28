import { REGISTER } from './constants'

export const register = formValues => (dispatch) => {
  dispatch({
    type: REGISTER,
    payload: {
      request: {
        method: 'POST',
        url: '/register',
        data: {
          fullName: `${formValues.lastname} ${formValues.firstname}`,
          email: formValues.email,
          password: formValues.password,
        },
      },
    },
  })
}
