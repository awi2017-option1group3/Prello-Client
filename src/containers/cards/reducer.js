import { CLEAN_STATE, ADD_CARD, DELETE_CARD, GET_ALL_CARDS_IN_LIST, SAVE_CARD_TITLE, SAVE_CARD_RANK } from './constants'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case `${CLEAN_STATE}`:
      return []
    case `${ADD_CARD}_SENT`:
      return state
    case `${ADD_CARD}_SUCCESS`:
      return state.concat(action.payload.data)
    case `${ADD_CARD}_ERROR`:
      return state
    case `${DELETE_CARD}_SENT`:
      return state
    case `${DELETE_CARD}_SUCCESS`:
      return state.filter(card => card.id !== action.meta.previousAction.cardId)
    case `${DELETE_CARD}_ERROR`:
      return state
    case `${GET_ALL_CARDS_IN_LIST}_SENT`:
      return state
    case `${GET_ALL_CARDS_IN_LIST}_SUCCESS`:
      return state.concat(action.payload.data)
    case `${GET_ALL_CARDS_IN_LIST}_ERROR`:
      return state
    case `${SAVE_CARD_TITLE}_SENT`:
      return state
    case `${SAVE_CARD_TITLE}_SUCCESS`:
      return state
    case `${SAVE_CARD_TITLE}_ERROR`:
      return state
    case `${SAVE_CARD_RANK}_SENT`:
      return state
    case `${SAVE_CARD_RANK}_SUCCESS`:
      return state.map(card => (card.id === action.meta.previousAction.cardId) ? action.payload.data : card)
    case `${SAVE_CARD_RANK}_ERROR`:
      return state
    default:
      return state
  }
}
