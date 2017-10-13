import { ADD_LIST, DELETE_LIST, GET_ALL_LISTS_IN_BOARD } from './constants'

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
        data: state.data.concat(action.payload.data),
      }
    case `${ADD_LIST}_ERROR`:
      return {
        ...state,
        error: action.error.message,
      }
    case `${DELETE_LIST}_SENT`:
      return {
        ...state,
      }
    case `${DELETE_LIST}_SUCCESS`:
      return {
        ...state,
        data: state.data.filter(list => list.id !== action.meta.previousAction.listId),
      }
    case `${DELETE_LIST}_ERROR`:
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
    default:
      return state
  }
}
