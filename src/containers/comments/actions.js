import { GET_ALL_COMMENTS_IN_CARD, ADD_COMMENT } from './constants'

export const getAllCommentsInCard = cardId => (dispatch) => {
  dispatch({
    type: GET_ALL_COMMENTS_IN_CARD,
    payload: {
      request: {
        method: 'GET',
        url: `/api/cards/${cardId}/comments`,
      },
    },
  })
}

export const addComment = (cardId, content, userId) => (dispatch) => {
  dispatch({
    type: ADD_COMMENT,
    cardId,
    payload: {
      request: {
        method: 'POST',
        url: `/api/cards/${cardId}/comments/`,
        data: {
          content,
          userId,
        },
      },
    },
  })
}
