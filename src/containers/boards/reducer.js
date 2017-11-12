import { CLEAN_STATE, GET_OWNED_BOARDS_FOR_USER, GET_CONTRIBUTING_BOARDS_FOR_USER, ADD_BOARD, DELETE_BOARD } from './constants'

const initialState = {
  ownedBoards: {
    data: [],
    areFetching: false,
    areFetched: false,
  },
  contributingBoards: {
    data: [],
    areFetching: false,
    areFetched: false,
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CLEAN_STATE:
      return initialState
    case `${GET_OWNED_BOARDS_FOR_USER}`:
      return {
        ...state,
        ownedBoards: {
          ...state.ownedBoards,
          areFetching: true,
          areFetched: false,
        },
      }
    case `${GET_OWNED_BOARDS_FOR_USER}_SUCCESS`:
      return {
        ...state,
        ownedBoards: {
          ...state.ownedBoards,
          data: action.payload.data,
          areFetching: false,
          areFetched: true,
        },
      }
    case `${GET_CONTRIBUTING_BOARDS_FOR_USER}`:
      return {
        ...state,
        contributingBoards: {
          ...state.contributingBoards,
          areFetching: true,
          areFetched: false,
        },
      }
    case `${GET_CONTRIBUTING_BOARDS_FOR_USER}_SUCCESS`:
      return {
        ...state,
        contributingBoards: {
          ...state.contributingBoards,
          data: action.payload.data,
          areFetching: false,
          areFetched: true,
        },
      }
    case `${ADD_BOARD}_SUCCESS`:
      return {
        ...state,
        ownedBoards: {
          ...state.ownedBoards,
          data: state.ownedBoards.data.concat(action.payload.data),
        },
      }
    case `${DELETE_BOARD}_SUCCESS`:
      return {
        ...state,
        ownedBoards: {
          ...state.ownedBoards,
          data: state.ownedBoards.data.filter(board => board.id !== action.meta.previousAction.boardId),
        },
      }
    default:
      return state
  }
}
