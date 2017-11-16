import { CLEAN_STATE, GET_OWNED_BOARDS_FOR_USER, GET_CONTRIBUTING_BOARDS_FOR_USER, ADD_BOARD, DELETE_BOARD } from './constants'

export const cleanState = () => (dispatch) => {
  dispatch({
    type: CLEAN_STATE,
  })
}

export const getOwnedBoardsForUser = userId => (dispatch) => {
  dispatch({
    type: GET_OWNED_BOARDS_FOR_USER,
    payload: {
      request: {
        method: 'GET',
        url: `/api/users/${userId}/boards`,
      },
    },
  })
}

export const getContributingBoardsForUser = userId => (dispatch) => {
  dispatch({
    type: GET_CONTRIBUTING_BOARDS_FOR_USER,
    payload: {
      request: {
        method: 'GET',
        url: `/api/users/${userId}/contributingBoards`,
      },
    },
  })
}

export const addBoard = (userId, title) => (dispatch) => {
  dispatch({
    type: ADD_BOARD,
    payload: {
      request: {
        method: 'POST',
        url: `/api/users/${userId}/boards/`,
        data: {
          title: title,
        },
      },
    },
  })
}

export const deleteBoard = boardId => (dispatch) => {
  dispatch({
    type: DELETE_BOARD,
    boardId,
    payload: {
      request: {
        method: 'DELETE',
        url: `/api/boards/${boardId}`,
      },
    },
  })
}