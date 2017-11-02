import { CLEAN_STATE, ADD_CARD, DELETE_CARD, GET_ALL_CARDS_IN_LIST, SAVE_CARD_POS } from './constants'

const initialState = {
  data: [],
  isAddingListIds: [],
  isFetchingListIds: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case `${CLEAN_STATE}`:
      return initialState
    case `${ADD_CARD}`:
      return {
        ...state,
        isAddingListIds: state.isAddingListIds.concat(action.listId),
      }
    case `${ADD_CARD}_SUCCESS`:
      return {
        ...state,
        data: state.data.concat(action.payload.data),
        isAddingListIds: state.isAddingListIds.filter(id => id !== action.meta.previousAction.listId),
      }
    case `${ADD_CARD}_ERROR`:
      return {
        ...state,
        isAddingListIds: state.isAddingListIds.filter(id => id !== action.meta.previousAction.listId),
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
        ...state,
        data: state.data.concat(action.payload.data),
        isFetchingListIds: state.isFetchingListIds.filter(id => id !== action.meta.previousAction.listId),
      }
    case `${GET_ALL_CARDS_IN_LIST}_ERROR`:
      return {
        ...state,
        isFetchingListIds: state.isFetchingListIds.filter(id => id !== action.meta.previousAction.listId),
      }
    case `${SAVE_CARD_POS}_SUCCESS`:
      return {
        ...state,
        data: state.data.map(card => (card.id === action.meta.previousAction.cardId) ? action.payload.data : card),
      }
    default:
      return state
  }
}
