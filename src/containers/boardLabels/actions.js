import { GET_ALL_LABELS_IN_BOARD, ADD_LABEL, REMOVE_LABEL } from './constants'

export const getAllLabelsInBoard = boardId => (dispatch) => {
  dispatch({
    type: GET_ALL_LABELS_IN_BOARD,
    payload: {
      request: {
        method: 'GET',
        url: `/api/boards/${boardId}/labels`,
      },
    },
  })
}

export const addLabelToBoard = (boardId, name, color) => (dispatch) => {
  dispatch({
    type: ADD_LABEL,
    payload: {
      request: {
        method: 'POST',
        url: `/api/boards/${boardId}/labels/`,
        data: {
          name,
          color,
        },
      },
    },
  })
}

export const removeLabelFromBoard = (boardId, labelId) => (dispatch) => {
  dispatch({
    type: REMOVE_LABEL,
    labelId,
    payload: {
      request: {
        method: 'DELETE',
        url: `/api/boards/${boardId}/labels/${labelId}`,
      },
    },
  })
}
