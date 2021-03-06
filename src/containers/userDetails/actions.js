import { UPDATE_USER, DELETE_USER } from './constants'

export const updateUser = (userId, formValues) => (dispatch) => {
  dispatch({
    type: UPDATE_USER,
    payload: {
      request: {
        method: 'POST',
        url: `/api/users/${userId}/update/`,
        data: {
          fullName: `${formValues.lastname} ${formValues.firstname}`,
          password: formValues.password,
        },
      },
    },
  })
}

export const deleteUser = userId => (dispatch) => {
  dispatch({
    type: DELETE_USER,
    userId,
    payload: {
      request: {
        method: 'DELETE',
        url: `/api/users/${userId}`,
      },
    },
  })
}
