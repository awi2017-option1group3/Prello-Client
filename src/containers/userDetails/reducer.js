import { UPDATE_USER, DELETE_USER } from './constants'

const initialState = {
  error: '',
  isUpdating: false,
  isDeleting: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case `${UPDATE_USER}_SUCCESS`:
      return {
        ...state,
        ...action.payload.data,
        isUpdating: true,
      }
    case `${UPDATE_USER}_FAIL`:
      return {
        ...state,
        error: action.error.message,
      }
    case `${DELETE_USER}_SUCCESS`:
      return {
        ...state,
        isDeleting: true,
      }
    default:
      return state
  }
}
