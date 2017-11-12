import { SEND_FORGOT_PASSWORD } from './constants'

const initialState = {
  success: false,
  error: '',
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
    default:
      return state
  }
}
