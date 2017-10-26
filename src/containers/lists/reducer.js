import { CLEAN_STATE, ADD_LIST, DELETE_LIST, GET_ALL_LISTS_IN_BOARD, RENAME_LIST, SAVE_LIST_RANK } from './constants'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case `${CLEAN_STATE}`:
      return []
    case `${ADD_LIST}_SENT`:
      return state
    case `${ADD_LIST}_SUCCESS`:
      return state.concat(action.payload.data)
    case `${ADD_LIST}_ERROR`:
      return state
    case `${DELETE_LIST}_SENT`:
      return state
    case `${DELETE_LIST}_SUCCESS`:
      return state.filter(list => list.id !== action.meta.previousAction.listId)
    case `${DELETE_LIST}_ERROR`:
      return state
    case `${GET_ALL_LISTS_IN_BOARD}_SENT`:
      return state
    case `${GET_ALL_LISTS_IN_BOARD}_SUCCESS`:
      return action.payload.data
    case `${GET_ALL_LISTS_IN_BOARD}_ERROR`:
      return state
    case `${RENAME_LIST}_SENT`:
      return state
    case `${RENAME_LIST}_SUCCESS`:
      return state
    case `${RENAME_LIST}_ERROR`:
      return state
    case `${SAVE_LIST_RANK}_SENT`:
      return state
    case `${SAVE_LIST_RANK}_SUCCESS`:
      return state.map(list => (list.id === action.meta.previousAction.listId) ? action.payload.data : list)
    case `${SAVE_LIST_RANK}_ERROR`:
      return state
    default:
      return state
  }
}
