import { REGISTER } from './constants'

const initialState = {
  data: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case `${REGISTER}_SENT`:
      return {
        ...state,
      }
    case `${REGISTER}_SUCCESS`:
      return {
        ...state,
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
