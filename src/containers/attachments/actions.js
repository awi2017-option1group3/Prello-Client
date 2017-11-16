import { GET_ALL_ATTACHMENTS_IN_CARD, REMOVE_ATTACHMENT } from './constants'

export const getAllAttachmentsInCard = cardId => (dispatch) => {
  dispatch({
    type: GET_ALL_ATTACHMENTS_IN_CARD,
    payload: {
      request: {
        method: 'GET',
        url: `/api/cards/${cardId}/attachments`,
      },
    },
  })
}

export const removeAttachment = (cardId, attachmentId) => (dispatch) => {
  dispatch({
    type: REMOVE_ATTACHMENT,
    cardId,
    payload: {
      request: {
        method: 'DELETE',
        url: `/api/cards/${cardId}/attachments/${attachmentId}`,
      },
    },
  })
}
