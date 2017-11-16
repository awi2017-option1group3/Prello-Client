import { GET_ALL_ATTACHMENTS_IN_CARD, ADD_ATTACHMENT, REMOVE_ATTACHMENT } from './constants'

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

export const addAttachment = (cardId, attachment) => (dispatch) => {
  dispatch({
    type: ADD_ATTACHMENT,
    cardId,
    payload: {
      request: {
        method: 'POST',
        url: `/api/cards/${cardId}/attachments/`,
        data: {
          name: attachment.name,
          desc: attachment.description,
          attachmentId: attachment.id,
          attachmentUrl: attachment.url,
          attachmentIcon: attachment.embedUrl,
          lastEditedTime: attachment.lastEditedUtc,
        },
      },
    },
  })
}

export const removeAttachment = (cardId, attachmentId) => (dispatch) => {
  dispatch({
    type: REMOVE_ATTACHMENT,
    attachmentId,
    payload: {
      request: {
        method: 'DELETE',
        url: `/api/cards/${cardId}/attachments/${attachmentId}`,
      },
    },
  })
}
