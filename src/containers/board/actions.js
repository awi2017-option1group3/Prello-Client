import { CLEAN_STATE, GET_ALL_LISTS_IN_BOARD } from './constants'

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
