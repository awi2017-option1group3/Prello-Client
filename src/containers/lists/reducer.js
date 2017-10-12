import { ADD_LIST, GET_ALL_LISTS_IN_BOARD, SAVE_LIST_RANK } from './constants'

const initialState = {
  data: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case `${ADD_LIST}_SENT`:
      return {
        ...state,
      }
    case `${ADD_LIST}_SUCCESS`:
      return {
        ...state,
        data: state.data.concat([action.payload.data]),
      }
    case `${ADD_LIST}_ERROR`:
      return {
        ...state,
        error: action.error.message,
      }
    case `${GET_ALL_LISTS_IN_BOARD}_SENT`:
      return {
        ...state,
      }
    case `${GET_ALL_LISTS_IN_BOARD}_SUCCESS`:
      return {
        ...state,
        data: action.payload.data,
      }
    case `${GET_ALL_LISTS_IN_BOARD}_ERROR`:
      return {
        ...state,
        error: action.error.message,
      }
    case `${SAVE_LIST_RANK}_ERROR`:
      return {
        ...state,
        error: action.error.message,
      }
    default:
      return state
  }
}
