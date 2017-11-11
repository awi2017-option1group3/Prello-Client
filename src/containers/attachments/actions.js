import { GET_ALL_ATTACHMENTS_IN_CARD, REMOVE_ATTACHMENT_IN_CARD } from './constants'

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

export const removeAttachmentInCard = (cardId, AttachmentId) => (dispatch) => {
  dispatch({
    type: REMOVE_ATTACHMENT_IN_CARD,
    payload: {
      request: {
        method: 'DELETE',
        url: `/api/cards/${cardId}/attachments/${AttachmentId}`,
      },
    },
  })
}
