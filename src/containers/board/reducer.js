import { CLEAN_STATE, GET_ALL_LISTS_IN_BOARD, GET_ALL_LABELS_IN_BOARD, GET_ONE_BOARD } from './constants'

const initialState = {
  id: '',
  title: '',
  labels: [],
  owner: null,
  contributors: [],
  hasFailed: false,
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
        hasFailed: false,
        ...action.payload.data,
      }
    case `${GET_ALL_LISTS_IN_BOARD}_FAIL`:
      return {
        ...state,
        hasFailed: true,
      }
    case GET_ONE_BOARD:
      return {
        ...state,
      }
    case `${GET_ONE_BOARD}_SUCCESS`:
      return {
        ...state,
        hasFailed: false,
        ...action.payload.data,
      }
    case `${GET_ONE_BOARD}_FAIL`:
      return {
        ...state,
        hasFailed: true,
      }
    case `${GET_ALL_LABELS_IN_BOARD}_SUCCESS`:
      return {
        ...state,
        labels: action.payload.data,
      }
    default:
      return state
  }
}
