import { GET_USER_REGISTRATED } from './constants'

const initialState = {
  error: '',
  user: null,
  isGettingUser: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case `${GET_USER_REGISTRATED}`:
      return {
        ...state,
      }
    case `${GET_USER_REGISTRATED}_SUCCESS`:
      return {
        ...state,
        user: action.payload.data,
        isGettingUser: true,
      }
    case `${GET_USER_REGISTRATED}_FAIL`:
      return {
        ...state,
        error: action.error.message,
        isGettingUser: false,
      }
    default:
      return state
  }
}
