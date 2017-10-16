import { ADD_CARD, GET_ALL_CARDS_IN_LIST } from './constants'

const initialState = {
  data: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case `${ADD_CARD}_SENT`:
      return {
        ...state,
      }
    case `${ADD_CARD}_SUCCESS`:
      return {
        ...state,
        data: state.data.concat(action.payload.data),
      }
    case `${ADD_CARD}_ERROR`:
      return {
        ...state,
        error: action.error.message,
      }
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
    default:
      return state
  }
}
