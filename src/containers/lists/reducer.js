import { CLEAN_STATE, ADD_LIST, DELETE_LIST, GET_ALL_LISTS_IN_BOARD, SAVE_LIST_POS } from './constants'

const initialState = {
  data: [],
  isAdding: false,
  isFetching: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case `${CLEAN_STATE}`:
      return initialState
    case `${ADD_LIST}`:
      return {
        ...state,
        isAdding: true,
      }
    case `${ADD_LIST}_SUCCESS`:
      return {
        ...state,
        data: state.data.concat(action.payload.data),
        isAdding: false,
      }
    case `${ADD_LIST}_ERROR`:
      return {
        ...state,
        isAdding: false,
      }
    case `${DELETE_LIST}_SUCCESS`:
      return {
        ...state,
        data: state.data.filter(list => list.id !== action.meta.previousAction.listId),
      }
    case `${GET_ALL_LISTS_IN_BOARD}`:
      return {
        ...state,
        isFetching: true,
      }
    case `${GET_ALL_LISTS_IN_BOARD}_SUCCESS`:
      return {
        ...state,
        data: action.payload.data,
        isFetching: false,
      }
    case `${GET_ALL_LISTS_IN_BOARD}_ERROR`:
      return {
        ...state,
        isFetching: false,
      }
    case `${SAVE_LIST_POS}_SUCCESS`:
      return {
        ...state,
        data: state.data.map(list => (list.id === action.meta.previousAction.listId) ? action.payload.data : list),
      }
    default:
      return state
  }
}
