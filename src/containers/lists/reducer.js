import { CLEAN_STATE, ADD_LIST, DELETE_LIST, GET_ALL_LISTS_IN_BOARD } from './constants'

const initialState = {
  data: [],
  isFetching: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case `${CLEAN_STATE}`:
      return initialState
    case `${ADD_LIST}_SUCCESS`:
      return {
        ...state,
        data: state.data.concat(action.payload.data),
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
        data: action.payload.data,
        isFetching: false,
      }
    case `${GET_ALL_LISTS_IN_BOARD}_ERROR`:
      return {
        ...state,
        isFetching: false,
      }
    default:
      return state
  }
}
