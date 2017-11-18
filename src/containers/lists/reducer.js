import {
  CLEAN_STATE, ADD_LIST, DELETE_LIST, GET_ALL_LISTS_IN_BOARD, SAVE_LIST_POS, RENAME_LIST,
  PUSH_NEW_LIST, PUSH_NEW_LIST_NAME, PUSH_NEW_LIST_POSITION, PUSH_DELETE_LIST,
} from './constants'
import { emitAddList, emitRenameList, emitMoveList, emitDeleteList } from '../../websockets'

const initialState = {
  data: [],
  isAdding: false,
  isFetching: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case `${CLEAN_STATE}`:
      return initialState

    // Realtime pushes
    case PUSH_NEW_LIST:
      return {
        ...state,
        data: state.data.concat(action.list),
      }
    case PUSH_NEW_LIST_NAME:
      return {
        ...state,
        data: state.data.map(list => ((list.id === action.list.id) ? action.list : list)),
      }
    case PUSH_NEW_LIST_POSITION:
      return {
        ...state,
        data: state.data.map(list => ((list.id === action.list.id) ? action.list : list)),
      }
    case PUSH_DELETE_LIST:
      return {
        ...state,
        data: state.data.filter(list => list.id !== action.listId),
      }

    // API calls results
    case `${ADD_LIST}`:
      return {
        ...state,
        isAdding: true,
      }
    case `${ADD_LIST}_SUCCESS`:
      emitAddList({
        object: action.payload.data,
        boardId: action.meta.previousAction.boardId,
      })
      return {
        ...state,
        data: state.data.concat(action.payload.data),
        isAdding: false,
      }
    case `${ADD_LIST}_FAIL`:
      return {
        ...state,
        isAdding: false,
      }
    case `${DELETE_LIST}_SUCCESS`:
      emitDeleteList({
        object: {
          listId: action.meta.previousAction.listId,
        },
        boardId: action.meta.previousAction.boardId,
      })
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
    case `${GET_ALL_LISTS_IN_BOARD}_FAIL`:
      return {
        ...state,
        isFetching: false,
      }
    case `${RENAME_LIST}_SUCCESS`:
      emitRenameList({
        object: action.payload.data,
        boardId: action.meta.previousAction.boardId,
      })
      return {
        ...state,
        data: state.data.map(list => ((list.id === action.payload.data.id) ? action.payload.data : list)),
      }
    case `${SAVE_LIST_POS}_SUCCESS`:
      emitMoveList({
        object: action.payload.data,
        boardId: action.meta.previousAction.boardId,
      })
      return {
        ...state,
        data: state.data.map(list => ((list.id === action.payload.data.id) ? action.payload.data : list)),
      }
    default:
      return state
  }
}
