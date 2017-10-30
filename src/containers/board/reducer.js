import { CLEAN_STATE, GET_ALL_LISTS_IN_BOARD, GET_ONE_BOARD } from './constants'

const initialState = {
  data: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case `${CLEAN_STATE}`:
      return initialState
    case `${GET_ALL_LISTS_IN_BOARD}_SENT`:
      return {
        ...state,
      }
    case `${GET_ALL_LISTS_IN_BOARD}_SUCCESS`:
      return {
        ...state,
        ...action.payload.data,
      }
    case `${GET_ALL_LISTS_IN_BOARD}_ERROR`:
      return {
        ...state,
      }
    case `${GET_ONE_BOARD}_SENT`:
      return {
        ...state,
      }
    case `${GET_ONE_BOARD}_SUCCESS`:
      return {
        ...state,
        ...action.payload.data,
      }
    case `${GET_ONE_BOARD}_ERROR`:
      return {
        ...state,
      }
    default:
      return state
  }
}
