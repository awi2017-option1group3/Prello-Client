import { GET_ALL_LABELS_IN_CARD, ADD_LABEL_IN_CARD, REMOVE_LABEL_IN_CARD } from './constants'

export const getAllLabelsInCard = cardId => (dispatch) => {
  dispatch({
    type: GET_ALL_LABELS_IN_CARD,
    payload: {
      request: {
        method: 'GET',
        url: `/api/cards/${cardId}/labels`,
      },
    },
  })
}

export const addLabelInCard = (cardId, labelId) => (dispatch) => {
  dispatch({
    type: ADD_LABEL_IN_CARD,
    cardId,
    payload: {
      request: {
        method: 'POST',
        url: `/api/cards/${cardId}/labels/`,
        data: {
          labelId,
        },
      },
    },
  })
}

export const removeLabelInCard = (cardId, labelId) => (dispatch) => {
  dispatch({
    type: REMOVE_LABEL_IN_CARD,
    payload: {
      request: {
        method: 'DELETE',
        url: `/api/cards/${cardId}/labels/${labelId}`,
      },
    },
  })
}
