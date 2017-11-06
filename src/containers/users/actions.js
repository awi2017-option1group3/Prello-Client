import { CLEAN_STATE, GET_ONE_USER, GET_ALL_USERS } from './constants'

export const cleanState = () => (dispatch) => {
  dispatch({
    type: CLEAN_STATE,
  })
}

export const getOneUser = userId => (dispatch) => {
  dispatch({
    type: GET_ONE_USER,
    payload: {
      request: {
        method: 'GET',
        url: `/api/members/${userId}/`,
      },
    },
  })
}

export const getAllUsers = () => (dispatch) => {
  dispatch({
    type: GET_ALL_USERS,
    payload: {
      request: {
        method: 'GET',
        url: '/api/members/',
      },
    },
  })
}
