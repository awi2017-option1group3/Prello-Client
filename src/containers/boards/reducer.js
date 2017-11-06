import { GET_ALL_BOARDS, ADD_BOARD, DELETE_BOARD } from './constants'

const initialState = {
  data: [],
  isFetching: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case `${GET_ALL_BOARDS}`:
      return {
        ...state,
        isFetching: true,
      }
    case `${GET_ALL_BOARDS}_SUCCESS`:
      return {
        data: action.payload.data,
        isFetching: false,
      }
    case `${GET_ALL_BOARDS}_FAIL`:
      return {
        ...state,
        isFetching: false,
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
