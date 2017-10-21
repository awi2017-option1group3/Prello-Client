import { GET_ALL_LISTS_IN_BOARD, GET_ALL_CARDS_IN_LIST, SAVE_CARD_RANK, SAVE_LIST_RANK } from './constants'

const initialState = {
  data: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case `${GET_ALL_CARDS_IN_LIST}_SENT`:
      return {
        ...state,
      }
    case `${GET_ALL_CARDS_IN_LIST}_SUCCESS`:
      return {
        ...state,
        data: state.data.concat(action.payload.data),
      }
    case `${GET_ALL_CARDS_IN_LIST}_ERROR`:
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
    case `${SAVE_CARD_RANK}_SENT`:
      return {
        ...state,
      }
    case `${SAVE_CARD_RANK}_SUCCESS`:
      return {
        ...state,
        data: state.data.concat(action.payload.data),
      }
    case `${SAVE_CARD_RANK}_ERROR`:
      return {
        ...state,
        error: action.error.message,
      }
    case `${SAVE_LIST_RANK}_SENT`:
      return {
        ...state,
      }
    case `${SAVE_LIST_RANK}_SUCCESS`:
      return {
        ...state,
        data: action.payload.data,
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
