import { GET_ALL_BOARDS, ADD_BOARD, DELETE_BOARD } from './constants'

export const getAllBoards = () => (dispatch) => {
  dispatch({
    type: GET_ALL_BOARDS,
    payload: {
      request: {
        method: 'GET',
        url: '/api/boards',
      },
    },
  })
}

export const addBoard = () => (dispatch) => {
  dispatch({
    type: ADD_BOARD,
    payload: {
      request: {
        method: 'POST',
        url: '/api/boards/',
        data: {
          title: 'New board',
        },
      },
    },
  })
}

export const deleteBoard = (boardId) => (dispatch) => {
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