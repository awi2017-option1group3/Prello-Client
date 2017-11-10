import { CLEAN_STATE, GET_ALL_BOARDS_FOR_USER, ADD_BOARD, DELETE_BOARD } from './constants'

const initialState = {
  data: [],
  areFetching: false,
  areFetched: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAN_STATE:
      return initialState
    case `${GET_ALL_BOARDS_FOR_USER}`:
      return {
        ...state,
        areFetching: true,
      }
    case `${GET_ALL_BOARDS_FOR_USER}_SUCCESS`:
      return {
        data: action.payload.data,
        areFetching: false,
        areFetched: true,
      }
    case `${GET_ALL_BOARDS_FOR_USER}_FAIL`:
      return {
        ...state,
        areFetching: false,
        areFetched: true,
      }
    case `${ADD_BOARD}_SUCCESS`:
      return {
        ...state,
        data: state.data.concat(action.payload.data),
      }
    case `${DELETE_BOARD}_SUCCESS`:
      return {
        ...state,
        data: state.data.filter(board => board.id !== action.meta.previousAction.boardId),
      }
    default:
      return state
  }
}
