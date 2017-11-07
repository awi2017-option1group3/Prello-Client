import { CLEAN_STATE, GET_ALL_LABELS_FOR_BOARD } from './constants'

export const cleanState = () => (dispatch) => {
  dispatch({
    type: CLEAN_STATE,
  })
}

export const getAllLabelsForBoard = boardId => (dispatch) => {
  dispatch({
    type: GET_ALL_LABELS_FOR_BOARD,
    payload: {
      request: {
        method: 'GET',
        url: `/api/boards/${boardId}/labels`,
      },
    },
  })
}
