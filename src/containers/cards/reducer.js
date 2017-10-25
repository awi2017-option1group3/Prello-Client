import { CLEAN_STATE, ADD_CARD, DELETE_CARD, GET_ALL_CARDS_IN_LIST } from './constants'

const initialState = {
  data: [],
  isFetchingListIds: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case `${CLEAN_STATE}`:
      return initialState
    case `${ADD_CARD}_SUCCESS`:
      return {
        ...state,
        data: state.data.concat(action.payload.data),
      }
    case `${DELETE_CARD}_SUCCESS`:
      return {
        ...state,
        data: state.data.filter(card => card.id !== action.meta.previousAction.cardId),
      }
    case `${GET_ALL_CARDS_IN_LIST}`:
      return {
        ...state,
        isFetchingListIds: state.isFetchingListIds.concat(action.listId),
      }
    case `${GET_ALL_CARDS_IN_LIST}_SUCCESS`:
      return {
        data: state.data.concat(action.payload.data),
        isFetchingListIds: state.isFetchingListIds.filter(id => id !== action.meta.previousAction.listId),
      }
    case `${GET_ALL_CARDS_IN_LIST}_ERROR`:
      return {
        ...state,
        isFetchingListIds: state.isFetchingListIds.filter(id => id !== action.meta.previousAction.listId),
      }
    default:
      return state
  }
}
