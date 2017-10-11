import { ADD_LIST, GET_ALL_LISTS, DELETE_LIST } from './constants'

const initialState = {
  lists: [],
  isAddingList: false,
  isGettingAllLists: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case `${ADD_LIST}_SENT`:
      return {
        ...state,
        isAddingList: true,
      }
    case `${ADD_LIST}_SUCCESS`:
      return {
        ...state,
        lists: state.lists.concat([action.payload.data]),
        isAddingList: false,
      }
    case `${ADD_LIST}_ERROR`:
      return {
        ...state,
        error: action.error.message,
        isAddingList: false,
      }
    case `${GET_ALL_LISTS}_SENT`:
      return {
        ...state,
        isGettingAllLists: true,
      }
    case `${GET_ALL_LISTS}_SUCCESS`:
      return {
        ...state,
        lists: action.payload.data,
        isGettingAllLists: false,
      }
    case `${GET_ALL_LISTS}_ERROR`:
      return {
        ...state,
        error: action.error.message,
        isGettingAllLists: false,
      }
    case `${DELETE_LIST}_SENT`:
      return {
        ...state,
        isRemovingList: true,
      }
    case `${DELETE_LIST}_SUCCESS`:
      return {
        ...state,
        lists: state.lists.filter(list => list.id !== action.meta.previousAction.listId),
        isRemovingList: false,
      }
    case `${DELETE_LIST}_ERROR`:
      return {
        ...state,
        error: action.error.message,
        isRemovingList: false,
      }
    default:
      return state
  }
}
