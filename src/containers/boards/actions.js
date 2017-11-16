import { CLEAN_STATE, GET_ALL_BOARDS_FOR_USER, ADD_BOARD, DELETE_BOARD } from './constants'

export const cleanState = () => (dispatch) => {
  dispatch({
    type: CLEAN_STATE,
  })
}

export const getAllBoardsForUser = userId => (dispatch) => {
  dispatch({
    type: GET_ALL_BOARDS_FOR_USER,
    payload: {
      request: {
        method: 'GET',
        url: `/api/users/${userId}/boards`,
      },
    },
  })
}

export const addBoard = userId => (dispatch) => {
  dispatch({
    type: ADD_BOARD,
    payload: {
      request: {
        method: 'POST',
        url: `/api/users/${userId}/boards/`,
        data: {
          title: 'New board',
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