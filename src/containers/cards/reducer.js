import {
  CLEAN_STATE, ADD_CARD, DELETE_CARD, GET_ALL_CARDS_IN_LIST, REFRESH_CARD, SAVE_CARD_TITLE, SAVE_CARD_POS,
  PUSH_NEW_CARD, PUSH_NEW_CARD_NAME, PUSH_NEW_CARD_POSITION, PUSH_DELETE_CARD, PUSH_REFRESH_CARD,
} from './constants'
import { emitAddCard, emitRenameCard, emitMoveCard, emitDeleteCard, emitRefreshCard } from '../../websockets'

const initialState = {
  data: [],
  isAddingListIds: [],
  isFetchingListIds: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case `${CLEAN_STATE}`:
      return initialState

    // Realtime pushes
    case PUSH_NEW_CARD:
      return {
        ...state,
        data: state.data.concat(action.card),
      }
    case PUSH_NEW_CARD_NAME:
      return {
        ...state,
        data: state.data.map(card => ((card.id === action.card.id) ? action.card : card)),
      }
    case PUSH_NEW_CARD_POSITION:
      return {
        ...state,
        data: state.data.map(card => ((card.id === action.card.id) ? action.card : card)),
      }
    case PUSH_DELETE_CARD:
      return {
        ...state,
        data: state.data.filter(card => card.id !== action.cardId),
      }
    case PUSH_REFRESH_CARD:
      return {
        ...state,
        data: state.data.map(card => ((card.id === action.card.id) ? action.card : card)),
      }

    // API calls results
    case `${ADD_CARD}`:
      return {
        ...state,
        isAddingListIds: state.isAddingListIds.concat(action.listId),
      }
    case `${ADD_CARD}_SUCCESS`:
      emitAddCard({
        object: action.payload.data,
        boardId: action.meta.previousAction.boardId,
      })
      return {
        ...state,
        data: state.data.concat(action.payload.data),
        isAddingListIds: state.isAddingListIds.filter(id => id !== action.meta.previousAction.listId),
      }
    case `${ADD_CARD}_FAIL`:
      return {
        ...state,
        isAddingListIds: state.isAddingListIds.filter(id => id !== action.meta.previousAction.listId),
      }
    case `${DELETE_CARD}_SUCCESS`:
      emitDeleteCard({
        object: {
          cardId: action.meta.previousAction.cardId,
        },
        boardId: action.meta.previousAction.boardId,
      })
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
    case `${REFRESH_CARD}_SUCCESS`:
      emitRefreshCard({
        object: action.payload.data,
        boardId: action.meta.previousAction.boardId,
      })
      return {
        ...state,
        data: state.data.map(card => ((card.id === action.meta.previousAction.cardId) ? action.payload.data : card)),
      }
    case `${GET_ALL_CARDS_IN_LIST}_FAIL`:
      return {
        ...state,
        isFetchingListIds: state.isFetchingListIds.filter(id => id !== action.meta.previousAction.listId),
      }
    case `${SAVE_CARD_TITLE}_SUCCESS`:
      emitRenameCard({
        object: action.payload.data,
        boardId: action.meta.previousAction.boardId,
      })
      return {
        ...state,
        data: state.data.map(card => ((card.id === action.payload.data.id) ? action.payload.data : card)),
      }
    case `${SAVE_CARD_POS}_SUCCESS`:
      emitMoveCard({
        object: action.payload.data,
        boardId: action.meta.previousAction.boardId,
      })
      return {
        ...state,
        data: state.data.map(card => ((card.id === action.payload.data.id) ? action.payload.data : card)),
      }
    default:
      return state
  }
}
