import { CLEAN_STATE, GET_ALL_LISTS_IN_BOARD, GET_ONE_BOARD } from './constants'

const initialState = {
  title: '',
  owner: '',
  isFailed: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case `${CLEAN_STATE}`:
      return initialState
    case GET_ALL_LISTS_IN_BOARD:
      return {
        ...state,
      }
    case `${GET_ALL_LISTS_IN_BOARD}_SUCCESS`:
      return {
        ...state,
        isFailed: false,
        ...action.payload.data,
      }
    case `${GET_ALL_LISTS_IN_BOARD}_FAIL`:
      return {
        ...state,
        isFailed: true,
      }
    case GET_ONE_BOARD:
      return {
        ...state,
      }
    case `${GET_ONE_BOARD}_SUCCESS`:
      return {
        ...state,
        isFailed: false,
        ...action.payload.data,
      }
    case `${GET_ONE_BOARD}_FAIL`:
      return {
        ...state,
        isFailed: true,
      }
    default:
      return state
  }
}
