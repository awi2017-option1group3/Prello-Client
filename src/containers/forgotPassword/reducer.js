import { SEND_FORGOT_PASSWORD, GET_USER_FORGOT_PASSWORD } from './constants'

const initialState = {
  success: false,
  error: '',
  user: null,
  isGettingUser: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case `${SEND_FORGOT_PASSWORD}`:
      return {
        ...state,
      }
    case `${SEND_FORGOT_PASSWORD}_SUCCESS`:
      return {
        ...state,
        success: true,
      }
    case `${SEND_FORGOT_PASSWORD}_FAIL`:
      return {
        ...state,
        error: action.error.message,
      }
    case `${GET_USER_FORGOT_PASSWORD}`:
      return {
        ...state,
      }
    case `${GET_USER_FORGOT_PASSWORD}_SUCCESS`:
      debugger
      return {
        ...state,
        user: action.payload.data,
        isGettingUser: true,
      }
    case `${GET_USER_FORGOT_PASSWORD}_FAIL`:
      return {
        ...state,
        error: action.error.message,
      }
    default:
      return state
  }
}
