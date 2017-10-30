import { CLEAN_STATE, GET_ALL_LISTS_IN_BOARD, GET_ONE_BOARD, SAVE_BOARD_TITLE } from './constants'

export const cleanState = () => (dispatch) => {
  dispatch({
    type: CLEAN_STATE,
  })
}

export const getAllListsInBoard = boardId => (dispatch) => {
  dispatch({
    type: GET_ALL_LISTS_IN_BOARD,
    payload: {
      request: {
        method: 'GET',
        url: `/boards/${boardId}/lists`,
      },
    },
  })
}

export const getOneBoard = boardId => (dispatch) => {
  dispatch({
    type: GET_ONE_BOARD,
    payload: {
      request: {
        method: 'GET',
        url: `/boards/${boardId}`,
      },
    },
  })
}

export const saveBoardTitle = (boardId, boardTitle) => (dispatch) => {
  dispatch({
    type: SAVE_BOARD_TITLE,
    payload: {
      request: {
        method: 'PUT',
        url: `/boards/${boardId}`,
        data: {
          title: boardTitle,
        },
      },
    },
  })
}
