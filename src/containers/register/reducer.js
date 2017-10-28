import { REGISTER } from './constants'

const initialState = {
  success: false,
  error: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case `${REGISTER}`:
      return {
        ...state,
      }
    case `${REGISTER}_SUCCESS`:
      return {
        ...state,
        success: true,
      }
    case `${REGISTER}_ERROR`:
      return {
        ...state,
        error: action.error.message,
      }
    default:
      return state
  }
}
